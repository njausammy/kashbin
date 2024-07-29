import React, { useState } from 'react';
import { Box, VStack, Text, Button, View } from "@gluestack-ui/themed";
import { CameraView, useCameraPermissions } from 'expo-camera';

const ScanCodeView = () => {
    const [hasPermission, setHasPermission] = useState(null);
    const [scanned, setScanned] = useState(false);
    const [permission, requestPermission] = useCameraPermissions();

    if (!permission) {
        // Camera permissions are still loading.
        return <View />;
    }

    if (!permission.granted) {
        // Camera permissions are not granted yet.
        return (
            <View>
                <Text style={{ textAlign: 'center' }}>We need your permission to show the camera</Text>
                <Button onPress={requestPermission}>Grant Permission</Button>
            </View>
        );
    }


    return (
        <Box flex={1} backgroundColor="$white" padding={20}>
            <VStack space="md" alignItems="center">
                <Box
                    borderWidth={1}
                    borderColor="$lightBlue300"
                    borderRadius="$lg"
                    padding={20}
                    width="100%"
                    alignItems="center"
                >
                    <Text fontSize={18} fontWeight="$medium" textAlign="center" marginBottom={10}>
                        Scan or Enter Code to Redeem or Request Points
                    </Text>
                    <Text fontSize={14} color="$blueGray400" textAlign="center" marginBottom={20}>
                        Hold the code inside the frame, it will be scanned automatically
                    </Text>
                    <CameraView
                        barcodeScannerSettings={{
                            barcodeTypes: ["qr"],
                        }}
                        onBarcodeScanned={(e) => {
                            console.log(e)
                        }}
                    />
                </Box>

                <Button
                    width="100%"
                    backgroundColor="$red500"
                    borderRadius="$full"
                    padding={12}
                    onPress={() => { }}
                >
                    <Text color="$white" fontSize={16} fontWeight="$medium">
                        Scan QR Code
                    </Text>
                </Button>

                <Button
                    width="100%"
                    variant="outline"
                    borderColor="$red500"
                    borderRadius="$full"
                    padding={12}
                    onPress={() => setScanned(false)} // Reset scanned state for testing
                >
                    <Text color="$red500" fontSize={16} fontWeight="$medium">
                        Enter Code
                    </Text>
                </Button>
            </VStack>
        </Box>
    );
};

export default ScanCodeView;
