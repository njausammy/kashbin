import React, { useState } from 'react';
import { VStack, Text, Card, HStack, IconButton, Image } from "@gluestack-ui/themed";
import Button from '@/src/components/form/AnimatedButton';
import { router, useLocalSearchParams } from 'expo-router';
import { Radio } from '@gluestack-ui/themed'; // Assuming you have Radio from a UI library

const ConnectionView = () => {
    const { user } = useLocalSearchParams() as { user: string };
    const userDetails = user ? JSON.parse(user) : {
        name: 'Kate Wanjiku',
        handle: '@k.wanjiku',
        phone: '+2547******636',
        profileImage: 'https://example.com/kate-profile.jpg', // You can replace this with an actual image URL or local image.
    };

    const [selectedOption, setSelectedOption] = useState('share_points');

    const handleContinue = () => {
        console.log('Selected Option:', selectedOption);
        // Perform the action based on the selected option
    };

    return (
        <VStack backgroundColor="$white" flex={1}>
            {/* Page Header with Back Button */}
            <HStack justifyContent="space-between" alignItems="center" padding={4}>
                <IconButton
                    icon="arrow-left" // Use the correct icon based on your library
                    onPress={() => router.back()}
                />
                <Text fontSize={18} fontWeight="600">Connection</Text>
            </HStack>

            <Text marginLeft={4} marginTop={2} fontSize={14} color="#5A5A5A">
                Select an option for your connection
            </Text>

            {/* User Details Card */}
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
                </VStack>
            </Card>

            {/* Options with Radio Buttons */}
            <VStack marginHorizontal={14} marginTop={12} padding={2}>
                <Radio.Group
                    value={selectedOption}
                    onChange={(value) => setSelectedOption(value)}
                >
                    <Radio.Item value="share_points">
                        <HStack alignItems="center">
                            <Text fontSize={16} fontWeight={500}>Share Points</Text>
                            <Text marginLeft={2} fontSize={12} color="#5A5A5A">Share your rewards points</Text>
                        </HStack>
                    </Radio.Item>
                    <Radio.Item value="invite_deal" marginTop={4}>
                        <HStack alignItems="center">
                            <Text fontSize={16} fontWeight={500}>Invite to a Deal</Text>
                            <Text marginLeft={2} fontSize={12} color="#5A5A5A">Ask them to join your deal</Text>
                        </HStack>
                    </Radio.Item>
                    <Radio.Item value="send_parcel" marginTop={4}>
                        <HStack alignItems="center">
                            <Text fontSize={16} fontWeight={500}>Send Parcel</Text>
                            <Text marginLeft={2} fontSize={12} color="#5A5A5A">Send a parcel from your location</Text>
                        </HStack>
                    </Radio.Item>
                </Radio.Group>
            </VStack>

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

export default ConnectionView;
