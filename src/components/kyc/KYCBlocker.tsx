/**
 * KYC Blocker Modal
 *
 * Shown when user tries to perform actions that require KYC verification.
 * Blocks: Send money, Buy USDT, Cash out, etc.
 */

import React from 'react';
import { Modal } from 'react-native';
import { VStack, HStack, Text, Box, Pressable } from "@gluestack-ui/themed";
import { Ionicons } from '@expo/vector-icons';
import Button from '@/src/components/form/AnimatedButton';
import { router } from 'expo-router';

interface KYCBlockerProps {
    isVisible: boolean;
    onClose: () => void;
    action: string; // e.g., "send money", "buy USDT", "cash out"
    kycStatus: 'none' | 'pending' | 'approved' | 'rejected';
}

const KYCBlocker: React.FC<KYCBlockerProps> = ({
    isVisible,
    onClose,
    action,
    kycStatus
}) => {
    const handleVerifyNow = () => {
        onClose();
        router.push('/kyc/prompt');
    };

    const getStatusInfo = () => {
        switch (kycStatus) {
            case 'none':
                return {
                    icon: 'shield-outline' as const,
                    iconColor: '#F59E0B',
                    title: 'Verification Required',
                    message: `To ${action}, you need to complete identity verification first.`,
                    buttonText: 'Verify Now',
                    showButton: true
                };
            case 'pending':
                return {
                    icon: 'time' as const,
                    iconColor: '#F59E0B',
                    title: 'Verification Pending',
                    message: `Your KYC is being reviewed. You'll be able to ${action} once approved (usually 24-48 hours).`,
                    buttonText: 'OK',
                    showButton: false
                };
            case 'rejected':
                return {
                    icon: 'close-circle' as const,
                    iconColor: '#DC2626',
                    title: 'Verification Failed',
                    message: 'Your KYC verification was unsuccessful. Please contact support or try again.',
                    buttonText: 'Contact Support',
                    showButton: true
                };
            default:
                return {
                    icon: 'shield-outline' as const,
                    iconColor: '#F59E0B',
                    title: 'Verification Required',
                    message: `To ${action}, complete identity verification.`,
                    buttonText: 'Verify Now',
                    showButton: true
                };
        }
    };

    const statusInfo = getStatusInfo();

    return (
        <Modal
            visible={isVisible}
            transparent
            animationType="fade"
            onRequestClose={onClose}
        >
            {/* Backdrop */}
            <Pressable
                flex={1}
                backgroundColor="rgba(0, 0, 0, 0.5)"
                alignItems="center"
                justifyContent="center"
                onPress={onClose}
            >
                {/* Modal Content */}
                <Pressable
                    onPress={(e) => e.stopPropagation()}
                    width="85%"
                    maxWidth={400}
                >
                    <Box
                        backgroundColor="$white"
                        borderRadius={20}
                        padding={24}
                    >
                        <VStack space="lg" alignItems="center">
                            {/* Icon */}
                            <Box
                                width={80}
                                height={80}
                                borderRadius={40}
                                backgroundColor={`${statusInfo.iconColor}15`}
                                alignItems="center"
                                justifyContent="center"
                            >
                                <Ionicons name={statusInfo.icon} size={48} color={statusInfo.iconColor} />
                            </Box>

                            {/* Title */}
                            <Text fontSize={22} fontWeight={700} color="#2A2A2A" textAlign="center">
                                {statusInfo.title}
                            </Text>

                            {/* Message */}
                            <Text fontSize={15} color="#5A5A5A" textAlign="center" lineHeight={22}>
                                {statusInfo.message}
                            </Text>

                            {/* Benefits (for 'none' status) */}
                            {kycStatus === 'none' && (
                                <Box
                                    backgroundColor="#F5F5F5"
                                    borderRadius={12}
                                    padding={16}
                                    width="$full"
                                >
                                    <VStack space="sm">
                                        <Text fontSize={14} fontWeight={600} color="#2A2A2A">
                                            Unlock with verification:
                                        </Text>
                                        {[
                                            'Send money to anyone',
                                            'Buy USDT with M-Pesa',
                                            'Cash out to your account',
                                            'Unlimited transactions'
                                        ].map((benefit, index) => (
                                            <HStack key={index} space="xs" alignItems="center">
                                                <Ionicons name="checkmark-circle" size={16} color="#1E40AF" />
                                                <Text fontSize={13} color="#5A5A5A">
                                                    {benefit}
                                                </Text>
                                            </HStack>
                                        ))}
                                    </VStack>
                                </Box>
                            )}

                            {/* Buttons */}
                            <VStack space="sm" width="$full" marginTop={8}>
                                {statusInfo.showButton && (
                                    <Button
                                        backgroundColor={kycStatus === 'rejected' ? "#DC2626" : "#1E40AF"}
                                        borderRadius={50}
                                        height={56}
                                        width="$full"
                                        onPress={kycStatus === 'rejected' ? onClose : handleVerifyNow}
                                    >
                                        <Text color="$white" fontSize={16} fontWeight={600}>
                                            {statusInfo.buttonText}
                                        </Text>
                                    </Button>
                                )}

                                <Pressable
                                    onPress={onClose}
                                    alignSelf="center"
                                    paddingVertical={12}
                                >
                                    <Text fontSize={15} color="#5A5A5A" fontWeight={500}>
                                        {statusInfo.showButton ? 'Maybe Later' : 'OK'}
                                    </Text>
                                </Pressable>
                            </VStack>
                        </VStack>
                    </Box>
                </Pressable>
            </Pressable>
        </Modal>
    );
};

export default KYCBlocker;
