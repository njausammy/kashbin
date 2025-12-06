import React, { useState } from 'react';
import { VStack, HStack, Text, Box, Pressable } from '@gluestack-ui/themed';
import { router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { getAllMerchants } from '@/src/data/mock-merchants';
import Button from '@/src/components/form/AnimatedButton';
import { Colors } from '@/src/constants/Colors';

const ScanQR = () => {
    const [isScanning, setIsScanning] = useState(false);
    const merchants = getAllMerchants().slice(0, 3); // Show first 3 for testing

    const handleStartScan = () => {
        setIsScanning(true);

        // Simulate scanning the first merchant after 1.5 seconds
        setTimeout(() => {
            const merchant = merchants[0];
            if (merchant) {
                router.push({
                    pathname: '/main/merchants/confirm-merchant',
                    params: {
                        merchantId: merchant.id,
                        merchantName: merchant.name,
                        merchantCategory: merchant.category,
                        merchantLocation: merchant.location,
                        merchantCode: merchant.merchantCode,
                        isVerified: merchant.isVerified ? 'true' : 'false',
                    }
                });
            }
        }, 1500);
    };

    const handleSimulateScan = (merchantQR: string) => {
        setIsScanning(true);

        // Simulate scan delay
        setTimeout(() => {
            const merchant = merchants.find(m => m.qrCode === merchantQR);
            if (merchant) {
                router.push({
                    pathname: '/main/merchants/confirm-merchant',
                    params: {
                        merchantId: merchant.id,
                        merchantName: merchant.name,
                        merchantCategory: merchant.category,
                        merchantLocation: merchant.location,
                        merchantCode: merchant.merchantCode,
                        isVerified: merchant.isVerified ? 'true' : 'false',
                    }
                });
            }
        }, 500);
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
                            Scan Merchant QR
                        </Text>
                    </HStack>
                    <Text fontSize={14} color="rgba(255, 255, 255, 0.9)">
                        Point camera at merchant's QR code
                    </Text>
                </VStack>
            </Box>

            {/* Camera/Scanner Area */}
            <VStack flex={1} paddingHorizontal={24} paddingTop={40} alignItems="center">
                <Box
                    width="100%"
                    height={300}
                    borderRadius={16}
                    backgroundColor="#F9FAFB"
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
                <VStack space="sm" width="$full" marginBottom={24}>
                    <Text fontSize={16} fontWeight="600" color={Colors.dark} marginBottom={8}>
                        How to scan:
                    </Text>
                    <HStack space="sm" alignItems="flex-start">
                        <Text fontSize={14} color={Colors.grey}>1.</Text>
                        <Text fontSize={14} color={Colors.grey} flex={1}>
                            Ask the merchant to show their QR code
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
                    backgroundColor="#DBEAFE"
                    borderRadius={12}
                    padding={16}
                    borderWidth={1}
                    borderColor={Colors.primary.DEFAULT}
                    width="$full"
                >
                    <HStack space="sm" alignItems="flex-start">
                        <Ionicons name="information-circle" size={20} color={Colors.primary.DEFAULT} />
                        <Text fontSize={13} color="#1E3A8A" flex={1}>
                            Only scan QR codes from verified Kash Chain merchants. Check for the verification badge.
                        </Text>
                    </HStack>
                </Box>

                {/* Test Merchants (Development Only) */}
                <Box
                    backgroundColor="#F9FAFB"
                    borderRadius={12}
                    padding={16}
                    width="100%"
                    borderWidth={1}
                    borderColor={Colors.lightGrey}
                    marginTop={24}
                >
                    <Text fontSize={14} color={Colors.grey} fontWeight="600" marginBottom={12} textAlign="center">
                        Test QR Codes (Development Only)
                    </Text>
                    <VStack space="sm">
                        {merchants.map((merchant) => (
                            <Pressable
                                key={merchant.id}
                                onPress={() => handleSimulateScan(merchant.qrCode)}
                            >
                                <Box
                                    backgroundColor="white"
                                    borderRadius={8}
                                    padding={12}
                                    borderWidth={1}
                                    borderColor={Colors.primary.DEFAULT}
                                >
                                    <HStack space="sm" alignItems="center">
                                        <Ionicons name="qr-code" size={24} color={Colors.primary.DEFAULT} />
                                        <VStack flex={1}>
                                            <Text fontSize={14} fontWeight="600" color={Colors.dark}>
                                                {merchant.name}
                                            </Text>
                                            <Text fontSize={12} color={Colors.grey}>
                                                Tap to simulate scan
                                            </Text>
                                        </VStack>
                                    </HStack>
                                </Box>
                            </Pressable>
                        ))}
                    </VStack>
                </Box>
            </VStack>

            {/* Start Scanning Button */}
            <Box paddingHorizontal={24} paddingBottom={32}>
                <Button
                    backgroundColor={Colors.primary.DEFAULT}
                    borderRadius={50}
                    height={56}
                    width="$full"
                    onPress={handleStartScan}
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
