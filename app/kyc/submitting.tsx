
import React, { useEffect } from 'react';
import { VStack, Text, Box, Spinner } from "@gluestack-ui/themed";
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import localDB from '@/src/utils/LocalDatabase';
import { useCurrentUser } from '@/src/hooks/useCurrentUser';
import { Colors } from '@/src/constants/Colors';
const Submitting = () => {
    const { user, updateUser } = useCurrentUser();

    useEffect(() => {
        // Simulate submission process
        const submitKYC = async () => {
            // Wait 2 seconds
            await new Promise(resolve => setTimeout(resolve, 2000));

            // Update user KYC status to pending
            if (user) {
                await updateUser({ kycStatus: 'pending' });
            }

            // Navigate to pending screen
            router.replace('/kyc/pending');
        };

        submitKYC();
    }, []);

    return (
        <VStack
            flex={1}
            backgroundColor={Colors.primary.DEFAULT}
            alignItems="center"
            justifyContent="center"
            paddingHorizontal={24}
        >
            {/* Animated Icon */}
            <Box
                width={120}
                height={120}
                borderRadius={60}
                backgroundColor="rgba(255, 255, 255, 0.2)"
                alignItems="center"
                justifyContent="center"
                marginBottom={32}
            >
                <Spinner color="$white" size="large" />
            </Box>

            {/* Text */}
            <VStack space="sm" alignItems="center">
                <Text fontSize={28} fontWeight={700} color="$white" textAlign="center">
                    Verifying your identity...
                </Text>
                <Text fontSize={16} color="rgba(255, 255, 255, 0.85)" textAlign="center" marginTop={8}>
                    This will only take a moment
                </Text>
            </VStack>

            {/* Progress Steps */}
            <VStack space="md" marginTop={48} width="$full">
                {[
                    'Uploading documents',
                    'Validating ID',
                    'Verifying selfie',
                    'Processing details'
                ].map((step, index) => (
                    <Box
                        key={index}
                        backgroundColor="rgba(255, 255, 255, 0.15)"
                        borderRadius={12}
                        padding={16}
                    >
                        <HStack space="sm" alignItems="center">
                            <Spinner color="$white" size="small" />
                            <Text fontSize={14} color="rgba(255, 255, 255, 0.9)" flex={1}>
                                {step}
                            </Text>
                        </HStack>
                    </Box>
                ))}
            </VStack>
        </VStack>
    );
};

export default Submitting;
