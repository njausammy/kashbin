import React, { useState, useEffect } from 'react';
import { VStack, HStack, Text, Box, Pressable } from '@gluestack-ui/themed';
import { Ionicons } from '@expo/vector-icons';
import { router, useLocalSearchParams } from 'expo-router';
import { Colors } from '@/src/constants/Colors';

const PIN = () => {
    const params = useLocalSearchParams();
    const [pin, setPin] = useState('');
    const [error, setError] = useState('');

    const handleNumberPress = (number: string) => {
        if (pin.length < 6) {
            const newPin = pin + number;
            setPin(newPin);
            setError('');

            if (newPin.length === 6) {
                validatePin(newPin);
            }
        }
    };

    const handleBackspace = () => {
        setPin(pin.slice(0, -1));
        setError('');
    };

    const validatePin = (enteredPin: string) => {
        // Mock PIN validation
        if (enteredPin === '123456') {
            setTimeout(() => {
                router.replace({
                    pathname: '/send/cash-pickup/code-generated',
                    params: params
                });
            }, 300);
        } else {
            setError('Incorrect PIN. Please try again.');
            setPin('');
        }
    };

    return (
        <VStack backgroundColor="$white" flex={1}>
            {/* Header */}
            <Box backgroundColor={Colors.secondary.DEFAULT} paddingTop={50} paddingBottom={24}>
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

            {/* Content */}
            <VStack flex={1} paddingHorizontal={24} paddingTop={60} alignItems="center">
                {/* PIN Dots */}
                <HStack space="md" marginBottom={40}>
                    {[0, 1, 2, 3, 4, 5].map((index) => (
                        <Box
                            key={index}
                            width={16}
                            height={16}
                            borderRadius={8}
                            backgroundColor={index < pin.length ? '#1E40AF' : '#E5E7EB'}
                        />
                    ))}
                </HStack>

                {error && (
                    <HStack
                        space="xs"
                        alignItems="center"
                        backgroundColor="#FEE2E2"
                        paddingHorizontal={16}
                        paddingVertical={12}
                        borderRadius={8}
                        marginBottom={32}
                    >
                        <Ionicons name="alert-circle" size={20} color={Colors.error} />
                        <Text fontSize={14} color={Colors.error}>
                            {error}
                        </Text>
                    </HStack>
                )}

                <Text fontSize={16} color={Colors.grey} marginBottom={60} textAlign="center">
                    Enter your 6-digit PIN{'\n'}(Use 123456 for demo)
                </Text>

                {/* Number Pad */}
                <VStack space="md" width="80%" maxWidth={300}>
                    {/* Row 1 */}
                    <HStack space="md" justifyContent="space-between">
                        {['1', '2', '3'].map((num) => (
                            <Pressable
                                key={num}
                                onPress={() => handleNumberPress(num)}
                                flex={1}
                            >
                                <Box
                                    backgroundColor={Colors.background}
                                    height={64}
                                    borderRadius={12}
                                    alignItems="center"
                                    justifyContent="center"
                                    borderWidth={1}
                                    borderColor={Colors.lightGrey}
                                >
                                    <Text fontSize={24} fontWeight="600" color={Colors.dark}>
                                        {num}
                                    </Text>
                                </Box>
                            </Pressable>
                        ))}
                    </HStack>

                    {/* Row 2 */}
                    <HStack space="md" justifyContent="space-between">
                        {['4', '5', '6'].map((num) => (
                            <Pressable
                                key={num}
                                onPress={() => handleNumberPress(num)}
                                flex={1}
                            >
                                <Box
                                    backgroundColor={Colors.background}
                                    height={64}
                                    borderRadius={12}
                                    alignItems="center"
                                    justifyContent="center"
                                    borderWidth={1}
                                    borderColor={Colors.lightGrey}
                                >
                                    <Text fontSize={24} fontWeight="600" color={Colors.dark}>
                                        {num}
                                    </Text>
                                </Box>
                            </Pressable>
                        ))}
                    </HStack>

                    {/* Row 3 */}
                    <HStack space="md" justifyContent="space-between">
                        {['7', '8', '9'].map((num) => (
                            <Pressable
                                key={num}
                                onPress={() => handleNumberPress(num)}
                                flex={1}
                            >
                                <Box
                                    backgroundColor={Colors.background}
                                    height={64}
                                    borderRadius={12}
                                    alignItems="center"
                                    justifyContent="center"
                                    borderWidth={1}
                                    borderColor={Colors.lightGrey}
                                >
                                    <Text fontSize={24} fontWeight="600" color={Colors.dark}>
                                        {num}
                                    </Text>
                                </Box>
                            </Pressable>
                        ))}
                    </HStack>

                    {/* Row 4 */}
                    <HStack space="md" justifyContent="space-between">
                        <Box flex={1} />
                        <Pressable
                            onPress={() => handleNumberPress('0')}
                            flex={1}
                        >
                            <Box
                                backgroundColor={Colors.background}
                                height={64}
                                borderRadius={12}
                                alignItems="center"
                                justifyContent="center"
                                borderWidth={1}
                                borderColor={Colors.lightGrey}
                            >
                                <Text fontSize={24} fontWeight="600" color={Colors.dark}>
                                    0
                                </Text>
                            </Box>
                        </Pressable>
                        <Pressable
                            onPress={handleBackspace}
                            flex={1}
                        >
                            <Box
                                backgroundColor={Colors.background}
                                height={64}
                                borderRadius={12}
                                alignItems="center"
                                justifyContent="center"
                                borderWidth={1}
                                borderColor={Colors.lightGrey}
                            >
                                <Ionicons name="backspace-outline" size={28} color={Colors.dark} />
                            </Box>
                        </Pressable>
                    </HStack>
                </VStack>
            </VStack>
        </VStack>
    );
};

export default PIN;
