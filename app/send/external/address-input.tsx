import React, { useState } from 'react';
import { ScrollView } from 'react-native';
import { VStack, HStack, Text, Box, Pressable, Input, InputField } from '@gluestack-ui/themed';
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

const AddressInput = () => {
    const [selectedExchange, setSelectedExchange] = useState<string | null>(null);
    const [address, setAddress] = useState('');

    const exchanges: Exchange[] = [
        { id: 'binance', name: 'Binance', icon: '🟡', color: '#F3BA2F' },
        { id: 'okx', name: 'OKX', icon: '⚫', color: '#000000' },
        { id: 'bybit', name: 'Bybit', icon: '🟣', color: '#F7A600' },
        { id: 'metamask', name: 'MetaMask', icon: '🦊', color: '#F6851B' },
        { id: 'trust', name: 'Trust Wallet', icon: '💙', color: '#3375BB' },
    ];

    const handleExchangeSelect = (exchangeId: string) => {
        setSelectedExchange(exchangeId);
        router.push({
            pathname: '/send/external/exchange-guide',
            params: { exchange: exchangeId }
        });
    };

    const handleManualContinue = () => {
        if (!address) return;

        router.push({
            pathname: '/send/external/amount',
            params: {
                address: address,
                exchange: 'manual'
            }
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
                            Send to External Wallet
                        </Text>
                    </HStack>
                    <Text fontSize={14} color="rgba(255, 255, 255, 0.9)">
                        Select destination or enter address
                    </Text>
                </VStack>
            </Box>

            <ScrollView>
                <VStack paddingHorizontal={24} paddingTop={32} paddingBottom={32}>
                    {/* Exchange Selection */}
                    <Text fontSize={18} fontWeight="600" color={Colors.dark} marginBottom={16}>
                        Select Exchange
                    </Text>
                    <Text fontSize={14} color={Colors.grey} marginBottom={16}>
                        Get step-by-step instructions for your exchange
                    </Text>

                    <VStack space="md" marginBottom={32}>
                        {exchanges.map((exchange) => (
                            <Pressable
                                key={exchange.id}
                                onPress={() => handleExchangeSelect(exchange.id)}
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
                                                View deposit guide
                                            </Text>
                                        </VStack>
                                        <Ionicons name="chevron-forward" size={20} color={Colors.grey} />
                                    </HStack>
                                </Box>
                            </Pressable>
                        ))}
                    </VStack>

                    {/* Manual Address Entry */}
                    <Box height={1} backgroundColor={Colors.lightGrey} marginBottom={32} />

                    <Text fontSize={18} fontWeight="600" color={Colors.dark} marginBottom={16}>
                        Or Enter Address Manually
                    </Text>

                    <VStack space="sm" marginBottom={24}>
                        <Text fontSize={14} fontWeight="600" color={Colors.dark}>
                            Polygon Wallet Address
                        </Text>
                        <Input
                            borderColor={Colors.lightGrey}
                            borderWidth={1}
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
                            Only send to Polygon network addresses
                        </Text>
                    </VStack>

                    <Button
                        backgroundColor={address.length > 10 ? '#F59E0B' : '#E5E7EB'}
                        borderRadius={50}
                        height={56}
                        width="$full"
                        onPress={handleManualContinue}
                        disabled={address.length <= 10}
                    >
                        <Text color={address.length > 10 ? '$white' : '#8E8E93'} fontSize={16} fontWeight={600}>
                            Continue with Manual Address
                        </Text>
                    </Button>

                    {/* Warning */}
                    <Box
                        backgroundColor="#FEE2E2"
                        borderRadius={12}
                        padding={16}
                        borderWidth={1}
                        borderColor={Colors.error}
                        marginTop={24}
                    >
                        <HStack space="sm" alignItems="flex-start">
                            <Ionicons name="warning" size={20} color={Colors.error} />
                            <VStack flex={1}>
                                <Text fontSize={14} fontWeight="600" color="#7F1D1D" marginBottom={4}>
                                    Important Warning
                                </Text>
                                <Text fontSize={13} color="#7F1D1D">
                                    Only send USDT to Polygon network addresses. Sending to wrong network will result in permanent loss of funds.
                                </Text>
                            </VStack>
                        </HStack>
                    </Box>
                </VStack>
            </ScrollView>
        </VStack>
    );
};

export default AddressInput;
