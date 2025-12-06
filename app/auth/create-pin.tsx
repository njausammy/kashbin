
import React, { useState } from 'react';
import { Text, VStack, HStack, Spinner, Box, Pressable, Input, InputField } from "@gluestack-ui/themed";
import PageHeader from '@/src/components/PageHeader';
import Button from '@/src/components/form/AnimatedButton';
import { router, useLocalSearchParams } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '@/src/constants/Colors';
const CreatePIN = () => {
    const { phone } = useLocalSearchParams<{ phone: string }>();
    const [pin, setPin] = useState(['', '', '', '', '', '']);
    const [isLoading, setIsLoading] = useState(false);

    const handlePinChange = (value: string, index: number) => {
        const newPin = [...pin];
        newPin[index] = value;
        setPin(newPin);

        // Auto-focus next input
        if (value && index < 5) {
            // Focus next input - would need refs in production
        }
    };

    const isFormValid = pin.every(digit => digit.length === 1);

    const handleContinue = async () => {
        setIsLoading(true);
        const pinCode = pin.join('');

        setTimeout(() => {
            setIsLoading(false);
            router.push({
                pathname: '/auth/confirm-pin',
                params: { phone, pin: pinCode }
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
                        Create your PIN
                    </Text>
                    <Text lineHeight={20} color='#5A5A5A' fontSize={14} fontWeight={400} marginTop={8}>
                        Choose a 6-digit PIN to secure your wallet
                    </Text>
                </VStack>

                {/* PIN Input */}
                <VStack flex={1} justifyContent="space-between">
                    <Box>
                        <HStack space="md" justifyContent="center" marginBottom={32}>
                            {pin.map((digit, index) => (
                                <Box key={index} flex={1} maxWidth={50}>
                                    <Input
                                        borderColor={digit ? "#1E40AF" : "#E5E7EB"}
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

                        {/* Security Info */}
                        <Box
                            backgroundColor="rgba(245, 158, 11, 0.06)"
                            borderRadius={12}
                            padding={16}
                        >
                            <HStack space="sm" alignItems="flex-start">
                                <Ionicons name="shield-checkmark-outline" size={20} color={Colors.secondary.DEFAULT} />
                                <VStack flex={1}>
                                    <Text fontSize={14} color="#2A2A2A" fontWeight={500}>
                                        Keep your PIN safe
                                    </Text>
                                    <Text fontSize={13} color="#5A5A5A" marginTop={4}>
                                        Never share your PIN with anyone. You'll need it to confirm transactions.
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

export default CreatePIN;
