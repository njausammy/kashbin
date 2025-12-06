import React from 'react';
import { VStack, HStack, Text, Box, Pressable } from '@gluestack-ui/themed';
import Button from '@/src/components/form/AnimatedButton';
import { router, useLocalSearchParams } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '@/src/constants/Colors';

const ConfirmRecipient = () => {
    const params = useLocalSearchParams<{
        recipientId: string;
        recipientPhone: string;
        recipientName: string;
        isVerified: string;
    }>();

    const { recipientId, recipientPhone, recipientName, isVerified } = params;

    const handleContinue = () => {
        router.push({
            pathname: '/send/p2p/amount',
            params: {
                recipientId,
                recipientPhone,
                recipientName,
                isVerified,
            }
        });
    };

    // Get initials from name
    const getInitials = () => {
        const names = recipientName?.split(' ') || ['U'];
        return names.map(n => n[0]).join('').toUpperCase().substring(0, 2);
    };

    return (
        <VStack backgroundColor="$white" paddingBottom={50} flex={1}>
            {/* Header */}
            <Box backgroundColor={Colors.primary.DEFAULT} paddingTop={50} paddingBottom={24}>
                <VStack paddingHorizontal={20}>
                    <HStack alignItems="center" marginBottom={16}>
                        <Pressable onPress={() => router.back()} marginRight={16}>
                            <Ionicons name="arrow-back" size={24} color="white" />
                        </Pressable>
                        <Text fontSize={24} fontWeight="700" color="white">
                            Confirm Recipient
                        </Text>
                    </HStack>
                    <Text fontSize={14} color="rgba(255, 255, 255, 0.8)">
                        Make sure this is the right person
                    </Text>
                </VStack>
            </Box>

            <VStack flex={1} paddingHorizontal={24} marginTop={32} justifyContent="space-between">
                <VStack>
                    {/* User Details Card */}
                    <Box
                        backgroundColor="white"
                        borderRadius={16}
                        padding={24}
                        borderWidth={1}
                        borderColor={Colors.lightGrey}
                        alignItems="center"
                        style={{
                            shadowColor: '#000',
                            shadowOffset: { width: 0, height: 4 },
                            shadowOpacity: 0.08,
                            shadowRadius: 8,
                            elevation: 4,
                        }}
                    >
                        {/* Avatar */}
                        <Box
                            width={96}
                            height={96}
                            borderRadius={48}
                            backgroundColor={Colors.secondary.DEFAULT}
                            alignItems="center"
                            justifyContent="center"
                            marginBottom={16}
                            style={{
                                shadowColor: '#F59E0B',
                                shadowOffset: { width: 0, height: 4 },
                                shadowOpacity: 0.3,
                                shadowRadius: 8,
                                elevation: 4,
                            }}
                        >
                            <Text fontSize={36} fontWeight="700" color="white">
                                {getInitials()}
                            </Text>
                        </Box>

                        {/* Name */}
                        <Text fontSize={24} fontWeight="700" color={Colors.dark}>
                            {recipientName}
                        </Text>

                        {/* Phone */}
                        <Text fontSize={16} color={Colors.grey} marginTop={8}>
                            +254{recipientPhone}
                        </Text>

                        {/* Verified Badge */}
                        {isVerified === 'true' && (
                            <Box
                                backgroundColor="#22C55E15"
                                borderRadius={12}
                                paddingHorizontal={12}
                                paddingVertical={6}
                                marginTop={16}
                            >
                                <HStack space="xs" alignItems="center">
                                    <Ionicons name="checkmark-circle" size={16} color={Colors.success} />
                                    <Text fontSize={13} color={Colors.success} fontWeight="600">
                                        VERIFIED USER
                                    </Text>
                                </HStack>
                            </Box>
                        )}

                        {(!isVerified || isVerified === 'false') && (
                            <Box
                                backgroundColor="#F9731615"
                                borderRadius={12}
                                paddingHorizontal={12}
                                paddingVertical={6}
                                marginTop={16}
                            >
                                <HStack space="xs" alignItems="center">
                                    <Ionicons name="alert-circle" size={16} color="#F97316" />
                                    <Text fontSize={13} color="#F97316" fontWeight="600">
                                        UNVERIFIED USER
                                    </Text>
                                </HStack>
                            </Box>
                        )}
                    </Box>

                    {/* Info Box */}
                    <Box
                        backgroundColor="#1E40AF10"
                        borderRadius={12}
                        padding={16}
                        marginTop={24}
                    >
                        <HStack space="sm" alignItems="flex-start">
                            <Ionicons name="information-circle" size={20} color={Colors.primary.DEFAULT} />
                            <VStack flex={1}>
                                <Text fontSize={14} color={Colors.dark} fontWeight="500">
                                    Send Only to Trusted People
                                </Text>
                                <Text fontSize={13} color={Colors.grey} marginTop={4}>
                                    Cryptocurrency transactions cannot be reversed. Make sure you trust this person.
                                </Text>
                            </VStack>
                        </HStack>
                    </Box>
                </VStack>

                {/* Action Buttons */}
                <VStack space="md">
                    <Button
                        backgroundColor={Colors.primary.DEFAULT}
                        borderRadius={50}
                        height={56}
                        width="$full"
                        onPress={handleContinue}
                    >
                        <Text color='$white' fontSize={16} fontWeight={600}>
                            Continue
                        </Text>
                    </Button>

                    <Pressable onPress={() => router.back()}>
                        <Box
                            borderWidth={1}
                            borderColor={Colors.lightGrey}
                            borderRadius={50}
                            height={56}
                            alignItems="center"
                            justifyContent="center"
                        >
                            <Text color={Colors.grey} fontSize={16} fontWeight={600}>
                                Cancel
                            </Text>
                        </Box>
                    </Pressable>
                </VStack>
            </VStack>
        </VStack>
    );
};

export default ConfirmRecipient;
