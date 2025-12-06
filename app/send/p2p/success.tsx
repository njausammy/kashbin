import React from 'react';
import { Share } from 'react-native';
import { VStack, HStack, Text, Box, Pressable } from '@gluestack-ui/themed';
import Button from '@/src/components/form/AnimatedButton';
import { router, useLocalSearchParams } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '@/src/constants/Colors';

const P2PSuccess = () => {
    const params = useLocalSearchParams<{
        recipientName: string;
        recipientPhone: string;
        amount: string;
    }>();

    const { recipientName, recipientPhone, amount } = params;

    // Generate mock transaction ID
    const transactionId = `TX${Date.now().toString().slice(-8)}`;
    const timestamp = new Date().toLocaleString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
        hour: 'numeric',
        minute: '2-digit',
        hour12: true
    });

    const handleDone = () => {
        // Navigate back to home, clearing the stack
        router.replace('/main/home');
    };

    const handleShare = async () => {
        try {
            await Share.share({
                message: `Kash Chain - P2P Transfer Receipt\n\n` +
                    `To: ${recipientName} (+254${recipientPhone})\n` +
                    `Amount: ${parseFloat(amount || '0').toFixed(2)} USDT\n` +
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
            <Box backgroundColor={Colors.success} paddingTop={50} paddingBottom={48} alignItems="center">
                <Box
                    width={80}
                    height={80}
                    borderRadius={40}
                    backgroundColor="white"
                    alignItems="center"
                    justifyContent="center"
                    marginBottom={20}
                >
                    <Ionicons name="checkmark" size={48} color={Colors.success} />
                </Box>
                <Text fontSize={28} fontWeight="700" color="white" marginBottom={8}>
                    Transfer Successful!
                </Text>
                <Text fontSize={16} color="rgba(255, 255, 255, 0.9)">
                    Your USDT has been sent
                </Text>
            </Box>

            <VStack flex={1} paddingHorizontal={24} marginTop={32} justifyContent="space-between" paddingBottom={32}>
                <VStack>
                    {/* Amount */}
                    <Box alignItems="center" marginBottom={32}>
                        <Text fontSize={16} color={Colors.grey} marginBottom={8}>
                            Amount Sent
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

                        {/* Transaction ID */}
                        <HStack justifyContent="space-between" padding={16} borderBottomWidth={1} borderBottomColor="#F0F0F0">
                            <Text fontSize={14} color={Colors.grey}>Transaction ID</Text>
                            <Text fontSize={15} fontWeight="600" color={Colors.dark}>
                                {transactionId}
                            </Text>
                        </HStack>

                        {/* Date & Time */}
                        <HStack justifyContent="space-between" padding={16} borderBottomWidth={1} borderBottomColor="#F0F0F0">
                            <Text fontSize={14} color={Colors.grey}>Date & Time</Text>
                            <Text fontSize={15} fontWeight="600" color={Colors.dark}>
                                {timestamp}
                            </Text>
                        </HStack>

                        {/* Status */}
                        <HStack justifyContent="space-between" padding={16} backgroundColor={Colors.background}>
                            <Text fontSize={14} color={Colors.grey}>Status</Text>
                            <HStack space="xs" alignItems="center">
                                <Box width={8} height={8} borderRadius={4} backgroundColor={Colors.success} />
                                <Text fontSize={15} fontWeight="600" color={Colors.success}>
                                    Completed
                                </Text>
                            </HStack>
                        </HStack>
                    </Box>

                    {/* Share Receipt */}
                    <Pressable onPress={handleShare}>
                        <Box
                            backgroundColor={Colors.background}
                            borderRadius={12}
                            padding={16}
                            marginTop={24}
                            borderWidth={1}
                            borderColor={Colors.lightGrey}
                        >
                            <HStack space="md" alignItems="center" justifyContent="center">
                                <Ionicons name="share-outline" size={20} color={Colors.primary.DEFAULT} />
                                <Text fontSize={15} fontWeight="600" color={Colors.primary.DEFAULT}>
                                    Share Receipt
                                </Text>
                            </HStack>
                        </Box>
                    </Pressable>
                </VStack>

                {/* Action Buttons */}
                <VStack space="md">
                    <Button
                        backgroundColor={Colors.primary.DEFAULT}
                        borderRadius={50}
                        height={56}
                        width="$full"
                        onPress={handleDone}
                    >
                        <Text color='$white' fontSize={16} fontWeight={600}>
                            Done
                        </Text>
                    </Button>

                    <Pressable onPress={() => router.replace('/send/menu')}>
                        <Box
                            borderWidth={1}
                            borderColor={Colors.lightGrey}
                            borderRadius={50}
                            height={56}
                            alignItems="center"
                            justifyContent="center"
                        >
                            <Text color={Colors.grey} fontSize={16} fontWeight={600}>
                                Send Again
                            </Text>
                        </Box>
                    </Pressable>
                </VStack>
            </VStack>
        </VStack>
    );
};

export default P2PSuccess;
