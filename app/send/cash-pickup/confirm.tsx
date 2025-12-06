import React from 'react';
import { ScrollView } from 'react-native';
import { VStack, HStack, Text, Box, Pressable } from '@gluestack-ui/themed';
import { Ionicons } from '@expo/vector-icons';
import { router, useLocalSearchParams } from 'expo-router';
import Button from '@/src/components/form/AnimatedButton';
import { Colors } from '@/src/constants/Colors';

const Confirm = () => {
    const params = useLocalSearchParams<{
        agentId: string;
        agentCode: string;
        agentName: string;
        usdtAmount: string;
        kesAmount: string;
        rate: string;
        fee: string;
    }>();

    const handleConfirm = () => {
        router.push({
            pathname: '/send/cash-pickup/pin',
            params: params
        });
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
                            Confirm Withdrawal
                        </Text>
                    </HStack>
                    <Text fontSize={14} color="rgba(255, 255, 255, 0.9)">
                        Review withdrawal details
                    </Text>
                </VStack>
            </Box>

            <ScrollView>
                <VStack paddingHorizontal={24} paddingTop={32} paddingBottom={180}>
                    {/* Amount Display */}
                    <VStack alignItems="center" marginBottom={32}>
                        <Text fontSize={16} color={Colors.grey} marginBottom={8}>
                            You'll Receive (Cash)
                        </Text>
                        <Text fontSize={48} fontWeight="700" color={Colors.success}>
                            {parseFloat(params.kesAmount).toLocaleString('en-KE', { minimumFractionDigits: 2 })}
                        </Text>
                        <Text fontSize={20} fontWeight="600" color={Colors.success} marginTop={4}>
                            KES
                        </Text>
                    </VStack>

                    {/* Transaction Details */}
                    <Box
                        backgroundColor="white"
                        borderRadius={16}
                        borderWidth={1}
                        borderColor={Colors.lightGrey}
                        overflow="hidden"
                        marginBottom={24}
                    >
                        {/* Agent */}
                        <HStack
                            justifyContent="space-between"
                            padding={16}
                            borderBottomWidth={1}
                            borderBottomColor="#F0F0F0"
                        >
                            <Text fontSize={14} color={Colors.grey}>Pickup Agent</Text>
                            <VStack alignItems="flex-end">
                                <Text fontSize={14} fontWeight="600" color={Colors.dark}>
                                    {params.agentName}
                                </Text>
                                <Text fontSize={13} color={Colors.grey}>
                                    Code: {params.agentCode}
                                </Text>
                            </VStack>
                        </HStack>

                        {/* USDT Amount */}
                        <HStack
                            justifyContent="space-between"
                            padding={16}
                            borderBottomWidth={1}
                            borderBottomColor="#F0F0F0"
                        >
                            <Text fontSize={14} color={Colors.grey}>USDT Amount</Text>
                            <Text fontSize={15} fontWeight="600" color={Colors.dark}>
                                {parseFloat(params.usdtAmount).toFixed(2)} USDT
                            </Text>
                        </HStack>

                        {/* Exchange Rate */}
                        <HStack
                            justifyContent="space-between"
                            padding={16}
                            borderBottomWidth={1}
                            borderBottomColor="#F0F0F0"
                        >
                            <Text fontSize={14} color={Colors.grey}>Exchange Rate</Text>
                            <Text fontSize={14} fontWeight="600" color={Colors.dark}>
                                1 USDT = KES {parseFloat(params.rate).toFixed(2)}
                            </Text>
                        </HStack>

                        {/* Agent Fee */}
                        <HStack
                            justifyContent="space-between"
                            padding={16}
                            borderBottomWidth={1}
                            borderBottomColor="#F0F0F0"
                        >
                            <Text fontSize={14} color={Colors.grey}>Agent Fee (1%)</Text>
                            <Text fontSize={15} fontWeight="600" color={Colors.error}>
                                KES {parseFloat(params.fee).toFixed(2)}
                            </Text>
                        </HStack>

                        {/* Total Cash */}
                        <HStack
                            justifyContent="space-between"
                            padding={16}
                            backgroundColor="#22C55E15"
                        >
                            <Text fontSize={15} fontWeight="600" color={Colors.dark}>
                                Cash to Collect
                            </Text>
                            <Text fontSize={17} fontWeight="700" color={Colors.success}>
                                KES {parseFloat(params.kesAmount).toLocaleString('en-KE', { minimumFractionDigits: 2 })}
                            </Text>
                        </HStack>
                    </Box>

                    {/* Info Card */}
                    <Box
                        backgroundColor="#FEF3C7"
                        borderRadius={12}
                        padding={16}
                        borderWidth={1}
                        borderColor={Colors.secondary.DEFAULT}
                    >
                        <HStack space="sm" alignItems="flex-start">
                            <Ionicons name="alert-circle" size={20} color={Colors.secondary.DEFAULT} />
                            <VStack flex={1}>
                                <Text fontSize={14} fontWeight="600" color="#92400E" marginBottom={4}>
                                    Important
                                </Text>
                                <Text fontSize={13} color="#92400E">
                                    • Bring a valid ID to the agent{'\n'}
                                    • Pickup code is valid for 24 hours{'\n'}
                                    • USDT will be deducted from your wallet immediately
                                </Text>
                            </VStack>
                        </HStack>
                    </Box>
                </VStack>
            </ScrollView>

            {/* Fixed Bottom Button */}
            <Box
                position="absolute"
                bottom={0}
                left={0}
                right={0}
                backgroundColor="white"
                paddingHorizontal={24}
                paddingVertical={16}
                borderTopWidth={1}
                borderTopColor="#E5E7EB"
                style={{
                    shadowColor: '#000',
                    shadowOffset: { width: 0, height: -2 },
                    shadowOpacity: 0.1,
                    shadowRadius: 4,
                    elevation: 4,
                }}
            >
                <Button
                    backgroundColor={Colors.secondary.DEFAULT}
                    borderRadius={50}
                    height={56}
                    width="$full"
                    onPress={handleConfirm}
                >
                    <Text color="$white" fontSize={16} fontWeight={600}>
                        Confirm Withdrawal
                    </Text>
                </Button>
            </Box>
        </VStack>
    );
};

export default Confirm;
