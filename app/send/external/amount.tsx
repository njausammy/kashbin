import React, { useState, useRef } from 'react';
import { VStack, HStack, Text, Box, Pressable, Input, InputField } from '@gluestack-ui/themed';
import { Keyboard, TouchableWithoutFeedback, TextInput } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { router, useLocalSearchParams } from 'expo-router';
import Button from '@/src/components/form/AnimatedButton';
import { Colors } from '@/src/constants/Colors';

const Amount = () => {
    const params = useLocalSearchParams<{
        address: string;
        exchange: string;
    }>();

    const amountInputRef = useRef<TextInput>(null);
    const [amount, setAmount] = useState('');

    const exchangeNames: Record<string, string> = {
        binance: 'Binance',
        okx: 'OKX',
        bybit: 'Bybit',
        metamask: 'MetaMask',
        trust: 'Trust Wallet',
        manual: 'External Wallet',
    };

    const exchangeName = exchangeNames[params.exchange] || 'External Wallet';
    const shortAddress = `${params.address.substring(0, 6)}...${params.address.substring(params.address.length - 4)}`;

    // Mock gas fee
    const gasFee = 0.005; // ~$0.01 on Polygon
    const totalAmount = amount ? parseFloat(amount) + gasFee : 0;

    const handleContinue = () => {
        router.push({
            pathname: '/send/external/confirm',
            params: {
                ...params,
                amount: amount,
                gasFee: gasFee.toString(),
                total: totalAmount.toString(),
            },
        });
    };

    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <VStack backgroundColor="$white" flex={1}>
            {/* Header */}
            <Box backgroundColor={Colors.secondary.DEFAULT} paddingTop={50} paddingBottom={24}>
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
                        How much USDT to send?
                    </Text>
                </VStack>
            </Box>

            {/* Content */}
            <VStack flex={1} paddingHorizontal={24} paddingTop={32} justifyContent="space-between">
                <VStack>
                    {/* Destination Info */}
                    <Box
                        backgroundColor="#F59E0B15"
                        borderRadius={12}
                        padding={16}
                        marginBottom={32}
                    >
                        <VStack space="xs">
                            <Text fontSize={14} fontWeight="600" color="#92400E">
                                Sending to {exchangeName}
                            </Text>
                            <Text fontSize={13} color="#92400E" fontFamily="monospace">
                                {shortAddress}
                            </Text>
                        </VStack>
                    </Box>

                    {/* Amount Input */}
                    <VStack space="sm" marginBottom={24}>
                        <Text fontSize={16} fontWeight="600" color={Colors.dark}>
                            USDT Amount
                        </Text>
                        <Input
                            borderColor={Colors.secondary.DEFAULT}
                            borderWidth={2}
                            borderRadius={12}
                            height={64}
                        >
                            <InputField
                                ref={amountInputRef}
                                placeholder="0.00"
                                value={amount}
                                onChangeText={setAmount}
                                keyboardType="decimal-pad"
                                fontSize={28}
                                fontWeight="700"
                                returnKeyType="done"
                                onSubmitEditing={() => Keyboard.dismiss()}
                            />
                            <Box paddingHorizontal={16}>
                                <Text fontSize={16} fontWeight="600" color={Colors.grey}>
                                    USDT
                                </Text>
                            </Box>
                        </Input>
                    </VStack>

                    {/* Fee Breakdown */}
                    {amount && parseFloat(amount) > 0 && (
                        <Box
                            backgroundColor="white"
                            borderRadius={16}
                            borderWidth={1}
                            borderColor={Colors.lightGrey}
                            overflow="hidden"
                        >
                            {/* Amount */}
                            <HStack
                                justifyContent="space-between"
                                padding={16}
                                borderBottomWidth={1}
                                borderBottomColor="#F0F0F0"
                            >
                                <Text fontSize={14} color={Colors.grey}>Amount</Text>
                                <Text fontSize={15} fontWeight="600" color={Colors.dark}>
                                    {parseFloat(amount).toFixed(2)} USDT
                                </Text>
                            </HStack>

                            {/* Network Fee */}
                            <HStack
                                justifyContent="space-between"
                                padding={16}
                                borderBottomWidth={1}
                                borderBottomColor="#F0F0F0"
                            >
                                <VStack>
                                    <Text fontSize={14} color={Colors.grey}>Network Fee</Text>
                                    <Text fontSize={11} color={Colors.grey}>Polygon gas fee</Text>
                                </VStack>
                                <Text fontSize={14} fontWeight="600" color={Colors.error}>
                                    ~{gasFee.toFixed(3)} USDT
                                </Text>
                            </HStack>

                            {/* Total */}
                            <HStack
                                justifyContent="space-between"
                                padding={16}
                                backgroundColor="#F59E0B15"
                            >
                                <Text fontSize={15} fontWeight="600" color={Colors.dark}>
                                    Total Amount
                                </Text>
                                <Text fontSize={18} fontWeight="700" color={Colors.secondary.DEFAULT}>
                                    {totalAmount.toFixed(3)} USDT
                                </Text>
                            </HStack>
                        </Box>
                    )}

                    {/* Info */}
                    <Box
                        backgroundColor="#DBEAFE"
                        borderRadius={12}
                        padding={16}
                        borderWidth={1}
                        borderColor="#3B82F6"
                        marginTop={24}
                    >
                        <HStack space="sm" alignItems="flex-start">
                            <Ionicons name="information-circle" size={20} color="#3B82F6" />
                            <VStack flex={1}>
                                <Text fontSize={14} fontWeight="600" color="#1E3A8A" marginBottom={4}>
                                    About Network Fees
                                </Text>
                                <Text fontSize={13} color="#1E3A8A">
                                    Polygon network fees are very low (usually less than $0.01). The transaction typically confirms in 10-30 seconds.
                                </Text>
                            </VStack>
                        </HStack>
                    </Box>
                </VStack>

                {/* Continue Button */}
                <Box paddingBottom={32}>
                    <Button
                        backgroundColor={amount && parseFloat(amount) > 0 ? '#F59E0B' : '#E5E7EB'}
                        borderRadius={50}
                        height={56}
                        width="$full"
                        onPress={handleContinue}
                        disabled={!amount || parseFloat(amount) <= 0}
                    >
                        <Text
                            color={amount && parseFloat(amount) > 0 ? '$white' : '#8E8E93'}
                            fontSize={16}
                            fontWeight={600}
                        >
                            Continue
                        </Text>
                    </Button>
                </Box>
            </VStack>
        </VStack>
        </TouchableWithoutFeedback>
    );
};

export default Amount;
