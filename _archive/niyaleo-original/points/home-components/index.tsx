import React from 'react';
import { Box, Text, VStack, HStack, FlatList, Card, Button, Pressable, Input, InputField, Alert, AlertText } from "@gluestack-ui/themed";
import { router } from 'expo-router';
import Icon from '@expo/vector-icons/Ionicons';
import AntDIcon from '@expo/vector-icons/AntDesign';


interface ITransfer {
    icon: string;
    name: string;
    points: number;
    isPositive: boolean;
}

interface ITransferItemProps {
    transfer: ITransfer;
}

const PointsTransferScreen = () => {
    const handleNavigation = (route: string) => {
        router.push(route);
    };

    const points = 3850;
    const value = 3850;

    const transfers = [
        { icon: '📰', name: 'Blessed sh.', points: -500, isPositive: false },
        { icon: 'N', name: '@j.kweli', points: 3000, isPositive: true },
        { icon: '👥', name: 'Metro 132', points: -800, isPositive: false },
        { icon: '🎟️', name: 'Omo Promo', points: 1000, isPositive: true },
    ];

    const TransferItem = ({ transfer }: ITransferItemProps) => (
        <Box borderBottomWidth={1} borderBottomColor="#E8E8E8" paddingVertical={15} flexDirection="row" justifyContent="space-between" alignItems="center">
            <HStack alignItems="center">
                <Box width={40} height={40} borderRadius={20} backgroundColor="#F0F0F0" justifyContent="center" alignItems="center">
                    <Text fontSize={20}>{transfer.icon}</Text>
                </Box>
                <Text marginLeft={10} color='#414141' fontSize={14} fontWeight={400}>{transfer.name}</Text>
            </HStack>
            <HStack alignItems="center">
                <Text color={transfer.isPositive ? "green" : "red"} fontWeight="bold">
                    {transfer.isPositive ? '+' : '-'}{Math.abs(transfer.points)}
                </Text>
                <Icon name="chevron-forward-outline" size={24} color="#1C274C" />
            </HStack>
        </Box>
    );

    return (
        <VStack flex={1}>
            <Alert marginHorizontal={15}
                marginBottom={10} height={56} borderRadius={12} variant="solid" backgroundColor='#E8F5E9'>
                <AntDIcon name="checkcircle" size={20} color="#1B5E21" />
                <AlertText marginLeft={10}>
                    <Text color="#1B5E21" fontWeight={400}>Points Balance: 3850 Value: KES 3850</Text>
                </AlertText>
            </Alert>
            <Text marginHorizontal={15}
             fontSize={18} fontWeight="bold" marginBottom={10}>Transfers</Text>

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
                    placeholder='Search transfers'
                />
            </Input>

            <Card marginBottom={20} marginHorizontal={15} paddingHorizontal={15} paddingVertical={10} backgroundColor='#FFFFFF'>

                <FlatList
                    data={transfers}
                    renderItem={({ item }) => <TransferItem transfer={item as ITransfer} />}
                    keyExtractor={(item, index) => index.toString()}
                    contentContainerStyle={{ paddingHorizontal: 15 }}
                />

                <Button

                    borderRadius={20}
                    borderWidth={1}
                    borderColor='#DB1E36'
                    backgroundColor='#FFFFFF'
                    paddingHorizontal={10}
                    height={27}
                    width={110}
                    alignSelf="flex-end"
                    marginTop={20}
                    marginBottom={20}
                    onPress={() => handleNavigation('/all-shops')}

                >
                    <Text fontSize={12} color='#DB1E36'>All Transfers</Text>
                </Button>
            </Card>
        </VStack>
    );
};

export default PointsTransferScreen;
