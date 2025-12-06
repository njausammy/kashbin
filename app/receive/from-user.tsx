import React from 'react';
import { ScrollView, Share } from 'react-native';
import { VStack, HStack, Text, Box, Pressable } from '@gluestack-ui/themed';
import Button from '@/src/components/form/AnimatedButton';
import { router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { useCurrentUser } from '@/src/hooks/useCurrentUser';
import { Colors } from '@/src/constants/Colors';

const ReceiveFromUser = () => {
    const { user } = useCurrentUser();

    // Mock wallet address - in production this would come from user's wallet
    const walletAddress = '0x742d35Cc6634C0532925a3b844Bc9e7595f0bEb';
    const shortAddress = `${walletAddress.substring(0, 6)}...${walletAddress.substring(walletAddress.length - 4)}`;

    const handleShare = async () => {
        try {
            await Share.share({
                message: `Send USDT on Kash Chain\n\nMy Wallet Address:\n${walletAddress}\n\nOr scan my QR code in the Kash Chain app!`,
            });
        } catch (error) {
            // Silent fail
        }
    };

    const handleCopyAddress = async () => {
        // In a real app, this would copy to clipboard
        // Placeholder for clipboard functionality
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
                            Receive USDT
                        </Text>
                    </HStack>
                    <Text fontSize={14} color="rgba(255, 255, 255, 0.9)">
                        Share your QR code or wallet address
                    </Text>
                </VStack>
            </Box>

            <ScrollView>
                <VStack paddingHorizontal={24} paddingTop={32} paddingBottom={140}>
                    {/* User Info */}
                    <VStack alignItems="center" marginBottom={32}>
                        <Box
                            width={80}
                            height={80}
                            borderRadius={40}
                            backgroundColor={Colors.primary.DEFAULT}
                            alignItems="center"
                            justifyContent="center"
                            marginBottom={16}
                        >
                            <Text fontSize={32} fontWeight="700" color="white">
                                {user?.firstName?.[0] || 'U'}
                            </Text>
                        </Box>
                        <Text fontSize={20} fontWeight="700" color="#1C1C1E">
                            {user?.firstName || 'User'}
                        </Text>
                        <Text fontSize={14} color="#8E8E93" marginTop={4}>
                            Kash Chain User
                        </Text>
                    </VStack>

                    {/* QR Code Placeholder */}
                    <Box
                        backgroundColor="white"
                        borderRadius={16}
                        padding={24}
                        alignItems="center"
                        marginBottom={24}
                        borderWidth={1}
                        borderColor="#E5E7EB"
                        style={{
                            shadowColor: '#000',
                            shadowOffset: { width: 0, height: 2 },
                            shadowOpacity: 0.1,
                            shadowRadius: 8,
                            elevation: 4,
                        }}
                    >
                        <Text fontSize={16} fontWeight="600" color="#1C1C1E" marginBottom={16}>
                            Scan QR Code
                        </Text>

                        {/* QR Code Placeholder - In production, generate actual QR code */}
                        <Box
                            width={240}
                            height={240}
                            backgroundColor="#F9FAFB"
                            borderRadius={12}
                            borderWidth={2}
                            borderColor="#E5E7EB"
                            alignItems="center"
                            justifyContent="center"
                            marginBottom={16}
                        >
                            <Ionicons name="qr-code" size={120} color={Colors.primary.DEFAULT} />
                        </Box>

                        <Text fontSize={13} color="#8E8E93" textAlign="center">
                            Ask sender to scan this code in Kash Chain app
                        </Text>
                    </Box>

                    {/* Wallet Address */}
                    <VStack marginBottom={24}>
                        <Text fontSize={14} fontWeight="600" color="#1C1C1E" marginBottom={12}>
                            Your Wallet Address
                        </Text>

                        <Box
                            backgroundColor="#F9FAFB"
                            borderRadius={12}
                            padding={16}
                            borderWidth={1}
                            borderColor="#E5E7EB"
                        >
                            <HStack justifyContent="space-between" alignItems="center">
                                <VStack flex={1} marginRight={12}>
                                    <Text fontSize={12} color="#8E8E93" marginBottom={4}>
                                        USDT (Polygon)
                                    </Text>
                                    <Text fontSize={14} fontWeight="600" color="#1C1C1E">
                                        {shortAddress}
                                    </Text>
                                    <Text fontSize={11} color="#8E8E93" marginTop={4}>
                                        {walletAddress}
                                    </Text>
                                </VStack>
                                <Pressable onPress={handleCopyAddress}>
                                    <Box
                                        width={40}
                                        height={40}
                                        borderRadius={20}
                                        backgroundColor="rgba(34, 197, 94, 0.08)"
                                        alignItems="center"
                                        justifyContent="center"
                                    >
                                        <Ionicons name="copy-outline" size={20} color={Colors.primary.DEFAULT} />
                                    </Box>
                                </Pressable>
                            </HStack>
                        </Box>
                    </VStack>

                    {/* Info Boxes */}
                    <VStack space="md">
                        <Box
                            backgroundColor="#DBEAFE"
                            borderRadius={12}
                            padding={16}
                            borderWidth={1}
                            borderColor="#3B82F6"
                        >
                            <HStack space="sm" alignItems="flex-start">
                                <Ionicons name="shield-checkmark" size={20} color="#3B82F6" />
                                <VStack flex={1}>
                                    <Text fontSize={14} fontWeight="600" color="#1E3A8A" marginBottom={4}>
                                        Safe & Secure
                                    </Text>
                                    <Text fontSize={13} color="#1E3A8A">
                                        Only share your QR code or address with people you trust. Never share your private keys or PIN.
                                    </Text>
                                </VStack>
                            </HStack>
                        </Box>

                        <Box
                            backgroundColor="#FEF3C7"
                            borderRadius={12}
                            padding={16}
                            borderWidth={1}
                            borderColor="#F59E0B"
                        >
                            <HStack space="sm" alignItems="flex-start">
                                <Ionicons name="information-circle" size={20} color="#F59E0B" />
                                <VStack flex={1}>
                                    <Text fontSize={14} fontWeight="600" color="#92400E" marginBottom={4}>
                                        Important
                                    </Text>
                                    <Text fontSize={13} color="#92400E">
                                        This address only accepts USDT on Polygon network. Sending other tokens may result in permanent loss.
                                    </Text>
                                </VStack>
                            </HStack>
                        </Box>
                    </VStack>
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
                    onPress={handleShare}
                >
                    <HStack space="sm" alignItems="center">
                        <Ionicons name="share-social" size={20} color="white" />
                        <Text color="$white" fontSize={16} fontWeight={600}>
                            Share Address
                        </Text>
                    </HStack>
                </Button>
            </Box>
        </VStack>
    );
};

export default ReceiveFromUser;
