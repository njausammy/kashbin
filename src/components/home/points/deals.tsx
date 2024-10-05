import React, { useState } from 'react';
import { Text, VStack, HStack, FlatList, Button, Image, Input, InputField, Pressable, Icon } from "@gluestack-ui/themed";
import { router } from 'expo-router';
import { Entypo } from '@expo/vector-icons';

interface IDeal {
    image: string;
    name: string;
    price: number;
    savings: number;
    connections: string; // e.g., "2 connections needed" or "3/4 invited"
    status: string;
    timeLeft: string;
}

interface IDealItemProps {
    deal: IDeal;
}

const DealsScreen = () => {
    const [selectedTab, setSelectedTab] = useState('All deals');

    const deals: IDeal[] = [
        { image: require('../../../../assets/images/points-4.png'), name: 'Car Wash', price: 4000, savings: 450, connections: '2 connections needed', status: 'Invite', timeLeft: '4Hrs 45min' },
        { image: require('../../../../assets/images/points-1.png'), name: 'Marafiki bundle', price: 4000, savings: 450, connections: '3/4 invited', status: 'Invited', timeLeft: '4Hrs 45min' },
        { image: require('../../../../assets/images/points-2.png'), name: 'Halisi Cooking oil 20L', price: 3750, savings: 350, connections: '4/4 invited', status: 'Completed', timeLeft: '4Hrs 45min' },
        { image: require('../../../../assets/images/points-3.png'), name: 'Ndovu maize flour 2Kgs pack x 2', price: 120, savings: 100, connections: '4 connections needed', status: 'Invite', timeLeft: '4Hrs 45min' },
    ];

    const DealItem = ({ deal }: IDealItemProps) => (
        <VStack marginBottom={10} borderBottomWidth={1} borderBottomColor="#E8E8E8" height={100} paddingVertical={10} flexDirection="row" justifyContent="space-between" alignItems="center">
            <HStack alignItems="center">
                <Image
                    source={deal.image}
                    alt="Deal Image"
                    width={60}
                    height={80}
                    alignSelf='center'
                />
                <VStack marginLeft={10}>
                    <Text color='#414141' fontSize={14} fontWeight="bold">{deal.name}</Text>
                    <Text color='#414141' fontSize={14}>Spend KES {deal.price} • Save KES {deal.savings}</Text>
                    <Text color='#888888' fontSize={12}>{deal.connections}</Text>
                    <Text color='#FF5C5C' fontSize={12}>Deal ends in: {deal.timeLeft}</Text>
                </VStack>
            </HStack>

            <Button
                borderRadius={20}
                borderWidth={1}
                borderColor={deal.status === 'Completed' ? '#bcbcbc' : (deal.status === 'Invited' ? 'transparent' : '#DB1E36')}
                backgroundColor={deal.status === 'Completed' ? '#f0f0f0' : (deal.status === 'Invited' ? 'transparent' : '#FFF')}
                paddingHorizontal={10}
                height={30}
                width={90}
            >
                {deal.status === 'Invite' ? (
                    <HStack>
                        <Text fontSize={12} color='#DB1E36'>
                            Invite
                        </Text>
                        <Entypo name="mail" size={16} color="#DB1E36" style={{ marginLeft: 4 }} />
                    </HStack>
                ) : deal.status === 'Invited' ? (
                    <Text fontSize={12} color='#43A048'>
                        Invited ✓
                    </Text>
                ) : (
                    <Text fontSize={12} color='#bcbcbc'>
                        Completed
                    </Text>
                )}
            </Button>
        </VStack>
    );

    return (
        <VStack flex={1} padding={4} backgroundColor='#fff'>

            {/* Tab Navigation */}
            <HStack paddingHorizontal={15} justifyContent="center" marginBottom={10}>
                <Pressable flex={1} onPress={() => setSelectedTab('All deals')} style={{ paddingBottom: 10, marginRight: 10, borderBottomWidth: selectedTab === 'All deals' ? 2 : 0, borderBottomColor: selectedTab === 'All deals' ? '#DB1E36' : 'transparent' }}>
                    <Text color={selectedTab === 'All deals' ? '#DB1E36' : '#888888'} fontSize={16}>All deals</Text>
                </Pressable>
                <Pressable flex={1} onPress={() => setSelectedTab('Online')} style={{ paddingBottom: 10, marginRight: 10, borderBottomWidth: selectedTab === 'Online' ? 2 : 0, borderBottomColor: selectedTab === 'Online' ? '#DB1E36' : 'transparent' }}>
                    <Text color={selectedTab === 'Online' ? '#DB1E36' : '#888888'} fontSize={16}>Online</Text>
                </Pressable>
                <Pressable flex={1} onPress={() => setSelectedTab('At Kiosks')} style={{ paddingBottom: 10, borderBottomWidth: selectedTab === 'At Kiosks' ? 2 : 0, borderBottomColor: selectedTab === 'At Kiosks' ? '#DB1E36' : 'transparent' }}>
                    <Text color={selectedTab === 'At Kiosks' ? '#DB1E36' : '#888888'} fontSize={16}>At Kiosks</Text>
                </Pressable>
            </HStack>

            {/* Deal List */}
            <FlatList
                data={deals} // You can filter deals here based on the selected tab if needed
                renderItem={({ item }) => <DealItem deal={item as IDeal} />}
                keyExtractor={(item, index) => index.toString()}
                contentContainerStyle={{ paddingHorizontal: 15 }}
            />
        </VStack>
    );
};

export default DealsScreen;
