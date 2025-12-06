import React, { useState } from 'react';
import { ScrollView } from 'react-native';
import { VStack, HStack, Text, Box, Input, InputField, Pressable } from '@gluestack-ui/themed';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { getAllMerchants } from '@/src/data/mock-merchants';
import { Colors } from '@/src/constants/Colors';

const Merchants = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const allMerchants = getAllMerchants();

    const categories = [
        { id: '1', name: 'All', icon: 'apps' },
        { id: '2', name: 'Food', icon: 'restaurant' },
        { id: '3', name: 'Shopping', icon: 'cart' },
        { id: '4', name: 'Services', icon: 'construct' },
    ];

    const [selectedCategory, setSelectedCategory] = useState('1');

    return (
        <ScrollView style={{ flex: 1, backgroundColor: '#F5F5F5' }}>
            <VStack flex={1} paddingBottom={20}>
                {/* Header - Enhanced */}
                <Box backgroundColor={Colors.primary.DEFAULT} paddingTop={50} paddingBottom={24}>
                    <VStack paddingHorizontal={20} space="md">
                        <VStack>
                            <Text fontSize={24} fontWeight="700" color="white">
                                Merchants
                            </Text>
                            <Text fontSize={14} color="rgba(255, 255, 255, 0.8)" marginTop={4}>
                                Pay with crypto at local merchants
                            </Text>
                        </VStack>

                        {/* Search Bar - White with Shadow */}
                        <Input
                            backgroundColor="white"
                            borderRadius={12}
                            height={48}
                            borderWidth={0}
                            style={{
                                shadowColor: '#000',
                                shadowOffset: { width: 0, height: 2 },
                                shadowOpacity: 0.1,
                                shadowRadius: 4,
                                elevation: 3,
                            }}
                        >
                            <Box paddingLeft={12}>
                                <Ionicons name="search" size={20} color={Colors.grey} />
                            </Box>
                            <InputField
                                placeholder="Search merchants..."
                                placeholderTextColor="#8E8E93"
                                color={Colors.dark}
                                value={searchQuery}
                                onChangeText={setSearchQuery}
                            />
                        </Input>
                    </VStack>
                </Box>

                {/* Categories - Enhanced Pills */}
                <ScrollView
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    style={{ marginTop: 16 }}
                    contentContainerStyle={{ paddingHorizontal: 20 }}
                >
                    <HStack space="sm">
                        {categories.map((category) => (
                            <Pressable
                                key={category.id}
                                onPress={() => setSelectedCategory(category.id)}
                            >
                                <Box
                                    backgroundColor={selectedCategory === category.id ? '#1E40AF' : 'white'}
                                    borderRadius={999}
                                    paddingHorizontal={24}
                                    paddingVertical={8}
                                    borderWidth={1}
                                    borderColor={selectedCategory === category.id ? '#1E40AF' : '#8E8E93'}
                                >
                                    <HStack space="xs" alignItems="center">
                                        <Ionicons
                                            name={category.icon as any}
                                            size={16}
                                            color={selectedCategory === category.id ? 'white' : '#8E8E93'}
                                        />
                                        <Text
                                            fontSize={14}
                                            fontWeight="500"
                                            color={selectedCategory === category.id ? 'white' : '#8E8E93'}
                                        >
                                            {category.name}
                                        </Text>
                                    </HStack>
                                </Box>
                            </Pressable>
                        ))}
                    </HStack>
                </ScrollView>

                {/* Merchant List - Enhanced */}
                <VStack paddingHorizontal={20} marginTop={20} space="sm">
                    <HStack justifyContent="space-between" alignItems="center">
                        <Text fontSize={18} fontWeight="600" color={Colors.dark}>
                            Near You
                        </Text>
                        <Pressable>
                            <HStack space="xs" alignItems="center">
                                <Ionicons name="location" size={16} color={Colors.primary.DEFAULT} />
                                <Text fontSize={14} fontWeight="500" color={Colors.primary.DEFAULT}>
                                    Map View
                                </Text>
                            </HStack>
                        </Pressable>
                    </HStack>

                    <VStack space="xs" marginTop={8}>
                        {allMerchants.map((merchant) => (
                            <Pressable
                                key={merchant.id}
                                onPress={() => router.push({
                                    pathname: '/main/merchants/confirm-merchant',
                                    params: {
                                        merchantId: merchant.id,
                                        merchantName: merchant.name,
                                        merchantCategory: merchant.category,
                                        merchantLocation: merchant.location,
                                        merchantCode: merchant.merchantCode,
                                        isVerified: merchant.isVerified ? 'true' : 'false',
                                    }
                                })}
                            >
                                <Box
                                    backgroundColor="white"
                                    borderRadius={12}
                                    padding={16}
                                    borderWidth={1}
                                    borderColor={Colors.lightGrey}
                                    style={{
                                        shadowColor: '#000',
                                        shadowOffset: { width: 0, height: 1 },
                                        shadowOpacity: 0.05,
                                        shadowRadius: 2,
                                        elevation: 1,
                                    }}
                                >
                                    <HStack space="md" alignItems="center">
                                        {/* Merchant Logo */}
                                        <Box
                                            width={56}
                                            height={56}
                                            borderRadius={28}
                                            backgroundColor="#1E40AF15"
                                            alignItems="center"
                                            justifyContent="center"
                                        >
                                            <Ionicons name="storefront" size={28} color={Colors.primary.DEFAULT} />
                                        </Box>

                                        {/* Merchant Info */}
                                        <VStack flex={1}>
                                            <HStack space="xs" alignItems="center" marginBottom={4}>
                                                <Text fontSize={16} fontWeight="600" color={Colors.dark}>
                                                    {merchant.name}
                                                </Text>
                                                {merchant.isVerified && (
                                                    <Ionicons name="checkmark-circle" size={16} color={Colors.success} />
                                                )}
                                            </HStack>
                                            <HStack space="xs" alignItems="center" marginTop={4}>
                                                <Text fontSize={13} color={Colors.grey}>
                                                    {merchant.category}
                                                </Text>
                                                <Text fontSize={13} color={Colors.grey}>•</Text>
                                                <HStack space="xs" alignItems="center">
                                                    <Ionicons name="location" size={14} color={Colors.grey} />
                                                    <Text fontSize={13} color={Colors.grey}>
                                                        {merchant.location}
                                                    </Text>
                                                </HStack>
                                            </HStack>
                                            <HStack space="xs" alignItems="center" marginTop={6}>
                                                <Box
                                                    backgroundColor="#22C55E15"
                                                    borderRadius={6}
                                                    paddingHorizontal={8}
                                                    paddingVertical={3}
                                                >
                                                    <Text fontSize={11} color={Colors.success} fontWeight="600">
                                                        CRYPTO ACCEPTED
                                                    </Text>
                                                </Box>
                                            </HStack>
                                        </VStack>

                                        {/* Arrow */}
                                        <Ionicons name="chevron-forward" size={20} color={Colors.grey} />
                                    </HStack>
                                </Box>
                            </Pressable>
                        ))}
                    </VStack>
                </VStack>
            </VStack>
        </ScrollView>
    );
};

export default Merchants;
