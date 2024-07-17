import React from 'react';
import { Box, Button, Text, VStack, FlatList, Card, Input, InputField, } from "@gluestack-ui/themed";
import { router } from 'expo-router';
import Icon from '@expo/vector-icons/Ionicons';


const ShopsScreen = () => {
    const handleNavigation = (route: string) => {
        router.push(route);
    };

    const shops = [
        { name: 'Niyaleo Wholesale Depot', address: 'Kahawa Sukari Avenue, Next to Ruhan plaza' },
        { name: 'Sam Cereals', address: 'Kahawa Sukari Avenue, Next to Ruhan plaza' },
        { name: 'By Grace Shop', address: 'Sharon Plaza, Baringo Road' },
        { name: 'Promise General Store', address: 'Kwa Mchina, Loleta Apartments' },
        { name: 'Juhudi Shop', address: 'Wendani, Kazana Building' },
        { name: 'Promise General Store', address: 'Kwa Mchina, Loleta Apartments' },
        { name: 'Juhudi Shop', address: 'Wendani, Kazana Building' }, { name: 'Promise General Store', address: 'Kwa Mchina, Loleta Apartments' },
        { name: 'Juhudi Shop', address: 'Wendani, Kazana Building' },
    ];

    const ShopItem: React.FC<{ shop: { name: string, address: string } }> = ({ shop }) => (
        <Box borderBottomWidth={1} borderBottomColor="#E8E8E8" paddingVertical={15} flexDirection="row" justifyContent="space-between" alignItems="center">
            <VStack>
                <Text color='#414141' fontSize={14} fontWeight={400} >{shop.name}</Text>
                <Text color="#5A5A5A" fontSize={12} fontWeight={400} >{shop.address}</Text>
            </VStack>
            <Icon name="bag" size={24} color="#1C274C" />
        </Box>
    );


    return (
        <VStack flex={1} >

            <Card marginBottom={20} marginHorizontal={15} paddingHorizontal={10} paddingVertical={10} backgroundColor='#FFFFFF'>
                <Input
                    borderWidth={0}
                    borderRadius={16}
                    height={48}
                    width="$full"
                    backgroundColor='#F7F7F7'
                >
                    <InputField
                        type="text"
                        placeholder='Search for a shop by name or code'
                    />
                </Input>
            </Card>


            <Card marginBottom={20} marginHorizontal={15} paddingHorizontal={15} paddingVertical={10} backgroundColor='#FFFFFF' flex={1}>
                <FlatList
                    data={shops}
                    renderItem={({ item }) => <ShopItem shop={item} />}
                    keyExtractor={(item, index) => index.toString()}
                    contentContainerStyle={{ paddingHorizontal: 15 }}

                />
                <Button

                    borderRadius={20}
                    borderWidth={1}
                    borderColor='#DB1E36'
                    backgroundColor='#FFFFFF'
                    paddingHorizontal={10}
                    height={27}
                    width={86}
                    alignSelf="flex-end"
                    marginTop={20}
                    marginBottom={20}
                    onPress={() => handleNavigation('/all-shops')}

                >
                    <Text fontSize={12} color='#DB1E36'>All Shops</Text>
                </Button>
            </Card>
        </VStack>

    );
};

export default ShopsScreen;