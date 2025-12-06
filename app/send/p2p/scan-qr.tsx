import React, { useState } from 'react';
import { VStack, HStack, Text, Box, Pressable } from '@gluestack-ui/themed';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import Button from '@/src/components/form/AnimatedButton';
import { findUserByPhone } from '@/src/data/mock-users';
import { Colors } from '@/src/constants/Colors';

const ScanQR = () => {
    const [isScanning, setIsScanning] = useState(false);

    // Mock QR scan - in production this would use expo-camera
    const handleMockScan = () => {
        setIsScanning(true);

        // Simulate scanning delay
        setTimeout(() => {
            // Mock scanned QR code - using phone number from mock data
            const mockQRData = 'kash-chain-user://712345678';
            const phone = mockQRData.replace('kash-chain-user://', '');
            const recipient = findUserByPhone(phone);

            if (recipient) {
                router.push({
                    pathname: '/send/p2p/confirm-recipient',
                    params: {
                        recipientId: recipient.id,
                        recipientPhone: recipient.phoneNumber,
                        recipientName: `${recipient.firstName} ${recipient.lastName}`,
                        isVerified: recipient.isVerified ? 'true' : 'false',
                    }
                });
            } else {
                setIsScanning(false);
                // In production, show an error message
                alert('User not found. Please ask them to sign up for Kash Chain.');
            }
        }, 1500);
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
                            Scan QR Code
                        </Text>
                    </HStack>
                    <Text fontSize={14} color="rgba(255, 255, 255, 0.9)">
                        Point camera at recipient's QR code
                    </Text>
                </VStack>
            </Box>

            {/* Camera/Scanner Area */}
            <VStack flex={1} paddingHorizontal={24} paddingTop={40} alignItems="center">
                <Box
                    width="100%"
                    height={300}
                    borderRadius={16}
                    backgroundColor={Colors.background}
                    borderWidth={2}
                    borderColor={Colors.primary.DEFAULT}
                    alignItems="center"
                    justifyContent="center"
                    marginBottom={32}
                    borderStyle="dashed"
                >
                    {isScanning ? (
                        <VStack alignItems="center" space="md">
                            <Ionicons name="scan" size={80} color={Colors.primary.DEFAULT} />
                            <Text fontSize={16} fontWeight="600" color={Colors.primary.DEFAULT}>
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

                {/* Instructions */}
                <VStack space="sm" width="$full">
                    <Text fontSize={16} fontWeight="600" color={Colors.dark} marginBottom={8}>
                        How to scan:
                    </Text>
                    <HStack space="sm" alignItems="flex-start">
                        <Text fontSize={14} color={Colors.grey}>1.</Text>
                        <Text fontSize={14} color={Colors.grey} flex={1}>
                            Ask the recipient to show their Kash Chain QR code
                        </Text>
                    </HStack>
                    <HStack space="sm" alignItems="flex-start">
                        <Text fontSize={14} color={Colors.grey}>2.</Text>
                        <Text fontSize={14} color={Colors.grey} flex={1}>
                            Hold your phone steady
                        </Text>
                    </HStack>
                    <HStack space="sm" alignItems="flex-start">
                        <Text fontSize={14} color={Colors.grey}>3.</Text>
                        <Text fontSize={14} color={Colors.grey} flex={1}>
                            Make sure the QR code is within the frame
                        </Text>
                    </HStack>
                </VStack>

                {/* Info Card */}
                <Box
                    backgroundColor="rgba(30, 64, 175, 0.08)"
                    borderRadius={12}
                    padding={16}
                    borderWidth={1}
                    borderColor={Colors.primary.DEFAULT}
                    marginTop={24}
                    width="$full"
                >
                    <HStack space="sm" alignItems="flex-start">
                        <Ionicons name="information-circle" size={20} color={Colors.primary.DEFAULT} />
                        <Text fontSize={13} color={Colors.dark} flex={1}>
                            Send USDT instantly to any Kash Chain user. No fees!
                        </Text>
                    </HStack>
                </Box>
            </VStack>

            {/* Mock Scan Button (for demo) */}
            <Box paddingHorizontal={24} paddingBottom={32}>
                <Button
                    backgroundColor={Colors.primary.DEFAULT}
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
