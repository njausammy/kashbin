import React from 'react';
import { ScrollView, Share } from 'react-native';
import { VStack, HStack, Text, Box, Pressable } from '@gluestack-ui/themed';
import Button from '@/src/components/form/AnimatedButton';
import { router, useLocalSearchParams } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '@/src/constants/Colors';

const Success = () => {
    const params = useLocalSearchParams<{
        address: string;
        exchange: string;
        amount: string;
        gasFee: string;
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
    const transactionId = `TX${Date.now().toString().slice(-8)}`;
    const timestamp = new Date().toLocaleString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
        hour: 'numeric',
        minute: '2-digit',
        hour12: true
    });

    const handleShare = async () => {
        try {
            await Share.share({
                message: `Kash Chain - External Transfer Receipt\n\n` +
                    `To: ${exchangeName}\n` +
                    `Address: ${params.address}\n` +
                    `Amount: ${parseFloat(params.amount).toFixed(2)} USDT\n` +
                    `Network: Polygon\n` +
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
                    USDT sent to {exchangeName}
                </Text>
            </Box>

            <ScrollView>
                <VStack paddingHorizontal={24} paddingTop={32} paddingBottom={180}>
                    {/* Amount */}
                    <Box alignItems="center" marginBottom={32}>
                        <Text fontSize={16} color={Colors.grey} marginBottom={8}>
                            Amount Sent
                        </Text>
                        <Text fontSize={48} fontWeight="700" color={Colors.dark}>
                            {parseFloat(params.amount || '0').toFixed(2)}
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
                        marginBottom={24}
                    >
                        {/* Destination */}
                        <HStack justifyContent="space-between" padding={16} borderBottomWidth={1} borderBottomColor="#F0F0F0">
                            <Text fontSize={14} color={Colors.grey}>To</Text>
                            <Text fontSize={15} fontWeight="600" color={Colors.dark}>
                                {exchangeName}
                            </Text>
                        </HStack>

                        {/* Address */}
                        <VStack padding={16} borderBottomWidth={1} borderBottomColor="#F0F0F0">
                            <Text fontSize={14} color={Colors.grey} marginBottom={8}>
                                Address
                            </Text>
                            <Text fontSize={11} fontWeight="600" color={Colors.dark} fontFamily="monospace">
                                {params.address}
                            </Text>
                        </VStack>

                        {/* Network */}
                        <HStack justifyContent="space-between" padding={16} borderBottomWidth={1} borderBottomColor="#F0F0F0">
                            <Text fontSize={14} color={Colors.grey}>Network</Text>
                            <HStack space="xs" alignItems="center">
                                <Text fontSize={14} fontWeight="600" color="#8B5CF6">
                                    Polygon
                                </Text>
                                <Ionicons name="checkmark-circle" size={16} color="#8B5CF6" />
                            </HStack>
                        </HStack>

                        {/* Gas Fee */}
                        <HStack justifyContent="space-between" padding={16} borderBottomWidth={1} borderBottomColor="#F0F0F0">
                            <Text fontSize={14} color={Colors.grey}>Network Fee</Text>
                            <Text fontSize={15} fontWeight="600" color={Colors.error}>
                                {parseFloat(params.gasFee || '0').toFixed(3)} USDT
                            </Text>
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
                                    Confirmed
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
                            marginBottom={24}
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

                    {/* Info Box */}
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
                                Your USDT has been sent on the Polygon network. It should appear in your {exchangeName} account within a few minutes.
                            </Text>
                        </HStack>
                    </Box>
                </VStack>
            </ScrollView>

            {/* Action Buttons */}
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
                        backgroundColor={Colors.success}
                        borderRadius={50}
                        height={56}
                        width="$full"
                        onPress={() => router.replace('/main/home')}
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
            </Box>
        </VStack>
    );
};

export default Success;
