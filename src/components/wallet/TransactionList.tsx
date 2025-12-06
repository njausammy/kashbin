import React from 'react';
import { VStack, HStack, Text, Box, Pressable, ScrollView } from '@gluestack-ui/themed';
import { Ionicons } from '@expo/vector-icons';
import { colors, spacing, borderRadius, fonts } from '@/src/constants/theme';

interface Transaction {
    id: string;
    type: 'send' | 'receive' | 'buy' | 'cash-out' | 'merchant-payment';
    amount: number;
    currency: 'USDT' | 'KES';
    recipientOrSender?: string;
    timestamp: Date;
    status: 'pending' | 'completed' | 'failed';
}

interface TransactionListProps {
    transactions: Transaction[];
    onTransactionPress?: (transaction: Transaction) => void;
}

const TransactionItem: React.FC<{
    transaction: Transaction;
    onPress?: () => void;
}> = ({ transaction, onPress }) => {
    const getTransactionIcon = () => {
        switch (transaction.type) {
            case 'send':
                return { name: 'arrow-up-circle', color: colors.transaction.send };
            case 'receive':
                return { name: 'arrow-down-circle', color: colors.transaction.receive };
            case 'buy':
                return { name: 'add-circle', color: colors.transaction.buy };
            case 'cash-out':
                return { name: 'cash', color: colors.transaction.cashOut };
            case 'merchant-payment':
                return { name: 'storefront', color: colors.transaction.merchant };
            default:
                return { name: 'swap-horizontal', color: colors.neutral.elephantGrey };
        }
    };

    const getTransactionTitle = () => {
        switch (transaction.type) {
            case 'send':
                return `Sent to ${transaction.recipientOrSender || 'Unknown'}`;
            case 'receive':
                return `Received from ${transaction.recipientOrSender || 'Unknown'}`;
            case 'buy':
                return 'Bought USDT';
            case 'cash-out':
                return 'Cashed Out';
            case 'merchant-payment':
                return `Paid ${transaction.recipientOrSender || 'Merchant'}`;
            default:
                return 'Transaction';
        }
    };

    const getStatusColor = () => {
        switch (transaction.status) {
            case 'completed':
                return colors.status.completed;
            case 'pending':
                return colors.status.pending;
            case 'failed':
                return colors.status.failed;
            default:
                return colors.neutral.elephantGrey;
        }
    };

    const formatAmount = () => {
        const prefix = transaction.type === 'receive' || transaction.type === 'buy' ? '+' : '-';
        return `${prefix}${transaction.amount.toFixed(2)} ${transaction.currency}`;
    };

    const formatTime = () => {
        const now = new Date();
        const txDate = new Date(transaction.timestamp);
        const diffMs = now.getTime() - txDate.getTime();
        const diffMins = Math.floor(diffMs / 60000);
        const diffHours = Math.floor(diffMs / 3600000);
        const diffDays = Math.floor(diffMs / 86400000);

        if (diffMins < 1) return 'Just now';
        if (diffMins < 60) return `${diffMins}m ago`;
        if (diffHours < 24) return `${diffHours}h ago`;
        if (diffDays < 7) return `${diffDays}d ago`;
        return txDate.toLocaleDateString('en-KE', { month: 'short', day: 'numeric' });
    };

    const icon = getTransactionIcon();
    const isPositive = transaction.type === 'receive' || transaction.type === 'buy';

    return (
        <Pressable onPress={onPress}>
            <HStack
                paddingVertical={spacing.md}
                paddingHorizontal={spacing.md}
                alignItems="center"
                justifyContent="space-between"
                borderBottomWidth={1}
                borderBottomColor={colors.border.light}
            >
                {/* Icon and Details */}
                <HStack space="md" alignItems="center" flex={1}>
                    <Box
                        width={44}
                        height={44}
                        borderRadius={22}
                        backgroundColor={`${icon.color}15`}
                        alignItems="center"
                        justifyContent="center"
                    >
                        <Ionicons name={icon.name as any} size={24} color={icon.color} />
                    </Box>

                    <VStack flex={1}>
                        <Text fontSize={fonts.sizes.md} fontWeight={fonts.weights.semibold} color={colors.text.primary} numberOfLines={1}>
                            {getTransactionTitle()}
                        </Text>
                        <HStack space="xs" alignItems="center">
                            <Text fontSize={fonts.sizes.xs} color={colors.text.secondary}>
                                {formatTime()}
                            </Text>
                            {transaction.status === 'pending' && (
                                <>
                                    <Text fontSize={fonts.sizes.xs} color={colors.text.secondary}>•</Text>
                                    <Text fontSize={fonts.sizes.xs} color={getStatusColor()} fontWeight={fonts.weights.medium}>
                                        Pending
                                    </Text>
                                </>
                            )}
                        </HStack>
                    </VStack>
                </HStack>

                {/* Amount */}
                <Text
                    fontSize={fonts.sizes.md}
                    fontWeight={fonts.weights.semibold}
                    color={isPositive ? colors.transaction.receive : colors.transaction.send}
                >
                    {formatAmount()}
                </Text>
            </HStack>
        </Pressable>
    );
};

const TransactionList: React.FC<TransactionListProps> = ({
    transactions,
    onTransactionPress
}) => {
    if (transactions.length === 0) {
        return (
            <Box paddingVertical={spacing['3xl']} alignItems="center">
                <Ionicons name="receipt-outline" size={48} color={colors.neutral.lightGrey} />
                <Text fontSize={fonts.sizes.md} color={colors.text.secondary} marginTop={spacing.md} textAlign="center">
                    No transactions yet
                </Text>
                <Text fontSize={fonts.sizes.sm} color={colors.neutral.lightGrey} marginTop={spacing.xs} textAlign="center">
                    Your transactions will appear here
                </Text>
            </Box>
        );
    }

    return (
        <VStack backgroundColor={colors.background.primary} borderRadius={borderRadius.xl} marginHorizontal={spacing.md} marginTop={spacing.lg}>
            {/* Header */}
            <HStack
                paddingVertical={spacing.md}
                paddingHorizontal={spacing.md}
                justifyContent="space-between"
                alignItems="center"
            >
                <Text fontSize={fonts.sizes.lg} fontWeight={fonts.weights.semibold} color={colors.text.primary}>
                    Recent Transactions
                </Text>
                <Pressable>
                    <Text fontSize={fonts.sizes.sm} fontWeight={fonts.weights.medium} color={colors.primary.main}>
                        View All
                    </Text>
                </Pressable>
            </HStack>

            {/* Transaction Items */}
            <VStack>
                {transactions.map((transaction) => (
                    <TransactionItem
                        key={transaction.id}
                        transaction={transaction}
                        onPress={() => onTransactionPress?.(transaction)}
                    />
                ))}
            </VStack>
        </VStack>
    );
};

export default TransactionList;
