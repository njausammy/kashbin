import React, { useState } from 'react';
import { VStack, Text, Avatar, Pressable, Box, Card } from "@gluestack-ui/themed";
import Icon from '@expo/vector-icons/MaterialIcons'; // Adjust the icon package as per your needs
import Button from '@/src/components/form/AnimatedButton';
import { router, useLocalSearchParams } from 'expo-router';
import PageHeader from '@/src/components/PageHeader';

const ConnectionView = () => {
    const { user } = useLocalSearchParams() as { user: string };
    const userDetails = user ? JSON.parse(user) : {
        name: 'Kate Wanjiku',
        handle: '@k.wanjiku',
        phone: '+2547******636',
        profileImage: 'https://example.com/kate-profile.jpg',
    };

    const [selectedOption, setSelectedOption] = useState<string | null>(null);

    const handleOptionSelect = (option: string) => {
        setSelectedOption(option);
        console.log('Selected Option:', option);
    };

    return (
        <VStack backgroundColor="$white" flex={1}>

            <Box paddingHorizontal={15}>
                <PageHeader hideProgressBar value={0} />
            </Box>
            <Card marginHorizontal={14} marginTop={20} variant="elevated" borderRadius="$xl" paddingVertical={16}>
                <VStack alignItems="center">
                    <Avatar
                        // source={{ uri: userDetails.profileImage || 'https://example.com/placeholder-image.jpg' }}
                        size="xl"
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

            {/* Options */}
            <VStack marginHorizontal={14} marginTop={12} padding={2}>
                <Pressable
                    onPress={() => handleOptionSelect('share_points')}
                    style={{ flexDirection: 'row', alignItems: 'center', padding: 16, borderRadius: 12, backgroundColor: '#F8F9FA', marginBottom: 12 }}
                >
                    <Box marginRight={16}>
                        <Icon name="emoji-events" size={24} color="#FFC107" />
                    </Box>
                    <VStack>
                        <Text fontSize={16} fontWeight={500}>Share Points</Text>
                        <Text fontSize={12} color="#5A5A5A">Share your rewards points</Text>
                    </VStack>
                </Pressable>

                <Pressable
                    onPress={() => handleOptionSelect('invite_deal')}
                    style={{ flexDirection: 'row', alignItems: 'center', padding: 16, borderRadius: 12, backgroundColor: '#F8F9FA', marginBottom: 12 }}
                >
                    <Box marginRight={16}>
                        <Icon name="group" size={24} color="#FFC107" />
                    </Box>
                    <VStack>
                        <Text fontSize={16} fontWeight={500}>Invite to a Deal</Text>
                        <Text fontSize={12} color="#5A5A5A">Ask them to join your deal</Text>
                    </VStack>
                </Pressable>

                <Pressable
                    onPress={() => handleOptionSelect('send_parcel')}
                    style={{ flexDirection: 'row', alignItems: 'center', padding: 16, borderRadius: 12, backgroundColor: '#F8F9FA', marginBottom: 12 }}
                >
                    <Box marginRight={16}>
                        <Icon name="local-shipping" size={24} color="#FFC107" />
                    </Box>
                    <VStack>
                        <Text fontSize={16} fontWeight={500}>Send Parcel</Text>
                        <Text fontSize={12} color="#5A5A5A">Send a parcel from your location</Text>
                    </VStack>
                </Pressable>
            </VStack>

            <Button
                backgroundColor="#DB1E36"
                borderRadius={50}
                paddingHorizontal={10}
                height={56}
                width={307}
                alignSelf="center"
                marginTop={24}
                onPress={() => console.log('Continue with:', selectedOption)}
            >
                <Text color='white'>Continue</Text>
            </Button>
        </VStack>
    );
};

export default ConnectionView;
