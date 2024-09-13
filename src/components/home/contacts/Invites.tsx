import React, { useState } from 'react';
import { Box, Text, VStack, HStack, FlatList, Card, Button, Image, Input, InputField } from "@gluestack-ui/themed";
import { router } from 'expo-router';

interface IInvite {
    image: any;
    name: string;
    price: number;
    savings: number;
    connectionsNeeded: number;
    status: string;
    timeLeft: string;
    invitedCount: number;
    openCount: number;
}

interface IInviteItemProps {
    invite: IInvite;
}

const ContactInvitesScreen = () => {
    const [selectedTab, setSelectedTab] = useState('Received');

    const handleNavigation = (route: string) => {
        router.push(route);
    };

    const invites: IInvite[] = [
        { image: require('../../../../assets/images/car-wash.png'), name: 'Car Wash', price: 4000, savings: 350, connectionsNeeded: 2, status: 'Join', timeLeft: '4hrs 45min', invitedCount: 0, openCount: 2 },
        { image: require('../../../../assets/images/shopping-bundle.png'), name: 'Marafiki shopping bundle', price: 2300, savings: 400, connectionsNeeded: 3, status: 'Joined', timeLeft: '16hrs 21min', invitedCount: 2, openCount: 1 },
        { image: require('../../../../assets/images/cooking-oil.png'), name: 'Halisi Cooking oil 20L', price: 3250, savings: 700, connectionsNeeded: 4, status: 'Completed', timeLeft: '00hrs 00min', invitedCount: 4, openCount: 0 },
        { image: require('../../../../assets/images/maize-flour.png'), name: 'Ndovu maize flour 2Kgs pack x 2', price: 140, savings: 60, connectionsNeeded: 1, status: 'Join', timeLeft: '13hrs 45mins', invitedCount: 0, openCount: 1 },
    ];

    const InviteItem = ({ invite }: IInviteItemProps) => (
        <Card marginBottom={10} borderBottomWidth={1} borderBottomColor="#E8E8E8" padding={10}>
            <HStack>
                <Image
                    source={invite.image}
                    alt="Invite Image"
                    width={60}
                    height={60}
                />
                <VStack flex={1} marginLeft={10}>
                    <Text color='#414141' fontSize={14} fontWeight="bold">{invite.name}</Text>
                    <Text color='#414141' fontSize={14}>KES {invite.price}</Text>
                    <Text color='#888888' fontSize={12}>Save KES {invite.savings} each</Text>
                    <Text color='#888888' fontSize={12}>{invite.connectionsNeeded} connections needed</Text>
                    <Text color='#888888' fontSize={12}>Deal ends in: {invite.timeLeft}</Text>
                </VStack>
                <VStack alignItems="flex-end" justifyContent="space-between">
                    <Button
                        borderRadius={20}
                        backgroundColor={invite.status === 'Completed' ? '#bcbcbc' : (invite.status === "Join" ? "#DB1E36" : "#43A048")}
                        paddingHorizontal={10}
                        height={27}
                    >
                        <Text fontSize={12} color="#FFFFFF">
                            {invite.status}
                        </Text>
                    </Button>
                    <Text color='#888888' fontSize={12}>Invited: {invite.invitedCount}</Text>
                    <Text color='#888888' fontSize={12}>Open: {invite.openCount}</Text>
                </VStack>
            </HStack>
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
                    placeholder='Search invites'
                />
            </Input>

            <HStack paddingHorizontal={15} justifyContent="center" marginBottom={10}>
                <Button
                    borderTopStartRadius={10}
                    borderBottomStartRadius={10}
                    backgroundColor={selectedTab === 'Received' ? '#DB1E36' : '#FFFFFF'}
                    onPress={() => setSelectedTab('Received')}
                    height={40}
                    flex={1}
                >
                    <Text color={selectedTab === 'Received' ? '#FFF' : '#888888'}>Received</Text>
                </Button>
                <Button
                    borderTopEndRadius={10}
                    borderBottomEndRadius={10}
                    backgroundColor={selectedTab === 'Sent' ? '#DB1E36' : '#FFFFFF'}
                    onPress={() => setSelectedTab('Sent')}
                    height={40}
                    flex={1}
                >
                    <Text color={selectedTab === 'Sent' ? '#FFF' : '#888888'}>Sent</Text>
                </Button>
            </HStack>

            <FlatList
                data={invites} // You can filter invites here based on the selected tab if needed
                renderItem={({ item }) => <InviteItem invite={item as IInvite} />}
                keyExtractor={(item, index) => index.toString()}
                contentContainerStyle={{ paddingHorizontal: 15 }}
            />
        </VStack>
    );
};

export default ContactInvitesScreen;