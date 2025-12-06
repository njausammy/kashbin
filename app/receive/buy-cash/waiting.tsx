import React, { useState, useEffect } from 'react';
import { VStack, HStack, Text, Box, Pressable } from '@gluestack-ui/themed';
import { Ionicons } from '@expo/vector-icons';
import { router, useLocalSearchParams } from 'expo-router';
import { Colors } from '@/src/constants/Colors';

const Waiting = () => {
    const params = useLocalSearchParams<{
        agentName: string;
        agentCode: string;
        usdtAmount: string;
        kesAmount: string;
        depositCode?: string;
    }>();

    const [progress, setProgress] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setProgress((prev) => {
                if (prev >= 100) {
                    clearInterval(interval);
                    setTimeout(() => {
                        router.replace({
                            pathname: '/receive/buy-cash/success',
                            params: params
                        });
                    }, 500);
                    return 100;
                }
                return prev + 10;
            });
        }, 500);

        return () => clearInterval(interval);
    }, [params]);

    return (
        <VStack backgroundColor="$white" flex={1}>
            {/* Header */}
            <Box backgroundColor={Colors.secondary.DEFAULT} paddingTop={50} paddingBottom={24}>
                <VStack paddingHorizontal={20} alignItems="center">
                    <Text fontSize={24} fontWeight="700" color="white" marginBottom={8}>
                        Processing...
                    </Text>
                    <Text fontSize={14} color="rgba(255, 255, 255, 0.9)" textAlign="center">
                        Waiting for agent confirmation
                    </Text>
                </VStack>
            </Box>

            {/* Content */}
            <VStack flex={1} paddingHorizontal={24} paddingTop={60} alignItems="center">
                {/* Loading Animation */}
                <Box
                    width={120}
                    height={120}
                    borderRadius={60}
                    backgroundColor="rgba(245, 158, 11, 0.08)"
                    alignItems="center"
                    justifyContent="center"
                    marginBottom={40}
                >
                    <Ionicons name="hourglass-outline" size={60} color={Colors.secondary.DEFAULT} />
                </Box>

                {/* Progress Bar */}
                <Box width="100%" height={8} backgroundColor={Colors.background} borderRadius={4} overflow="hidden" marginBottom={32}>
                    <Box width={`${progress}%`} height="100%" backgroundColor={Colors.secondary.DEFAULT} />
                </Box>

                <Text fontSize={18} fontWeight="600" color={Colors.dark} marginBottom={16} textAlign="center">
                    Awaiting Payment Confirmation
                </Text>

                <Text fontSize={14} color={Colors.grey} textAlign="center" marginBottom={40}>
                    The agent will verify your cash and code, then release USDT to your wallet.
                </Text>

                {/* Transaction Info */}
                <Box
                    backgroundColor="white"
                    borderRadius={16}
                    borderWidth={1}
                    borderColor={Colors.lightGrey}
                    padding={20}
                    width="100%"
                >
                    {params.depositCode && (
                        <VStack marginBottom={16}>
                            <Text fontSize={13} color={Colors.grey} marginBottom={8}>
                                Deposit Code
                            </Text>
                            <Box backgroundColor="rgba(245, 158, 11, 0.08)" borderRadius={8} padding={12} alignItems="center">
                                <Text fontSize={20} fontWeight="700" color={Colors.secondary.DEFAULT} letterSpacing={2}>
                                    {params.depositCode}
                                </Text>
                            </Box>
                        </VStack>
                    )}

                    <HStack justifyContent="space-between" marginBottom={12}>
                        <Text fontSize={14} color={Colors.grey}>Agent</Text>
                        <Text fontSize={14} fontWeight="600" color={Colors.dark}>
                            {params.agentName}
                        </Text>
                    </HStack>

                    <HStack justifyContent="space-between" marginBottom={12}>
                        <Text fontSize={14} color={Colors.grey}>Cash Amount</Text>
                        <Text fontSize={14} fontWeight="600" color={Colors.dark}>
                            KES {parseFloat(params.kesAmount || '0').toLocaleString('en-KE', { minimumFractionDigits: 2 })}
                        </Text>
                    </HStack>

                    <HStack justifyContent="space-between">
                        <Text fontSize={14} color={Colors.grey}>USDT to Receive</Text>
                        <Text fontSize={14} fontWeight="600" color={Colors.secondary.DEFAULT}>
                            {parseFloat(params.usdtAmount || '0').toFixed(2)} USDT
                        </Text>
                    </HStack>
                </Box>

                {/* Info */}
                <Box
                    backgroundColor="#DBEAFE"
                    borderRadius={12}
                    padding={16}
                    borderWidth={1}
                    borderColor="#3B82F6"
                    marginTop={32}
                    width="100%"
                >
                    <HStack space="sm" alignItems="flex-start">
                        <Ionicons name="information-circle" size={20} color="#3B82F6" />
                        <Text fontSize={13} color="#1E3A8A" flex={1}>
                            This usually takes a few minutes. The agent is verifying your payment and will release USDT shortly.
                        </Text>
                    </HStack>
                </Box>
            </VStack>

            {/* Cancel Button */}
            <Box paddingHorizontal={24} paddingBottom={32}>
                <Pressable onPress={() => router.back()}>
                    <Box
                        borderWidth={2}
                        borderColor={Colors.lightGrey}
                        borderRadius={50}
                        height={56}
                        alignItems="center"
                        justifyContent="center"
                    >
                        <Text color={Colors.grey} fontSize={16} fontWeight={600}>
                            Go Back
                        </Text>
                    </Box>
                </Pressable>
            </Box>
        </VStack>
    );
};

export default Waiting;
