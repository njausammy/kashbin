import React, { useState, useEffect, useRef } from 'react';
import { VStack, HStack, Text, Box, Pressable, Input, InputField } from '@gluestack-ui/themed';
import { Keyboard, TouchableWithoutFeedback, TextInput } from 'react-native';
import Button from '@/src/components/form/AnimatedButton';
import { router, useLocalSearchParams } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { useCurrentUser } from '@/src/hooks/useCurrentUser';
import { Colors } from '@/src/constants/Colors';

const P2PAmount = () => {
    const { user } = useCurrentUser();
    const params = useLocalSearchParams<{
        recipientId: string;
        recipientPhone: string;
        recipientName: string;
        isVerified: string;
    }>();

    const amountInputRef = useRef<TextInput>(null);
    const [amount, setAmount] = useState('');
    const [isValid, setIsValid] = useState(false);

    // Mock current balance
    const currentBalance = 1234.56;

    useEffect(() => {
        const numAmount = parseFloat(amount);
        const valid = !isNaN(numAmount) && numAmount > 0 && numAmount <= currentBalance;
        setIsValid(valid);
    }, [amount]);

    const handleContinue = () => {
        router.push({
            pathname: '/send/p2p/confirm',
            params: {
                ...params,
                amount,
            }
        });
    };

    const setQuickAmount = (value: number) => {
        setAmount(value.toString());
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
                    <Text fontSize={14} color="rgba(255, 255, 255, 0.8)">
                        How much USDT do you want to send?
                    </Text>
                </VStack>
            </Box>

            <VStack flex={1} paddingHorizontal={24} marginTop={24} justifyContent="space-between">
                <VStack>
                    {/* Recipient Info */}
                    <Box
                        backgroundColor={Colors.background}
                        borderRadius={12}
                        padding={16}
                        borderWidth={1}
                        borderColor={Colors.lightGrey}
                        marginBottom={24}
                    >
                        <HStack alignItems="center" space="md">
                            <Box
                                width={48}
                                height={48}
                                borderRadius={24}
                                backgroundColor={Colors.secondary.DEFAULT}
                                alignItems="center"
                                justifyContent="center"
                            >
                                <Text fontSize={18} fontWeight="700" color="white">
                                    {params.recipientName?.substring(0, 2).toUpperCase()}
                                </Text>
                            </Box>
                            <VStack flex={1}>
                                <Text fontSize={15} fontWeight="600" color={Colors.dark}>
                                    Sending to {params.recipientName}
                                </Text>
                                <Text fontSize={13} color={Colors.grey}>
                                    +254{params.recipientPhone}
                                </Text>
                            </VStack>
                        </HStack>
                    </Box>

                    {/* Amount Input */}
                    <VStack space="xs">
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
                        <HStack justifyContent="space-between" marginTop={8}>
                            <Text fontSize={13} color={Colors.grey}>
                                Available: {currentBalance.toFixed(2)} USDT
                            </Text>
                            <Pressable onPress={() => setAmount(currentBalance.toString())}>
                                <Text fontSize={13} color={Colors.primary.DEFAULT} fontWeight="600">
                                    Send Max
                                </Text>
                            </Pressable>
                        </HStack>
                    </VStack>

                    {/* Quick Amount Buttons */}
                    <VStack marginTop={24}>
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
                                            fontSize={16}
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

                    {/* Fee Info */}
                    <Box
                        backgroundColor="#22C55E15"
                        borderRadius={12}
                        padding={16}
                        marginTop={24}
                    >
                        <HStack space="sm" alignItems="flex-start">
                            <Ionicons name="checkmark-circle" size={20} color={Colors.success} />
                            <VStack flex={1}>
                                <Text fontSize={14} color={Colors.dark} fontWeight="500">
                                    Zero Fees!
                                </Text>
                                <Text fontSize={13} color={Colors.grey} marginTop={4}>
                                    Sending to Kash Chain users is instant and completely free.
                                </Text>
                            </VStack>
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

export default P2PAmount;
