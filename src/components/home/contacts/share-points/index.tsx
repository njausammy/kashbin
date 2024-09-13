import React, { useState } from 'react';
import { VStack, Text, Card, HStack, IconButton, Image, TextInput } from "@gluestack-ui/themed";
import Button from '@/src/components/form/AnimatedButton';
import { router, useLocalSearchParams } from 'expo-router';

const SharePointsView = () => {
    const { user } = useLocalSearchParams() as { user: string };
    const userDetails = user ? JSON.parse(user) : {
        name: 'Kate Wanjiku',
        handle: '@k.wanjiku',
        phone: '+2547******636',
        profileImage: 'https://example.com/kate-profile.jpg', // Replace with actual image URL or local asset
        pointsBalance: 3850,
    };

    const [points, setPoints] = useState(500); // Default points to share

    const handleContinue = () => {
        console.log('Points to share:', points);
        // Perform the share points action here
    };

    return (
        <VStack backgroundColor="$white" flex={1}>
            {/* Page Header with Back Button */}
            <HStack justifyContent="space-between" alignItems="center" padding={4}>
                <IconButton
                    icon="arrow-left" // Use the correct icon based on your library
                    onPress={() => router.back()}
                />
                <Text fontSize={18} fontWeight="600">Share Points</Text>
            </HStack>

            <Text marginLeft={4} marginTop={2} fontSize={14} color="#5A5A5A">
                Enter points to share rewards
            </Text>

            {/* User Information Card */}
            <Card marginHorizontal={14} marginTop={20} variant="elevated" borderRadius="$xl" paddingVertical={16}>
                <VStack alignItems="center">
                    <Image
                        source={{ uri: userDetails.profileImage }}
                        style={{ width: 70, height: 70, borderRadius: 35 }}
                    />
                    <Text fontSize={16} fontWeight={600} textAlign="center" marginTop={12}>
                        {userDetails.name}
                    </Text>
                    <Text fontSize={14} fontWeight={400} textAlign="center" color="#5A5A5A">
                        {userDetails.handle}
                    </Text>
                    <Text fontSize={14} fontWeight={400} textAlign="center" color="#5A5A5A" marginTop={2}>
                        {userDetails.phone}
                    </Text>

                    {/* Points Input */}
                    <TextInput
                        value={points.toString()}
                        onChangeText={(value) => setPoints(Number(value))}
                        keyboardType="numeric"
                        textAlign="center"
                        fontSize={40}
                        fontWeight="600"
                        style={{ marginTop: 20 }}
                    />

                    {/* Points Balance */}
                    <Text marginTop={12} fontSize={12} fontWeight={400} color="#5A5A5A" textAlign="center">
                        Points balance: {userDetails.pointsBalance}
                    </Text>
                </VStack>
            </Card>

            {/* Continue Button */}
            <Button
                backgroundColor="#DB1E36"
                borderRadius={50}
                paddingHorizontal={10}
                height={56}
                width={307}
                alignSelf="center"
                marginTop={24}
                onPress={handleContinue}
            >
                <Text color='white'>Continue</Text>
            </Button>
        </VStack>
    );
};

export default SharePointsView;
