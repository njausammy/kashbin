import React from 'react';
import { ScrollView } from 'react-native';
import { VStack, HStack, Text, Box, Pressable } from '@gluestack-ui/themed';
import { Ionicons } from '@expo/vector-icons';
import { router, useLocalSearchParams } from 'expo-router';
import Button from '@/src/components/form/AnimatedButton';
import { Colors } from '@/src/constants/Colors';

const Confirm = () => {
    const params = useLocalSearchParams<{
        address: string;
        exchange: string;
        amount: string;
        gasFee: string;
        total: string;
    }>();

    const exchangeNames: Record<string, string> = {
        binance: 'Binance',
        okx: 'OKX',
        bybit: 'Bybit',
        metamask: 'MetaMask',
        trust: 'Trust Wallet',
        manual: 'External Wallet',
    };

    const exchangeName = exchangeNames[params.exchange] || 'External Wallet';

    const handleConfirm = () => {
        router.push({
            pathname: '/send/external/pin',
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
                            Confirm Transfer
                        </Text>
                    </HStack>
                    <Text fontSize={14} color="rgba(255, 255, 255, 0.9)">
                        Review transaction details
                    </Text>
                </VStack>
            </Box>

            <ScrollView>
                <VStack paddingHorizontal={24} paddingTop={32} paddingBottom={180}>
                    {/* Amount Display */}
                    <VStack alignItems="center" marginBottom={32}>
                        <Text fontSize={16} color={Colors.grey} marginBottom={8}>
                            Sending
                        </Text>
                        <Text fontSize={48} fontWeight="700" color={Colors.secondary.DEFAULT}>
                            {parseFloat(params.amount).toFixed(2)}
                        </Text>
                        <Text fontSize={20} fontWeight="600" color={Colors.secondary.DEFAULT} marginTop={4}>
                            USDT
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
                        {/* Destination */}
                        <HStack
                            justifyContent="space-between"
                            padding={16}
                            borderBottomWidth={1}
                            borderBottomColor="#F0F0F0"
                        >
                            <Text fontSize={14} color={Colors.grey}>To</Text>
                            <Text fontSize={14} fontWeight="600" color={Colors.dark}>
                                {exchangeName}
                            </Text>
                        </HStack>

                        {/* Address */}
                        <VStack
                            padding={16}
                            borderBottomWidth={1}
                            borderBottomColor="#F0F0F0"
                        >
                            <Text fontSize={14} color={Colors.grey} marginBottom={8}>
                                Destination Address
                            </Text>
                            <Text fontSize={12} fontWeight="600" color={Colors.dark} fontFamily="monospace">
                                {params.address}
                            </Text>
                        </VStack>

                        {/* Network */}
                        <HStack
                            justifyContent="space-between"
                            padding={16}
                            borderBottomWidth={1}
                            borderBottomColor="#F0F0F0"
                        >
                            <Text fontSize={14} color={Colors.grey}>Network</Text>
                            <HStack space="xs" alignItems="center">
                                <Text fontSize={14} fontWeight="600" color="#8B5CF6">
                                    Polygon
                                </Text>
                                <Ionicons name="checkmark-circle" size={16} color="#8B5CF6" />
                            </HStack>
                        </HStack>

                        {/* Amount */}
                        <HStack
                            justifyContent="space-between"
                            padding={16}
                            borderBottomWidth={1}
                            borderBottomColor="#F0F0F0"
                        >
                            <Text fontSize={14} color={Colors.grey}>Amount</Text>
                            <Text fontSize={15} fontWeight="600" color={Colors.dark}>
                                {parseFloat(params.amount).toFixed(2)} USDT
                            </Text>
                        </HStack>

                        {/* Gas Fee */}
                        <HStack
                            justifyContent="space-between"
                            padding={16}
                            borderBottomWidth={1}
                            borderBottomColor="#F0F0F0"
                        >
                            <Text fontSize={14} color={Colors.grey}>Network Fee</Text>
                            <Text fontSize={15} fontWeight="600" color={Colors.error}>
                                ~{parseFloat(params.gasFee).toFixed(3)} USDT
                            </Text>
                        </HStack>

                        {/* Total */}
                        <HStack
                            justifyContent="space-between"
                            padding={16}
                            backgroundColor="#F59E0B15"
                        >
                            <Text fontSize={15} fontWeight="600" color={Colors.dark}>
                                Total Deducted
                            </Text>
                            <Text fontSize={17} fontWeight="700" color={Colors.secondary.DEFAULT}>
                                {parseFloat(params.total).toFixed(3)} USDT
                            </Text>
                        </HStack>
                    </Box>

                    {/* Warning */}
                    <Box
                        backgroundColor="#FEE2E2"
                        borderRadius={12}
                        padding={16}
                        borderWidth={1}
                        borderColor={Colors.error}
                    >
                        <HStack space="sm" alignItems="flex-start">
                            <Ionicons name="warning" size={20} color={Colors.error} />
                            <VStack flex={1}>
                                <Text fontSize={14} fontWeight="600" color="#7F1D1D" marginBottom={4}>
                                    Double Check Everything
                                </Text>
                                <Text fontSize={13} color="#7F1D1D">
                                    • Verify the address is correct{'\n'}
                                    • Confirm this is a Polygon network address{'\n'}
                                    • Cryptocurrency transactions cannot be reversed{'\n'}
                                    • Sending to wrong address = permanent loss
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
                        Confirm Transfer
                    </Text>
                </Button>
            </Box>
        </VStack>
    );
};

export default Confirm;
