import React, { useState } from 'react';
import { Box, Text, VStack, HStack, FlatList, Card, Button, Image, Input, InputField } from "@gluestack-ui/themed";
import { router } from 'expo-router';

interface IDeal {
    image: string;
    name: string;
    price: number;
    status: string;
    timeLeft: string;
}

interface IDealItemProps {
    deal: IDeal;
}

const DealsScreen = () => {
    const [selectedTab, setSelectedTab] = useState('Online');

    const handleNavigation = (route: string) => {
        router.push(route);
    };

    const deals: IDeal[] = [
        { image: require('../../../../assets/images/points-4.png'), name: 'Car Wash', price: 4000, status: 'Invite', timeLeft: 'in 4hrs 45min' },
        { image: require('../../../../assets/images/points-1.png'), name: 'Monthly shopping bundle', price: 2300, status: 'Invited', timeLeft: 'in 1hr 27min' },
        { image: require('../../../../assets/images/points-2.png'), name: 'HeHa Cooking Oil 3L', price: 2500, status: 'Completed', timeLeft: 'in 10min' },
        { image: require('../../../../assets/images/points-3.png'), name: 'Ndovu maize Flour 2Kg pack x 2', price: 1500, status: 'Invite', timeLeft: 'in 13hrs 45min' },
    ];

    const DealItem = ({ deal }: IDealItemProps) => (
        <Card marginBottom={10} borderBottomWidth={1} borderBottomColor="#E8E8E8" height={86} paddingVertical={15} flexDirection="row" justifyContent="space-between" alignItems="center">
            <HStack alignItems="center">
                <Image
                    source={deal.image}
                    alt="Deal Image"
                    width={40}
                    height={40}
                    alignSelf='center'
                />
                <VStack marginLeft={10}>
                    <Text color='#414141' fontSize={14} fontWeight={400}>{deal.name}</Text>
                    <Text color='#888888' fontSize={12}>KES {deal.price}</Text>
                    <Text color='#888888' fontSize={12}>Deal ends {deal.timeLeft}</Text>
                </VStack>
            </HStack>
    
            <Button
                borderRadius={20}
                backgroundColor={deal.status === 'Completed' ? '#bcbcbc' : (deal.status === "Invite" ? "#DB1E36" : "#43A048")}
                paddingHorizontal={10}
                height={27}
                width={80}
                variant="solid"
            >
                <Text fontSize={12} color="#FFFFFF">
                    {deal.status}
                </Text>
            </Button>
        </Card>
    );

    return (
        <VStack flex={1}>
            <Input
                borderWidth={0}
                borderRadius={16}
                height={48}
                backgroundColor='#fff'
                marginHorizontal={15}
                marginBottom={10}
            >
                <InputField
                    type="text"
                    placeholder='Search deals'
                />
            </Input>

            <HStack paddingHorizontal={15} justifyContent="center" marginBottom={10}>
                <Button
                    borderTopStartRadius={10}
                    borderBottomStartRadius={10}
                    backgroundColor={selectedTab === 'Online' ? '#DB1E36' : '#FFFFFF'}
                    onPress={() => setSelectedTab('Online')}
                    height={40}
                    flex={1}
                >
                    <Text color={selectedTab === 'Online' ? '#FFF' : '#888888'}>Online</Text>
                </Button>
                <Button
                    borderTopEndRadius={10}
                    borderBottomEndRadius={10}
                    backgroundColor={selectedTab === 'In Person' ? '#DB1E36' : '#FFFFFF'}
                    onPress={() => setSelectedTab('In Person')}
                    height={40}
                    flex={1}
                >
                    <Text color={selectedTab === 'In Person' ? '#FFF' : '#888888'}>In Person</Text>
                </Button>

            </HStack>

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
