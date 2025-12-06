import React from 'react';
import { ScrollView } from 'react-native';
import { VStack, HStack, Text, Box, Pressable } from '@gluestack-ui/themed';
import { router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '@/src/constants/Colors';

interface PayOption {
    title: string;
    description: string;
    icon: string;
    route: string;
    iconBg: string;
}

const PayMenu = () => {
    const payOptions: PayOption[] = [
        {
            title: 'Scan QR Code',
            description: 'Scan merchant\'s QR code to pay',
            icon: 'qr-code',
            route: '/main/merchants/scan-qr',
            iconBg: '#1E40AF'
        },
        {
            title: 'Enter Merchant Code',
            description: 'Enter 6-digit merchant code',
            icon: 'keypad',
            route: '/main/merchants/enter-code',
            iconBg: '#F59E0B'
        },
        {
            title: 'Select from List',
            description: 'Choose from nearby merchants',
            icon: 'list',
            route: '/main/merchants',
            iconBg: '#8B5CF6'
        },
    ];

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
                            Pay Merchant
                        </Text>
                    </HStack>
                    <Text fontSize={14} color="rgba(255, 255, 255, 0.9)">
                        Choose how to pay
                    </Text>
                </VStack>
            </Box>

            <ScrollView>
                <VStack paddingHorizontal={24} paddingTop={24} space="md">
                    {payOptions.map((option, index) => (
                        <Pressable
                            key={index}
                            onPress={() => router.push(option.route as any)}
                        >
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
                                    <Box
                                        width={56}
                                        height={56}
                                        borderRadius={28}
                                        backgroundColor={`${option.iconBg}15`}
                                        alignItems="center"
                                        justifyContent="center"
                                    >
                                        <Ionicons name={option.icon as any} size={28} color={option.iconBg} />
                                    </Box>
                                    <VStack flex={1}>
                                        <Text fontSize={17} fontWeight="600" color={Colors.dark} marginBottom={4}>
                                            {option.title}
                                        </Text>
                                        <Text fontSize={14} color={Colors.grey}>
                                            {option.description}
                                        </Text>
                                    </VStack>
                                    <Ionicons name="chevron-forward" size={24} color={Colors.grey} />
                                </HStack>
                            </Box>
                        </Pressable>
                    ))}
                </VStack>

                {/* Info Box */}
                <Box paddingHorizontal={24} marginTop={24}>
                    <Box
                        backgroundColor="#DBEAFE"
                        borderRadius={12}
                        padding={16}
                        borderWidth={1}
                        borderColor="#3B82F6"
                    >
                        <HStack space="sm" alignItems="flex-start">
                            <Ionicons name="information-circle" size={20} color="#3B82F6" />
                            <VStack flex={1}>
                                <Text fontSize={14} fontWeight="600" color="#1E3A8A" marginBottom={4}>
                                    About Merchant Payments
                                </Text>
                                <Text fontSize={13} color="#1E3A8A">
                                    Pay at thousands of merchants across Kenya using your USDT. All transactions are instant and secure.
                                </Text>
                            </VStack>
                        </HStack>
                    </Box>
                </Box>
            </ScrollView>
        </VStack>
    );
};

export default PayMenu;
