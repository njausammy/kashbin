
import React, { useState, useEffect } from 'react';
import { useForm } from "react-hook-form"
import { Text, VStack, HStack, Spinner, Box, Pressable } from "@gluestack-ui/themed";
import PhoneNumberInput from '@/src/components/form/PhoneInput';
import PageHeader from '@/src/components/PageHeader';
import Button from '@/src/components/form/AnimatedButton';
import { router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import localDB from '@/src/utils/LocalDatabase';
import LocalStorage from '@/src/utils/LocalStorage';
import { Colors } from '@/src/constants/Colors';
interface IFormValues {
    phone: string
}

const LoginPhone = () => {
    const { control, watch } = useForm({
        defaultValues: {
            phone: ''
        }
    });

    const [isFormValid, setIsFormValid] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');

    const phone = watch('phone');

    useEffect(() => {
        // More lenient validation - at least 9 digits (Kenyan numbers)
        const isValid = phone && phone.trim().length >= 9;
        setIsFormValid(isValid);
        setError(''); // Clear error when phone changes

        // Debug logging
        console.log('Phone value:', phone);
        console.log('Phone length:', phone?.length);
        console.log('Is valid:', isValid);
    }, [phone]);

    const handleContinue = async () => {
        setIsLoading(true);
        setError('');

        try {
            // Get user from local database (no PIN required)
            const user = await localDB.getUserByPhone(phone);

            if (user) {
                // Login successful - set as current user
                await localDB.setCurrentUser(user);
                await LocalStorage.setItem('hasOnboarded', 'onboard');

                setIsLoading(false);
                router.replace('/main');
            } else {
                setIsLoading(false);
                setError('No account found with this phone number. Please sign up first.');
            }
        } catch (err) {
            console.error('Login phone check error:', err);
            setIsLoading(false);
            setError('An error occurred. Please try again.');
        }
    };

    return (
        <VStack backgroundColor="$white" paddingBottom={50} flex={1}>
            <Box paddingHorizontal={15}>
                <PageHeader hideProgressBar value={0} />
            </Box>

            <VStack marginTop={24} paddingHorizontal={24} flex={1}>
                {/* Header */}
                <VStack marginBottom={32}>
                    <Text color="#2A2A2A" lineHeight={28} fontSize={24} fontWeight={700}>
                        Welcome back
                    </Text>
                    <Text lineHeight={20} color='#5A5A5A' fontSize={14} fontWeight={400} marginTop={8}>
                        Enter your mobile number to log in to your wallet
                    </Text>
                </VStack>

                {/* Form */}
                <VStack flex={1} justifyContent="space-between">
                    <Box>
                        <PhoneNumberInput control={control} />

                        {/* Error Message */}
                        {error && (
                            <Box
                                backgroundColor="rgba(220, 38, 38, 0.06)"
                                borderRadius={12}
                                padding={16}
                                marginTop={16}
                            >
                                <HStack space="sm" alignItems="flex-start">
                                    <Ionicons name="alert-circle-outline" size={20} color={Colors.error} />
                                    <Text fontSize={14} color={Colors.error} fontWeight={500} flex={1}>
                                        {error}
                                    </Text>
                                </HStack>
                            </Box>
                        )}
                    </Box>

                    {/* Continue Button */}
                    <Button
                        backgroundColor={isFormValid ? "#1E40AF" : "#E5E7EB"}
                        borderRadius={50}
                        height={56}
                        width="$full"
                        alignSelf="center"
                        disabled={!isFormValid || isLoading}
                        onPress={handleContinue}
                    >
                        {isLoading ? (
                            <Spinner color='$white' />
                        ) : (
                            <Text
                                color={isFormValid ? '$white' : '#5A5A5A'}
                                fontSize={16}
                                fontWeight={600}
                            >
                                Login
                            </Text>
                        )}
                    </Button>
                </VStack>

                {/* Signup Link */}
                <Pressable onPress={() => router.push('/auth/phone')} alignSelf="center" marginTop={16}>
                    <Text fontSize={14} color="#5A5A5A">
                        Don't have an account?{' '}
                        <Text color={Colors.primary.DEFAULT} fontWeight={600}>
                            Sign up
                        </Text>
                    </Text>
                </Pressable>
            </VStack>
        </VStack>
    );
};

export default LoginPhone;
