import React, { useState, useEffect, useRef } from 'react';
import { VStack, HStack, Text, Box, Pressable, Input, InputField } from '@gluestack-ui/themed';
import { Keyboard, TextInput } from 'react-native';
import Button from '@/src/components/form/AnimatedButton';
import { router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '@/src/constants/Colors';

const MpesaPhoneInput = () => {
    const phoneInputRef = useRef<TextInput>(null);
    const [phone, setPhone] = useState('');
    const [isValid, setIsValid] = useState(false);
    const [error, setError] = useState('');

    useEffect(() => {
        // Clear error when user types
        if (error) setError('');

        // Validate Kenyan phone number format
        const cleanPhone = phone.replace(/[\s\-]/g, '');

        // Valid formats: 07XXXXXXXX or 7XXXXXXXX (9 or 10 digits)
        const valid = /^(0?7[0-9]{8})$/.test(cleanPhone);
        setIsValid(valid && cleanPhone.length >= 9);
    }, [phone]);

    const handleContinue = () => {
        if (!isValid) {
            setError('Please enter a valid M-Pesa number');
            return;
        }

        // Format phone number for display (remove leading 0, will show as +254...)
        const cleanPhone = phone.replace(/[\s\-]/g, '').replace(/^0/, '');

        router.push({
            pathname: '/send/mpesa/amount',
            params: {
                mpesaNumber: cleanPhone,
            }
        });
    };

    const formatPhoneDisplay = (value: string) => {
        // Auto-format as user types: 0712 345 678
        const cleaned = value.replace(/\D/g, '').slice(0, 10);
        if (cleaned.length <= 4) return cleaned;
        if (cleaned.length <= 7) return `${cleaned.slice(0, 4)} ${cleaned.slice(4)}`;
        return `${cleaned.slice(0, 4)} ${cleaned.slice(4, 7)} ${cleaned.slice(7)}`;
    };

    return (
        <VStack backgroundColor="$white" flex={1}>
            {/* Header */}
            <Box backgroundColor={Colors.primary.DEFAULT} paddingTop={50} paddingBottom={24}>
                <VStack paddingHorizontal={20}>
                    <HStack alignItems="center" marginBottom={16}>
                        <Pressable onPress={() => router.back()} marginRight={16}>
                            <Ionicons name="arrow-back" size={24} color="white" />
                        </Pressable>
                        <Text fontSize={24} fontWeight="700" color="white">
                            Send to M-Pesa
                        </Text>
                    </HStack>
                    <Text fontSize={14} color="rgba(255, 255, 255, 0.9)">
                        Enter M-Pesa phone number
                    </Text>
                </VStack>
            </Box>

            <VStack flex={1} paddingHorizontal={24} marginTop={32} justifyContent="space-between">
                <VStack>
                    {/* Info Card */}
                    <Box
                        backgroundColor="rgba(30, 64, 175, 0.08)"
                        borderRadius={12}
                        padding={16}
                        marginBottom={32}
                    >
                        <HStack space="sm" alignItems="flex-start">
                            <Ionicons name="information-circle" size={20} color={Colors.primary.DEFAULT} />
                            <Text fontSize={14} color="#1C1C1E" flex={1}>
                                Convert your USDT to KES and send directly to any M-Pesa number in Kenya
                            </Text>
                        </HStack>
                    </Box>

                    {/* Phone Number Input */}
                    <VStack space="xs">
                        <Text fontSize={14} color="#8E8E93" marginBottom={8}>
                            M-Pesa Phone Number
                        </Text>
                        <Input
                            borderColor={error ? "#DC2626" : phone ? "Colors.primary.DEFAULT" : "#B8B8B8"}
                            borderWidth={2}
                            borderRadius={12}
                            height={64}
                            marginBottom={8}
                        >
                            <Box paddingLeft={16} justifyContent="center">
                                <Text fontSize={16} fontWeight="600" color="#8E8E93">
                                    +254
                                </Text>
                            </Box>
                            <InputField
                                ref={phoneInputRef}
                                placeholder="712 345 678"
                                value={formatPhoneDisplay(phone)}
                                onChangeText={(text) => setPhone(text.replace(/\D/g, ''))}
                                keyboardType="numeric"
                                fontSize={18}
                                fontWeight="600"
                                color="#1C1C1E"
                                returnKeyType="done"
                                onSubmitEditing={() => Keyboard.dismiss()}
                            />
                        </Input>
                        <Text fontSize={13} color="#8E8E93">
                            Enter the recipient's M-Pesa phone number
                        </Text>
                        {error ? (
                            <Text fontSize={13} color="#DC2626" marginTop={4}>
                                {error}
                            </Text>
                        ) : null}
                    </VStack>

                    {/* Quick Test Numbers */}
                    <VStack marginTop={24}>
                        <Text fontSize={14} color="#8E8E93" marginBottom={12}>
                            Quick test numbers
                        </Text>
                        <VStack space="sm">
                            {['0712345678', '0723456789', '0734567890'].map((testNumber) => (
                                <Pressable key={testNumber} onPress={() => setPhone(testNumber)}>
                                    <Box
                                        backgroundColor={phone === testNumber ? 'Colors.primary.DEFAULT15' : '#F9FAFB'}
                                        borderRadius={12}
                                        padding={16}
                                        borderWidth={1}
                                        borderColor={phone === testNumber ? 'Colors.primary.DEFAULT' : '#E5E7EB'}
                                    >
                                        <HStack space="md" alignItems="center">
                                            <Box
                                                width={40}
                                                height={40}
                                                borderRadius={20}
                                                backgroundColor="rgba(30, 64, 175, 0.08)"
                                                alignItems="center"
                                                justifyContent="center"
                                            >
                                                <Ionicons name="phone-portrait" size={20} color={Colors.primary.DEFAULT} />
                                            </Box>
                                            <VStack>
                                                <Text fontSize={16} fontWeight="600" color="#1C1C1E">
                                                    +254 {formatPhoneDisplay(testNumber)}
                                                </Text>
                                                <Text fontSize={13} color="#8E8E93">
                                                    Test M-Pesa Number
                                                </Text>
                                            </VStack>
                                        </HStack>
                                    </Box>
                                </Pressable>
                            ))}
                        </VStack>
                    </VStack>
                </VStack>

                {/* Continue Button */}
                <Button
                    backgroundColor={isValid ? "Colors.primary.DEFAULT" : "#B8B8B8"}
                    borderRadius={50}
                    height={56}
                    width="$full"
                    marginBottom={24}
                    disabled={!isValid}
                    onPress={handleContinue}
                >
                    <Text
                        color={isValid ? '$white' : '#5A5A5A'}
                        fontSize={16}
                        fontWeight={600}
                    >
                        Continue
                    </Text>
                </Button>
            </VStack>
        </VStack>
    );
};

export default MpesaPhoneInput;
