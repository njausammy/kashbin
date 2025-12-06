import React from 'react';
import { VStack, HStack, Text, Box, Pressable } from '@gluestack-ui/themed';
import Button from '@/src/components/form/AnimatedButton';
import { router, useLocalSearchParams } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '@/src/constants/Colors';

const P2PConfirm = () => {
    const params = useLocalSearchParams<{
        recipientId: string;
        recipientPhone: string;
        recipientName: string;
        isVerified: string;
        amount: string;
    }>();

    const { recipientName, recipientPhone, amount } = params;

    const handleConfirm = () => {
        router.push({
            pathname: '/send/p2p/pin',
            params: params
        });
    };

    return (
        <VStack backgroundColor="$white" paddingBottom={50} flex={1}>
            {/* Header */}
            <Box backgroundColor={Colors.primary.DEFAULT} paddingTop={50} paddingBottom={24}>
                <VStack paddingHorizontal={20}>
                    <HStack alignItems="center" marginBottom={16}>
                        <Pressable onPress={() => router.back()} marginRight={16}>
                            <Ionicons name="arrow-back" size={24} color="white" />
                        </Pressable>
                        <Text fontSize={24} fontWeight="700" color="white">
                            Confirm Transfer
                        </Text>
                    </HStack>
                    <Text fontSize={14} color="rgba(255, 255, 255, 0.8)">
                        Review transaction details
                    </Text>
                </VStack>
            </Box>

            <VStack flex={1} paddingHorizontal={24} marginTop={32} justifyContent="space-between">
                <VStack>
                    {/* Amount Display */}
                    <Box alignItems="center" marginBottom={32}>
                        <Text fontSize={16} color={Colors.grey} marginBottom={8}>
                            You're sending
                        </Text>
                        <Text fontSize={48} fontWeight="700" color={Colors.dark}>
                            ${parseFloat(amount || '0').toFixed(2)}
                        </Text>
                        <Text fontSize={18} color={Colors.grey} marginTop={4}>
                            USDT
                        </Text>
                    </Box>

                    {/* Transaction Details */}
                    <Box
                        backgroundColor="white"
                        borderRadius={16}
                        borderWidth={1}
                        borderColor={Colors.lightGrey}
                        overflow="hidden"
                    >
                        {/* Recipient */}
                        <HStack justifyContent="space-between" padding={16} borderBottomWidth={1} borderBottomColor="#F0F0F0">
                            <Text fontSize={14} color={Colors.grey}>To</Text>
                            <VStack alignItems="flex-end">
                                <Text fontSize={15} fontWeight="600" color={Colors.dark}>
                                    {recipientName}
                                </Text>
                                <Text fontSize={13} color={Colors.grey}>
                                    +254{recipientPhone}
                                </Text>
                            </VStack>
                        </HStack>

                        {/* Amount */}
                        <HStack justifyContent="space-between" padding={16} borderBottomWidth={1} borderBottomColor="#F0F0F0">
                            <Text fontSize={14} color={Colors.grey}>Amount</Text>
                            <Text fontSize={15} fontWeight="600" color={Colors.dark}>
                                {parseFloat(amount || '0').toFixed(2)} USDT
                            </Text>
                        </HStack>

                        {/* Fee */}
                        <HStack justifyContent="space-between" padding={16} borderBottomWidth={1} borderBottomColor="#F0F0F0">
                            <Text fontSize={14} color={Colors.grey}>Transaction Fee</Text>
                            <Text fontSize={15} fontWeight="600" color={Colors.success}>
                                FREE
                            </Text>
                        </HStack>

                        {/* Total */}
                        <HStack justifyContent="space-between" padding={16} backgroundColor={Colors.background}>
                            <Text fontSize={15} fontWeight="600" color={Colors.dark}>Total</Text>
                            <Text fontSize={17} fontWeight="700" color={Colors.dark}>
                                {parseFloat(amount || '0').toFixed(2)} USDT
                            </Text>
                        </HStack>
                    </Box>

                    {/* Warning Box */}
                    <Box
                        backgroundColor="#F9731615"
                        borderRadius={12}
                        padding={16}
                        marginTop={24}
                    >
                        <HStack space="sm" alignItems="flex-start">
                            <Ionicons name="alert-circle" size={20} color="#F97316" />
                            <VStack flex={1}>
                                <Text fontSize={14} color={Colors.dark} fontWeight="500">
                                    Double-check before sending
                                </Text>
                                <Text fontSize={13} color={Colors.grey} marginTop={4}>
                                    Cryptocurrency transactions cannot be reversed. Make sure all details are correct.
                                </Text>
                            </VStack>
                        </HStack>
                    </Box>
                </VStack>

                {/* Action Buttons */}
                <VStack space="md">
                    <Button
                        backgroundColor={Colors.primary.DEFAULT}
                        borderRadius={50}
                        height={56}
                        width="$full"
                        onPress={handleConfirm}
                    >
                        <Text color='$white' fontSize={16} fontWeight={600}>
                            Confirm & Enter PIN
                        </Text>
                    </Button>

                    <Pressable onPress={() => router.back()}>
                        <Box
                            borderWidth={1}
                            borderColor={Colors.lightGrey}
                            borderRadius={50}
                            height={56}
                            alignItems="center"
                            justifyContent="center"
                        >
                            <Text color={Colors.grey} fontSize={16} fontWeight={600}>
                                Go Back
                            </Text>
                        </Box>
                    </Pressable>
                </VStack>
            </VStack>
        </VStack>
    );
};

export default P2PConfirm;
