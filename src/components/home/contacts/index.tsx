import React, { useState } from 'react';
import { Box, Text, VStack, FlatList, Card, Input, InputField, Button, HStack, Pressable } from "@gluestack-ui/themed";
import { router } from 'expo-router';
import { ContactsSecondaryNavigation } from '../header';

interface Contact {
    name: string;
    phoneOrUsername: string;
    selected: boolean;
}

interface ContactItemProps {
    contact: Contact;
    onToggleSelect: (contact: Contact) => void;
}

const ContactItem: React.FC<ContactItemProps> = ({ contact, onToggleSelect }) => (
    <Pressable onPress={() => onToggleSelect(contact)}>
        <Box borderBottomWidth={1} borderBottomColor="#E8E8E8" paddingVertical={15} flexDirection="row" justifyContent="space-between" alignItems="center">
            <HStack alignItems="center" space="md">
                <Box width={40} height={40} borderRadius={20} backgroundColor="#E0E0E0" justifyContent="center" alignItems="center">
                    <Text fontSize={20} color="#414141">{contact.name[0]}</Text>
                </Box>
                <VStack alignItems="flex-start">
                    <Text color='#414141' fontSize={14} fontWeight={400}>{contact.name}</Text>
                    <Text color="#5A5A5A" fontSize={12} fontWeight={400}>{contact.phoneOrUsername}</Text>
                </VStack>
            </HStack>
            {/* {contact.selected ? <CheckCircle color="#DB1E36" size={24} /> : <Circle color="#D9D9D9" size={24} />} */}
        </Box>
    </Pressable>
);

type TabType = 'invite' | 'refer';

const ContactsScreen: React.FC = () => {
    const [contacts, setContacts] = useState<Contact[]>([
        { name: 'Simba Halisi', phoneOrUsername: '+254711202156', selected: true },
        { name: 'Noel Asambi', phoneOrUsername: '@asambi', selected: false },
        { name: 'Ruth Atieno', phoneOrUsername: '+254733123456', selected: false },
        { name: 'Jasper Omwami', phoneOrUsername: '+254755123456', selected: false },
        { name: 'Hussein Abdalla', phoneOrUsername: '@habdalla', selected: false },
        { name: 'Grace Vanderbilt', phoneOrUsername: '+255810123456', selected: false },
    ]);

    const [activeTab, setActiveTab] = useState<TabType>('invite');

    const handleToggleSelect = (selectedContact: Contact): void => {
        setContacts(contacts.map(contact =>
            contact.name === selectedContact.name ? { ...contact, selected: !contact.selected } : contact
        ));
    };

    const handleTabChange = (tab: TabType): void => {
        setActiveTab(tab);
    };

    const handleSearch = (searchText: string): void => {
        // Implement search functionality here
        console.log('Searching for:', searchText);
    };

    const handleAllContactsPress = (): void => {
        // Implement "All Contacts" button functionality here
        console.log('All Contacts button pressed');
    };

    return (
        <VStack flex={1} backgroundColor="#F5F5F5">
            <Card marginBottom={2} marginHorizontal={4} paddingHorizontal={4} paddingVertical={4} backgroundColor='#FFFFFF'>
                <Input
                    borderWidth={0}
                    borderRadius={8}
                    height={40}
                    width="$full"
                    backgroundColor='#F7F7F7'
                >
                    <InputField
                        type="text"
                        placeholder='Search contacts'
                        onChangeText={handleSearch}
                    />
                </Input>
            </Card>

            <HStack justifyContent="space-between" paddingHorizontal={4} marginBottom={2}>
                <Button
                    flex={1}
                    borderRadius={8}
                    backgroundColor={activeTab === 'invite' ? '#DB1E36' : '#FFFFFF'}
                    onPress={() => handleTabChange('invite')}
                >
                    <Text color={activeTab === 'invite' ? '#FFFFFF' : '#DB1E36'}>Invite</Text>
                </Button>
                <Box width={4} />
                <Button
                    flex={1}
                    borderRadius={8}
                    backgroundColor={activeTab === 'refer' ? '#DB1E36' : '#FFFFFF'}
                    onPress={() => handleTabChange('refer')}
                >
                    <Text color={activeTab === 'refer' ? '#FFFFFF' : '#DB1E36'}>Refer</Text>
                </Button>
            </HStack>

            <Card flex={1} marginHorizontal={4} paddingHorizontal={4} paddingVertical={4} backgroundColor='#FFFFFF'>
                <FlatList
                    data={contacts}
                    renderItem={({ item }) => <ContactItem contact={item as Contact} onToggleSelect={handleToggleSelect} />}
                    keyExtractor={(item, index) => index.toString()}
                />
                <Button
                    borderRadius={20}
                    backgroundColor='#DB1E36'
                    paddingHorizontal={10}
                    height={40}
                    alignSelf="flex-end"
                    marginTop={4}
                    onPress={handleAllContactsPress}
                >
                    <Text fontSize={14} color='#FFFFFF'>All Contacts 564</Text>
                </Button>
            </Card>
        </VStack>
    );
};

export default ContactsScreen;