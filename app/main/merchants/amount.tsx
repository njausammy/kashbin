import React, { useState, useEffect, useRef } from 'react';
import { VStack, HStack, Text, Box, Pressable, Input, InputField } from '@gluestack-ui/themed';
import { Keyboard, TouchableWithoutFeedback, TextInput } from 'react-native';
import Button from '@/src/components/form/AnimatedButton';
import { router, useLocalSearchParams } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '@/src/constants/Colors';

const Amount = () => {
    const params = useLocalSearchParams<{
        merchantId: string;
        merchantName: string;
        merchantCategory: string;
        merchantLocation: string;
        merchantCode: string;
        isVerified: string;
    }>();

    const amountInputRef = useRef<TextInput>(null);
    const [amount, setAmount] = useState('');
    const [isValid, setIsValid] = useState(false);

    const currentBalance = 1234.56; // Mock balance

    useEffect(() => {
        const numAmount = parseFloat(amount);
        const valid = !isNaN(numAmount) && numAmount > 0 && numAmount <= currentBalance;
        setIsValid(valid);
    }, [amount]);

    const handleContinue = () => {
        router.push({
            pathname: '/main/merchants/confirm',
            params: {
                ...params,
                amount: amount
            }
        });
    };

    const setQuickAmount = (value: number) => {
        setAmount(value.toString());
    };

    const setSendMax = () => {
        setAmount(currentBalance.toString());
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
                            Enter Amount
                        </Text>
                    </HStack>
                    <Text fontSize={14} color="rgba(255, 255, 255, 0.9)">
                        Pay to {params.merchantName}
                    </Text>
                </VStack>
            </Box>

            <VStack flex={1} paddingHorizontal={24} marginTop={24} justifyContent="space-between">
                <VStack>
                    {/* Balance Display */}
                    <HStack justifyContent="space-between" alignItems="center" marginBottom={16}>
                        <Text fontSize={14} color={Colors.grey}>
                            Available Balance
                        </Text>
                        <HStack space="xs" alignItems="center">
                            <Text fontSize={16} fontWeight="600" color={Colors.dark}>
                                {currentBalance.toFixed(2)} USDT
                            </Text>
                            <Pressable onPress={setSendMax}>
                                <Text fontSize={14} fontWeight="600" color={Colors.primary.DEFAULT}>
                                    Send Max
                                </Text>
                            </Pressable>
                        </HStack>
                    </HStack>

                    {/* Amount Input */}
                    <VStack space="xs" marginBottom={16}>
                        <Text fontSize={14} color={Colors.grey}>
                            Amount (USDT)
                        </Text>
                        <Input
                            borderColor={amount ? "#1E40AF" : "#B8B8B8"}
                            borderWidth={2}
                            borderRadius={12}
                            height={72}
                        >
                            <InputField
                                ref={amountInputRef}
                                placeholder="0.00"
                                value={amount}
                                onChangeText={setAmount}
                                keyboardType="decimal-pad"
                                fontSize={32}
                                fontWeight="700"
                                textAlign="center"
                                color={Colors.dark}
                                returnKeyType="done"
                                onSubmitEditing={() => Keyboard.dismiss()}
                            />
                        </Input>
                    </VStack>

                    {/* Quick Amount Buttons */}
                    <VStack marginTop={16} marginBottom={24}>
                        <Text fontSize={14} color={Colors.grey} marginBottom={12}>
                            Quick amounts
                        </Text>
                        <HStack space="sm">
                            {[10, 50, 100, 500].map((value) => (
                                <Pressable key={value} flex={1} onPress={() => setQuickAmount(value)}>
                                    <Box
                                        backgroundColor={amount === value.toString() ? '#1E40AF15' : '#F9FAFB'}
                                        borderRadius={12}
                                        padding={12}
                                        borderWidth={1}
                                        borderColor={amount === value.toString() ? '#1E40AF' : '#E5E7EB'}
                                        alignItems="center"
                                    >
                                        <Text
                                            fontSize={14}
                                            fontWeight="600"
                                            color={amount === value.toString() ? '#1E40AF' : '#1C1C1E'}
                                        >
                                            ${value}
                                        </Text>
                                    </Box>
                                </Pressable>
                            ))}
                        </HStack>
                    </VStack>

                    {/* Fee Display */}
                    <Box
                        backgroundColor="#F9FAFB"
                        borderRadius={12}
                        padding={16}
                        borderWidth={1}
                        borderColor={Colors.lightGrey}
                    >
                        <HStack justifyContent="space-between">
                            <Text fontSize={14} color={Colors.grey}>Transaction Fee</Text>
                            <Text fontSize={15} fontWeight="600" color={Colors.success}>
                                FREE
                            </Text>
                        </HStack>
                    </Box>
                </VStack>

                {/* Continue Button */}
                <Button
                    backgroundColor={isValid ? "#1E40AF" : "#B8B8B8"}
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

export default Amount;
