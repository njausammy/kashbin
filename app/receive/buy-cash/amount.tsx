import React, { useState, useRef } from 'react';
import { VStack, HStack, Text, Box, Pressable, Input, InputField } from '@gluestack-ui/themed';
import { Keyboard, TouchableWithoutFeedback, TextInput } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { router, useLocalSearchParams } from 'expo-router';
import Button from '@/src/components/form/AnimatedButton';
import { calculateBuyUSDT } from '@/src/utils/exchange-rates';
import { Colors } from '@/src/constants/Colors';

const Amount = () => {
    const params = useLocalSearchParams<{
        agentId: string;
        agentCode: string;
        agentName: string;
        agentFee: string;
    }>();

    const amountInputRef = useRef<TextInput>(null);
    const [usdtAmount, setUsdtAmount] = useState('');

    const conversion = usdtAmount ? calculateBuyUSDT(parseFloat(usdtAmount) * parseFloat(params.agentFee || '134.50') / 100 + parseFloat(usdtAmount) * parseFloat(params.agentFee || '134.50') / 100 * 0.015) : null;

    const handleContinue = () => {
        if (!usdtAmount) return;

        const actualConversion = calculateBuyUSDT(parseFloat(usdtAmount) * 134.50);

        router.push({
            pathname: '/receive/buy-cash/confirm',
            params: {
                agentId: params.agentId,
                agentCode: params.agentCode,
                agentName: params.agentName,
                usdtAmount: usdtAmount,
                kesAmount: actualConversion.fromAmount.toFixed(2),
                rate: actualConversion.rate.toFixed(2),
                fee: actualConversion.fee.toFixed(2)
            }
        });
    };

    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <VStack backgroundColor="$white" flex={1}>
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
                        How much USDT to buy?
                    </Text>
                </VStack>
            </Box>

            <VStack flex={1} paddingHorizontal={24} paddingTop={32} justifyContent="space-between">
                <VStack>
                    <Box backgroundColor="rgba(245, 158, 11, 0.08)" borderRadius={12} padding={16} marginBottom={32}>
                        <HStack alignItems="center" space="sm">
                            <Ionicons name="business" size={20} color={Colors.secondary.DEFAULT} />
                            <VStack flex={1}>
                                <Text fontSize={14} fontWeight="600" color="#065F46">
                                    Buying from
                                </Text>
                                <Text fontSize={13} color="#065F46">
                                    {params.agentName} • Code: {params.agentCode}
                                </Text>
                            </VStack>
                        </HStack>
                    </Box>

                    <VStack space="sm" marginBottom={24}>
                        <Text fontSize={16} fontWeight="600" color={Colors.dark}>
                            USDT Amount
                        </Text>
                        <Input borderColor={Colors.secondary.DEFAULT} borderWidth={2} borderRadius={12} height={64}>
                            <InputField
                                ref={amountInputRef}
                                placeholder="0.00"
                                value={usdtAmount}
                                onChangeText={setUsdtAmount}
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

                    {usdtAmount && parseFloat(usdtAmount) > 0 && (
                        <Box backgroundColor="white" borderRadius={16} borderWidth={1} borderColor={Colors.lightGrey} overflow="hidden">
                            <HStack justifyContent="space-between" padding={16} borderBottomWidth={1} borderBottomColor="#F0F0F0">
                                <Text fontSize={14} color={Colors.grey}>Exchange Rate</Text>
                                <Text fontSize={14} fontWeight="600" color={Colors.dark}>
                                    1 USDT = KES 134.50
                                </Text>
                            </HStack>

                            <HStack justifyContent="space-between" padding={16} borderBottomWidth={1} borderBottomColor="#F0F0F0">
                                <Text fontSize={14} color={Colors.grey}>USDT Amount</Text>
                                <Text fontSize={14} fontWeight="600" color={Colors.dark}>
                                    {parseFloat(usdtAmount).toFixed(2)} USDT
                                </Text>
                            </HStack>

                            <HStack justifyContent="space-between" padding={16} borderBottomWidth={1} borderBottomColor="#F0F0F0">
                                <Text fontSize={14} color={Colors.grey}>
                                    Agent Fee ({params.agentFee}%)
                                </Text>
                                <Text fontSize={14} fontWeight="600" color={Colors.error}>
                                    +KES {(parseFloat(usdtAmount) * 134.50 * (parseFloat(params.agentFee) / 100)).toFixed(2)}
                                </Text>
                            </HStack>

                            <HStack justifyContent="space-between" padding={16} backgroundColor="rgba(245, 158, 11, 0.08)">
                                <Text fontSize={15} fontWeight="600" color={Colors.dark}>
                                    Cash to Bring
                                </Text>
                                <Text fontSize={18} fontWeight="700" color={Colors.secondary.DEFAULT}>
                                    KES {(parseFloat(usdtAmount) * 134.50 * (1 + parseFloat(params.agentFee) / 100)).toLocaleString('en-KE', { minimumFractionDigits: 2 })}
                                </Text>
                            </HStack>
                        </Box>
                    )}

                    <Box backgroundColor="#DBEAFE" borderRadius={12} padding={16} borderWidth={1} borderColor="#3B82F6" marginTop={24}>
                        <HStack space="sm" alignItems="flex-start">
                            <Ionicons name="information-circle" size={20} color="#3B82F6" />
                            <Text fontSize={13} color="#1E3A8A" flex={1}>
                                You'll receive a deposit code after confirming. Bring the exact cash amount and code to the agent.
                            </Text>
                        </HStack>
                    </Box>
                </VStack>

                <Box paddingBottom={32}>
                    <Button
                        backgroundColor={usdtAmount && parseFloat(usdtAmount) > 0 ? '#1E40AF' : '#E5E7EB'}
                        borderRadius={50}
                        height={56}
                        width="$full"
                        onPress={handleContinue}
                        disabled={!usdtAmount || parseFloat(usdtAmount) <= 0}
                    >
                        <Text color={usdtAmount && parseFloat(usdtAmount) > 0 ? '$white' : '#8E8E93'} fontSize={16} fontWeight={600}>
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
