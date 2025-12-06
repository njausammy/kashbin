import React from 'react';
import { ScrollView } from 'react-native';
import { VStack, HStack, Text, Box, Pressable } from '@gluestack-ui/themed';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { Colors } from '@/src/constants/Colors';

interface SendOption {
    id: string;
    title: string;
    subtitle: string;
    icon: keyof typeof Ionicons.glyphMap;
    route: string;
    iconBg: string;
}

const SendMenu = () => {
    const sendOptions: SendOption[] = [
        {
            id: '1',
            title: 'To Kash Chain User',
            subtitle: 'Send USDT to another Kash Chain user',
            icon: 'people',
            route: '/send/p2p/phone-input',
            iconBg: '#1E40AF'
        },
        {
            id: '2',
            title: 'To External Wallet',
            subtitle: 'Send to any Polygon wallet address',
            icon: 'wallet',
            route: '/send/external/address-input',
            iconBg: '#F59E0B'
        },
        {
            id: '3',
            title: 'To M-Pesa',
            subtitle: 'Cash out USDT to M-Pesa (KES)',
            icon: 'phone-portrait',
            route: '/send/mpesa/phone-input',
            iconBg: '#22C55E'
        },
        {
            id: '4',
            title: 'Via Pesa Link',
            subtitle: 'Send to a Pesa Link number',
            icon: 'link',
            route: '/send/pesa-link/link-input',
            iconBg: '#F97316'
        },
        {
            id: '5',
            title: 'Cash Pickup',
            subtitle: 'Generate code for cash pickup at agent',
            icon: 'cash',
            route: '/send/cash-pickup/agent-select',
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
                                Send Money
                            </Text>
                        </HStack>
                        <Text fontSize={14} color="rgba(255, 255, 255, 0.8)">
                            Choose how you want to send your USDT
                        </Text>
                    </VStack>
                </Box>

                {/* Send Options */}
                <VStack paddingHorizontal={20} marginTop={24} space="md">
                    {sendOptions.map((option) => (
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

export default SendMenu;
