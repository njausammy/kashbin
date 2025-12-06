import React from 'react';
import { ScrollView, Share } from 'react-native';
import { VStack, HStack, Text, Box, Pressable } from '@gluestack-ui/themed';
import Button from '@/src/components/form/AnimatedButton';
import { router, useLocalSearchParams } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '@/src/constants/Colors';

const Success = () => {
    const params = useLocalSearchParams<{
        merchantId: string;
        merchantName: string;
        merchantCategory: string;
        merchantLocation: string;
        merchantCode: string;
        isVerified: string;
        amount: string;
    }>();

    const transactionId = `TX${Date.now().toString().slice(-8)}`;
    const timestamp = new Date().toLocaleString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
    });

    const handleShare = async () => {
        try {
            await Share.share({
                message: `Kash Chain - Merchant Payment Receipt\n\n` +
                    `Merchant: ${params.merchantName}\n` +
                    `Amount: ${parseFloat(params.amount).toFixed(2)} USDT\n` +
                    `Transaction ID: ${transactionId}\n` +
                    `Date: ${timestamp}\n` +
                    `Status: Completed`,
            });
        } catch (error) {
            // Silent fail
        }
    };

    return (
        <VStack backgroundColor="$white" flex={1}>
            {/* Success Header */}
            <Box backgroundColor={Colors.primary.DEFAULT} paddingTop={50} paddingBottom={40}>
                <VStack alignItems="center" paddingHorizontal={20}>
                    <Box
                        width={80}
                        height={80}
                        borderRadius={40}
                        backgroundColor="white"
                        alignItems="center"
                        justifyContent="center"
                        marginBottom={20}
                    >
                        <Ionicons name="checkmark" size={48} color={Colors.primary.DEFAULT} />
                    </Box>
                    <Text fontSize={28} fontWeight="700" color="white" marginBottom={8}>
                        Payment Successful!
                    </Text>
                    <Text fontSize={16} color="rgba(255, 255, 255, 0.9)" textAlign="center">
                        Merchant payment completed
                    </Text>
                </VStack>
            </Box>

            <ScrollView>
                <VStack paddingHorizontal={24} paddingTop={24} paddingBottom={180}>
                    {/* Amount Display - Large */}
                    <VStack alignItems="center" marginBottom={32}>
                        <Text fontSize={16} color={Colors.grey} marginBottom={8}>
                            Amount Paid
                        </Text>
                        <Text fontSize={48} fontWeight="700" color={Colors.primary.DEFAULT}>
                            {parseFloat(params.amount).toFixed(2)}
                        </Text>
                        <Text fontSize={20} fontWeight="600" color={Colors.primary.DEFAULT} marginTop={4}>
                            USDT
                        </Text>
                    </VStack>

                    {/* Transaction Receipt */}
                    <VStack marginBottom={24}>
                        <HStack justifyContent="space-between" alignItems="center" marginBottom={16}>
                            <Text fontSize={18} fontWeight="600" color={Colors.dark}>
                                Transaction Receipt
                            </Text>
                            <Pressable onPress={handleShare}>
                                <HStack space="xs" alignItems="center">
                                    <Ionicons name="share-social" size={18} color={Colors.primary.DEFAULT} />
                                    <Text fontSize={14} fontWeight="500" color={Colors.primary.DEFAULT}>
                                        Share
                                    </Text>
                                </HStack>
                            </Pressable>
                        </HStack>

                        <Box
                            backgroundColor="white"
                            borderRadius={16}
                            borderWidth={1}
                            borderColor={Colors.lightGrey}
                            overflow="hidden"
                        >
                            {/* Merchant Name */}
                            <HStack
                                justifyContent="space-between"
                                padding={16}
                                borderBottomWidth={1}
                                borderBottomColor="#F0F0F0"
                            >
                                <Text fontSize={14} color={Colors.grey}>Merchant</Text>
                                <HStack space="xs" alignItems="center" flex={1} justifyContent="flex-end">
                                    <Text fontSize={14} fontWeight="600" color={Colors.dark} textAlign="right">
                                        {params.merchantName}
                                    </Text>
                                    {params.isVerified === 'true' && (
                                        <Ionicons name="checkmark-circle" size={16} color={Colors.success} />
                                    )}
                                </HStack>
                            </HStack>

                            {/* Category */}
                            <HStack
                                justifyContent="space-between"
                                padding={16}
                                borderBottomWidth={1}
                                borderBottomColor="#F0F0F0"
                            >
                                <Text fontSize={14} color={Colors.grey}>Category</Text>
                                <Text fontSize={14} fontWeight="600" color={Colors.dark}>
                                    {params.merchantCategory}
                                </Text>
                            </HStack>

                            {/* Location */}
                            <HStack
                                justifyContent="space-between"
                                padding={16}
                                borderBottomWidth={1}
                                borderBottomColor="#F0F0F0"
                            >
                                <Text fontSize={14} color={Colors.grey}>Location</Text>
                                <Text fontSize={14} fontWeight="600" color={Colors.dark} textAlign="right" flex={1} marginLeft={16}>
                                    {params.merchantLocation}
                                </Text>
                            </HStack>

                            {/* Merchant Code */}
                            <HStack
                                justifyContent="space-between"
                                padding={16}
                                borderBottomWidth={1}
                                borderBottomColor="#F0F0F0"
                            >
                                <Text fontSize={14} color={Colors.grey}>Merchant Code</Text>
                                <Text fontSize={14} fontWeight="600" color={Colors.dark}>
                                    {params.merchantCode}
                                </Text>
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

                            {/* Fee */}
                            <HStack
                                justifyContent="space-between"
                                padding={16}
                                borderBottomWidth={1}
                                borderBottomColor="#F0F0F0"
                            >
                                <Text fontSize={14} color={Colors.grey}>Fee</Text>
                                <Text fontSize={15} fontWeight="600" color={Colors.success}>
                                    FREE
                                </Text>
                            </HStack>

                            {/* Total */}
                            <HStack
                                justifyContent="space-between"
                                padding={16}
                                borderBottomWidth={1}
                                borderBottomColor="#F0F0F0"
                                backgroundColor="#1E40AF15"
                            >
                                <Text fontSize={15} fontWeight="600" color={Colors.dark}>Total Paid</Text>
                                <Text fontSize={17} fontWeight="700" color={Colors.primary.DEFAULT}>
                                    {parseFloat(params.amount).toFixed(2)} USDT
                                </Text>
                            </HStack>

                            {/* Transaction ID */}
                            <HStack
                                justifyContent="space-between"
                                padding={16}
                                borderBottomWidth={1}
                                borderBottomColor="#F0F0F0"
                            >
                                <Text fontSize={14} color={Colors.grey}>Transaction ID</Text>
                                <Text fontSize={13} fontWeight="600" color={Colors.dark}>
                                    {transactionId}
                                </Text>
                            </HStack>

                            {/* Date & Time */}
                            <HStack
                                justifyContent="space-between"
                                padding={16}
                                borderBottomWidth={1}
                                borderBottomColor="#F0F0F0"
                            >
                                <Text fontSize={14} color={Colors.grey}>Date & Time</Text>
                                <Text fontSize={14} fontWeight="600" color={Colors.dark}>
                                    {timestamp}
                                </Text>
                            </HStack>

                            {/* Status */}
                            <HStack
                                justifyContent="space-between"
                                padding={16}
                                backgroundColor="#F9FAFB"
                            >
                                <Text fontSize={14} color={Colors.grey}>Status</Text>
                                <HStack space="xs" alignItems="center">
                                    <Box
                                        width={8}
                                        height={8}
                                        borderRadius={4}
                                        backgroundColor={Colors.success}
                                    />
                                    <Text fontSize={15} fontWeight="600" color={Colors.success}>
                                        Completed
                                    </Text>
                                </HStack>
                            </HStack>
                        </Box>
                    </VStack>

                    {/* Success Info */}
                    <Box
                        backgroundColor="#DBEAFE"
                        borderRadius={12}
                        padding={16}
                        borderWidth={1}
                        borderColor="#3B82F6"
                    >
                        <HStack space="sm" alignItems="flex-start">
                            <Ionicons name="information-circle" size={20} color="#3B82F6" />
                            <Text fontSize={13} color="#1E3A8A" flex={1}>
                                Payment received by merchant. Thank you for using Kash Chain!
                            </Text>
                        </HStack>
                    </Box>
                </VStack>
            </ScrollView>

            {/* Fixed Bottom Buttons */}
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
                <VStack space="sm">
                    <Button
                        backgroundColor={Colors.primary.DEFAULT}
                        borderRadius={50}
                        height={56}
                        width="$full"
                        onPress={() => router.replace('/main/home')}
                    >
                        <Text color="$white" fontSize={16} fontWeight={600}>
                            Done
                        </Text>
                    </Button>
                    <Button
                        backgroundColor="transparent"
                        borderRadius={50}
                        height={56}
                        width="$full"
                        borderWidth={2}
                        borderColor={Colors.lightGrey}
                        onPress={() => router.replace('/main/merchants/pay-menu')}
                    >
                        <Text color={Colors.dark} fontSize={16} fontWeight={600}>
                            Pay Again
                        </Text>
                    </Button>
                </VStack>
            </Box>
        </VStack>
    );
};

export default Success;
