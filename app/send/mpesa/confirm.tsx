import React from 'react';
import { ScrollView } from 'react-native';
import { VStack, HStack, Text, Box, Pressable } from '@gluestack-ui/themed';
import Button from '@/src/components/form/AnimatedButton';
import { router, useLocalSearchParams } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { getProviderById } from '@/src/data/mock-liquidity-providers';
import { Colors } from '@/src/constants/Colors';

const Confirm = () => {
    const params = useLocalSearchParams<{
        mpesaNumber: string;
        usdtAmount: string;
        kesAmount: string;
        rate: string;
        fee: string;
        providerId: string;
    }>();

    const provider = getProviderById(params.providerId);

    if (!provider) {
        return (
            <VStack backgroundColor="$white" flex={1} padding={24}>
                <Text>Provider not found</Text>
            </VStack>
        );
    }

    const handleContinue = () => {
        router.push({
            pathname: '/send/mpesa/pin',
            params: params
        });
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
                            Confirm Transaction
                        </Text>
                    </HStack>
                    <Text fontSize={14} color="rgba(255, 255, 255, 0.9)">
                        Review details before sending
                    </Text>
                </VStack>
            </Box>

            <ScrollView>
                <VStack paddingHorizontal={24} paddingTop={32} paddingBottom={140}>
                    {/* Amount Display - Large */}
                    <VStack alignItems="center" marginBottom={32}>
                        <Text fontSize={16} color="#8E8E93" marginBottom={8}>
                            You're Sending
                        </Text>
                        <Text fontSize={48} fontWeight="700" color="#1C1C1E">
                            {parseFloat(params.usdtAmount).toFixed(2)}
                        </Text>
                        <Text fontSize={20} fontWeight="600" color="#1C1C1E" marginTop={4}>
                            USDT
                        </Text>
                    </VStack>

                    {/* Transaction Details Card */}
                    <Box
                        backgroundColor="white"
                        borderRadius={16}
                        borderWidth={1}
                        borderColor="#E5E7EB"
                        overflow="hidden"
                        marginBottom={24}
                    >
                        {/* M-Pesa Number */}
                        <HStack
                            justifyContent="space-between"
                            padding={16}
                            borderBottomWidth={1}
                            borderBottomColor="#F0F0F0"
                        >
                            <Text fontSize={14} color="#8E8E93">To M-Pesa</Text>
                            <Text fontSize={15} fontWeight="600" color="#1C1C1E">
                                +254{params.mpesaNumber}
                            </Text>
                        </HStack>

                        {/* Provider */}
                        <HStack
                            justifyContent="space-between"
                            padding={16}
                            borderBottomWidth={1}
                            borderBottomColor="#F0F0F0"
                        >
                            <Text fontSize={14} color="#8E8E93">Via Provider</Text>
                            <HStack space="xs" alignItems="center">
                                <Text fontSize={15} fontWeight="600" color="#1C1C1E">
                                    {provider.name}
                                </Text>
                                {provider.isVerified && (
                                    <Ionicons name="checkmark-circle" size={16} color={Colors.primary.DEFAULT} />
                                )}
                            </HStack>
                        </HStack>

                        {/* USDT Amount */}
                        <HStack
                            justifyContent="space-between"
                            padding={16}
                            borderBottomWidth={1}
                            borderBottomColor="#F0F0F0"
                        >
                            <Text fontSize={14} color="#8E8E93">Amount</Text>
                            <Text fontSize={15} fontWeight="600" color="#1C1C1E">
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
                            <Text fontSize={14} color="#8E8E93">Exchange Rate</Text>
                            <Text fontSize={15} fontWeight="600" color="#1C1C1E">
                                1 USDT = KES {parseFloat(params.rate).toFixed(2)}
                            </Text>
                        </HStack>

                        {/* Fee */}
                        <HStack
                            justifyContent="space-between"
                            padding={16}
                            borderBottomWidth={1}
                            borderBottomColor="#F0F0F0"
                        >
                            <Text fontSize={14} color="#8E8E93">Fee (1.0%)</Text>
                            <Text fontSize={15} fontWeight="600" color="#DC2626">
                                KES {parseFloat(params.fee).toFixed(2)}
                            </Text>
                        </HStack>

                        {/* Total Recipient Gets */}
                        <HStack
                            justifyContent="space-between"
                            padding={16}
                            backgroundColor="#F9FAFB"
                        >
                            <Text fontSize={15} fontWeight="600" color="#1C1C1E">Recipient Gets</Text>
                            <Text fontSize={17} fontWeight="700" color={Colors.primary.DEFAULT}>
                                KES {parseFloat(params.kesAmount).toLocaleString('en-KE', { minimumFractionDigits: 2 })}
                            </Text>
                        </HStack>
                    </Box>

                    {/* Processing Time Info */}
                    <Box
                        backgroundColor="#DBEAFE"
                        borderRadius={12}
                        padding={16}
                        marginBottom={16}
                        borderWidth={1}
                        borderColor="#3B82F6"
                    >
                        <HStack space="sm" alignItems="flex-start">
                            <Ionicons name="time-outline" size={20} color="#3B82F6" />
                            <VStack flex={1}>
                                <Text fontSize={14} fontWeight="600" color="#1E3A8A" marginBottom={4}>
                                    Processing Time
                                </Text>
                                <Text fontSize={13} color="#1E3A8A">
                                    Typically takes {provider.processingTime}. The recipient will receive an M-Pesa confirmation message.
                                </Text>
                            </VStack>
                        </HStack>
                    </Box>

                    {/* Warning Box */}
                    <Box
                        backgroundColor="#FEF3C7"
                        borderRadius={12}
                        padding={16}
                        borderWidth={1}
                        borderColor="#F59E0B"
                    >
                        <HStack space="sm" alignItems="flex-start">
                            <Ionicons name="warning" size={20} color="#F59E0B" />
                            <VStack flex={1}>
                                <Text fontSize={14} fontWeight="600" color="#92400E" marginBottom={4}>
                                    Important
                                </Text>
                                <Text fontSize={13} color="#92400E">
                                    Please verify the M-Pesa number is correct. This transaction cannot be reversed once completed.
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
                    backgroundColor={Colors.primary.DEFAULT}
                    borderRadius={50}
                    height={56}
                    width="$full"
                    onPress={handleContinue}
                >
                    <HStack space="sm" alignItems="center">
                        <Ionicons name="lock-closed" size={20} color="white" />
                        <Text color="$white" fontSize={16} fontWeight={600}>
                            Confirm with PIN
                        </Text>
                    </HStack>
                </Button>
            </Box>
        </VStack>
    );
};

export default Confirm;
