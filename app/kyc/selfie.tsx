
import React, { useState } from 'react';
import { ScrollView, Image } from 'react-native';
import { VStack, HStack, Text, Box, Pressable } from "@gluestack-ui/themed";
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import Button from '@/src/components/form/AnimatedButton';
import * as ImagePicker from 'expo-image-picker';
import { Colors } from '@/src/constants/Colors';
const SelfiePage = () => {
    const [selfieImage, setSelfieImage] = useState<string | null>(null);

    const takeSelfie = async () => {
        // Request camera permissions
        const permissionResult = await ImagePicker.requestCameraPermissionsAsync();

        if (permissionResult.granted === false) {
            alert('Permission to access camera is required!');
            return;
        }

        // Launch camera (front-facing for selfie)
        const result = await ImagePicker.launchCameraAsync({
            allowsEditing: true,
            aspect: [1, 1],
            quality: 0.8,
            cameraType: ImagePicker.CameraType.front,
        });

        if (!result.canceled && result.assets[0]) {
            setSelfieImage(result.assets[0].uri);
        }
    };

    const pickFromGallery = async () => {
        const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();

        if (permissionResult.granted === false) {
            alert('Permission to access gallery is required!');
            return;
        }

        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [1, 1],
            quality: 0.8,
        });

        if (!result.canceled && result.assets[0]) {
            setSelfieImage(result.assets[0].uri);
        }
    };

    const handleContinue = () => {
        if (!selfieImage) {
            alert('Please take a selfie first');
            return;
        }

        // TODO: Save selfie to user data
        router.push('/kyc/details');
    };

    return (
        <ScrollView style={{ flex: 1, backgroundColor: '#F5F5F5' }}>
            <VStack flex={1} paddingBottom={40}>
                {/* Header */}
                <Box backgroundColor={Colors.primary.DEFAULT} paddingTop={50} paddingBottom={24}>
                    <HStack
                        paddingHorizontal={16}
                        alignItems="center"
                        space="md"
                    >
                        <Pressable onPress={() => router.back()}>
                            <Ionicons name="arrow-back" size={24} color="white" />
                        </Pressable>
                        <VStack flex={1}>
                            <Text fontSize={20} fontWeight={700} color="$white">
                                Take a Selfie
                            </Text>
                            <Text fontSize={14} color="rgba(255, 255, 255, 0.8)">
                                Step 2 of 3
                            </Text>
                        </VStack>
                    </HStack>
                </Box>

                {/* Content */}
                <VStack paddingHorizontal={24} marginTop={24} space="lg" alignItems="center">
                    {/* Instructions */}
                    <Box
                        backgroundColor="rgba(30, 64, 175, 0.06)"
                        borderRadius={12}
                        padding={16}
                        width="$full"
                    >
                        <VStack space="sm">
                            <HStack space="xs" alignItems="center">
                                <Ionicons name="information-circle" size={20} color={Colors.primary.DEFAULT} />
                                <Text fontSize={15} fontWeight={600} color="#2A2A2A">
                                    Selfie guidelines:
                                </Text>
                            </HStack>
                            <VStack space="xs" paddingLeft={28}>
                                <Text fontSize={13} color="#5A5A5A">
                                    • Face the camera directly
                                </Text>
                                <Text fontSize={13} color="#5A5A5A">
                                    • Remove glasses and hat
                                </Text>
                                <Text fontSize={13} color="#5A5A5A">
                                    • Ensure good lighting
                                </Text>
                                <Text fontSize={13} color="#5A5A5A">
                                    • Keep neutral expression
                                </Text>
                            </VStack>
                        </VStack>
                    </Box>

                    {/* Selfie Preview/Placeholder */}
                    <Box
                        backgroundColor="$white"
                        borderRadius={200}
                        width={280}
                        height={280}
                        borderWidth={selfieImage ? 4 : 2}
                        borderColor={selfieImage ? "#1E40AF" : "#E5E7EB"}
                        borderStyle={selfieImage ? "solid" : "dashed"}
                        overflow="hidden"
                        alignItems="center"
                        justifyContent="center"
                    >
                        {selfieImage ? (
                            <Image
                                source={{ uri: selfieImage }}
                                style={{ width: '100%', height: '100%' }}
                                resizeMode="cover"
                            />
                        ) : (
                            <VStack space="md" alignItems="center">
                                <Box
                                    width={80}
                                    height={80}
                                    borderRadius={40}
                                    backgroundColor="rgba(30, 64, 175, 0.08)"
                                    alignItems="center"
                                    justifyContent="center"
                                >
                                    <Ionicons name="person" size={48} color={Colors.primary.DEFAULT} />
                                </Box>
                                <Text fontSize={14} color="#5A5A5A" textAlign="center" paddingHorizontal={40}>
                                    Your selfie will appear here
                                </Text>
                            </VStack>
                        )}
                    </Box>

                    {/* Action Buttons */}
                    {selfieImage ? (
                        <HStack space="sm" width="$full">
                            <Pressable
                                flex={1}
                                backgroundColor="rgba(30, 64, 175, 0.08)"
                                borderRadius={12}
                                padding={16}
                                alignItems="center"
                                onPress={takeSelfie}
                            >
                                <HStack space="xs" alignItems="center">
                                    <Ionicons name="camera" size={20} color={Colors.primary.DEFAULT} />
                                    <Text fontSize={14} color={Colors.primary.DEFAULT} fontWeight={600}>
                                        Retake
                                    </Text>
                                </HStack>
                            </Pressable>

                            <Pressable
                                flex={1}
                                backgroundColor="rgba(220, 38, 38, 0.08)"
                                borderRadius={12}
                                padding={16}
                                alignItems="center"
                                onPress={() => setSelfieImage(null)}
                            >
                                <HStack space="xs" alignItems="center">
                                    <Ionicons name="trash" size={20} color={Colors.error} />
                                    <Text fontSize={14} color={Colors.error} fontWeight={600}>
                                        Remove
                                    </Text>
                                </HStack>
                            </Pressable>
                        </HStack>
                    ) : (
                        <VStack space="sm" width="$full">
                            <Button
                                backgroundColor={Colors.primary.DEFAULT}
                                borderRadius={50}
                                height={56}
                                width="$full"
                                onPress={takeSelfie}
                            >
                                <HStack space="xs" alignItems="center">
                                    <Ionicons name="camera" size={20} color="white" />
                                    <Text color="$white" fontSize={16} fontWeight={600}>
                                        Take Selfie
                                    </Text>
                                </HStack>
                            </Button>

                            <Pressable
                                backgroundColor="$white"
                                borderRadius={50}
                                height={56}
                                width="$full"
                                borderWidth={1}
                                borderColor={Colors.primary.DEFAULT}
                                alignItems="center"
                                justifyContent="center"
                                onPress={pickFromGallery}
                            >
                                <HStack space="xs" alignItems="center">
                                    <Ionicons name="images" size={20} color={Colors.primary.DEFAULT} />
                                    <Text color={Colors.primary.DEFAULT} fontSize={16} fontWeight={600}>
                                        Choose from Gallery
                                    </Text>
                                </HStack>
                            </Pressable>
                        </VStack>
                    )}

                    {/* Security Note */}
                    <Box
                        backgroundColor="rgba(245, 158, 11, 0.06)"
                        borderRadius={12}
                        padding={16}
                        width="$full"
                        marginTop={16}
                    >
                        <HStack space="sm" alignItems="flex-start">
                            <Ionicons name="shield-checkmark" size={20} color={Colors.secondary.DEFAULT} />
                            <VStack flex={1}>
                                <Text fontSize={14} color="#2A2A2A" fontWeight={500}>
                                    Your privacy matters
                                </Text>
                                <Text fontSize={13} color="#5A5A5A" marginTop={4}>
                                    Your selfie is used only for identity verification and is securely encrypted.
                                </Text>
                            </VStack>
                        </HStack>
                    </Box>

                    {/* Continue Button */}
                    <Button
                        backgroundColor={selfieImage ? "#1E40AF" : "#E5E7EB"}
                        borderRadius={50}
                        height={56}
                        width="$full"
                        marginTop={16}
                        disabled={!selfieImage}
                        onPress={handleContinue}
                    >
                        <Text color="$white" fontSize={16} fontWeight={600}>
                            Continue
                        </Text>
                    </Button>
                </VStack>
            </VStack>
        </ScrollView>
    );
};

export default SelfiePage;
