import React, { useState } from 'react';
import { ScrollView, RefreshControl } from 'react-native';
import { VStack, HStack, Text, Box, Pressable } from '@gluestack-ui/themed';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { colors, spacing, borderRadius, fonts } from '@/src/constants/theme';
import { useCurrentUser } from '@/src/hooks/useCurrentUser';

const WalletHome = () => {
    const { user } = useCurrentUser();
    const [hideBalance, setHideBalance] = useState(false);
    const [refreshing, setRefreshing] = useState(false);

    // Mock data - will be replaced with real data from API
    const mockBalance = {
        usdt: 1234.56,
        kes: 164608.00 // ~133.33 KES per USDT
    };

    const mockRecentTransactions = [
        {
            id: '1',
            type: 'receive' as const,
            amount: 50.00,
            currency: 'USDT' as const,
            recipientOrSender: 'John Doe',
            timestamp: new Date(Date.now() - 1000 * 60 * 30), // 30 mins ago
            status: 'completed' as const
        },
        {
            id: '2',
            type: 'send' as const,
            amount: 25.50,
            currency: 'USDT' as const,
            recipientOrSender: 'Jane Smith',
            timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2), // 2 hours ago
            status: 'completed' as const
        },
        {
            id: '3',
            type: 'buy' as const,
            amount: 100.00,
            currency: 'USDT' as const,
            timestamp: new Date(Date.now() - 1000 * 60 * 60 * 5), // 5 hours ago
            status: 'completed' as const
        }
    ];

    const onRefresh = () => {
        setRefreshing(true);
        setTimeout(() => setRefreshing(false), 1000);
    };

    const formatTime = (date: Date) => {
        const now = new Date();
        const diffMs = now.getTime() - date.getTime();
        const diffMins = Math.floor(diffMs / 60000);
        const diffHours = Math.floor(diffMs / 3600000);

        if (diffMins < 1) return 'Just now';
        if (diffMins < 60) return `${diffMins}m ago`;
        if (diffHours < 24) return `${diffHours}h ago`;
        return date.toLocaleDateString('en-KE', { month: 'short', day: 'numeric' });
    };

    return (
        <ScrollView
            style={{ flex: 1, backgroundColor: colors.background.secondary }}
            refreshControl={
                <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
            }
        >
            <VStack flex={1} paddingBottom={spacing['4xl']}>
                {/* Clean Header */}
                <Box
                    paddingTop={spacing['4xl'] + 16}
                    paddingBottom={spacing.xl}
                    paddingHorizontal={spacing.lg}
                >
                    <HStack justifyContent="space-between" alignItems="center">
                        <VStack>
                            <Text fontSize={fonts.sizes.sm} color={colors.text.secondary}>
                                Welcome back,
                            </Text>
                            <Text fontSize={fonts.sizes['2xl']} fontWeight={fonts.weights.bold} color={colors.text.primary}>
                                {user?.firstName || 'User'}
                            </Text>
                        </VStack>
                        <HStack space="md">
                            <Pressable onPress={() => console.log('Notifications')}>
                                <Box position="relative">
                                    <Ionicons name="notifications-outline" size={24} color={colors.text.primary} />
                                    <Box
                                        position="absolute"
                                        top={-2}
                                        right={-2}
                                        width={8}
                                        height={8}
                                        borderRadius={4}
                                        backgroundColor={colors.secondary.main}
                                    />
                                </Box>
                            </Pressable>
                        </HStack>
                    </HStack>
                </Box>

                {/* Balance Card - Enhanced Design */}
                <Box paddingHorizontal={spacing.lg}>
                    <Box
                        backgroundColor={colors.primary.main}
                        borderRadius={24}
                        padding={24}
                        style={{
                            shadowColor: '#000',
                            shadowOffset: { width: 0, height: 4 },
                            shadowOpacity: 0.15,
                            shadowRadius: 12,
                            elevation: 8,
                        }}
                    >
                        <HStack justifyContent="space-between" alignItems="flex-start" marginBottom={spacing.lg}>
                            <VStack>
                                <Text fontSize={14} color="rgba(255, 255, 255, 0.8)">
                                    Total Balance
                                </Text>
                                {hideBalance ? (
                                    <Text fontSize={36} fontWeight="700" color={colors.neutral.white} marginTop={spacing.xs}>
                                        ••••••
                                    </Text>
                                ) : (
                                    <VStack marginTop={spacing.xs}>
                                        <HStack alignItems="flex-end" space="xs">
                                            <Text fontSize={36} fontWeight="700" color={colors.neutral.white}>
                                                {mockBalance.usdt.toFixed(2)}
                                            </Text>
                                            <Text fontSize={18} fontWeight="600" color="rgba(255, 255, 255, 0.9)" marginBottom={8}>
                                                USDT
                                            </Text>
                                        </HStack>
                                        <Text fontSize={14} color="rgba(255, 255, 255, 0.7)" marginTop={4}>
                                            ≈ KES {mockBalance.kes.toLocaleString('en-KE', { minimumFractionDigits: 2 })}
                                        </Text>
                                    </VStack>
                                )}
                            </VStack>
                            <Pressable onPress={() => setHideBalance(!hideBalance)}>
                                <Box
                                    backgroundColor={hideBalance ? "#F59E0B" : "rgba(255, 255, 255, 0.2)"}
                                    borderRadius={borderRadius.full}
                                    padding={10}
                                    width={44}
                                    height={44}
                                    alignItems="center"
                                    justifyContent="center"
                                >
                                    <Ionicons
                                        name={hideBalance ? "eye-off" : "eye-outline"}
                                        size={24}
                                        color="white"
                                    />
                                </Box>
                            </Pressable>
                        </HStack>

                        {/* Action Buttons Inside Card - 3 Equal Width Buttons */}
                        <HStack space="sm">
                            <Box flex={1}>
                                <Pressable
                                    onPress={() => router.push('/send/menu')}
                                    backgroundColor="#F59E0B"
                                    borderRadius={12}
                                    height={64}
                                    alignItems="center"
                                    justifyContent="center"
                                >
                                    <Ionicons name="arrow-up" size={24} color="white" />
                                    <Text fontSize={14} fontWeight="500" color="white" marginTop={6}>
                                        Send
                                    </Text>
                                </Pressable>
                            </Box>
                            <Box flex={1}>
                                <Pressable
                                    onPress={() => router.push('/receive/menu')}
                                    backgroundColor="rgba(255, 255, 255, 0.2)"
                                    borderRadius={12}
                                    height={64}
                                    alignItems="center"
                                    justifyContent="center"
                                >
                                    <Ionicons name="arrow-down" size={24} color="white" />
                                    <Text fontSize={14} fontWeight="500" color="white" marginTop={6}>
                                        Receive
                                    </Text>
                                </Pressable>
                            </Box>
                            <Box flex={1}>
                                <Pressable
                                    onPress={() => router.push('/main/merchants/pay-menu')}
                                    backgroundColor="rgba(255, 255, 255, 0.2)"
                                    borderRadius={12}
                                    height={64}
                                    alignItems="center"
                                    justifyContent="center"
                                >
                                    <Ionicons name="storefront" size={24} color="white" />
                                    <Text fontSize={14} fontWeight="500" color="white" marginTop={6}>
                                        Pay
                                    </Text>
                                </Pressable>
                            </Box>
                        </HStack>
                    </Box>
                </Box>

                {/* Quick Stats - Enhanced */}
                <HStack space="md" paddingHorizontal={spacing.lg} marginTop={spacing.lg}>
                    <Box
                        flex={1}
                        backgroundColor="#F9FAFB"
                        borderRadius={12}
                        padding={16}
                        borderWidth={1}
                        borderColor="#E5E7EB"
                    >
                        <Text fontSize={12} color="#8E8E93">
                            This Month
                        </Text>
                        <Text fontSize={20} fontWeight="700" color={colors.success.main} marginTop={4}>
                            +$345
                        </Text>
                    </Box>
                    <Box
                        flex={1}
                        backgroundColor="#F9FAFB"
                        borderRadius={12}
                        padding={16}
                        borderWidth={1}
                        borderColor="#E5E7EB"
                    >
                        <Text fontSize={12} color="#8E8E93">
                            Transactions
                        </Text>
                        <Text fontSize={20} fontWeight="700" color="#1C1C1E" marginTop={4}>
                            28
                        </Text>
                    </Box>
                </HStack>

                {/* Recent Transactions - Enhanced */}
                <Box paddingHorizontal={spacing.lg} marginTop={spacing.xl}>
                    <HStack justifyContent="space-between" alignItems="center" marginBottom={16}>
                        <Text fontSize={18} fontWeight="600" color="#1C1C1E">
                            Recent Activity
                        </Text>
                        <Pressable onPress={() => console.log('View All')}>
                            <Text fontSize={14} fontWeight="500" color={colors.primary.main}>
                                View All
                            </Text>
                        </Pressable>
                    </HStack>

                    <VStack space="xs">
                        {mockRecentTransactions.map((transaction) => {
                            const isPositive = transaction.type === 'receive' || transaction.type === 'buy';
                            const icon = transaction.type === 'receive' ? 'arrow-down' :
                                transaction.type === 'send' ? 'arrow-up' : 'add';
                            const iconColor = transaction.type === 'receive' ? '#22C55E' :
                                transaction.type === 'send' ? '#DC2626' : '#22C55E';

                            return (
                                <Pressable key={transaction.id}>
                                    <Box
                                        backgroundColor="white"
                                        borderRadius={12}
                                        padding={16}
                                        borderWidth={1}
                                        borderColor="#E5E7EB"
                                        style={{
                                            shadowColor: '#000',
                                            shadowOffset: { width: 0, height: 1 },
                                            shadowOpacity: 0.05,
                                            shadowRadius: 2,
                                            elevation: 1,
                                        }}
                                    >
                                        <HStack justifyContent="space-between" alignItems="center">
                                            <HStack space="md" alignItems="center" flex={1}>
                                                <Box
                                                    width={44}
                                                    height={44}
                                                    borderRadius={22}
                                                    backgroundColor={`${iconColor}15`}
                                                    alignItems="center"
                                                    justifyContent="center"
                                                >
                                                    <Ionicons name={icon as any} size={20} color={iconColor} />
                                                </Box>
                                                <VStack flex={1}>
                                                    <Text fontSize={14} fontWeight="600" color="#1C1C1E">
                                                        {transaction.type === 'send' ? `Sent to ${transaction.recipientOrSender}` :
                                                            transaction.type === 'receive' ? `Received from ${transaction.recipientOrSender}` :
                                                                'Bought USDT'}
                                                    </Text>
                                                    <Text fontSize={12} color="#8E8E93" marginTop={2}>
                                                        {formatTime(transaction.timestamp)}
                                                    </Text>
                                                </VStack>
                                            </HStack>
                                            <Text
                                                fontSize={16}
                                                fontWeight="600"
                                                color={isPositive ? '#22C55E' : '#DC2626'}
                                            >
                                                {isPositive ? '+' : '-'}{transaction.amount.toFixed(2)} {transaction.currency}
                                            </Text>
                                        </HStack>
                                    </Box>
                                </Pressable>
                            );
                        })}
                    </VStack>
                </Box>
            </VStack>
        </ScrollView>
    );
};

export default WalletHome;
