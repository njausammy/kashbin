import React, { useState, useEffect } from 'react';
import { VStack, HStack, Text, Box, Pressable } from '@gluestack-ui/themed';
import { router, useLocalSearchParams } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '@/src/constants/Colors';

const P2PPIN = () => {
    const params = useLocalSearchParams();
    const [pin, setPin] = useState('');
    const [error, setError] = useState('');

    // For now, accept any 6-digit PIN (TODO: verify against stored PIN)
    const TEMP_CORRECT_PIN = '123456';

    useEffect(() => {
        if (pin.length === 6) {
            // Auto-submit when 6 digits entered
            handleVerifyPIN();
        }
    }, [pin]);

    const handleVerifyPIN = async () => {
        if (pin === TEMP_CORRECT_PIN) {
            // PIN correct - go to processing
            router.push({
                pathname: '/send/p2p/processing',
                params: params
            });
        } else {
            setError('Incorrect PIN. Try again.');
            setPin('');
        }
    };

    const handleNumberPress = (num: string) => {
        if (pin.length < 6) {
            setPin(pin + num);
            setError('');
        }
    };

    const handleBackspace = () => {
        setPin(pin.slice(0, -1));
        setError('');
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
                    <Text fontSize={14} color="rgba(255, 255, 255, 0.8)">
                        Enter your 6-digit PIN to confirm
                    </Text>
                </VStack>
            </Box>

            <VStack flex={1} paddingHorizontal={24} marginTop={32} alignItems="center">
                {/* PIN Dots */}
                <HStack space="md" marginBottom={32}>
                    {[0, 1, 2, 3, 4, 5].map((index) => (
                        <Box
                            key={index}
                            width={16}
                            height={16}
                            borderRadius={8}
                            backgroundColor={pin.length > index ? '#1E40AF' : '#E5E7EB'}
                        />
                    ))}
                </HStack>

                {/* Error Message */}
                {error && (
                    <Box
                        backgroundColor="#DC262610"
                        borderRadius={12}
                        padding={16}
                        marginBottom={24}
                        width="$full"
                    >
                        <HStack space="sm" alignItems="center" justifyContent="center">
                            <Ionicons name="alert-circle-outline" size={20} color={Colors.error} />
                            <Text fontSize={14} color={Colors.error} fontWeight={500}>
                                {error}
                            </Text>
                        </HStack>
                    </Box>
                )}

                {/* Info Box */}
                <Box
                    backgroundColor="#1E40AF10"
                    borderRadius={12}
                    padding={16}
                    marginBottom={32}
                    width="$full"
                >
                    <HStack space="sm" alignItems="center" justifyContent="center">
                        <Ionicons name="information-circle" size={20} color={Colors.primary.DEFAULT} />
                        <Text fontSize={13} color={Colors.grey} textAlign="center">
                            For testing, use PIN: <Text fontWeight="700" color={Colors.primary.DEFAULT}>123456</Text>
                        </Text>
                    </HStack>
                </Box>

                {/* Number Pad */}
                <VStack space="md" width="$full" maxWidth={300}>
                    {/* Rows 1-3 */}
                    {[[1, 2, 3], [4, 5, 6], [7, 8, 9]].map((row, rowIndex) => (
                        <HStack key={rowIndex} space="md" justifyContent="center">
                            {row.map((num) => (
                                <Pressable key={num} flex={1} onPress={() => handleNumberPress(num.toString())}>
                                    <Box
                                        height={72}
                                        borderRadius={12}
                                        backgroundColor={Colors.background}
                                        borderWidth={1}
                                        borderColor={Colors.lightGrey}
                                        alignItems="center"
                                        justifyContent="center"
                                    >
                                        <Text fontSize={24} fontWeight="600" color={Colors.dark}>
                                            {num}
                                        </Text>
                                    </Box>
                                </Pressable>
                            ))}
                        </HStack>
                    ))}

                    {/* Row 4: Empty, 0, Backspace */}
                    <HStack space="md" justifyContent="center">
                        <Box flex={1} />
                        <Pressable flex={1} onPress={() => handleNumberPress('0')}>
                            <Box
                                height={72}
                                borderRadius={12}
                                backgroundColor={Colors.background}
                                borderWidth={1}
                                borderColor={Colors.lightGrey}
                                alignItems="center"
                                justifyContent="center"
                            >
                                <Text fontSize={24} fontWeight="600" color={Colors.dark}>
                                    0
                                </Text>
                            </Box>
                        </Pressable>
                        <Pressable flex={1} onPress={handleBackspace}>
                            <Box
                                height={72}
                                borderRadius={12}
                                backgroundColor={Colors.background}
                                borderWidth={1}
                                borderColor={Colors.lightGrey}
                                alignItems="center"
                                justifyContent="center"
                            >
                                <Ionicons name="backspace-outline" size={28} color={Colors.grey} />
                            </Box>
                        </Pressable>
                    </HStack>
                </VStack>
            </VStack>
        </VStack>
    );
};

export default P2PPIN;
