import React, { useState } from 'react';
import { Box, Button, Text, VStack, FlatList, Card, Input, InputField, } from "@gluestack-ui/themed";
import Icon from '@expo/vector-icons/SimpleLineIcons';
import { Pressable } from 'react-native';
import ShopModal from './ShopViewModal';

// Define Shop type
export interface Shop {
    name: string;
    address: string;
}

const ShopsScreen = () => {
    // State for selected shop and modal visibility
    const [selectedShop, setSelectedShop] = useState<Shop | null>(null);
    const [modalVisible, setModalVisible] = useState<boolean>(false);

    // List of shops
    const shops = [
        { name: 'Niyaleo Wholesale Depot', address: 'Kahawa Sukari Avenue, Next to Ruhan plaza' },
        { name: 'Sam Cereals', address: 'Kahawa Sukari Avenue, Next to Ruhan plaza' },
        { name: 'By Grace Shop', address: 'Sharon Plaza, Baringo Road' },
        { name: 'Promise General Store', address: 'Kwa Mchina, Loleta Apartments' },
        { name: 'Juhudi Shop', address: 'Wendani, Kazana Building' },
        { name: 'Promise General Store', address: 'Kwa Mchina, Loleta Apartments' },
        { name: 'Juhudi Shop', address: 'Wendani, Kazana Building' },
        { name: 'Promise General Store', address: 'Kwa Mchina, Loleta Apartments' },
        { name: 'Juhudi Shop', address: 'Wendani, Kazana Building' },
    ];

    // Handle shop click to show modal
    const handleViewShop = (shop: Shop) => {
        setSelectedShop(shop);   // Set the selected shop
        setModalVisible(true);   // Show the modal
    };

    // Close modal handler
    const closeModal = () => {
        setModalVisible(false);  // Hide the modal
        setSelectedShop(null);   // Reset the selected shop
    };

    const handleNavigation = (route: string) => {
        // Use router navigation here if needed elsewhere
    };

    // Shop item rendering
    const ShopItem: React.FC<{ shop: Shop }> = ({ shop }) => (
        <Pressable onPress={() => handleViewShop(shop)}>
            <Box borderBottomWidth={1} borderBottomColor="#E8E8E8" paddingVertical={15} flexDirection="row" justifyContent="space-between" alignItems="center">
                <VStack>
                    <Text color='#414141' fontSize={14} fontWeight={400}>{shop.name}</Text>
                    <Text color="#5A5A5A" fontSize={12} fontWeight={400}>{shop.address}</Text>
                </VStack>
                <Icon name="location-pin" size={21} color="#A0A0A0" />
            </Box>
        </Pressable>
    );

    return (
        <VStack flex={1} backgroundColor='#FFFFFF'>

            <FlatList
                data={shops}
                renderItem={({ item }) => <ShopItem shop={item as Shop} />}
                keyExtractor={(item, index) => index.toString()}
                contentContainerStyle={{ paddingHorizontal: 15 }}
                borderTopWidth={1} borderTopColor="#E8E8E8"
            />

            {/* ShopModal component */}
            {selectedShop && (
                <ShopModal
                    isVisible={modalVisible}
                    shop={selectedShop}
                    onClose={closeModal}
                />
            )}

        </VStack>
    );
};

export default ShopsScreen;
