import React from 'react';
import { ScrollView } from 'react-native';
import { VStack, HStack, Text, Box, Pressable } from '@gluestack-ui/themed';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { Colors } from '@/src/constants/Colors';

interface SelectionOption {
    title: string;
    description: string;
    icon: keyof typeof Ionicons.glyphMap;
    route: string;
    iconBg: string;
}

const AgentSelect = () => {
    const selectionOptions: SelectionOption[] = [
        {
            title: 'Scan Agent QR',
            description: 'At agent location',
            icon: 'qr-code',
            route: '/send/cash-pickup/scan-qr',
            iconBg: '#1E40AF'
        },
        {
            title: 'Enter Agent Code',
            description: 'Ask agent for their code',
            icon: 'keypad',
            route: '/send/cash-pickup/enter-code',
            iconBg: 'Colors.secondary.DEFAULT'
        },
        {
            title: 'Select from List',
            description: 'Browse nearby agents',
            icon: 'list',
            route: '/send/cash-pickup/agent-list',
            iconBg: '#10B981'
        }
    ];

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
                            Cash Pickup
                        </Text>
                    </HStack>
                    <Text fontSize={14} color="rgba(255, 255, 255, 0.9)">
                        Withdraw cash from an agent
                    </Text>
                </VStack>
            </Box>

            <ScrollView>
                <VStack paddingHorizontal={24} paddingTop={32} paddingBottom={32} space="lg">
                    <Text fontSize={18} fontWeight="600" color={Colors.dark}>
                        How would you like to select an agent?
                    </Text>

                    {/* Selection Options */}
                    <VStack space="md">
                        {selectionOptions.map((option, index) => (
                            <Pressable
                                key={index}
                                onPress={() => router.push(option.route)}
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
                                        shadowOpacity: 0.1,
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
                                            <Ionicons
                                                name={option.icon}
                                                size={28}
                                                color={option.iconBg}
                                            />
                                        </Box>
                                        <VStack flex={1}>
                                            <Text fontSize={16} fontWeight="600" color={Colors.dark}>
                                                {option.title}
                                            </Text>
                                            <Text fontSize={14} color={Colors.grey} marginTop={2}>
                                                {option.description}
                                            </Text>
                                        </VStack>
                                        <Ionicons name="chevron-forward" size={24} color={Colors.grey} />
                                    </HStack>
                                </Box>
                            </Pressable>
                        ))}
                    </VStack>

                    {/* Info Card */}
                    <Box
                        backgroundColor="rgba(245, 158, 11, 0.08)"
                        borderRadius={12}
                        padding={16}
                        borderWidth={1}
                        borderColor={Colors.secondary.DEFAULT}
                        marginTop={8}
                    >
                        <HStack space="sm" alignItems="flex-start">
                            <Ionicons name="information-circle" size={20} color={Colors.secondary.DEFAULT} />
                            <VStack flex={1}>
                                <Text fontSize={14} fontWeight="600" color="#5B21B6" marginBottom={4}>
                                    How Cash Pickup Works
                                </Text>
                                <Text fontSize={13} color="#5B21B6">
                                    1. Select an agent near you{'\n'}
                                    2. Enter amount to withdraw{'\n'}
                                    3. Receive a pickup code{'\n'}
                                    4. Visit agent with code & ID{'\n'}
                                    5. Collect your cash
                                </Text>
                            </VStack>
                        </HStack>
                    </Box>
                </VStack>
            </ScrollView>
        </VStack>
    );
};

export default AgentSelect;
