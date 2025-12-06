import React, { useEffect } from 'react';
import { VStack, Text, Box, Spinner } from '@gluestack-ui/themed';
import { router, useLocalSearchParams } from 'expo-router';
import { Colors } from '@/src/constants/Colors';

const P2PProcessing = () => {
    const params = useLocalSearchParams();

    useEffect(() => {
        // Simulate transaction processing (2 seconds)
        const timer = setTimeout(() => {
            router.replace({
                pathname: '/send/p2p/success',
                params: params
            });
        }, 2000);

        return () => clearTimeout(timer);
    }, [params]);

    return (
        <VStack backgroundColor="$white" flex={1} alignItems="center" justifyContent="center" paddingHorizontal={32}>
            {/* Animated Loader */}
            <Box marginBottom={32}>
                <Spinner size="large" color={Colors.primary.DEFAULT} />
            </Box>

            {/* Status */}
            <Text fontSize={24} fontWeight="700" color={Colors.dark} textAlign="center" marginBottom={12}>
                Processing Transfer
            </Text>

            <Text fontSize={16} color={Colors.grey} textAlign="center" marginBottom={48}>
                Please wait while we process your transaction...
            </Text>

            {/* Progress Steps */}
            <VStack space="lg" width="$full" maxWidth={300}>
                <VStack space="xs">
                    <Box
                        width="$full"
                        height={4}
                        backgroundColor={Colors.lightGrey}
                        borderRadius={2}
                        overflow="hidden"
                    >
                        <Box
                            width="100%"
                            height="$full"
                            backgroundColor={Colors.success}
                        />
                    </Box>
                    <Text fontSize={13} color={Colors.success} fontWeight="500">
                        ✓ Verifying transaction
                    </Text>
                </VStack>

                <VStack space="xs">
                    <Box
                        width="$full"
                        height={4}
                        backgroundColor={Colors.primary.DEFAULT}
                        borderRadius={2}
                    />
                    <Text fontSize={13} color={Colors.primary.DEFAULT} fontWeight="500">
                        Sending USDT...
                    </Text>
                </VStack>

                <VStack space="xs">
                    <Box
                        width="$full"
                        height={4}
                        backgroundColor={Colors.lightGrey}
                        borderRadius={2}
                    />
                    <Text fontSize={13} color={Colors.grey}>
                        Confirming delivery
                    </Text>
                </VStack>
            </VStack>

            {/* Info */}
            <Box
                backgroundColor={Colors.background}
                borderRadius={12}
                padding={16}
                marginTop={48}
                width="$full"
            >
                <Text fontSize={13} color={Colors.grey} textAlign="center">
                    This usually takes a few seconds. Do not close this screen.
                </Text>
            </Box>
        </VStack>
    );
};

export default P2PProcessing;
