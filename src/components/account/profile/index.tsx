import React from 'react';
import { ScrollView } from 'react-native';
import { Box, VStack, HStack, Text, Pressable, Avatar, Switch, Heading, Card } from "@gluestack-ui/themed";
import Icon from '@expo/vector-icons/Ionicons';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';

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
        { label: 'Data Privacy', icon: 'shield-outline', route: '/data-privacy' },
    ];

    return (
        <ScrollView>
            <VStack flex={1} marginHorizontal={24}>
                <HStack width="$full" height={94} justifyContent="flex-start" alignItems="flex-end">
                    <Pressable onPress={() => router.back()} marginRight={120} >
                        <Ionicons name="chevron-back-outline" size={24} color="#2A2A2A" />
                    </Pressable>
                    <Heading fontSize={18}>My Account</Heading>
                </HStack>
                <Card height={180} borderRadius="$lg" marginVertical={24}>
                    <VStack alignItems="center">
                        <Text fontSize={18} fontWeight="bold" marginTop={2}>Mariah Wanjiku</Text>
                        <Text fontSize={14} color="gray.500">@m.wanjiku</Text>
                        <Text fontSize={14} color="gray.500">+254700000636</Text>
                    </VStack>
                    <Pressable
                        onPress={() => handleNavigation('/edit-profile')}
                        position="absolute"
                        top={16}
                        right={4}
                    >
                        <Icon name="create-outline" size={24} color="#000" />
                    </Pressable>
                </Card>
                <Card borderRadius="$lg" height={400}>
                    <ScrollView>
                        <VStack>
                            {menuItems.map((item, index) => (
                                <Pressable key={index} onPress={() => handleNavigation(item.route)}>
                                    <HStack
                                        justifyContent="space-between"
                                        alignItems="center"
                                        paddingVertical={4}
                                        paddingHorizontal={4} 
                                        backgroundColor="white"
                                        borderBottomWidth={1}
                                        borderBottomColor="#E8E8E8"
                                        height={62}
                                    >
                                        <HStack alignItems="center">
                                            <Box marginRight={3}>
                                                <Icon name={item.icon} size={24} color="#1C274C" />
                                            </Box>
                                            <Text fontSize={14}>{item.label}</Text>
                                        </HStack>
                                        <Icon name="chevron-forward-outline" size={24} color="#1C274C" />
                                    </HStack>
                                </Pressable>
                            ))}
                            <HStack
                                justifyContent="space-between"
                                alignItems="center"
                                paddingVertical={4}
                                paddingHorizontal={4}
                                backgroundColor="white"
                            >
                                <HStack alignItems="center">
                                    <Box marginRight={3}>
                                        <Icon name="moon-outline" size={24} color="#1C274C" />
                                    </Box>
                                    <Text fontSize={14}>Dark Mode</Text>
                                </HStack>
                                <Switch />
                            </HStack>
                            <Pressable onPress={() => handleNavigation('/logout')}>
                                <HStack
                                    justifyContent="space-between"
                                    alignItems="center"
                                    paddingVertical={4}
                                    paddingHorizontal={4}
                                    backgroundColor="white"
                                >
                                    <HStack alignItems="center">
                                        <Box marginRight={3}>
                                            <Icon name="log-out-outline" size={24} color="red" />
                                        </Box>
                                        <Text fontSize={14} color="red">Logout</Text>
                                    </HStack>
                                </HStack>
                            </Pressable>
                        </VStack>
                    </ScrollView>
                </Card>
            </VStack>
        </ScrollView>
    );
};

export default ProfileView;