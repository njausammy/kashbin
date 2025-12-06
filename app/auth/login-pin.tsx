
import React, { useState } from 'react';
import { Text, VStack, HStack, Spinner, Box, Pressable, Input, InputField } from "@gluestack-ui/themed";
import PageHeader from '@/src/components/PageHeader';
import Button from '@/src/components/form/AnimatedButton';
import { router, useLocalSearchParams } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import LocalStorage from '@/src/utils/LocalStorage';
import localDB from '@/src/utils/LocalDatabase';
import { Colors } from '@/src/constants/Colors';
const LoginPIN = () => {
    const { phone } = useLocalSearchParams<{ phone: string }>();
    const [pin, setPin] = useState(['', '', '', '', '', '']);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');

    const handlePinChange = (value: string, index: number) => {
        const newPin = [...pin];
        newPin[index] = value;
        setPin(newPin);
        setError(''); // Clear error on input

        // Auto-focus next input
        if (value && index < 5) {
            // Focus next input - would need refs in production
        }
    };

    const isFormValid = pin.every(digit => digit.length === 1);

    const handleLogin = async () => {
        setIsLoading(true);
        const pinCode = pin.join('');

        try {
            // Verify credentials against local database
            const user = await localDB.verifyCredentials(phone as string, pinCode);

            if (user) {
                // Login successful - set as current user
                await localDB.setCurrentUser(user);
                await LocalStorage.setItem('hasOnboarded', 'onboard');

                setIsLoading(false);
                router.replace('/main');
            } else {
                // Invalid credentials
                setIsLoading(false);
                setError('Incorrect PIN. Please try again.');
                setPin(['', '', '', '', '', '']);
            }
        } catch (error) {
            console.error('Login error:', error);
            setIsLoading(false);
            setError('An error occurred. Please try again.');
            setPin(['', '', '', '', '', '']);
        }
    };

    return (
        <VStack backgroundColor="$white" paddingBottom={50} flex={1}>
            <Box paddingHorizontal={15}>
                <PageHeader hideProgressBar value={0} />
            </Box>

            <VStack marginTop={24} paddingHorizontal={24} flex={1}>
                {/* Header */}
                <VStack marginBottom={40}>
                    <Pressable onPress={() => router.back()} marginBottom={16}>
                        <Ionicons name="arrow-back" size={24} color="#2A2A2A" />
                    </Pressable>

                    <Text color="#2A2A2A" lineHeight={28} fontSize={24} fontWeight={700}>
                        Enter your PIN
                    </Text>
                    <Text lineHeight={20} color='#5A5A5A' fontSize={14} fontWeight={400} marginTop={8}>
                        Enter your 6-digit PIN for {phone}
                    </Text>
                </VStack>

                {/* PIN Input */}
                <VStack flex={1} justifyContent="space-between">
                    <Box>
                        <HStack space="md" justifyContent="center" marginBottom={24}>
                            {pin.map((digit, index) => (
                                <Box key={index} flex={1} maxWidth={50}>
                                    <Input
                                        borderColor={error ? "#DC2626" : (digit ? "#1E40AF" : "#E5E7EB")}
                                        borderWidth={2}
                                        borderRadius={12}
                                        height={60}
                                        backgroundColor="$white"
                                    >
                                        <InputField
                                            value={digit}
                                            onChangeText={(value) => handlePinChange(value, index)}
                                            keyboardType="number-pad"
                                            maxLength={1}
                                            textAlign="center"
                                            fontSize={24}
                                            fontWeight={600}
                                            secureTextEntry
                                        />
                                    </Input>
                                </Box>
                            ))}
                        </HStack>

                        {/* Error Message */}
                        {error && (
                            <Box
                                backgroundColor="rgba(220, 38, 38, 0.06)"
                                borderRadius={12}
                                padding={16}
                                marginBottom={16}
                            >
                                <HStack space="sm" alignItems="center">
                                    <Ionicons name="alert-circle-outline" size={20} color={Colors.error} />
                                    <Text fontSize={14} color={Colors.error} fontWeight={500}>
                                        {error}
                                    </Text>
                                </HStack>
                            </Box>
                        )}

                        {/* Forgot PIN Link */}
                        <Pressable alignSelf="center" marginTop={8}>
                            <Text fontSize={14} color={Colors.primary.DEFAULT} fontWeight={600}>
                                Forgot PIN?
                            </Text>
                        </Pressable>
                    </Box>

                    {/* Login Button */}
                    <Button
                        backgroundColor={isFormValid ? "#1E40AF" : "#E5E7EB"}
                        borderRadius={50}
                        height={56}
                        width="$full"
                        disabled={!isFormValid || isLoading}
                        onPress={handleLogin}
                    >
                        {isLoading ? (
                            <Spinner color='$white' />
                        ) : (
                            <Text
                                color={isFormValid ? '$white' : '#5A5A5A'}
                                fontSize={16}
                                fontWeight={600}
                            >
                                Log In
                            </Text>
                        )}
                    </Button>
                </VStack>
            </VStack>
        </VStack>
    );
};

export default LoginPIN;
