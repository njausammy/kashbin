import React, { useState } from 'react';
import { Box, Text, VStack, FlatList, Input, HStack, Pressable, Icon } from "@gluestack-ui/themed";

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
        <Box borderBottomWidth={1} borderBottomColor="#E8E8E8" paddingVertical={15} paddingHorizontal={5} flexDirection="row" justifyContent="space-between" alignItems="center">
            <HStack alignItems="center" space="md">
                <Box width={40} height={40} borderRadius={20} backgroundColor="#E0E0E0" justifyContent="center" alignItems="center">
                    <Text fontSize={20} color="#414141">{contact.name[0]}</Text>
                </Box>
                <VStack alignItems="flex-start">
                    <Text color='#414141' fontSize={14} fontWeight={400}>{contact.name}</Text>
                    <Text color="#5A5A5A" fontSize={12} fontWeight={400}>{contact.phoneOrUsername}</Text>
                </VStack>
            </HStack>
            <Box>
                <Box width={24} height={24} borderRadius={12} borderWidth={1} borderColor="#E0E0E0" justifyContent="center" alignItems="center">
                    {contact.selected && (
                        <Box width={12} height={12} borderRadius={6} backgroundColor="#ff4b5c" />
                    )}
                </Box>
            </Box>
        </Box>
    </Pressable>
);

const ContactsScreen: React.FC = () => {
    const [contacts, setContacts] = useState<Contact[]>([
        { name: 'Simba Halisi', phoneOrUsername: '+254711202156', selected: true },
        { name: 'Noel Asambi', phoneOrUsername: '@asambi', selected: false },
        { name: 'Ruth Atieno', phoneOrUsername: '+254733123456', selected: false },
        { name: 'Jasper Omwami', phoneOrUsername: '+254755123456', selected: false },
        { name: 'Hussein Abdalla', phoneOrUsername: '@habdalla', selected: false },
        { name: 'Grace Vanderbilt', phoneOrUsername: '+255810123456', selected: false },
    ]);

    const handleToggleSelect = (selectedContact: Contact): void => {
        setContacts(contacts.map(contact =>
            contact.name === selectedContact.name ? { ...contact, selected: !contact.selected } : contact
        ));
    };

    return (
        <VStack flex={1} marginHorizontal={4} paddingHorizontal={4} paddingVertical={4} backgroundColor='#FFFFFF'>
            <FlatList
                data={contacts}
                renderItem={({ item }) => <ContactItem contact={item as Contact} onToggleSelect={handleToggleSelect} />}
                keyExtractor={(item, index) => index.toString()}
                borderTopWidth={1} borderTopColor="#E8E8E8"
            />
        </VStack>
    );
};

export default ContactsScreen;
