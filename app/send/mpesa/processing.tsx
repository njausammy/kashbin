import React, { useEffect } from 'react';
import { VStack, HStack, Text, Box, Spinner } from '@gluestack-ui/themed';
import { router, useLocalSearchParams } from 'expo-router';
import { Colors } from '@/src/constants/Colors';

const Processing = () => {
    const params = useLocalSearchParams();

    useEffect(() => {
        const timer = setTimeout(() => {
            router.replace({
                pathname: '/send/mpesa/success',
                params: params
            });
        }, 2000);

        return () => clearTimeout(timer);
    }, [params]);

    return (
        <VStack backgroundColor="$white" flex={1}>
            {/* Header */}
            <Box backgroundColor={Colors.primary.DEFAULT} paddingTop={50} paddingBottom={24}>
                <VStack paddingHorizontal={20}>
                    <Text fontSize={24} fontWeight="700" color="white" textAlign="center">
                        Processing
                    </Text>
                </VStack>
            </Box>

            <VStack flex={1} paddingHorizontal={24} paddingTop={80} alignItems="center">
                {/* Spinner */}
                <Box marginBottom={32}>
                    <Spinner size="large" color={Colors.primary.DEFAULT} />
                </Box>

                {/* Status Text */}
                <Text fontSize={18} fontWeight="600" color="#1C1C1E" marginBottom={16}>
                    Sending to M-Pesa...
                </Text>

                <Text fontSize={14} color="#8E8E93" textAlign="center">
                    Please wait while we process your transaction
                </Text>

                {/* Progress Steps */}
                <VStack space="md" marginTop={40} width="100%">
                    <HStack space="md" alignItems="center">
                        <Box
                            width="100%"
                            height={4}
                            backgroundColor={Colors.primary.DEFAULT}
                            borderRadius={2}
                        />
                        <Text fontSize={14} color={Colors.primary.DEFAULT} position="absolute" left={0}>
                            ✓ Verifying
                        </Text>
                    </HStack>
                    <HStack space="md" alignItems="center">
                        <Box
                            width="100%"
                            height={4}
                            backgroundColor={Colors.primary.DEFAULT}
                            borderRadius={2}
                        />
                        <Text fontSize={14} color={Colors.primary.DEFAULT} position="absolute" left={0}>
                            Sending...
                        </Text>
                    </HStack>
                    <HStack space="md" alignItems="center">
                        <Box
                            width="100%"
                            height={4}
                            backgroundColor="#E5E7EB"
                            borderRadius={2}
                        />
                        <Text fontSize={14} color="#8E8E93" position="absolute" left={0}>
                            Confirming
                        </Text>
                    </HStack>
                </VStack>
            </VStack>
        </VStack>
    );
};

export default Processing;
