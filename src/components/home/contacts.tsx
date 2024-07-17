import React from 'react';
import { Box, Text, VStack, FlatList, Card, Input, InputField, Button } from "@gluestack-ui/themed";
import { router } from 'expo-router';

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
