import React, { useState } from 'react';
import { VStack, HStack, Text, Box, Pressable } from '@gluestack-ui/themed';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import Button from '@/src/components/form/AnimatedButton';
import { getAgentByQRCode } from '@/src/data/mock-agents';
import { Colors } from '@/src/constants/Colors';

const ScanQR = () => {
    const [isScanning, setIsScanning] = useState(false);

    const handleMockScan = () => {
        setIsScanning(true);

        setTimeout(() => {
            const mockQRData = 'kash-chain-agent://SAFARI';
            const agent = getAgentByQRCode(mockQRData);

            if (agent) {
                router.push({
                    pathname: '/receive/buy-cash/confirm-agent',
                    params: {
                        agentId: agent.id,
                        agentCode: agent.code,
                        agentName: agent.name,
                        agentLocation: agent.location.city,
                        agentDistance: agent.distance,
                        agentFee: (agent.fees.buyUsdt * 100).toFixed(1),
                        agentRating: agent.rating.toString(),
                        agentHours: agent.operatingHours,
                        isOpen: agent.isOpen.toString()
                    }
                });
            }
        }, 1500);
    };

    return (
        <VStack backgroundColor="$white" flex={1}>
            <Box backgroundColor={Colors.secondary.DEFAULT} paddingTop={50} paddingBottom={24}>
                <VStack paddingHorizontal={20}>
                    <HStack alignItems="center" marginBottom={16}>
                        <Pressable onPress={() => router.back()} marginRight={16}>
                            <Ionicons name="arrow-back" size={24} color="white" />
                        </Pressable>
                        <Text fontSize={24} fontWeight="700" color="white">
                            Scan Agent QR
                        </Text>
                    </HStack>
                    <Text fontSize={14} color="rgba(255, 255, 255, 0.9)">
                        Point camera at agent's QR code
                    </Text>
                </VStack>
            </Box>

            <VStack flex={1} paddingHorizontal={24} paddingTop={40} alignItems="center">
                <Box
                    width="100%"
                    height={300}
                    borderRadius={16}
                    backgroundColor={Colors.background}
                    borderWidth={2}
                    borderColor={Colors.secondary.DEFAULT}
                    alignItems="center"
                    justifyContent="center"
                    marginBottom={32}
                    borderStyle="dashed"
                >
                    {isScanning ? (
                        <VStack alignItems="center" space="md">
                            <Ionicons name="scan" size={80} color={Colors.secondary.DEFAULT} />
                            <Text fontSize={16} fontWeight="600" color={Colors.secondary.DEFAULT}>
                                Scanning...
                            </Text>
                        </VStack>
                    ) : (
                        <VStack alignItems="center" space="md">
                            <Ionicons name="qr-code-outline" size={80} color={Colors.grey} />
                            <Text fontSize={16} fontWeight="600" color={Colors.grey}>
                                Position QR code here
                            </Text>
                        </VStack>
                    )}
                </Box>

                <Box
                    backgroundColor="#DBEAFE"
                    borderRadius={12}
                    padding={16}
                    borderWidth={1}
                    borderColor="#3B82F6"
                    width="$full"
                >
                    <HStack space="sm" alignItems="flex-start">
                        <Ionicons name="information-circle" size={20} color="#3B82F6" />
                        <Text fontSize={13} color="#1E3A8A" flex={1}>
                            Only scan QR codes from verified Kash Chain agents. Check for the agent verification badge.
                        </Text>
                    </HStack>
                </Box>
            </VStack>

            <Box paddingHorizontal={24} paddingBottom={32}>
                <Button
                    backgroundColor={Colors.secondary.DEFAULT}
                    borderRadius={50}
                    height={56}
                    width="$full"
                    onPress={handleMockScan}
                    disabled={isScanning}
                >
                    <Text color="$white" fontSize={16} fontWeight={600}>
                        {isScanning ? 'Scanning...' : 'Start Scanning (Demo)'}
                    </Text>
                </Button>
            </Box>
        </VStack>
    );
};

export default ScanQR;
