import React from 'react';
import { Box, Text, VStack, HStack, FlatList, Card, Pressable, Button } from "@gluestack-ui/themed";
import { router } from 'expo-router';
import { NavItem, TopNavigation } from './navigation';
import Icon from '@expo/vector-icons/Ionicons';

import PointsIcon from "../../components/Icons/points"
import OffersIcon from "../../components/Icons/offers"
import DealsIcon from "../../components/Icons/deals"
import CouponsIcon from "../../components/Icons/coupons"



interface ITransfer {
    icon: string;
    name: string;
    points: number;
    isPositive: boolean;
}

interface ITransferItemProps {
    transfer: ITransfer;
}

// Define SecondaryNavigation for PointsTransferScreen
const SecondaryNavigation = ({ onNavigate, activeItem }: {
    onNavigate: (path: string) => void; activeItem: string
}) => (
    <HStack justifyContent="space-around" backgroundColor="white" paddingVertical={15}>
        <NavItem icon={<PointsIcon />}  label="Points" onPress={() => onNavigate('/points')} />
        <NavItem icon={<OffersIcon />} label="Offers" onPress={() => onNavigate('/points')} />
        <NavItem icon={<DealsIcon />}  label="Deals" onPress={() => onNavigate('/points')} />
        <NavItem icon={<CouponsIcon />}  label="Coupons" onPress={() => onNavigate('/points')} />
    </HStack>
);

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
            <Box paddingTop={52} marginBottom={10} backgroundColor="#DB1E36" paddingBottom={10} paddingHorizontal={10}>

                <Card paddingVertical={10} backgroundColor='#FFFFFF'>
                    <TopNavigation activeTab="points" onNavigate={handleNavigation} />
                </Card>
            </Box>
            <Card marginBottom={10} marginHorizontal={15} paddingHorizontal={10} paddingVertical={10} backgroundColor='#FFFFFF'>
                <SecondaryNavigation onNavigate={handleNavigation} activeItem="points" />
            </Card>

            <Card marginBottom={20} marginHorizontal={15} paddingHorizontal={15} paddingVertical={10} backgroundColor='#FFFFFF'>
                <Box backgroundColor="#DB1E36" padding={10} borderRadius={10} alignItems="center" marginBottom={10}>
                    <Text color="white" fontSize={14}>My Points</Text>
                    <Text color="white" fontSize={24} fontWeight="bold">{points}</Text>
                    <Text color="white" fontSize={12}>Value: KES {value}</Text>
                </Box>
                <Text fontSize={18} fontWeight="bold" marginBottom={10}>Point Transfers</Text>
                <FlatList
                    data={transfers}
                    renderItem={({ item }) => <TransferItem transfer={item} />}
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
