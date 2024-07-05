import React from 'react';
import { Box, Button, Text, VStack, HStack, FlatList, Card, Input, InputField, Image } from "@gluestack-ui/themed";
import { router } from 'expo-router';
import {
    NavItem, TopNavigation
} from './navigation';
import Icon from '@expo/vector-icons/Ionicons';
import FontAwesomeIcon from '@expo/vector-icons/FontAwesome';

import NearIcon from "../../components/Icons/near-me"
import GiftsIcon from "../../components/Icons/gifts"
import ServicesIcon from "../../components/Icons/people-solid"
import ShopsIcon from "../../components/Icons/all-shops"


export const SecondaryNavigation = ({ onNavigate, activeItem }: {
    onNavigate: (path: string) => void; activeItem: string
}) => (
    <HStack justifyContent="space-around" backgroundColor="white" paddingVertical={15}>
        <NavItem   icon={<NearIcon />} label="Near Me" onPress={() => onNavigate('/points')} />
        <NavItem icon={<GiftsIcon />}  label="Gifts" onPress={() => onNavigate('/points')} />
        <NavItem icon={<ServicesIcon />} label="Services" onPress={() => onNavigate('/points')} />
        <NavItem icon={<ShopsIcon />} label="All Shops" onPress={() => onNavigate('/points')} />
    </HStack>
);


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
            <Box marginBottom={10} backgroundColor="#DB1E36" paddingBottom={10} paddingHorizontal={10} >
                <HStack marginBottom={5} paddingTop={52} space="md" >
                    <FontAwesomeIcon name="map-marker" size={24} color="#FFFFFF" />
                    <Text color="white" fontSize={16}>Kahawa Sukari</Text>
                </HStack>
                <Card paddingVertical={10} backgroundColor='#FFFFFF'>
                    <TopNavigation activeTab="shops" onNavigate={handleNavigation} />
                </Card>
            </Box>
            <Card marginBottom={10} marginHorizontal={15} paddingHorizontal={10} paddingVertical={10} backgroundColor='#FFFFFF'>
                <SecondaryNavigation onNavigate={handleNavigation} activeItem="near-me" />
            </Card>

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