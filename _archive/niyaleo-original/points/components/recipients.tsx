import React from 'react';
import { SafeAreaView, ScrollView } from 'react-native';
import { Box, Text, VStack, HStack, FlatList, Pressable, Input, InputField, Image, Icon } from "@gluestack-ui/themed";
import { router } from 'expo-router';

interface RecipientItemProps {
    recipient: {
        name: string;
        email: string;
        amount: string;
        avatar: string;
    };
}

const RecipientItem: React.FC<RecipientItemProps> = ({ recipient }) => (
    <HStack justifyContent="space-between" alignItems="center" paddingVertical={10} borderBottomWidth={1} borderBottomColor="#E8E8E8">
        <HStack alignItems="center">
            <Image source={{ uri: recipient.avatar }} style={{ width: 40, height: 40, borderRadius: 20 }} />
            <VStack marginLeft={10}>
                <Text color='#414141' fontSize={14} fontWeight="bold">{recipient.name}</Text>
                <Text color="#5A5A5A" fontSize={12}>{recipient.email}</Text>
            </VStack>
        </HStack>
        <Text color="red" fontWeight="bold">{recipient.amount}</Text>
    </HStack>
);

const recipients = [
    { name: 'Mehedi Hasan', email: 'helloyouthmind@gmail.com', amount: '-$100', avatar: 'https://via.placeholder.com/40' },
    { name: 'Mehedi Hasan', email: 'helloyouthmind@gmail.com', amount: '-$100', avatar: 'https://via.placeholder.com/40' },
    { name: 'Mehedi Hasan', email: 'helloyouthmind@gmail.com', amount: '-$100', avatar: 'https://via.placeholder.com/40' },
    { name: 'Mehedi Hasan', email: 'helloyouthmind@gmail.com', amount: '-$100', avatar: 'https://via.placeholder.com/40' },
    { name: 'Mehedi Hasan', email: 'helloyouthmind@gmail.com', amount: '-$100', avatar: 'https://via.placeholder.com/40' },
];

const ChooseRecipientScreen: React.FC = () => {
    const handleNavigation = (route: string): void => {
        router.push(route);
    };

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: 'white' }}>
            <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
                <VStack flex={1} padding={20}>
                    <HStack alignItems="center" marginBottom={20}>
                        <Icon name="chevron-back-outline" size={24} onPress={() => handleNavigation('/back')} />
                        <Text marginLeft={10} fontSize={20} fontWeight="bold">Choose Recipient</Text>
                    </HStack>

                    <Text color="gray" marginBottom={20}>Please select your recipient to receive money.</Text>

                    <Box marginBottom={20}>
                        <Input
                            borderWidth={1}
                            borderColor="#E8E8E8"
                            borderRadius={10}
                            height={48}
                            paddingHorizontal={10}
                            backgroundColor='#F7F7F7'
                        >
                            <InputField
                                type="text"
                                placeholder='Search "Recipient Email"'
                            />
                            <Icon name="search" size={20} color="#888" />
                        </Input>
                    </Box>

                    <Text fontWeight="bold" marginBottom={10}>Most Recent</Text>

                    <FlatList
                        data={recipients}
                        renderItem={({ item }) => <RecipientItem recipient={item} />}
                        keyExtractor={(item, index) => index.toString()}
                    />

                    <Pressable
                        onPress={() => handleNavigation('/scan-to-pay')}
                        alignItems="center"
                        borderWidth={1}
                        borderColor="#DB1E36"
                        borderRadius={50}
                        paddingVertical={15}
                        marginTop={30}
                        backgroundColor='#DB1E36'
                    >
                        <Icon name="scan" size={24} color="white" />
                        <Text color="white" marginTop={5}>Scan to Pay</Text>
                    </Pressable>
                </VStack>
            </ScrollView>
        </SafeAreaView>
    );
};

export default ChooseRecipientScreen;
