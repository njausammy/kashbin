import React from 'react';
import { ScrollView } from 'react-native';
import { VStack, HStack, Text, Box, Pressable } from '@gluestack-ui/themed';
import Button from '@/src/components/form/AnimatedButton';
import { router, useLocalSearchParams } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '@/src/constants/Colors';

const Confirm = () => {
    const params = useLocalSearchParams<{
        merchantId: string;
        merchantName: string;
        merchantCategory: string;
        merchantLocation: string;
        merchantCode: string;
        isVerified: string;
        amount: string;
    }>();

    const handleContinue = () => {
        router.push({
            pathname: '/main/merchants/pin',
            params: params
        });
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
                            Confirm Payment
                        </Text>
                    </HStack>
                    <Text fontSize={14} color="rgba(255, 255, 255, 0.9)">
                        Review details before paying
                    </Text>
                </VStack>
            </Box>

            <ScrollView>
                <VStack paddingHorizontal={24} paddingTop={32} paddingBottom={140}>
                    {/* Amount Display - Large */}
                    <VStack alignItems="center" marginBottom={32}>
                        <Text fontSize={16} color={Colors.grey} marginBottom={8}>
                            You're Paying
                        </Text>
                        <Text fontSize={48} fontWeight="700" color={Colors.primary.DEFAULT}>
                            {parseFloat(params.amount).toFixed(2)}
                        </Text>
                        <Text fontSize={20} fontWeight="600" color={Colors.primary.DEFAULT} marginTop={4}>
                            USDT
                        </Text>
                    </VStack>

                    {/* Transaction Details Card */}
                    <Box
                        backgroundColor="white"
                        borderRadius={16}
                        borderWidth={1}
                        borderColor={Colors.lightGrey}
                        overflow="hidden"
                        marginBottom={24}
                    >
                        {/* Merchant Name */}
                        <HStack
                            justifyContent="space-between"
                            padding={16}
                            borderBottomWidth={1}
                            borderBottomColor="#F0F0F0"
                        >
                            <Text fontSize={14} color={Colors.grey}>To Merchant</Text>
                            <HStack space="xs" alignItems="center" flex={1} justifyContent="flex-end">
                                <Text fontSize={15} fontWeight="600" color={Colors.dark} textAlign="right">
                                    {params.merchantName}
                                </Text>
                                {params.isVerified === 'true' && (
                                    <Ionicons name="checkmark-circle" size={16} color={Colors.success} />
                                )}
                            </HStack>
                        </HStack>

                        {/* Category */}
                        <HStack
                            justifyContent="space-between"
                            padding={16}
                            borderBottomWidth={1}
                            borderBottomColor="#F0F0F0"
                        >
                            <Text fontSize={14} color={Colors.grey}>Category</Text>
                            <Text fontSize={15} fontWeight="600" color={Colors.dark}>
                                {params.merchantCategory}
                            </Text>
                        </HStack>

                        {/* Location */}
                        <HStack
                            justifyContent="space-between"
                            padding={16}
                            borderBottomWidth={1}
                            borderBottomColor="#F0F0F0"
                        >
                            <Text fontSize={14} color={Colors.grey}>Location</Text>
                            <Text fontSize={15} fontWeight="600" color={Colors.dark} textAlign="right" flex={1} marginLeft={16}>
                                {params.merchantLocation}
                            </Text>
                        </HStack>

                        {/* Amount */}
                        <HStack
                            justifyContent="space-between"
                            padding={16}
                            borderBottomWidth={1}
                            borderBottomColor="#F0F0F0"
                        >
                            <Text fontSize={14} color={Colors.grey}>Amount</Text>
                            <Text fontSize={15} fontWeight="600" color={Colors.dark}>
                                {parseFloat(params.amount).toFixed(2)} USDT
                            </Text>
                        </HStack>

                        {/* Fee */}
                        <HStack
                            justifyContent="space-between"
                            padding={16}
                            borderBottomWidth={1}
                            borderBottomColor="#F0F0F0"
                        >
                            <Text fontSize={14} color={Colors.grey}>Fee</Text>
                            <Text fontSize={15} fontWeight="600" color={Colors.success}>
                                FREE
                            </Text>
                        </HStack>

                        {/* Total */}
                        <HStack
                            justifyContent="space-between"
                            padding={16}
                            backgroundColor="#F9FAFB"
                        >
                            <Text fontSize={15} fontWeight="600" color={Colors.dark}>Total</Text>
                            <Text fontSize={17} fontWeight="700" color={Colors.primary.DEFAULT}>
                                {parseFloat(params.amount).toFixed(2)} USDT
                            </Text>
                        </HStack>
                    </Box>

                    {/* Warning Box */}
                    <Box
                        backgroundColor="#FEF3C7"
                        borderRadius={12}
                        padding={16}
                        borderWidth={1}
                        borderColor={Colors.secondary.DEFAULT}
                    >
                        <HStack space="sm" alignItems="flex-start">
                            <Ionicons name="warning" size={20} color={Colors.secondary.DEFAULT} />
                            <VStack flex={1}>
                                <Text fontSize={14} fontWeight="600" color="#92400E" marginBottom={4}>
                                    Important
                                </Text>
                                <Text fontSize={13} color="#92400E">
                                    Please verify the merchant details are correct. This transaction cannot be reversed once completed.
                                </Text>
                            </VStack>
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
                    backgroundColor={Colors.primary.DEFAULT}
                    borderRadius={50}
                    height={56}
                    width="$full"
                    onPress={handleContinue}
                >
                    <HStack space="sm" alignItems="center">
                        <Ionicons name="lock-closed" size={20} color="white" />
                        <Text color="$white" fontSize={16} fontWeight={600}>
                            Confirm with PIN
                        </Text>
                    </HStack>
                </Button>
            </Box>
        </VStack>
    );
};

export default Confirm;
