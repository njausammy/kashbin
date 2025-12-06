import React from 'react';
import { VStack, HStack, Text, Box, Pressable } from '@gluestack-ui/themed';
import { Ionicons } from '@expo/vector-icons';
import { colors, spacing, borderRadius, fonts, shadows } from '@/src/constants/theme';

interface BalanceCardProps {
    usdtBalance: number;
    kesEquivalent: number;
    hideBalance?: boolean;
    onToggleVisibility?: () => void;
}

const BalanceCard: React.FC<BalanceCardProps> = ({
    usdtBalance,
    kesEquivalent,
    hideBalance = false,
    onToggleVisibility
}) => {
    return (
        <Box
            backgroundColor={colors.background.primary}
            borderRadius={borderRadius.xl}
            padding={spacing.lg}
            marginHorizontal={spacing.md}
            marginTop={spacing.md}
            shadowColor={colors.neutral.black}
            shadowOffset={{ width: 0, height: 2 }}
            shadowOpacity={0.1}
            shadowRadius={8}
        >
            <VStack space="md">
                {/* Header */}
                <HStack justifyContent="space-between" alignItems="center">
                    <Text fontSize={fonts.sizes.sm} color={colors.text.secondary} fontWeight={fonts.weights.regular}>
                        Total Balance
                    </Text>
                    <Pressable onPress={onToggleVisibility}>
                        <Ionicons
                            name={hideBalance ? "eye-off-outline" : "eye-outline"}
                            size={20}
                            color={colors.text.secondary}
                        />
                    </Pressable>
                </HStack>

                {/* USDT Balance */}
                <VStack space="xs">
                    {hideBalance ? (
                        <Text fontSize={fonts.sizes['4xl']} fontWeight={fonts.weights.bold} color={colors.text.primary}>
                            ••••••
                        </Text>
                    ) : (
                        <HStack alignItems="flex-end" space="xs">
                            <Text fontSize={fonts.sizes['4xl']} fontWeight={fonts.weights.bold} color={colors.text.primary}>
                                {usdtBalance.toFixed(2)}
                            </Text>
                            <Text fontSize={fonts.sizes.lg} fontWeight={fonts.weights.semibold} color={colors.primary.main} marginBottom={6}>
                                USDT
                            </Text>
                        </HStack>
                    )}

                    {/* KES Equivalent */}
                    {!hideBalance && (
                        <Text fontSize={fonts.sizes.sm} color={colors.text.secondary} fontWeight={fonts.weights.regular}>
                            ≈ KES {kesEquivalent.toLocaleString('en-KE', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                        </Text>
                    )}
                </VStack>

                {/* Action Buttons */}
                <HStack space="md" marginTop={spacing.sm}>
                    <Box flex={1}>
                        <Pressable
                            backgroundColor={colors.secondary.main}
                            borderRadius={borderRadius.lg}
                            padding={spacing.md}
                            alignItems="center"
                        >
                            <HStack space="xs" alignItems="center">
                                <Ionicons name="add-circle-outline" size={20} color={colors.neutral.white} />
                                <Text fontSize={fonts.sizes.sm} fontWeight={fonts.weights.semibold} color={colors.text.inverse}>
                                    Buy USDT
                                </Text>
                            </HStack>
                        </Pressable>
                    </Box>

                    <Box flex={1}>
                        <Pressable
                            backgroundColor="transparent"
                            borderWidth={1}
                            borderColor={colors.primary.main}
                            borderRadius={borderRadius.lg}
                            padding={spacing.md}
                            alignItems="center"
                        >
                            <HStack space="xs" alignItems="center">
                                <Ionicons name="cash-outline" size={20} color={colors.primary.main} />
                                <Text fontSize={fonts.sizes.sm} fontWeight={fonts.weights.semibold} color={colors.primary.main}>
                                    Cash Out
                                </Text>
                            </HStack>
                        </Pressable>
                    </Box>
                </HStack>
            </VStack>
        </Box>
    );
};

export default BalanceCard;
