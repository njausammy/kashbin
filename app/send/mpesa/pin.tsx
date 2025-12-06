import React, { useState, useEffect } from 'react';
import { VStack, HStack, Text, Box, Pressable } from '@gluestack-ui/themed';
import { router, useLocalSearchParams } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '@/src/constants/Colors';

const PinEntry = () => {
    const params = useLocalSearchParams();
    const [pin, setPin] = useState('');
    const [error, setError] = useState('');

    const TEMP_CORRECT_PIN = '123456'; // For testing

    useEffect(() => {
        if (pin.length === 6) {
            handleVerifyPIN();
        }
    }, [pin]);

    const handleVerifyPIN = async () => {
        if (pin === TEMP_CORRECT_PIN) {
            // PIN correct, go to processing
            router.push({
                pathname: '/send/mpesa/processing',
                params: params
            });
        } else {
            setError('Incorrect PIN');
            setPin('');
        }
    };

    const handleNumberPress = (num: string) => {
        if (pin.length < 6) {
            setPin(pin + num);
            if (error) setError('');
        }
    };

    const handleBackspace = () => {
        setPin(pin.slice(0, -1));
        if (error) setError('');
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
                            Enter PIN
                        </Text>
                    </HStack>
                    <Text fontSize={14} color="rgba(255, 255, 255, 0.9)">
                        Confirm your transaction
                    </Text>
                </VStack>
            </Box>

            <VStack flex={1} paddingHorizontal={24} paddingTop={40} justifyContent="space-between">
                <VStack alignItems="center">
                    {/* Lock Icon */}
                    <Box
                        width={80}
                        height={80}
                        borderRadius={40}
                        backgroundColor="rgba(30, 64, 175, 0.08)"
                        alignItems="center"
                        justifyContent="center"
                        marginBottom={32}
                    >
                        <Ionicons name="lock-closed" size={36} color={Colors.primary.DEFAULT} />
                    </Box>

                    <Text fontSize={18} fontWeight="600" color="#1C1C1E" marginBottom={32}>
                        Enter your 6-digit PIN
                    </Text>

                    {/* PIN Dots */}
                    <HStack space="md" marginBottom={16}>
                        {[0, 1, 2, 3, 4, 5].map((index) => (
                            <Box
                                key={index}
                                width={16}
                                height={16}
                                borderRadius={8}
                                backgroundColor={pin.length > index ? 'Colors.primary.DEFAULT' : '#E5E7EB'}
                            />
                        ))}
                    </HStack>

                    {/* Error Message */}
                    {error ? (
                        <Text fontSize={14} color="#DC2626" marginBottom={16}>
                            {error}
                        </Text>
                    ) : null}

                    {/* Test Info Box */}
                    <Box
                        backgroundColor="#DBEAFE"
                        borderRadius={12}
                        padding={16}
                        marginTop={16}
                        borderWidth={1}
                        borderColor="#3B82F6"
                    >
                        <HStack space="sm" alignItems="flex-start">
                            <Ionicons name="information-circle" size={20} color="#3B82F6" />
                            <VStack flex={1}>
                                <Text fontSize={13} fontWeight="600" color="#1E3A8A" marginBottom={4}>
                                    Testing PIN
                                </Text>
                                <Text fontSize={13} color="#1E3A8A">
                                    Use PIN: <Text fontWeight="700">123456</Text>
                                </Text>
                            </VStack>
                        </HStack>
                    </Box>
                </VStack>

                {/* Number Pad */}
                <VStack space="sm" paddingBottom={32}>
                    {[[1, 2, 3], [4, 5, 6], [7, 8, 9]].map((row, rowIndex) => (
                        <HStack key={rowIndex} space="sm" justifyContent="center">
                            {row.map((num) => (
                                <Pressable key={num} onPress={() => handleNumberPress(num.toString())} flex={1}>
                                    <Box
                                        height={64}
                                        backgroundColor="#F9FAFB"
                                        borderRadius={12}
                                        alignItems="center"
                                        justifyContent="center"
                                        borderWidth={1}
                                        borderColor="#E5E7EB"
                                    >
                                        <Text fontSize={24} fontWeight="600" color="#1C1C1E">
                                            {num}
                                        </Text>
                                    </Box>
                                </Pressable>
                            ))}
                        </HStack>
                    ))}
                    {/* Last row with 0 and backspace */}
                    <HStack space="sm" justifyContent="center">
                        <Box flex={1} />
                        <Pressable onPress={() => handleNumberPress('0')} flex={1}>
                            <Box
                                height={64}
                                backgroundColor="#F9FAFB"
                                borderRadius={12}
                                alignItems="center"
                                justifyContent="center"
                                borderWidth={1}
                                borderColor="#E5E7EB"
                            >
                                <Text fontSize={24} fontWeight="600" color="#1C1C1E">
                                    0
                                </Text>
                            </Box>
                        </Pressable>
                        <Pressable onPress={handleBackspace} flex={1}>
                            <Box
                                height={64}
                                backgroundColor="#F9FAFB"
                                borderRadius={12}
                                alignItems="center"
                                justifyContent="center"
                                borderWidth={1}
                                borderColor="#E5E7EB"
                            >
                                <Ionicons name="backspace-outline" size={28} color="#1C1C1E" />
                            </Box>
                        </Pressable>
                    </HStack>
                </VStack>
            </VStack>
        </VStack>
    );
};

export default PinEntry;
