import React from 'react';
import { ScrollView } from 'react-native';
import { Box, VStack, HStack, Text, Pressable, Avatar, Switch, Heading, Card } from "@gluestack-ui/themed";
import Icon from '@expo/vector-icons/Ionicons';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { useCurrentUser } from '@/src/hooks/useCurrentUser';

const ProfileView = () => {
    const { user } = useCurrentUser();

    const handleNavigation = (route: string) => {
        // Implement navigation function
    };

    const menuItems = [
        { label: 'Account Details', icon: 'person-outline', route: '/account/account-details' },
        { label: 'KYC Verification', icon: 'shield-checkmark-outline', route: '/kyc/verification', badge: 'Pending' },
        { label: 'Linked M-Pesa', icon: 'phone-portrait-outline', route: '/mpesa/link-account' },
        { label: 'Transaction History', icon: 'time-outline', route: '/wallet/transaction-history' },
        { label: 'Security & PIN', icon: 'lock-closed-outline', route: '/settings/security' },
        { label: 'Support', icon: 'help-circle-outline', route: '/settings/support' },
        { label: 'Settings', icon: 'settings-outline', route: '/settings' },
        { label: 'Data Privacy', icon: 'shield-outline', route: '/data-privacy' },
    ];

    const getInitials = () => {
        if (!user) return 'U';
        const first = user.firstName?.charAt(0) || '';
        const last = user.lastName?.charAt(0) || '';
        return (first + last).toUpperCase();
    };

    return (
        <ScrollView style={{ backgroundColor: '#F5F5F5' }}>
            <VStack flex={1} paddingHorizontal={20}>
                <HStack width="$full" height={94} justifyContent="flex-start" alignItems="flex-end">
                    <Pressable onPress={() => router.back()} marginRight={120} >
                        <Ionicons name="chevron-back-outline" size={24} color="#1C1C1E" />
                    </Pressable>
                    <Heading fontSize={24} fontWeight="700" color="#1C1C1E">My Account</Heading>
                </HStack>

                {/* Profile Card - Enhanced with Gold Accent */}
                <Card
                    backgroundColor="white"
                    borderRadius={16}
                    marginVertical={24}
                    padding={24}
                    style={{
                        shadowColor: '#000',
                        shadowOffset: { width: 0, height: 2 },
                        shadowOpacity: 0.08,
                        shadowRadius: 8,
                        elevation: 4,
                    }}
                >
                    <VStack alignItems="center">
                        <Box
                            width={80}
                            height={80}
                            borderRadius={40}
                            backgroundColor="#F59E0B"
                            alignItems="center"
                            justifyContent="center"
                            marginBottom={12}
                            style={{
                                shadowColor: '#F59E0B',
                                shadowOffset: { width: 0, height: 4 },
                                shadowOpacity: 0.3,
                                shadowRadius: 8,
                                elevation: 4,
                            }}
                        >
                            <Text fontSize={28} fontWeight="700" color="white">{getInitials()}</Text>
                        </Box>
                        <Text fontSize={20} fontWeight="700" color="#1C1C1E" marginTop={4}>
                            {user?.firstName} {user?.lastName}
                        </Text>
                        <Text fontSize={14} color="#8E8E93" marginTop={4}>{user?.phoneNumber || '+254700000636'}</Text>
                        <HStack space="xs" alignItems="center" marginTop={12}>
                            <Box
                                backgroundColor="#22C55E15"
                                borderRadius={12}
                                paddingHorizontal={12}
                                paddingVertical={6}
                            >
                                <HStack space="xs" alignItems="center">
                                    <Ionicons name="checkmark-circle" size={14} color="#22C55E" />
                                    <Text fontSize={12} color="#22C55E" fontWeight="600">VERIFIED</Text>
                                </HStack>
                            </Box>
                        </HStack>
                    </VStack>
                    <Pressable
                        onPress={() => handleNavigation('/edit-profile')}
                        position="absolute"
                        top={16}
                        right={16}
                    >
                        <Icon name="create-outline" size={24} color="#8E8E93" />
                    </Pressable>
                </Card>
                {/* Menu Card - Enhanced */}
                <Card
                    backgroundColor="white"
                    borderRadius={16}
                    marginBottom={24}
                    style={{
                        shadowColor: '#000',
                        shadowOffset: { width: 0, height: 1 },
                        shadowOpacity: 0.05,
                        shadowRadius: 4,
                        elevation: 2,
                    }}
                >
                    <VStack>
                        {menuItems.map((item, index) => (
                            <Pressable key={index} onPress={() => handleNavigation(item.route)}>
                                <HStack
                                    justifyContent="space-between"
                                    alignItems="center"
                                    paddingVertical={16}
                                    paddingHorizontal={16}
                                    backgroundColor="white"
                                    borderBottomWidth={index < menuItems.length - 1 ? 1 : 0}
                                    borderBottomColor="#F0F0F0"
                                    borderLeftWidth={0}
                                    borderLeftColor="#F59E0B"
                                >
                                    <HStack alignItems="center" space="md">
                                        <Icon name={item.icon as any} size={22} color="#8E8E93" />
                                        <Text fontSize={15} fontWeight="400" color="#1C1C1E">{item.label}</Text>
                                    </HStack>
                                    <Icon name="chevron-forward-outline" size={20} color="#8E8E93" />
                                </HStack>
                            </Pressable>
                        ))}
                        <HStack
                            justifyContent="space-between"
                            alignItems="center"
                            paddingVertical={16}
                            paddingHorizontal={16}
                            backgroundColor="white"
                            borderBottomWidth={1}
                            borderBottomColor="#F0F0F0"
                        >
                            <HStack alignItems="center" space="md">
                                <Icon name="moon-outline" size={22} color="#8E8E93" />
                                <Text fontSize={15} fontWeight="400" color="#1C1C1E">Dark Mode</Text>
                            </HStack>
                            <Switch />
                        </HStack>
                        <Pressable onPress={() => handleNavigation('/logout')}>
                            <HStack
                                justifyContent="space-between"
                                alignItems="center"
                                paddingVertical={16}
                                paddingHorizontal={16}
                                backgroundColor="white"
                            >
                                <HStack alignItems="center" space="md">
                                    <Icon name="log-out-outline" size={22} color="#DC2626" />
                                    <Text fontSize={15} fontWeight="500" color="#DC2626">Logout</Text>
                                </HStack>
                            </HStack>
                        </Pressable>
                    </VStack>
                </Card>
            </VStack>
        </ScrollView>
    );
};

export default ProfileView;