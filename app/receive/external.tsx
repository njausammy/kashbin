import React from 'react';
import { ScrollView, Share } from 'react-native';
import { VStack, HStack, Text, Box, Pressable } from '@gluestack-ui/themed';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import Button from '@/src/components/form/AnimatedButton';
import { Colors } from '@/src/constants/Colors';

interface Exchange {
    id: string;
    name: string;
    icon: string;
    color: string;
}

const ReceiveExternal = () => {
    // Mock wallet address
    const walletAddress = '0x742d35Cc6634C0532925a3b844Bc9e7595f0bEb';
    const shortAddress = `${walletAddress.substring(0, 6)}...${walletAddress.substring(walletAddress.length - 4)}`;

    const exchanges: Exchange[] = [
        { id: 'binance', name: 'Binance', icon: '🟡', color: '#F3BA2F' },
        { id: 'okx', name: 'OKX', icon: '⚫', color: '#000000' },
        { id: 'bybit', name: 'Bybit', icon: '🟣', color: '#F7A600' },
        { id: 'metamask', name: 'MetaMask', icon: '🦊', color: '#F6851B' },
        { id: 'trust', name: 'Trust Wallet', icon: '💙', color: '#3375BB' },
    ];

    const handleViewGuide = (exchangeId: string) => {
        router.push({
            pathname: '/receive/external/guide',
            params: {
                exchange: exchangeId,
                address: walletAddress
            }
        });
    };

    const handleCopyAddress = async () => {
        // In production, this would copy to clipboard
    };

    const handleShare = async () => {
        try {
            await Share.share({
                message: `Send USDT to my Kash Chain wallet:\n\n` +
                    `Address: ${walletAddress}\n` +
                    `Network: Polygon\n\n` +
                    `⚠️ Only send USDT on Polygon network!`,
            });
        } catch (error) {
            // Silent fail
        }
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
                            Receive from External
                        </Text>
                    </HStack>
                    <Text fontSize={14} color="rgba(255, 255, 255, 0.9)">
                        Withdraw from exchanges & wallets
                    </Text>
                </VStack>
            </Box>

            <ScrollView>
                <VStack paddingHorizontal={24} paddingTop={32} paddingBottom={32}>
                    {/* Wallet Address Card */}
                    <Box
                        backgroundColor="white"
                        borderRadius={16}
                        padding={24}
                        alignItems="center"
                        marginBottom={32}
                        borderWidth={2}
                        borderColor={Colors.secondary.DEFAULT}
                        style={{
                            shadowColor: '#000',
                            shadowOffset: { width: 0, height: 4 },
                            shadowOpacity: 0.1,
                            shadowRadius: 8,
                            elevation: 4,
                        }}
                    >
                        <Text fontSize={16} fontWeight="600" color={Colors.dark} marginBottom={16}>
                            Your Polygon Address
                        </Text>

                        {/* QR Code */}
                        <Box
                            width={200}
                            height={200}
                            backgroundColor="#F9FAFB"
                            borderRadius={12}
                            borderWidth={2}
                            borderColor={Colors.lightGrey}
                            alignItems="center"
                            justifyContent="center"
                            marginBottom={16}
                        >
                            <Ionicons name="qr-code" size={140} color={Colors.secondary.DEFAULT} />
                        </Box>

                        {/* Address */}
                        <Box
                            backgroundColor="rgba(245, 158, 11, 0.08)"
                            borderRadius={8}
                            paddingVertical={12}
                            paddingHorizontal={16}
                            marginBottom={16}
                            width="100%"
                        >
                            <Text fontSize={11} fontWeight="600" color="#92400E" fontFamily="monospace" textAlign="center">
                                {walletAddress}
                            </Text>
                        </Box>

                        {/* Action Buttons */}
                        <HStack space="sm" width="100%">
                            <Pressable flex={1} onPress={handleCopyAddress}>
                                <Box
                                    backgroundColor={Colors.secondary.DEFAULT}
                                    borderRadius={8}
                                    paddingVertical={12}
                                    alignItems="center"
                                >
                                    <HStack space="xs" alignItems="center">
                                        <Ionicons name="copy" size={16} color="white" />
                                        <Text fontSize={14} fontWeight="600" color="white">
                                            Copy
                                        </Text>
                                    </HStack>
                                </Box>
                            </Pressable>
                            <Pressable flex={1} onPress={handleShare}>
                                <Box
                                    borderWidth={2}
                                    borderColor={Colors.secondary.DEFAULT}
                                    borderRadius={8}
                                    paddingVertical={12}
                                    alignItems="center"
                                >
                                    <HStack space="xs" alignItems="center">
                                        <Ionicons name="share-social" size={16} color={Colors.secondary.DEFAULT} />
                                        <Text fontSize={14} fontWeight="600" color={Colors.secondary.DEFAULT}>
                                            Share
                                        </Text>
                                    </HStack>
                                </Box>
                            </Pressable>
                        </HStack>
                    </Box>

                    {/* Withdrawal Guides */}
                    <Text fontSize={18} fontWeight="600" color={Colors.dark} marginBottom={16}>
                        Withdrawal Guides
                    </Text>
                    <Text fontSize={14} color={Colors.grey} marginBottom={16}>
                        Select your platform for step-by-step instructions
                    </Text>

                    <VStack space="md" marginBottom={32}>
                        {exchanges.map((exchange) => (
                            <Pressable
                                key={exchange.id}
                                onPress={() => handleViewGuide(exchange.id)}
                            >
                                <Box
                                    backgroundColor="white"
                                    borderRadius={12}
                                    padding={16}
                                    borderWidth={1}
                                    borderColor={Colors.lightGrey}
                                    style={{
                                        shadowColor: '#000',
                                        shadowOffset: { width: 0, height: 1 },
                                        shadowOpacity: 0.1,
                                        shadowRadius: 2,
                                        elevation: 1,
                                    }}
                                >
                                    <HStack space="md" alignItems="center">
                                        <Text fontSize={32}>{exchange.icon}</Text>
                                        <VStack flex={1}>
                                            <Text fontSize={16} fontWeight="600" color={Colors.dark}>
                                                {exchange.name}
                                            </Text>
                                            <Text fontSize={13} color={Colors.grey}>
                                                View withdrawal guide
                                            </Text>
                                        </VStack>
                                        <Ionicons name="chevron-forward" size={20} color={Colors.grey} />
                                    </HStack>
                                </Box>
                            </Pressable>
                        ))}
                    </VStack>

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
                                    Critical: Polygon Network Only
                                </Text>
                                <Text fontSize={13} color="#7F1D1D">
                                    Only send USDT on Polygon network to this address. Sending from other networks (ETH, BSC, Tron, etc.) will result in permanent loss of funds.
                                </Text>
                            </VStack>
                        </HStack>
                    </Box>
                </VStack>
            </ScrollView>
        </VStack>
    );
};

export default ReceiveExternal;
