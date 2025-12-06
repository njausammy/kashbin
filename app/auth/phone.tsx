
import React, { useState, useEffect } from 'react';
import { useForm } from "react-hook-form"
import { Input, InputField, Text, VStack, HStack, Spinner, Box, Pressable } from "@gluestack-ui/themed";
import { Keyboard, TouchableWithoutFeedback, View } from 'react-native';
import PhoneNumberInput from '@/src/components/form/PhoneInput';
import PageHeader from '@/src/components/PageHeader';
import Button from '@/src/components/form/AnimatedButton';
import { router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '@/src/constants/Colors';
interface IFormValues {
    phone: string
}

const PhoneSignup = () => {
    const { control, watch } = useForm({
        defaultValues: {
            phone: ''
        }
    });

    const [isFormValid, setIsFormValid] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const phone = watch('phone');

    useEffect(() => {
        // Phone number should be at least 9 digits (Kenyan numbers)
        // Remove any spaces, dashes, or special characters before validation
        const cleanedPhone = phone?.replace(/[\s\-\(\)]/g, '') || '';
        setIsFormValid(cleanedPhone.length >= 9);
    }, [phone]);

    const handleContinue = async () => {
        setIsLoading(true);

        // TODO: Send OTP to phone number via API
        // Simulating API call
        setTimeout(() => {
            setIsLoading(false);
            // Navigate to OTP verification with phone number
            router.push({
                pathname: '/auth/verify-otp',
                params: { phone }
            });
        }, 1000);
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
                        Create your account
                    </Text>
                    <Text lineHeight={20} color='#5A5A5A' fontSize={14} fontWeight={400} marginTop={8}>
                        Enter your mobile number to get started with your crypto wallet
                    </Text>
                </VStack>

                {/* Form */}
                <VStack flex={1} justifyContent="space-between">
                    <Box>
                        <PhoneNumberInput
                            control={control}
                            onSubmitEditing={() => {
                                Keyboard.dismiss();
                            }}
                        />

                        {/* Info Card */}
                        <Box
                            backgroundColor="rgba(30, 64, 175, 0.06)"
                            borderRadius={12}
                            padding={16}
                            marginTop={24}
                        >
                            <HStack space="sm" alignItems="flex-start">
                                <Ionicons name="information-circle-outline" size={20} color={Colors.primary.DEFAULT} />
                                <VStack flex={1}>
                                    <Text fontSize={14} color="#2A2A2A" fontWeight={500}>
                                        We'll send you a verification code
                                    </Text>
                                    <Text fontSize={13} color="#5A5A5A" marginTop={4}>
                                        Standard SMS rates may apply
                                    </Text>
                                </VStack>
                            </HStack>
                        </Box>
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
                                Continue
                            </Text>
                        )}
                    </Button>
                </VStack>

                {/* Login Link */}
                <Pressable onPress={() => router.push('/auth/login')} alignSelf="center" marginTop={16}>
                    <Text fontSize={14} color="#5A5A5A">
                        Already have an account?{' '}
                        <Text color={Colors.primary.DEFAULT} fontWeight={600}>
                            Log in
                        </Text>
                    </Text>
                </Pressable>
            </VStack>
        </VStack>
    );
};

export default PhoneSignup;
