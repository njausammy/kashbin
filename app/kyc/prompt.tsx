
import React from 'react';
import { ScrollView } from 'react-native';
import { VStack, HStack, Text, Box, Pressable } from "@gluestack-ui/themed";
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import Button from '@/src/components/form/AnimatedButton';
import { Colors } from '@/src/constants/Colors';
const KYCPrompt = () => {
    const benefits = [
        {
            icon: 'send' as const,
            title: 'Send Money',
            description: 'Send USDT to anyone, anywhere'
        },
        {
            icon: 'cart' as const,
            title: 'Buy USDT',
            description: 'Buy crypto with M-Pesa instantly'
        },
        {
            icon: 'cash' as const,
            title: 'Cash Out',
            description: 'Convert USDT to cash anytime'
        },
        {
            icon: 'trending-up' as const,
            title: 'Higher Limits',
            description: 'Unlock unlimited transactions'
        }
    ];

    const handleVerifyNow = () => {
        router.push('/kyc/upload-id');
    };

    const handleSkip = () => {
        router.replace('/main');
    };

    return (
        <ScrollView style={{ flex: 1, backgroundColor: '$white' }}>
            <VStack flex={1} paddingBottom={40}>
                {/* Header */}
                <Box backgroundColor={Colors.primary.DEFAULT} paddingTop={60} paddingBottom={40}>
                    <VStack paddingHorizontal={24} space="sm" alignItems="center">
                        {/* Icon */}
                        <Box
                            width={80}
                            height={80}
                            borderRadius={40}
                            backgroundColor="rgba(255, 255, 255, 0.2)"
                            alignItems="center"
                            justifyContent="center"
                            marginBottom={16}
                        >
                            <Ionicons name="shield-checkmark" size={48} color="white" />
                        </Box>

                        <Text fontSize={28} fontWeight={700} color="$white" textAlign="center">
                            Verify Your Identity
                        </Text>
                        <Text fontSize={16} color="rgba(255, 255, 255, 0.9)" textAlign="center" marginTop={8}>
                            Complete KYC to unlock all features and start transacting
                        </Text>
                    </VStack>
                </Box>

                {/* Benefits Section */}
                <VStack paddingHorizontal={24} marginTop={32} space="lg">
                    <Text fontSize={18} fontWeight={600} color="#2A2A2A">
                        What you'll unlock:
                    </Text>

                    {/* Benefits List */}
                    <VStack space="md">
                        {benefits.map((benefit, index) => (
                            <Box
                                key={index}
                                backgroundColor="$white"
                                borderRadius={12}
                                padding={16}
                                borderWidth={1}
                                borderColor="#E5E7EB"
                            >
                                <HStack space="md" alignItems="center">
                                    <Box
                                        width={48}
                                        height={48}
                                        borderRadius={24}
                                        backgroundColor="rgba(30, 64, 175, 0.08)"
                                        alignItems="center"
                                        justifyContent="center"
                                    >
                                        <Ionicons name={benefit.icon} size={24} color={Colors.primary.DEFAULT} />
                                    </Box>
                                    <VStack flex={1}>
                                        <Text fontSize={16} fontWeight={600} color="#2A2A2A">
                                            {benefit.title}
                                        </Text>
                                        <Text fontSize={14} color="#5A5A5A" marginTop={2}>
                                            {benefit.description}
                                        </Text>
                                    </VStack>
                                    <Ionicons name="checkmark-circle" size={24} color={Colors.primary.DEFAULT} />
                                </HStack>
                            </Box>
                        ))}
                    </VStack>

                    {/* Info Card */}
                    <Box
                        backgroundColor="rgba(245, 158, 11, 0.06)"
                        borderRadius={12}
                        padding={16}
                        marginTop={8}
                    >
                        <HStack space="sm" alignItems="flex-start">
                            <Ionicons name="information-circle" size={20} color={Colors.secondary.DEFAULT} />
                            <VStack flex={1}>
                                <Text fontSize={14} color="#2A2A2A" fontWeight={500}>
                                    Quick & Secure
                                </Text>
                                <Text fontSize={13} color="#5A5A5A" marginTop={4}>
                                    Verification takes only 2-3 minutes. Your data is encrypted and secure.
                                </Text>
                            </VStack>
                        </HStack>
                    </Box>

                    {/* Verify Now Button */}
                    <Button
                        backgroundColor={Colors.primary.DEFAULT}
                        borderRadius={50}
                        height={56}
                        width="$full"
                        marginTop={24}
                        onPress={handleVerifyNow}
                    >
                        <HStack space="xs" alignItems="center">
                            <Ionicons name="shield-checkmark" size={20} color="white" />
                            <Text color="$white" fontSize={16} fontWeight={600}>
                                Verify Now
                            </Text>
                        </HStack>
                    </Button>

                    {/* Skip Link */}
                    <Pressable onPress={handleSkip} alignSelf="center" marginTop={16}>
                        <Text fontSize={14} color="#5A5A5A">
                            Skip for now
                        </Text>
                    </Pressable>

                    {/* Warning */}
                    <Box
                        backgroundColor="rgba(220, 38, 38, 0.06)"
                        borderRadius={12}
                        padding={12}
                        marginTop={24}
                    >
                        <HStack space="xs" alignItems="center">
                            <Ionicons name="warning" size={16} color={Colors.error} />
                            <Text fontSize={12} color={Colors.error} flex={1}>
                                Without verification, you cannot send, buy, or cash out
                            </Text>
                        </HStack>
                    </Box>
                </VStack>
            </VStack>
        </ScrollView>
    );
};

export default KYCPrompt;
