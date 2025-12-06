import React from 'react';
import { ScrollView } from 'react-native';
import { VStack, HStack, Text, Box, Pressable } from '@gluestack-ui/themed';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { Colors } from '@/src/constants/Colors';

interface ReceiveOption {
    id: string;
    title: string;
    subtitle: string;
    icon: keyof typeof Ionicons.glyphMap;
    route: string;
    iconBg: string;
}

const ReceiveMenu = () => {
    const receiveOptions: ReceiveOption[] = [
        {
            id: '1',
            title: 'From Kash Chain User',
            subtitle: 'Show your QR code or wallet address',
            icon: 'qr-code',
            route: '/receive/from-user',
            iconBg: '#1E40AF'
        },
        {
            id: '2',
            title: 'From External Wallet',
            subtitle: 'Receive from Binance, MetaMask, etc',
            icon: 'wallet',
            route: '/receive/external',
            iconBg: '#F59E0B'
        },
        {
            id: '3',
            title: 'Buy with M-Pesa',
            subtitle: 'Buy USDT using M-Pesa (KES)',
            icon: 'phone-portrait',
            route: '/receive/buy-mpesa/amount-with-rate',
            iconBg: '#22C55E'
        },
        {
            id: '4',
            title: 'Buy with Cash',
            subtitle: 'Buy USDT at agent with cash',
            icon: 'cash',
            route: '/receive/buy-cash/agent-select',
            iconBg: '#8B5CF6'
        },
    ];

    return (
        <ScrollView style={{ flex: 1, backgroundColor: '#F5F5F5' }}>
            <VStack flex={1} paddingBottom={32}>
                {/* Header */}
                <Box backgroundColor={Colors.primary.DEFAULT} paddingTop={50} paddingBottom={24}>
                    <VStack paddingHorizontal={20}>
                        <HStack alignItems="center" marginBottom={16}>
                            <Pressable onPress={() => router.back()} marginRight={16}>
                                <Ionicons name="arrow-back" size={24} color="white" />
                            </Pressable>
                            <Text fontSize={24} fontWeight="700" color="white">
                                Receive Money
                            </Text>
                        </HStack>
                        <Text fontSize={14} color="rgba(255, 255, 255, 0.8)">
                            Choose how you want to receive USDT
                        </Text>
                    </VStack>
                </Box>

                {/* Receive Options */}
                <VStack paddingHorizontal={20} marginTop={24} space="md">
                    {receiveOptions.map((option) => (
                        <Pressable key={option.id} onPress={() => router.push(option.route as any)}>
                            <Box
                                backgroundColor="white"
                                borderRadius={16}
                                padding={20}
                                borderWidth={1}
                                borderColor={Colors.lightGrey}
                                style={{
                                    shadowColor: '#000',
                                    shadowOffset: { width: 0, height: 2 },
                                    shadowOpacity: 0.05,
                                    shadowRadius: 4,
                                    elevation: 2,
                                }}
                            >
                                <HStack space="md" alignItems="center">
                                    {/* Icon */}
                                    <Box
                                        width={56}
                                        height={56}
                                        borderRadius={28}
                                        backgroundColor={`${option.iconBg}15`}
                                        alignItems="center"
                                        justifyContent="center"
                                    >
                                        <Ionicons name={option.icon} size={28} color={option.iconBg} />
                                    </Box>

                                    {/* Text */}
                                    <VStack flex={1}>
                                        <Text fontSize={16} fontWeight="600" color={Colors.dark}>
                                            {option.title}
                                        </Text>
                                        <Text fontSize={13} color={Colors.grey} marginTop={4}>
                                            {option.subtitle}
                                        </Text>
                                    </VStack>

                                    {/* Arrow */}
                                    <Ionicons name="chevron-forward" size={20} color={Colors.grey} />
                                </HStack>
                            </Box>
                        </Pressable>
                    ))}
                </VStack>
            </VStack>
        </ScrollView>
    );
};

export default ReceiveMenu;
