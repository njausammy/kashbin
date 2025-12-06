import React, { useState } from 'react';
import { ScrollView } from 'react-native';
import { VStack, HStack, Text, Box, Pressable } from '@gluestack-ui/themed';
import Button from '@/src/components/form/AnimatedButton';
import { router, useLocalSearchParams } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { getAllProviders, LiquidityProvider } from '@/src/data/mock-liquidity-providers';
import { Colors } from '@/src/constants/Colors';

const ProviderSelect = () => {
    const params = useLocalSearchParams<{
        mpesaNumber: string;
        usdtAmount: string;
        kesAmount: string;
        rate: string;
        fee: string;
    }>();

    const [selectedProvider, setSelectedProvider] = useState<string | null>(null);
    const providers = getAllProviders();

    const handleContinue = () => {
        if (selectedProvider) {
            router.push({
                pathname: '/send/mpesa/confirm',
                params: {
                    ...params,
                    providerId: selectedProvider,
                }
            });
        }
    };

    const renderStars = (rating: number) => {
        const stars = [];
        for (let i = 0; i < 5; i++) {
            stars.push(
                <Ionicons
                    key={i}
                    name={i < Math.floor(rating) ? 'star' : 'star-outline'}
                    size={14}
                    color="#F59E0B"
                />
            );
        }
        return stars;
    };

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
                            Select Provider
                        </Text>
                    </HStack>
                    <Text fontSize={14} color="rgba(255, 255, 255, 0.9)">
                        Choose a liquidity provider
                    </Text>
                </VStack>
            </Box>

            <ScrollView>
                <VStack paddingHorizontal={24} paddingTop={24} paddingBottom={120}>
                    {/* Transaction Summary */}
                    <Box
                        backgroundColor="#F9FAFB"
                        borderRadius={12}
                        padding={16}
                        borderWidth={1}
                        borderColor="#E5E7EB"
                        marginBottom={24}
                    >
                        <HStack justifyContent="space-between" marginBottom={8}>
                            <Text fontSize={14} color="#8E8E93">You're sending</Text>
                            <Text fontSize={16} fontWeight="700" color="#1C1C1E">
                                {parseFloat(params.usdtAmount).toFixed(2)} USDT
                            </Text>
                        </HStack>
                        <HStack justifyContent="space-between" marginBottom={8}>
                            <Text fontSize={14} color="#8E8E93">To M-Pesa</Text>
                            <Text fontSize={16} fontWeight="600" color="#1C1C1E">
                                +254{params.mpesaNumber}
                            </Text>
                        </HStack>
                        <HStack justifyContent="space-between">
                            <Text fontSize={14} color="#8E8E93">Recipient gets</Text>
                            <Text fontSize={16} fontWeight="700" color={Colors.primary.DEFAULT}>
                                KES {parseFloat(params.kesAmount).toLocaleString('en-KE', { minimumFractionDigits: 2 })}
                            </Text>
                        </HStack>
                    </Box>

                    {/* Providers List */}
                    <VStack space="md">
                        {providers.map((provider) => (
                            <Pressable
                                key={provider.id}
                                onPress={() => setSelectedProvider(provider.id)}
                            >
                                <Box
                                    backgroundColor={selectedProvider === provider.id ? 'Colors.primary.DEFAULT15' : 'white'}
                                    borderRadius={16}
                                    padding={16}
                                    borderWidth={2}
                                    borderColor={selectedProvider === provider.id ? 'Colors.primary.DEFAULT' : '#E5E7EB'}
                                >
                                    <HStack space="md" alignItems="center">
                                        {/* Icon */}
                                        <Box
                                            width={56}
                                            height={56}
                                            borderRadius={28}
                                            backgroundColor="rgba(30, 64, 175, 0.08)"
                                            alignItems="center"
                                            justifyContent="center"
                                        >
                                            <Ionicons name="wallet" size={28} color={Colors.primary.DEFAULT} />
                                        </Box>

                                        {/* Provider Info */}
                                        <VStack flex={1}>
                                            <HStack space="xs" alignItems="center" marginBottom={4}>
                                                <Text fontSize={16} fontWeight="600" color="#1C1C1E">
                                                    {provider.name}
                                                </Text>
                                                {provider.isVerified && (
                                                    <Ionicons name="checkmark-circle" size={16} color={Colors.primary.DEFAULT} />
                                                )}
                                            </HStack>

                                            {/* Rating */}
                                            <HStack space="xs" alignItems="center" marginBottom={4}>
                                                {renderStars(provider.rating)}
                                                <Text fontSize={13} color="#8E8E93" marginLeft={4}>
                                                    {provider.rating} ({provider.totalTransactions.toLocaleString()} transactions)
                                                </Text>
                                            </HStack>

                                            {/* Processing Time */}
                                            <HStack space="xs" alignItems="center">
                                                <Ionicons name="time-outline" size={14} color="#8E8E93" />
                                                <Text fontSize={13} color="#8E8E93">
                                                    {provider.processingTime}
                                                </Text>
                                            </HStack>
                                        </VStack>

                                        {/* Radio */}
                                        <Box
                                            width={24}
                                            height={24}
                                            borderRadius={12}
                                            borderWidth={2}
                                            borderColor={selectedProvider === provider.id ? 'Colors.primary.DEFAULT' : '#E5E7EB'}
                                            alignItems="center"
                                            justifyContent="center"
                                        >
                                            {selectedProvider === provider.id && (
                                                <Box
                                                    width={12}
                                                    height={12}
                                                    borderRadius={6}
                                                    backgroundColor={Colors.primary.DEFAULT}
                                                />
                                            )}
                                        </Box>
                                    </HStack>
                                </Box>
                            </Pressable>
                        ))}
                    </VStack>
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
                    backgroundColor={selectedProvider ? "Colors.primary.DEFAULT" : "#B8B8B8"}
                    borderRadius={50}
                    height={56}
                    width="$full"
                    disabled={!selectedProvider}
                    onPress={handleContinue}
                >
                    <Text
                        color={selectedProvider ? '$white' : '#5A5A5A'}
                        fontSize={16}
                        fontWeight={600}
                    >
                        Continue
                    </Text>
                </Button>
            </Box>
        </VStack>
    );
};

export default ProviderSelect;
