
import React, { useState } from 'react';
import { Text, VStack, HStack, Spinner, Box, Pressable, Input, InputField } from "@gluestack-ui/themed";
import PageHeader from '@/src/components/PageHeader';
import Button from '@/src/components/form/AnimatedButton';
import { router, useLocalSearchParams } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '@/src/constants/Colors';
const ConfirmPIN = () => {
    const { phone, pin: originalPin } = useLocalSearchParams<{ phone: string, pin: string }>();
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

    const handleContinue = async () => {
        setIsLoading(true);
        const confirmPinCode = pin.join('');

        // Check if PINs match
        if (confirmPinCode !== originalPin) {
            setIsLoading(false);
            setError("PINs don't match. Please try again.");
            setPin(['', '', '', '', '', '']);
            return;
        }

        setTimeout(() => {
            setIsLoading(false);
            router.push({
                pathname: '/auth/basic-info',
                params: { phone, pin: originalPin }
            });
        }, 500);
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
                        Confirm your PIN
                    </Text>
                    <Text lineHeight={20} color='#5A5A5A' fontSize={14} fontWeight={400} marginTop={8}>
                        Enter your PIN again to confirm
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
                    </Box>

                    {/* Continue Button */}
                    <Button
                        backgroundColor={isFormValid ? "#1E40AF" : "#E5E7EB"}
                        borderRadius={50}
                        height={56}
                        width="$full"
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
            </VStack>
        </VStack>
    );
};

export default ConfirmPIN;
