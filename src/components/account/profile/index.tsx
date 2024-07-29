import React from 'react';
import { Box, VStack, HStack, Text, Pressable, Avatar } from "@gluestack-ui/themed";
import Icon from '@expo/vector-icons/Ionicons';

const ProfileView = () => {
    const handleNavigation = (route: string) => {
        // Implement navigation function
    };

    const menuItems = [
        { label: 'Orders', icon: 'cart-outline', route: '/orders' },
        { label: 'Deliveries', icon: 'bicycle-outline', route: '/deliveries' },
        { label: 'Subscriptions', icon: 'reader-outline', route: '/subscriptions' },
        { label: 'Wallet', icon: 'wallet-outline', route: '/wallet' },
        { label: 'Support', icon: 'help-circle-outline', route: '/support' },
        { label: 'Linked Services', icon: 'link-outline', route: '/linked-services' },
        { label: 'Settings', icon: 'settings-outline', route: '/settings' },
    ];

    return (
        <VStack flex={1} backgroundColor="#F7F7F7">
            <Box backgroundColor="#FFFFFF" padding={4} borderRadius={10} margin={4}>
                <HStack justifyContent="space-between" alignItems="center">
                    <HStack alignItems="center">
                        <Avatar
                            size="lg"
                            // source={{ uri: 'https://example.com/path-to-avatar.jpg' }}
                            
                        />
                        <VStack marginLeft={3}>
                            <Text fontSize={13} fontWeight="bold">Mariah Wanjiku</Text>
                            <Text color="gray.500">@m.wanjiku</Text>
                            <Text color="gray.500">+254700000636</Text>
                        </VStack>
                    </HStack>
                    <Pressable onPress={() => handleNavigation('/edit-profile')}>
                        <Icon name="create-outline" size={24} color="#000" />
                    </Pressable>
                </HStack>
            </Box>
            <VStack margin={4}>
                {menuItems.map((item, index) => (
                    <Pressable key={index} onPress={() => handleNavigation(item.route)}>
                        <HStack
                            justifyContent="space-between"
                            alignItems="center"
                            paddingVertical={4}
                            borderBottomWidth={index === menuItems.length - 1 ? 0 : 1}
                            borderBottomColor="#E8E8E8"
                        >
                            <HStack alignItems="center">
                                <Box marginRight={3}>
                                    {/* <Icon name={item.icon} size={24} color="#1C274C" /> */}
                                </Box>
                                <Text fontSize={14}>{item.label}</Text>
                            </HStack>
                            <Icon name="chevron-forward-outline" size={24} color="#1C274C" />
                        </HStack>
                    </Pressable>
                ))}
            </VStack>
        </VStack>
    );
};

export default ProfileView;
