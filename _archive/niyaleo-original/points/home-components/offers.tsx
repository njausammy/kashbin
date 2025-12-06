import React, { useState } from 'react';
import { Text, VStack, HStack, FlatList, Button, Image, Input, InputField, Pressable } from "@gluestack-ui/themed";
import { router } from 'expo-router';

interface IOffer {
    image: string;
    name: string;
    price: number;
    points: string;
    savings: number;
    status: string;
    timeLeft: string;
}

interface IOfferItemProps {
    offer: IOffer;
}

const OffersScreen = () => {
    const [selectedTab, setSelectedTab] = useState('All offers');

    const offers: IOffer[] = [
        { image: require('../../../../assets/images/points-4.png'), name: 'Car Wash', price: 4000, points: '5000pts', savings: 350, status: 'Redeem', timeLeft: '4hrs 45min' },
        { image: require('../../../../assets/images/points-1.png'), name: 'Marafiki shopping bundle', price: 4000, points: '5000pts', savings: 350, status: 'Redeemed', timeLeft: '4hrs 45min' },
        { image: require('../../../../assets/images/points-2.png'), name: 'Halisi Cooking oil 20L', price: 4000, points: '5000pts', savings: 350, status: 'Completed', timeLeft: '4hrs 45min' },
        { image: require('../../../../assets/images/points-3.png'), name: 'Ndovu maize flour 2Kgs pack x 2', price: 4000, points: '5000pts', savings: 100, status: 'Redeem', timeLeft: '4hrs 45min' },
    ];

    const OfferItem = ({ offer }: IOfferItemProps) => (
        <VStack marginBottom={10} borderBottomWidth={1} borderBottomColor="#E8E8E8" height={100} paddingVertical={10} flexDirection="row" justifyContent="space-between" alignItems="center">
            <HStack alignItems="center">
                <Image
                    source={offer.image}
                    alt="Offer Image"
                    width={60}
                    height={80}
                    alignSelf='center'
                />
                <VStack marginLeft={10}>
                    <Text color='#414141' fontSize={14} fontWeight="bold">{offer.name}</Text>
                    <Text color='#414141' fontSize={14}>KES {offer.price} • {offer.points}</Text>
                    <Text color='#888888' fontSize={12}>You save KES {offer.savings}</Text>
                    <Text color='#FF5C5C' fontSize={12}>Offer ends in: {offer.timeLeft}</Text>
                </VStack>
            </HStack>

            <Button
                borderRadius={20}
                borderWidth={1}
                borderColor={offer.status === 'Completed' ? '#bcbcbc' : (offer.status === 'Redeemed' ? 'transparent' : '#DB1E36')}
                backgroundColor={offer.status === 'Completed' ? '#f0f0f0' : (offer.status === 'Redeemed' ? 'transparent' : '#FFF')}
                paddingHorizontal={10}
                height={30}
                width={90}
            >
                <Text fontSize={12} color={offer.status === 'Completed' ? '#bcbcbc' : (offer.status === 'Redeemed' ? '#43A048' : '#DB1E36')}>
                    {offer.status === 'Redeemed' ? 'Redeemed ✓' : (offer.status === 'Completed' ? 'Completed' : 'Redeem')}
                </Text>
            </Button>
        </VStack>
    );

    return (
        <VStack flex={1} padding={4} backgroundColor='#fff'>

            {/* Tab Navigation */}
            <HStack paddingHorizontal={15} justifyContent="center" marginBottom={10}>
                <Pressable flex={1} onPress={() => setSelectedTab('All offers')} style={{ paddingBottom: 10, marginRight: 10, borderBottomWidth: selectedTab === 'All offers' ? 2 : 0, borderBottomColor: selectedTab === 'All offers' ? '#DB1E36' : 'transparent' }}>
                    <Text color={selectedTab === 'All offers' ? '#DB1E36' : '#888888'} fontSize={16}>All offers</Text>
                </Pressable>
                <Pressable flex={1} onPress={() => setSelectedTab('Online')} style={{ paddingBottom: 10, marginRight: 10, borderBottomWidth: selectedTab === 'Online' ? 2 : 0, borderBottomColor: selectedTab === 'Online' ? '#DB1E36' : 'transparent' }}>
                    <Text color={selectedTab === 'Online' ? '#DB1E36' : '#888888'} fontSize={16}>Online</Text>
                </Pressable>
                <Pressable flex={1} onPress={() => setSelectedTab('At Kiosks')} style={{ paddingBottom: 10, borderBottomWidth: selectedTab === 'At Kiosks' ? 2 : 0, borderBottomColor: selectedTab === 'At Kiosks' ? '#DB1E36' : 'transparent' }}>
                    <Text color={selectedTab === 'At Kiosks' ? '#DB1E36' : '#888888'} fontSize={16}>At Kiosks</Text>
                </Pressable>
            </HStack>

            {/* Offer List */}
            <FlatList
                data={offers} // You can filter offers here based on the selected tab if needed
                renderItem={({ item }) => <OfferItem offer={item as IOffer} />}
                keyExtractor={(item, index) => index.toString()}
                contentContainerStyle={{ paddingHorizontal: 15 }}
            />
        </VStack>
    );
};

export default OffersScreen;
