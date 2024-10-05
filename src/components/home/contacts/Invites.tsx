import React, { useState } from 'react';
import { Box, Text, VStack, HStack, FlatList, Button, Image, Pressable } from "@gluestack-ui/themed";
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

    const handleTabChange = (tab: string) => {
        setSelectedTab(tab);
    };

    const invites: IInvite[] = [
        { image: "https://images.unsplash.com/photo-1640580086296-a6664d19d23d?q=80&w=1931&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", name: 'Car Wash', price: 4000, savings: 350, connectionsNeeded: 2, status: 'Join', timeLeft: '4hrs 45min', invitedCount: 0, openCount: 2 },
        { image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTSG2bFjXZ8ErkwVCec6VuTmVZUOjnWrEAagkrt6k6DnEhWmgAPICfX_s5KAbZQvPlhUJ8&usqp=CAU", name: 'Marafiki shopping bundle', price: 2300, savings: 400, connectionsNeeded: 3, status: 'Joined', timeLeft: '16hrs 21min', invitedCount: 2, openCount: 1 },
        { image: "https://www.niyaleo.com/image/product/260/MEDIUM/0/3667", name: 'Halisi Cooking oil 20L', price: 3250, savings: 700, connectionsNeeded: 4, status: 'Completed', timeLeft: '00hrs 00min', invitedCount: 4, openCount: 0 },
        { image: "https://scontent.fnbo10-1.fna.fbcdn.net/v/t1.6435-9/83577995_3450124285061782_7918229035782504448_n.jpg?stp=dst-jpg_s1080x2048&_nc_cat=111&ccb=1-7&_nc_sid=13d280&_nc_eui2=AeEJzwmJ47uJICtfMuH4jYJeXYIKYudsoapdggpi52yhqsFpLrZcWkmrKTrcJAWSFluWcZts6gtzucKQwcIScXtq&_nc_ohc=0YDuh1oNKPcQ7kNvgHkPm1l&_nc_pt=5&_nc_ht=scontent.fnbo10-1.fna&_nc_gid=AxecBW-FBYoklMSjtW3oJEs&oh=00_AYBn-Ss2335t7LctM7Jd8NGe5fpu9MOFqAQty4P2r4uPFA&oe=67285FFF", name: 'Ndovu maize flour 2Kgs pack x 2', price: 140, savings: 60, connectionsNeeded: 1, status: 'Join', timeLeft: '13hrs 45mins', invitedCount: 0, openCount: 1 },
    ];

    const InviteItem = ({ invite }: IInviteItemProps) => (
        <VStack marginBottom={10} borderBottomWidth={1} borderBottomColor="#E8E8E8" height={100} paddingVertical={10} flexDirection="row" justifyContent="space-between" alignItems="center">
            <HStack>
                <Image
                    source={invite.image}
                    alt="Invite Image"
                    width={60}
                    height={80}
                />
                <VStack flex={1} marginLeft={10}>
                    <VStack>
                        <Text color='#414141' fontSize={14} fontWeight="bold">{invite.name}</Text>
                        <Text color='#414141' fontSize={14}>KES {invite.price}</Text>
                    </VStack>
                    <VStack>
                        <Text color='#888888' fontSize={12}>{invite.connectionsNeeded} connections needed</Text>
                        <Text color='#888888' fontSize={12}>Offer ends in: {invite.timeLeft}</Text>
                    </VStack>
                </VStack>
                <VStack alignItems="flex-end" justifyContent="space-between">
                    <Button
                        borderRadius={20}
                        backgroundColor={invite.status === 'Completed' ? '#bcbcbc' : (invite.status === "Join" ? "#DB1E36" : "#43A048")}
                        paddingHorizontal={10}
                        height={27}
                        width={80}
                    >
                        <Text fontSize={12} color="#FFFFFF">
                            {invite.status}
                        </Text>
                    </Button>

                </VStack>
            </HStack>
        </VStack>
    );

    return (
        <VStack flex={1} marginHorizontal={4} paddingHorizontal={4} paddingVertical={4} backgroundColor='#FFFFFF'>
            {/* Tab Navigation */}
            <HStack width="$full" justifyContent="center" marginBottom={4} borderBottomWidth={1} borderBottomColor="#E8E8E8">
                <Pressable  flex={1} onPress={() => handleTabChange('Received')} style={{ paddingBottom: 10, marginRight: 15, borderBottomWidth: selectedTab === 'Received' ? 2 : 0, borderBottomColor: selectedTab === 'Received' ? '#000000' : 'transparent' }}>
                    <Text color="#121212" fontSize={16}>Received</Text>
                </Pressable>
                <Pressable flex={1} onPress={() => handleTabChange('Sent')} style={{ paddingBottom: 10, borderBottomWidth: selectedTab === 'Sent' ? 2 : 0, borderBottomColor: selectedTab === 'Sent' ? '#000000' : 'transparent' }}>
                    <Text color="#121212"  fontSize={16}>Sent</Text>
                </Pressable>
            </HStack>

            {/* Invite List */}
            <FlatList
                data={invites.filter(invite => selectedTab === 'Received' ? true : invite.status === 'Joined')}
                renderItem={({ item }) => <InviteItem invite={item as IInvite} />}
                keyExtractor={(item, index) => index.toString()}
                contentContainerStyle={{ paddingHorizontal: 15 }}
            />
        </VStack>
    );
};

export default ContactInvitesScreen;
