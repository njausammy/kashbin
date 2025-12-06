import React from 'react';
import { ScrollView } from 'react-native';
import { VStack, HStack, Text, Box, Pressable } from '@gluestack-ui/themed';
import Button from '@/src/components/form/AnimatedButton';
import { router, useLocalSearchParams } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '@/src/constants/Colors';

const ConfirmMerchant = () => {
    const params = useLocalSearchParams<{
        merchantId: string;
        merchantName: string;
        merchantCategory: string;
        merchantLocation: string;
        merchantCode: string;
        isVerified: string;
    }>();

    const handleContinue = () => {
        router.push({
            pathname: '/main/merchants/amount',
            params: params
        });
    };

    const getInitials = () => {
        const words = params.merchantName.split(' ');
        if (words.length >= 2) {
            return `${words[0][0]}${words[1][0]}`.toUpperCase();
        }
        return params.merchantName.substring(0, 2).toUpperCase();
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
                            Confirm Merchant
                        </Text>
                    </HStack>
                    <Text fontSize={14} color="rgba(255, 255, 255, 0.9)">
                        Verify merchant details before payment
                    </Text>
                </VStack>
            </Box>

            <ScrollView>
                <VStack paddingHorizontal={24} paddingTop={32} paddingBottom={140}>
                    {/* Merchant Avatar */}
                    <VStack alignItems="center" marginBottom={32}>
                        <Box
                            width={96}
                            height={96}
                            borderRadius={48}
                            backgroundColor={Colors.primary.DEFAULT}
                            alignItems="center"
                            justifyContent="center"
                            marginBottom={16}
                        >
                            <Text fontSize={36} fontWeight="700" color="white">
                                {getInitials()}
                            </Text>
                        </Box>
                        <Text fontSize={24} fontWeight="700" color={Colors.dark} textAlign="center">
                            {params.merchantName}
                        </Text>
                        <Text fontSize={16} color={Colors.grey} marginTop={4}>
                            {params.merchantCategory}
                        </Text>
                    </VStack>

                    {/* Verified Badge */}
                    {params.isVerified === 'true' && (
                        <Box
                            backgroundColor="#22C55E15"
                            borderRadius={12}
                            padding={12}
                            marginBottom={24}
                        >
                            <HStack space="sm" alignItems="center" justifyContent="center">
                                <Ionicons name="checkmark-circle" size={20} color={Colors.success} />
                                <Text fontSize={15} fontWeight="600" color={Colors.success}>
                                    VERIFIED MERCHANT
                                </Text>
                            </HStack>
                        </Box>
                    )}

                    {/* Merchant Details Card */}
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
                            <Text fontSize={14} color={Colors.grey}>Business Name</Text>
                            <Text fontSize={15} fontWeight="600" color={Colors.dark} textAlign="right" flex={1} marginLeft={16}>
                                {params.merchantName}
                            </Text>
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

                        {/* Merchant Code */}
                        <HStack
                            justifyContent="space-between"
                            padding={16}
                            backgroundColor="#F9FAFB"
                        >
                            <Text fontSize={14} color={Colors.grey}>Merchant Code</Text>
                            <Text fontSize={15} fontWeight="700" color={Colors.dark}>
                                {params.merchantCode}
                            </Text>
                        </HStack>
                    </Box>

                    {/* Info Box */}
                    <Box
                        backgroundColor="#DBEAFE"
                        borderRadius={12}
                        padding={16}
                        marginBottom={16}
                        borderWidth={1}
                        borderColor="#3B82F6"
                    >
                        <HStack space="sm" alignItems="flex-start">
                            <Ionicons name="shield-checkmark" size={20} color="#3B82F6" />
                            <VStack flex={1}>
                                <Text fontSize={14} fontWeight="600" color="#1E3A8A" marginBottom={4}>
                                    Secure Payment
                                </Text>
                                <Text fontSize={13} color="#1E3A8A">
                                    All payments are encrypted and processed securely on the blockchain.
                                </Text>
                            </VStack>
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
                                    Verify Before Payment
                                </Text>
                                <Text fontSize={13} color="#92400E">
                                    Make sure you're paying the correct merchant. Transactions cannot be reversed once completed.
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
                    <Text color="$white" fontSize={16} fontWeight={600}>
                        Continue to Payment
                    </Text>
                </Button>
            </Box>
        </VStack>
    );
};

export default ConfirmMerchant;
