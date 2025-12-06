
import React, { useState } from 'react';
import { ScrollView, Image } from 'react-native';
import { VStack, HStack, Text, Box, Pressable, Spinner } from "@gluestack-ui/themed";
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import Button from '@/src/components/form/AnimatedButton';
import * as ImagePicker from 'expo-image-picker';
import { Colors } from '@/src/constants/Colors';
const UploadID = () => {
    const [frontImage, setFrontImage] = useState<string | null>(null);
    const [backImage, setBackImage] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(false);

    const pickImage = async (side: 'front' | 'back') => {
        // Request permissions
        const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();

        if (permissionResult.granted === false) {
            alert('Permission to access camera roll is required!');
            return;
        }

        // Pick image
        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 0.8,
        });

        if (!result.canceled && result.assets[0]) {
            if (side === 'front') {
                setFrontImage(result.assets[0].uri);
            } else {
                setBackImage(result.assets[0].uri);
            }
        }
    };

    const takePhoto = async (side: 'front' | 'back') => {
        // Request camera permissions
        const permissionResult = await ImagePicker.requestCameraPermissionsAsync();

        if (permissionResult.granted === false) {
            alert('Permission to access camera is required!');
            return;
        }

        // Launch camera
        const result = await ImagePicker.launchCameraAsync({
            allowsEditing: true,
            aspect: [4, 3],
            quality: 0.8,
        });

        if (!result.canceled && result.assets[0]) {
            if (side === 'front') {
                setFrontImage(result.assets[0].uri);
            } else {
                setBackImage(result.assets[0].uri);
            }
        }
    };

    const handleContinue = () => {
        if (!frontImage || !backImage) {
            alert('Please upload both sides of your ID');
            return;
        }

        // TODO: Save images to user data
        router.push('/kyc/selfie');
    };

    const DocumentUploadBox = ({
        side,
        image,
        onPickImage,
        onTakePhoto
    }: {
        side: string;
        image: string | null;
        onPickImage: () => void;
        onTakePhoto: () => void;
    }) => (
        <Box
            backgroundColor="$white"
            borderRadius={16}
            borderWidth={2}
            borderColor={image ? "#1E40AF" : "#E5E7EB"}
            borderStyle={image ? "solid" : "dashed"}
            padding={16}
            minHeight={200}
        >
            {image ? (
                <VStack space="md">
                    <Image
                        source={{ uri: image }}
                        style={{ width: '100%', height: 150, borderRadius: 12 }}
                        resizeMode="cover"
                    />
                    <HStack space="sm">
                        <Pressable
                            flex={1}
                            backgroundColor="rgba(30, 64, 175, 0.08)"
                            borderRadius={8}
                            padding={10}
                            alignItems="center"
                            onPress={onPickImage}
                        >
                            <Text fontSize={13} color={Colors.primary.DEFAULT} fontWeight={600}>
                                Change
                            </Text>
                        </Pressable>
                        <Pressable
                            flex={1}
                            backgroundColor="rgba(220, 38, 38, 0.08)"
                            borderRadius={8}
                            padding={10}
                            alignItems="center"
                            onPress={() => side === 'Front' ? setFrontImage(null) : setBackImage(null)}
                        >
                            <Text fontSize={13} color={Colors.error} fontWeight={600}>
                                Remove
                            </Text>
                        </Pressable>
                    </HStack>
                </VStack>
            ) : (
                <VStack space="md" alignItems="center" paddingVertical={20}>
                    <Box
                        width={64}
                        height={64}
                        borderRadius={32}
                        backgroundColor="rgba(30, 64, 175, 0.08)"
                        alignItems="center"
                        justifyContent="center"
                    >
                        <Ionicons name="card" size={32} color={Colors.primary.DEFAULT} />
                    </Box>
                    <VStack space="xs" alignItems="center">
                        <Text fontSize={16} fontWeight={600} color="#2A2A2A">
                            {side} of ID
                        </Text>
                        <Text fontSize={13} color="#5A5A5A" textAlign="center">
                            Upload a clear photo of your ID card
                        </Text>
                    </VStack>

                    <HStack space="sm" marginTop={8}>
                        <Pressable
                            backgroundColor={Colors.primary.DEFAULT}
                            borderRadius={8}
                            paddingHorizontal={16}
                            paddingVertical={10}
                            onPress={onTakePhoto}
                        >
                            <HStack space="xs" alignItems="center">
                                <Ionicons name="camera" size={18} color="white" />
                                <Text fontSize={14} color="$white" fontWeight={600}>
                                    Take Photo
                                </Text>
                            </HStack>
                        </Pressable>

                        <Pressable
                            backgroundColor="$white"
                            borderRadius={8}
                            paddingHorizontal={16}
                            paddingVertical={10}
                            borderWidth={1}
                            borderColor={Colors.primary.DEFAULT}
                            onPress={onPickImage}
                        >
                            <HStack space="xs" alignItems="center">
                                <Ionicons name="images" size={18} color={Colors.primary.DEFAULT} />
                                <Text fontSize={14} color={Colors.primary.DEFAULT} fontWeight={600}>
                                    Gallery
                                </Text>
                            </HStack>
                        </Pressable>
                    </HStack>
                </VStack>
            )}
        </Box>
    );

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
                                Upload ID Document
                            </Text>
                            <Text fontSize={14} color="rgba(255, 255, 255, 0.8)">
                                Step 1 of 3
                            </Text>
                        </VStack>
                    </HStack>
                </Box>

                {/* Content */}
                <VStack paddingHorizontal={24} marginTop={24} space="lg">
                    {/* Instructions */}
                    <Box
                        backgroundColor="rgba(30, 64, 175, 0.06)"
                        borderRadius={12}
                        padding={16}
                    >
                        <VStack space="sm">
                            <HStack space="xs" alignItems="center">
                                <Ionicons name="information-circle" size={20} color={Colors.primary.DEFAULT} />
                                <Text fontSize={15} fontWeight={600} color="#2A2A2A">
                                    Tips for best results:
                                </Text>
                            </HStack>
                            <VStack space="xs" paddingLeft={28}>
                                <Text fontSize={13} color="#5A5A5A">
                                    • Use good lighting
                                </Text>
                                <Text fontSize={13} color="#5A5A5A">
                                    • Ensure all text is readable
                                </Text>
                                <Text fontSize={13} color="#5A5A5A">
                                    • Avoid glare and shadows
                                </Text>
                                <Text fontSize={13} color="#5A5A5A">
                                    • ID must be valid (not expired)
                                </Text>
                            </VStack>
                        </VStack>
                    </Box>

                    {/* Front of ID */}
                    <VStack space="sm">
                        <Text fontSize={16} fontWeight={600} color="#2A2A2A">
                            Front of ID
                        </Text>
                        <DocumentUploadBox
                            side="Front"
                            image={frontImage}
                            onPickImage={() => pickImage('front')}
                            onTakePhoto={() => takePhoto('front')}
                        />
                    </VStack>

                    {/* Back of ID */}
                    <VStack space="sm">
                        <Text fontSize={16} fontWeight={600} color="#2A2A2A">
                            Back of ID
                        </Text>
                        <DocumentUploadBox
                            side="Back"
                            image={backImage}
                            onPickImage={() => pickImage('back')}
                            onTakePhoto={() => takePhoto('back')}
                        />
                    </VStack>

                    {/* Continue Button */}
                    <Button
                        backgroundColor={frontImage && backImage ? "#1E40AF" : "#E5E7EB"}
                        borderRadius={50}
                        height={56}
                        width="$full"
                        marginTop={16}
                        disabled={!frontImage || !backImage}
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

export default UploadID;
