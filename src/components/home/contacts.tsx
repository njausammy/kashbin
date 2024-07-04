import React from 'react';
import { Box, Text, VStack, HStack, FlatList, Card, Pressable, Input, InputField, Button } from "@gluestack-ui/themed";
import { router } from 'expo-router';
import FontAwesomeIcon from '@expo/vector-icons/FontAwesome';
import { NavItem, TopNavigation } from './navigation';



interface SecondaryNavigationProps {
    onNavigate: (path: string) => void;
    activeItem: string;
}

const SecondaryNavigation: React.FC<SecondaryNavigationProps> = ({ onNavigate, activeItem }) => (
    <HStack justifyContent="space-around" backgroundColor="white" paddingVertical={15}>
        <NavItem icon={require(`../../../assets/icons/connected.png`)} label="Near Me" onPress={() => onNavigate('/points')} />
        <NavItem icon={require(`../../../assets/icons/referrals.png`)} label="Gifts" onPress={() => onNavigate('/points')} />
        <NavItem icon={require(`../../../assets/icons/invites.png`)} label="Services" onPress={() => onNavigate('/points')} />
        <NavItem icon={require(`../../../assets/icons/people-solid.png`)} label="All Shops" onPress={() => onNavigate('/points')} />
    </HStack>
);

interface ContactItemProps {
    contact: {
        name: string;
        username: string;
    };
}

const ContactItem: React.FC<ContactItemProps> = ({ contact }) => (
    <Box borderBottomWidth={1} borderBottomColor="#E8E8E8" paddingVertical={15} flexDirection="row" justifyContent="space-between" alignItems="center">
        <VStack alignItems="flex-start">
            <Text color='#414141' fontSize={14} fontWeight={400}>{contact.name}</Text>
            <Text color="#5A5A5A" fontSize={12} fontWeight={400}>@{contact.username}</Text>
        </VStack>
    </Box>
);

const ContactsScreen: React.FC = () => {
    const handleNavigation = (route: string): void => {
        router.push(route);
    };

    const contacts = [
        { name: 'Kate Wanjiku', username: 'k.wanjiku' },
        { name: 'Noel Asambi', username: 'asambi' },
        { name: 'Ruth Atieno', username: 'atieno.r' },
        { name: 'Jasper Omwami', username: 'jasperom' },
        { name: 'Hussein Abdallah', username: 'husseineabdallah' },
    ];

    return (
        <VStack flex={1}>
            <Box marginBottom={10} backgroundColor="#DB1E36" paddingBottom={10} paddingHorizontal={10}>
                <HStack marginBottom={5} paddingTop={52} space="md">
                    <FontAwesomeIcon name="map-marker" size={24} color="#FFFFFF" />
                    <Text color="white" fontSize={16}>Kahawa Sukari</Text>
                </HStack>
                <Card paddingVertical={10} backgroundColor='#FFFFFF'>
                    <TopNavigation onNavigate={handleNavigation} />
                </Card>
            </Box>
            <Card marginBottom={10} marginHorizontal={15} paddingHorizontal={10} paddingVertical={10} backgroundColor='#FFFFFF'>
                <SecondaryNavigation onNavigate={handleNavigation} activeItem="contacts" />
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
                        placeholder='Search contacts'
                    />
                </Input>
            </Card>

            <Card marginBottom={20} marginHorizontal={15} paddingHorizontal={15} paddingVertical={10} backgroundColor='#FFFFFF' flex={1}>
                <Text marginTop={5} fontWeight="bold">Send or receive points and share or accept invites from your contacts.</Text>
                <FlatList
                    data={contacts}
                    renderItem={({ item }) => <ContactItem contact={item} />}
                    keyExtractor={(item, index) => index.toString()}
                    contentContainerStyle={{ paddingHorizontal: 15, marginTop: 10 }}
                />
                <Button

                    borderRadius={20}
                    borderWidth={1}
                    borderColor='#DB1E36'
                    backgroundColor='#FFFFFF'
                    paddingHorizontal={10}
                    height={27}
                    width={137}
                    alignSelf="flex-end"
                    marginTop={20}
                    marginBottom={20}
                    onPress={() => handleNavigation('/all-shops')}

                >
                    <Text fontSize={12} color='#DB1E36'>All Connects 374</Text>
                </Button>
            </Card>
        </VStack>
    );
};

export default ContactsScreen;
