import React, { useEffect, useState } from 'react';
import { VStack, HStack, Text, Box, Spinner } from '@gluestack-ui/themed';
import { router, useLocalSearchParams } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '@/src/constants/Colors';

const Waiting = () => {
    const params = useLocalSearchParams<{
        kesAmount: string;
        usdtAmount: string;
        rate: string;
        fee: string;
        providerId: string;
        providerName: string;
        providerNumber: string;
    }>();

    const [statusText, setStatusText] = useState('Checking for payment...');
    const [progress, setProgress] = useState(0);

    useEffect(() => {
        // Simulate payment verification process
        const statusUpdates = [
            { time: 0, text: 'Checking for payment...', progress: 0 },
            { time: 2000, text: 'Payment received...', progress: 33 },
            { time: 3500, text: 'Verifying transaction...', progress: 66 },
            { time: 5000, text: 'Processing USDT...', progress: 100 },
        ];

        statusUpdates.forEach(({ time, text, progress }) => {
            setTimeout(() => {
                setStatusText(text);
                setProgress(progress);
            }, time);
        });

        // Navigate to success after 6 seconds
        const timer = setTimeout(() => {
            router.replace({
                pathname: '/receive/buy-mpesa/success',
                params: params
            });
        }, 6000);

        return () => clearTimeout(timer);
    }, [params]);

    return (
        <VStack backgroundColor="$white" flex={1}>
            {/* Header */}
            <Box backgroundColor={Colors.primary.DEFAULT} paddingTop={50} paddingBottom={24}>
                <VStack paddingHorizontal={20}>
                    <Text fontSize={24} fontWeight="700" color="white" textAlign="center">
                        Processing Payment
                    </Text>
                    <Text fontSize={14} color="rgba(255, 255, 255, 0.9)" textAlign="center" marginTop={8}>
                        Please wait while we verify your payment
                    </Text>
                </VStack>
            </Box>

            <VStack flex={1} paddingHorizontal={24} paddingTop={40} alignItems="center">
                {/* Spinner */}
                <Box marginBottom={32}>
                    <Spinner size="large" color={Colors.primary.DEFAULT} />
                </Box>

                {/* Status Text */}
                <Text fontSize={18} fontWeight="600" color="#1C1C1E" marginBottom={32} textAlign="center">
                    {statusText}
                </Text>

                {/* Progress Bar */}
                <Box width="100%" marginBottom={40}>
                    <Box
                        height={8}
                        backgroundColor="#E5E7EB"
                        borderRadius={4}
                        overflow="hidden"
                    >
                        <Box
                            height={8}
                            backgroundColor={Colors.primary.DEFAULT}
                            borderRadius={4}
                            width={`${progress}%`}
                        />
                    </Box>
                </Box>

                {/* Transaction Details Card */}
                <Box
                    width="100%"
                    backgroundColor="#F9FAFB"
                    borderRadius={16}
                    padding={20}
                    borderWidth={1}
                    borderColor="#E5E7EB"
                    marginBottom={24}
                >
                    <VStack space="md">
                        <HStack justifyContent="space-between" paddingBottom={12} borderBottomWidth={1} borderBottomColor="#E5E7EB">
                            <Text fontSize={14} color="#8E8E93">Provider</Text>
                            <Text fontSize={14} fontWeight="600" color="#1C1C1E">
                                {params.providerName}
                            </Text>
                        </HStack>

                        <HStack justifyContent="space-between" paddingBottom={12} borderBottomWidth={1} borderBottomColor="#E5E7EB">
                            <Text fontSize={14} color="#8E8E93">M-Pesa Number</Text>
                            <Text fontSize={14} fontWeight="600" color="#1C1C1E">
                                {params.providerNumber}
                            </Text>
                        </HStack>

                        <HStack justifyContent="space-between" paddingBottom={12} borderBottomWidth={1} borderBottomColor="#E5E7EB">
                            <Text fontSize={14} color="#8E8E93">Amount Sent</Text>
                            <Text fontSize={14} fontWeight="600" color="#1C1C1E">
                                KES {parseFloat(params.kesAmount).toLocaleString('en-KE', { minimumFractionDigits: 2 })}
                            </Text>
                        </HStack>

                        <HStack justifyContent="space-between">
                            <Text fontSize={14} color="#8E8E93">You'll Receive</Text>
                            <Text fontSize={16} fontWeight="700" color={Colors.primary.DEFAULT}>
                                {parseFloat(params.usdtAmount).toFixed(2)} USDT
                            </Text>
                        </HStack>
                    </VStack>
                </Box>

                {/* Info Box */}
                <Box
                    width="100%"
                    backgroundColor="#DBEAFE"
                    borderRadius={12}
                    padding={16}
                    borderWidth={1}
                    borderColor="#3B82F6"
                >
                    <HStack space="sm" alignItems="flex-start">
                        <Ionicons name="information-circle" size={20} color="#3B82F6" />
                        <VStack flex={1}>
                            <Text fontSize={13} color="#1E3A8A">
                                This usually takes 2-5 minutes. You can close this screen and check your wallet later.
                            </Text>
                        </VStack>
                    </HStack>
                </Box>

                {/* Processing Steps - Visual Feedback */}
                <VStack space="sm" width="100%" marginTop={32}>
                    <HStack space="sm" alignItems="center">
                        <Box
                            width={24}
                            height={24}
                            borderRadius={12}
                            backgroundColor={progress >= 33 ? 'Colors.primary.DEFAULT' : '#E5E7EB'}
                            alignItems="center"
                            justifyContent="center"
                        >
                            {progress >= 33 && (
                                <Ionicons name="checkmark" size={16} color="white" />
                            )}
                        </Box>
                        <Text fontSize={14} color={progress >= 33 ? 'Colors.primary.DEFAULT' : '#8E8E93'}>
                            Payment Received
                        </Text>
                    </HStack>

                    <HStack space="sm" alignItems="center">
                        <Box
                            width={24}
                            height={24}
                            borderRadius={12}
                            backgroundColor={progress >= 66 ? 'Colors.primary.DEFAULT' : '#E5E7EB'}
                            alignItems="center"
                            justifyContent="center"
                        >
                            {progress >= 66 && (
                                <Ionicons name="checkmark" size={16} color="white" />
                            )}
                        </Box>
                        <Text fontSize={14} color={progress >= 66 ? 'Colors.primary.DEFAULT' : '#8E8E93'}>
                            Transaction Verified
                        </Text>
                    </HStack>

                    <HStack space="sm" alignItems="center">
                        <Box
                            width={24}
                            height={24}
                            borderRadius={12}
                            backgroundColor={progress >= 100 ? 'Colors.primary.DEFAULT' : '#E5E7EB'}
                            alignItems="center"
                            justifyContent="center"
                        >
                            {progress >= 100 && (
                                <Ionicons name="checkmark" size={16} color="white" />
                            )}
                        </Box>
                        <Text fontSize={14} color={progress >= 100 ? 'Colors.primary.DEFAULT' : '#8E8E93'}>
                            USDT Credited
                        </Text>
                    </HStack>
                </VStack>
            </VStack>
        </VStack>
    );
};

export default Waiting;
