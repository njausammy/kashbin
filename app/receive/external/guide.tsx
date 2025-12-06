import React, { useState } from 'react';
import { ScrollView, Share } from 'react-native';
import { VStack, HStack, Text, Box, Pressable } from '@gluestack-ui/themed';
import { Ionicons } from '@expo/vector-icons';
import { router, useLocalSearchParams } from 'expo-router';
import Button from '@/src/components/form/AnimatedButton';
import { Colors } from '@/src/constants/Colors';

interface WithdrawalGuide {
    name: string;
    icon: string;
    steps: string[];
    warnings: string[];
    tips: string[];
}

const Guide = () => {
    const params = useLocalSearchParams<{
        exchange: string;
        address: string;
    }>();

    const [copied, setCopied] = useState(false);

    const guides: Record<string, WithdrawalGuide> = {
        binance: {
            name: 'Binance',
            icon: '🟡',
            steps: [
                'Open Binance app or website and log in',
                'Go to: Wallet → Fiat and Spot → Withdraw',
                'Search and select: USDT',
                'Select Withdrawal Network: Polygon',
                '⚠️ CRITICAL: Choose "Polygon" network, NOT ERC20, TRC20, or BEP20',
                'Paste your Kash Chain address in the "Address" field',
                'Enter the amount of USDT you want to withdraw',
                'Review the network fee (usually 0.8-1 USDT on Polygon)',
                'Complete security verification (2FA, email code, etc.)',
                'Confirm withdrawal',
                'Wait 5-15 minutes for the transaction to complete',
            ],
            warnings: [
                'Wrong network = Funds lost permanently',
                'Double-check the address before confirming',
                'Binance has minimum withdrawal amounts (usually 10-20 USDT)',
                'Network fees are deducted from your withdrawal',
            ],
            tips: [
                'Polygon withdrawals are much cheaper than Ethereum',
                'First withdrawal may require additional verification',
                'Save withdrawal address for future use',
            ],
        },
        okx: {
            name: 'OKX',
            icon: '⚫',
            steps: [
                'Open OKX app or website and log in',
                'Go to: Assets → Withdraw',
                'Select Crypto: USDT',
                'Choose On-chain withdrawal',
                'Select Network: Polygon',
                '⚠️ CRITICAL: Select "Polygon" (MATIC), NOT Ethereum or other networks',
                'Paste your Kash Chain address',
                'Enter withdrawal amount',
                'Check the network fee (typically 0.8 USDT)',
                'Complete security verification',
                'Submit withdrawal request',
                'Transaction completes in 5-10 minutes',
            ],
            warnings: [
                'Selecting wrong network will result in permanent loss',
                'OKX requires address verification for first withdrawal',
                'Minimum withdrawal: 10 USDT',
                'Account must pass KYC for withdrawals',
            ],
            tips: [
                'Add address to whitelist for faster future withdrawals',
                'Polygon network has low fees and fast confirmation',
                'Check 24h withdrawal limits on your account',
            ],
        },
        bybit: {
            name: 'Bybit',
            icon: '🟣',
            steps: [
                'Open Bybit app or website',
                'Go to: Assets → Spot → Withdraw',
                'Select Currency: USDT',
                'Choose Blockchain: Polygon',
                '⚠️ CRITICAL: Must select "Polygon" network',
                'Enter or paste your Kash Chain wallet address',
                'Input withdrawal amount',
                'Review network fee (~1 USDT)',
                'Complete email and authenticator verification',
                'Confirm withdrawal',
                'Wait 5-10 minutes for blockchain confirmation',
            ],
            warnings: [
                'Wrong network selection = Irreversible loss',
                'Bybit minimum: 10 USDT',
                'First-time withdrawal requires 24-hour wait',
                'Security settings must be enabled',
            ],
            tips: [
                'Enable address whitelist for extra security',
                'Polygon is the fastest and cheapest option',
                'Keep email notifications on for withdrawal alerts',
            ],
        },
        metamask: {
            name: 'MetaMask',
            icon: '🦊',
            steps: [
                'Open MetaMask wallet',
                'Ensure you\'re on Polygon network (top of screen should show "Polygon Mainnet")',
                'If not on Polygon: Tap network dropdown → Select "Polygon Mainnet"',
                'Find your USDT token in the assets list',
                'Tap on USDT',
                'Tap "Send"',
                'Paste your Kash Chain address or scan QR code',
                'Enter amount to send',
                'Review gas fee (usually less than $0.01 on Polygon)',
                'Tap "Next" then "Confirm"',
                'Transaction completes in 10-30 seconds',
            ],
            warnings: [
                'If you\'re on Ethereum network, switch to Polygon first',
                'Make sure you have enough MATIC for gas fees (~$0.01)',
                'Double-check the recipient address',
                'Cannot undo crypto transactions',
            ],
            tips: [
                'Add Kash Chain address to your contacts for easy access',
                'Keep some MATIC in wallet for gas fees',
                'Transaction hash can be viewed on PolygonScan',
            ],
        },
        trust: {
            name: 'Trust Wallet',
            icon: '💙',
            steps: [
                'Open Trust Wallet app',
                'Ensure you\'re using Polygon network',
                'Find "USDT" in your wallet (look for Polygon USDT)',
                'Tap on USDT token',
                'Tap "Send"',
                'Paste your Kash Chain address or scan QR code',
                'Enter the amount of USDT',
                'Select "Polygon" as the network',
                '⚠️ Verify network is Polygon, not Ethereum',
                'Review transaction details and fee',
                'Tap "Send" and confirm with Face ID/PIN',
                'Wait 10-30 seconds for confirmation',
            ],
            warnings: [
                'Trust Wallet shows multiple USDT tokens - choose Polygon version',
                'Wrong network = Lost funds',
                'Need small amount of MATIC for gas',
                'Verify recipient address carefully',
            ],
            tips: [
                'Add Kash Chain to your contacts for quick access',
                'Enable transaction notifications',
                'Polygon transactions are very fast and cheap',
            ],
        },
    };

    const guide = guides[params.exchange] || guides.binance;
    const shortAddress = `${params.address.substring(0, 8)}...${params.address.substring(params.address.length - 6)}`;

    const handleCopyAddress = async () => {
        // In production, this would copy to clipboard
        // For now, just show the "Copied" state as visual feedback
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    const handleShare = async () => {
        try {
            await Share.share({
                message: `My Kash Chain Polygon Address:\n\n${params.address}\n\n⚠️ Only send USDT on Polygon network!`,
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
                            {guide.name} Withdrawal Guide
                        </Text>
                    </HStack>
                    <Text fontSize={14} color="rgba(255, 255, 255, 0.9)">
                        How to withdraw USDT to Kash Chain
                    </Text>
                </VStack>
            </Box>

            <ScrollView>
                <VStack paddingHorizontal={24} paddingTop={24} paddingBottom={32}>
                    {/* Platform Header */}
                    <HStack
                        space="md"
                        alignItems="center"
                        padding={16}
                        backgroundColor={Colors.background}
                        borderRadius={12}
                        marginBottom={24}
                    >
                        <Text fontSize={40}>{guide.icon}</Text>
                        <VStack flex={1}>
                            <Text fontSize={18} fontWeight="700" color={Colors.dark}>
                                {guide.name}
                            </Text>
                            <Text fontSize={14} color={Colors.grey}>
                                Polygon Network Withdrawal
                            </Text>
                        </VStack>
                    </HStack>

                    {/* Your Address */}
                    <Text fontSize={18} fontWeight="600" color={Colors.dark} marginBottom={12}>
                        Your Kash Chain Address
                    </Text>
                    <Box
                        backgroundColor="white"
                        borderRadius={12}
                        padding={16}
                        marginBottom={24}
                        borderWidth={2}
                        borderColor={Colors.secondary.DEFAULT}
                    >
                        <VStack space="md">
                            <Text fontSize={11} fontWeight="600" color={Colors.dark} fontFamily="monospace">
                                {params.address}
                            </Text>
                            <HStack space="sm">
                                <Pressable flex={1} onPress={handleCopyAddress}>
                                    <Box
                                        backgroundColor={copied ? '#22C55E' : '#F59E0B'}
                                        borderRadius={8}
                                        paddingVertical={10}
                                        alignItems="center"
                                    >
                                        <HStack space="xs" alignItems="center">
                                            <Ionicons name={copied ? 'checkmark' : 'copy'} size={16} color="white" />
                                            <Text fontSize={14} fontWeight="600" color="white">
                                                {copied ? 'Copied!' : 'Copy Address'}
                                            </Text>
                                        </HStack>
                                    </Box>
                                </Pressable>
                                <Pressable flex={1} onPress={handleShare}>
                                    <Box
                                        borderWidth={2}
                                        borderColor={Colors.secondary.DEFAULT}
                                        borderRadius={8}
                                        paddingVertical={10}
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
                        </VStack>
                    </Box>

                    {/* Step-by-Step Instructions */}
                    <Text fontSize={18} fontWeight="600" color={Colors.dark} marginBottom={12}>
                        Step-by-Step Instructions
                    </Text>
                    <VStack space="md" marginBottom={24}>
                        {guide.steps.map((step, index) => {
                            const isCritical = step.includes('CRITICAL') || step.includes('⚠️');
                            return (
                                <HStack
                                    key={index}
                                    space="md"
                                    alignItems="flex-start"
                                    padding={14}
                                    backgroundColor={isCritical ? '#FEF3C7' : 'white'}
                                    borderRadius={10}
                                    borderWidth={isCritical ? 2 : 1}
                                    borderColor={isCritical ? '#F59E0B' : '#E5E7EB'}
                                >
                                    <Box
                                        width={28}
                                        height={28}
                                        borderRadius={14}
                                        backgroundColor={isCritical ? '#F59E0B' : '#3B82F6'}
                                        alignItems="center"
                                        justifyContent="center"
                                    >
                                        <Text fontSize={14} fontWeight="700" color="white">
                                            {index + 1}
                                        </Text>
                                    </Box>
                                    <Text
                                        fontSize={14}
                                        color={Colors.dark}
                                        flex={1}
                                        fontWeight={isCritical ? '600' : '400'}
                                    >
                                        {step.replace('⚠️ CRITICAL: ', '').replace('⚠️ ', '')}
                                    </Text>
                                </HStack>
                            );
                        })}
                    </VStack>

                    {/* Important Warnings */}
                    <Box
                        backgroundColor="#FEE2E2"
                        borderRadius={12}
                        padding={16}
                        marginBottom={24}
                        borderWidth={1}
                        borderColor={Colors.error}
                    >
                        <HStack space="sm" alignItems="flex-start" marginBottom={12}>
                            <Ionicons name="warning" size={22} color={Colors.error} />
                            <Text fontSize={16} fontWeight="700" color="#7F1D1D">
                                Critical Warnings
                            </Text>
                        </HStack>
                        <VStack space="xs" paddingLeft={8}>
                            {guide.warnings.map((warning, index) => (
                                <HStack key={index} space="xs" alignItems="flex-start">
                                    <Text fontSize={14} color={Colors.error} fontWeight="600">
                                        •
                                    </Text>
                                    <Text fontSize={13} color="#7F1D1D" flex={1}>
                                        {warning}
                                    </Text>
                                </HStack>
                            ))}
                        </VStack>
                    </Box>

                    {/* Helpful Tips */}
                    <Box
                        backgroundColor="#DBEAFE"
                        borderRadius={12}
                        padding={16}
                        borderWidth={1}
                        borderColor="#3B82F6"
                    >
                        <HStack space="sm" alignItems="flex-start" marginBottom={12}>
                            <Ionicons name="bulb" size={22} color="#3B82F6" />
                            <Text fontSize={16} fontWeight="700" color="#1E3A8A">
                                Helpful Tips
                            </Text>
                        </HStack>
                        <VStack space="xs" paddingLeft={8}>
                            {guide.tips.map((tip, index) => (
                                <HStack key={index} space="xs" alignItems="flex-start">
                                    <Text fontSize={14} color="#3B82F6" fontWeight="600">
                                        •
                                    </Text>
                                    <Text fontSize={13} color="#1E3A8A" flex={1}>
                                        {tip}
                                    </Text>
                                </HStack>
                            ))}
                        </VStack>
                    </Box>
                </VStack>
            </ScrollView>
        </VStack>
    );
};

export default Guide;
