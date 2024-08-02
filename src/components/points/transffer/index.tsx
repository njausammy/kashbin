import React, { useEffect, useState } from 'react';
import { Card, VStack, Text, Button, Pressable, HStack } from "@gluestack-ui/themed";
import { CameraView, useCameraPermissions } from 'expo-camera';
import { router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import SplashScreen from '../../SplashScreen';

const ScanCodeView = () => {
    const [hasPermission, setHasPermission] = useState<boolean | null>(null);
    const [scannedCode, setScannedCode] = useState<string | null>(null);
    const [permission, requestPermission] = useCameraPermissions();

    useEffect(() => {
        (async () => {
            if (permission) {
                const { granted } = await requestPermission();
                setHasPermission(granted);
            }
        })();
    }, [permission]);

    if (hasPermission === null) {
        // Camera permissions are still loading
        return <SplashScreen />;
    }

    const handleRequestPermission = async () => {
        const { granted } = await requestPermission();
        setHasPermission(granted);
    };

    const handleBarcodeScanned = (e: { data: string }) => {
        // Ensure the scanned code is a 5-digit number
        if (!scannedCode) {
            setScannedCode(e.data);
            router.push('/points/transffer/shop-details');
        }
    };

    return (
        <VStack space="md" alignItems="center" height="$full">
            <HStack width="$full" height={94} alignItems="flex-end">
                <Pressable onPress={() => router.back()} marginRight={120}>
                    <Ionicons name="chevron-back-outline" size={24} color="#2A2A2A" />
                </Pressable>
            </HStack>

            <Card width={361} height={438} padding={14} borderRadius="$xl">
                {hasPermission ? (
                    <VStack space="md" alignItems="center" height="$full">
                        <Text fontSize={18} fontWeight="$medium" textAlign="center" marginBottom={10}>
                            Scan or Enter Code to Redeem or Request Points
                        </Text>
                        <Text fontSize={14} color="$blueGray400" textAlign="center" marginBottom={20}>
                            Hold the code inside the frame, it will be scanned automatically
                        </Text>
                        <CameraView
                            style={{ flex: 1, width: '100%' }} // Ensure CameraView takes up available space
                            barcodeScannerSettings={{
                                barcodeTypes: ["qr"],
                            }}
                            onBarcodeScanned={handleBarcodeScanned}
                        />
                    </VStack>
                ) : (
                    <VStack space="md" alignItems="center" justifyContent="center" height="$full">
                        <Text fontSize={16} color="$red500" textAlign="center" marginBottom={20}>
                            No camera permission granted.
                        </Text>
                        <Button
                            backgroundColor="#DB1E36"
                            borderRadius={50}
                            paddingHorizontal={10}
                            height={56}
                            width={307}
                            alignSelf="center"
                            onPress={handleRequestPermission}
                        >
                            <Text color='white'>Request Permission</Text>
                        </Button>
                    </VStack>
                )}
            </Card>

            <Button
                backgroundColor="#DB1E36"
                borderRadius={50}
                paddingHorizontal={10}
                height={56}
                width={307}
                alignSelf="center"
                onPress={() => setScannedCode(null)}
            >
                <Text color='white'>Scan QR Code</Text>
            </Button>
            <Button
                borderColor='#DB1E36'
                borderWidth={1}
                backgroundColor="$white"
                borderRadius={50}
                paddingHorizontal={10}
                marginTop={16}
                height={56}
                width={307}
                alignSelf="center"
                onPress={() => { router.push('/points/transffer/enter-code') }}
            >
                <Text color='#DB1E36'>Enter Code</Text>
            </Button>
        </VStack>
    );
};

export default ScanCodeView;
