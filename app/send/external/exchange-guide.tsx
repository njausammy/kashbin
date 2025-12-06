import React, { useState } from 'react';
import { ScrollView } from 'react-native';
import { VStack, HStack, Text, Box, Pressable, Input, InputField } from '@gluestack-ui/themed';
import { Ionicons } from '@expo/vector-icons';
import { router, useLocalSearchParams } from 'expo-router';
import Button from '@/src/components/form/AnimatedButton';
import { Colors } from '@/src/constants/Colors';

interface ExchangeGuide {
    name: string;
    icon: string;
    color: string;
    steps: string[];
    warnings: string[];
}

const ExchangeGuideScreen = () => {
    const params = useLocalSearchParams<{ exchange: string }>();
    const [address, setAddress] = useState('');

    const guides: Record<string, ExchangeGuide> = {
        binance: {
            name: 'Binance',
            icon: '🟡',
            color: '#F3BA2F',
            steps: [
                'Open Binance app or website',
                'Go to: Wallet → Deposit',
                'Search and select: USDT',
                'Choose Network: Polygon',
                'CRITICAL: Make sure "Polygon" is selected, NOT ERC20, TRC20, or BEP20',
                'Tap "Copy Address" to copy your deposit address',
                'Return to Kash Chain and paste the address below',
            ],
            warnings: [
                'Wrong network = Lost funds forever',
                'Binance may have minimum deposit amount',
                'Deposits usually take 5-10 minutes',
            ],
        },
        okx: {
            name: 'OKX',
            icon: '⚫',
            color: '#000000',
            steps: [
                'Open OKX app or website',
                'Go to: Assets → Deposit',
                'Search and select: USDT',
                'Choose Network: Polygon',
                'CRITICAL: Select "Polygon" network',
                'Copy the deposit address',
                'Return to Kash Chain and paste the address below',
            ],
            warnings: [
                'Verify network is Polygon before copying',
                'Check minimum deposit requirements',
                'Deposits typically arrive in 5-15 minutes',
            ],
        },
        bybit: {
            name: 'Bybit',
            icon: '🟣',
            color: '#F7A600',
            steps: [
                'Open Bybit app or website',
                'Go to: Assets → Deposit',
                'Select coin: USDT',
                'Select Chain: Polygon',
                'IMPORTANT: Must select Polygon chain',
                'Copy your Polygon deposit address',
                'Return to Kash Chain and paste the address below',
            ],
            warnings: [
                'Double-check Polygon chain is selected',
                'Be aware of minimum deposit amounts',
                'Usually takes 10-20 minutes to confirm',
            ],
        },
        metamask: {
            name: 'MetaMask',
            icon: '🦊',
            color: '#F6851B',
            steps: [
                'Open MetaMask app or extension',
                'Make sure you are on Polygon network (check top of screen)',
                'If not on Polygon, tap network selector and choose "Polygon Mainnet"',
                'Tap your account name to copy address',
                'Or tap the three dots → Account details → Copy address',
                'Return to Kash Chain and paste the address below',
            ],
            warnings: [
                'Ensure MetaMask is set to Polygon network',
                'Sending from wrong network will lose funds',
                'Gas fees are very low on Polygon',
            ],
        },
        trust: {
            name: 'Trust Wallet',
            icon: '💙',
            color: '#3375BB',
            steps: [
                'Open Trust Wallet app',
                'Tap on USDT in your wallet',
                'Make sure it says "Polygon" under USDT',
                'If you see multiple USDT, choose the Polygon one',
                'Tap "Receive"',
                'Copy your Polygon USDT address',
                'Return to Kash Chain and paste the address below',
            ],
            warnings: [
                'Trust Wallet shows multiple USDT - choose Polygon',
                'Look for purple Polygon icon',
                'Transfers are usually fast (2-5 minutes)',
            ],
        },
    };

    const guide = guides[params.exchange] || guides.binance;

    const handleContinue = () => {
        if (!address) return;

        router.push({
            pathname: '/send/external/amount',
            params: {
                address: address,
                exchange: params.exchange,
            },
        });
    };

    return (
        <VStack backgroundColor="$white" flex={1}>
            {/* Header */}
            <Box backgroundColor={guide.color} paddingTop={50} paddingBottom={24}>
                <VStack paddingHorizontal={20}>
                    <HStack alignItems="center" marginBottom={16}>
                        <Pressable onPress={() => router.back()} marginRight={16}>
                            <Ionicons name="arrow-back" size={24} color="white" />
                        </Pressable>
                        <Text fontSize={32} marginRight={12}>
                            {guide.icon}
                        </Text>
                        <VStack flex={1}>
                            <Text fontSize={24} fontWeight="700" color="white">
                                {guide.name}
                            </Text>
                            <Text fontSize={14} color="rgba(255, 255, 255, 0.9)">
                                Deposit Guide
                            </Text>
                        </VStack>
                    </HStack>
                </VStack>
            </Box>

            <ScrollView>
                <VStack paddingHorizontal={24} paddingTop={32} paddingBottom={180}>
                    {/* Steps */}
                    <Text fontSize={18} fontWeight="600" color={Colors.dark} marginBottom={16}>
                        Follow These Steps:
                    </Text>

                    <VStack space="md" marginBottom={32}>
                        {guide.steps.map((step, index) => (
                            <Box
                                key={index}
                                backgroundColor={step.includes('CRITICAL') || step.includes('IMPORTANT') ? '#FEF3C7' : '#F9FAFB'}
                                borderRadius={12}
                                padding={16}
                                borderWidth={1}
                                borderColor={step.includes('CRITICAL') || step.includes('IMPORTANT') ? '#F59E0B' : '#E5E7EB'}
                            >
                                <HStack space="sm" alignItems="flex-start">
                                    <Box
                                        width={28}
                                        height={28}
                                        borderRadius={14}
                                        backgroundColor={step.includes('CRITICAL') || step.includes('IMPORTANT') ? '#F59E0B' : guide.color}
                                        alignItems="center"
                                        justifyContent="center"
                                    >
                                        <Text fontSize={14} fontWeight="700" color="white">
                                            {index + 1}
                                        </Text>
                                    </Box>
                                    <Text fontSize={14} color={Colors.dark} flex={1} lineHeight={20}>
                                        {step}
                                    </Text>
                                </HStack>
                            </Box>
                        ))}
                    </VStack>

                    {/* Warning Box */}
                    <Box
                        backgroundColor="#FEE2E2"
                        borderRadius={12}
                        padding={16}
                        borderWidth={1}
                        borderColor={Colors.error}
                        marginBottom={32}
                    >
                        <HStack space="sm" alignItems="flex-start" marginBottom={12}>
                            <Ionicons name="warning" size={24} color={Colors.error} />
                            <Text fontSize={16} fontWeight="700" color="#7F1D1D" flex={1}>
                                Important Warnings
                            </Text>
                        </HStack>
                        <VStack space="xs">
                            {guide.warnings.map((warning, index) => (
                                <HStack key={index} space="xs" alignItems="flex-start">
                                    <Text fontSize={13} color="#7F1D1D">•</Text>
                                    <Text fontSize={13} color="#7F1D1D" flex={1}>
                                        {warning}
                                    </Text>
                                </HStack>
                            ))}
                        </VStack>
                    </Box>

                    {/* Address Input */}
                    <Text fontSize={18} fontWeight="600" color={Colors.dark} marginBottom={16}>
                        Paste Your {guide.name} Address
                    </Text>

                    <VStack space="sm" marginBottom={24}>
                        <Input
                            borderColor={address.length > 10 ? guide.color : '#E5E7EB'}
                            borderWidth={2}
                            borderRadius={12}
                            height={56}
                        >
                            <InputField
                                placeholder="0x..."
                                value={address}
                                onChangeText={setAddress}
                                fontSize={14}
                            />
                        </Input>
                        <Text fontSize={12} color={Colors.grey}>
                            Make sure this is your Polygon network address from {guide.name}
                        </Text>
                    </VStack>

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
                                After entering your address, you'll be able to enter the amount to send. Network fees on Polygon are typically very low (less than $0.01).
                            </Text>
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
                    backgroundColor={address.length > 10 ? guide.color : '#E5E7EB'}
                    borderRadius={50}
                    height={56}
                    width="$full"
                    onPress={handleContinue}
                    disabled={address.length <= 10}
                >
                    <Text color={address.length > 10 ? '$white' : '#8E8E93'} fontSize={16} fontWeight={600}>
                        Continue to Amount
                    </Text>
                </Button>
            </Box>
        </VStack>
    );
};

export default ExchangeGuideScreen;
