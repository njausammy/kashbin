import React, { useState, useEffect, useRef } from 'react';
import { VStack, HStack, Text, Box, Pressable, Input, InputField } from '@gluestack-ui/themed';
import { Keyboard, TouchableWithoutFeedback, TextInput } from 'react-native';
import Button from '@/src/components/form/AnimatedButton';
import { router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { calculateBuyUSDT, getCurrentRates, formatCurrency, getTimeSinceUpdate } from '@/src/utils/exchange-rates';
import { Colors } from '@/src/constants/Colors';

const BuyMPesaAmount = () => {
    const amountInputRef = useRef<TextInput>(null);
    const [kesAmount, setKesAmount] = useState('');
    const [isValid, setIsValid] = useState(false);
    const [rates, setRates] = useState(getCurrentRates());

    // Refresh rates every 30 seconds
    useEffect(() => {
        const interval = setInterval(() => {
            setRates(getCurrentRates());
        }, 30000);

        return () => clearInterval(interval);
    }, []);

    useEffect(() => {
        const numAmount = parseFloat(kesAmount);
        const valid = !isNaN(numAmount) && numAmount >= 100; // Minimum 100 KES
        setIsValid(valid);
    }, [kesAmount]);

    const conversion = kesAmount ? calculateBuyUSDT(parseFloat(kesAmount)) : null;

    const handleContinue = () => {
        if (conversion) {
            router.push({
                pathname: '/receive/buy-mpesa/provider-select',
                params: {
                    kesAmount: kesAmount,
                    usdtAmount: conversion.toAmount.toFixed(2),
                    rate: conversion.rate.toString(),
                    fee: conversion.fee.toFixed(2),
                }
            });
        }
    };

    const setQuickAmount = (value: number) => {
        setKesAmount(value.toString());
    };

    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <VStack backgroundColor="$white" paddingBottom={50} flex={1}>
            {/* Header */}
            <Box backgroundColor={Colors.primary.DEFAULT} paddingTop={50} paddingBottom={24}>
                <VStack paddingHorizontal={20}>
                    <HStack alignItems="center" marginBottom={16}>
                        <Pressable onPress={() => router.back()} marginRight={16}>
                            <Ionicons name="arrow-back" size={24} color="white" />
                        </Pressable>
                        <Text fontSize={24} fontWeight="700" color="white">
                            Buy USDT
                        </Text>
                    </HStack>
                    <Text fontSize={14} color="rgba(255, 255, 255, 0.9)">
                        Enter amount in KES to buy USDT
                    </Text>
                </VStack>
            </Box>

            <VStack flex={1} paddingHorizontal={24} marginTop={24} justifyContent="space-between">
                <VStack>
                    {/* Exchange Rate Display */}
                    <Box
                        backgroundColor="rgba(30, 64, 175, 0.08)"
                        borderRadius={12}
                        padding={16}
                        marginBottom={24}
                    >
                        <HStack justifyContent="space-between" alignItems="center" marginBottom={8}>
                            <Text fontSize={14} color="#1C1C1E" fontWeight="600">
                                Current Rate
                            </Text>
                            <HStack space="xs" alignItems="center">
                                <Ionicons name="time-outline" size={14} color="#8E8E93" />
                                <Text fontSize={12} color="#8E8E93">
                                    {getTimeSinceUpdate(rates.lastUpdated)}
                                </Text>
                            </HStack>
                        </HStack>
                        <Text fontSize={24} fontWeight="700" color={Colors.primary.DEFAULT}>
                            1 USDT = KES {rates.buyRate.toFixed(2)}
                        </Text>
                    </Box>

                    {/* Amount Input - KES */}
                    <VStack space="xs" marginBottom={16}>
                        <Text fontSize={14} color="#8E8E93">
                            Amount (KES)
                        </Text>
                        <Input
                            borderColor={kesAmount ? "Colors.primary.DEFAULT" : "#B8B8B8"}
                            borderWidth={2}
                            borderRadius={12}
                            height={72}
                        >
                            <InputField
                                ref={amountInputRef}
                                placeholder="0.00"
                                value={kesAmount}
                                onChangeText={setKesAmount}
                                keyboardType="decimal-pad"
                                fontSize={32}
                                fontWeight="700"
                                textAlign="center"
                                color="#1C1C1E"
                                returnKeyType="done"
                                onSubmitEditing={() => Keyboard.dismiss()}
                            />
                        </Input>
                        <Text fontSize={13} color="#8E8E93">
                            Minimum: KES 100.00
                        </Text>
                    </VStack>

                    {/* Quick Amount Buttons */}
                    <VStack marginTop={16} marginBottom={24}>
                        <Text fontSize={14} color="#8E8E93" marginBottom={12}>
                            Quick amounts
                        </Text>
                        <HStack space="sm">
                            {[500, 1000, 2000, 5000].map((value) => (
                                <Pressable key={value} flex={1} onPress={() => setQuickAmount(value)}>
                                    <Box
                                        backgroundColor={kesAmount === value.toString() ? 'Colors.primary.DEFAULT15' : '#F9FAFB'}
                                        borderRadius={12}
                                        padding={12}
                                        borderWidth={1}
                                        borderColor={kesAmount === value.toString() ? 'Colors.primary.DEFAULT' : '#E5E7EB'}
                                        alignItems="center"
                                    >
                                        <Text
                                            fontSize={14}
                                            fontWeight="600"
                                            color={kesAmount === value.toString() ? 'Colors.primary.DEFAULT' : '#1C1C1E'}
                                        >
                                            {value}
                                        </Text>
                                    </Box>
                                </Pressable>
                            ))}
                        </HStack>
                    </VStack>

                    {/* Conversion Preview */}
                    {conversion && (
                        <Box
                            backgroundColor="white"
                            borderRadius={16}
                            borderWidth={1}
                            borderColor="#E5E7EB"
                            overflow="hidden"
                        >
                            <HStack justifyContent="space-between" padding={16} borderBottomWidth={1} borderBottomColor="#F0F0F0">
                                <Text fontSize={14} color="#8E8E93">You Pay</Text>
                                <Text fontSize={15} fontWeight="600" color="#1C1C1E">
                                    KES {conversion.fromAmount.toLocaleString('en-KE', { minimumFractionDigits: 2 })}
                                </Text>
                            </HStack>

                            <HStack justifyContent="space-between" padding={16} borderBottomWidth={1} borderBottomColor="#F0F0F0">
                                <Text fontSize={14} color="#8E8E93">Fee ({conversion.feePercentage}%)</Text>
                                <Text fontSize={15} fontWeight="600" color="#DC2626">
                                    -{conversion.fee.toFixed(2)} USDT
                                </Text>
                            </HStack>

                            <HStack justifyContent="space-between" padding={16} backgroundColor="#F9FAFB">
                                <Text fontSize={15} fontWeight="600" color="#1C1C1E">You Receive</Text>
                                <Text fontSize={17} fontWeight="700" color={Colors.primary.DEFAULT}>
                                    {conversion.toAmount.toFixed(2)} USDT
                                </Text>
                            </HStack>
                        </Box>
                    )}
                </VStack>

                {/* Continue Button */}
                <Button
                    backgroundColor={isValid ? "Colors.primary.DEFAULT" : "#B8B8B8"}
                    borderRadius={50}
                    height={56}
                    width="$full"
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
        </TouchableWithoutFeedback>
    );
};

export default BuyMPesaAmount;
