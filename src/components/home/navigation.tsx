import React, { ReactNode } from 'react';
import { HStack, Image } from "@gluestack-ui/themed";
import { Pressable, VStack, Text } from "@gluestack-ui/themed";

import ShopIcon from "../../components/Icons/shop"
import PointsIcon from "../../components/Icons/points"
import PeopleIcon from "../../components/Icons/people"



export const NavItem = ({ icon, label, onPress }: {
    icon: ReactNode;
    label: string;
    onPress: () => void
}) => (
    <Pressable onPress={onPress}>
        <VStack alignItems="center">
            {icon}
            <Text fontSize={12}>{label}</Text>
        </VStack>
    </Pressable>
);

export const TopNavigation = ({ onNavigate, activeTab }: { onNavigate: (path: string) => void, activeTab: "shops" | 'points' | 'people' }) => (
    <HStack justifyContent="space-around"  >
        <NavItem icon={<ShopIcon color={activeTab === "shops" ? "#DB1E36" : "#5A5A5A"} />} label="Shops" onPress={() => onNavigate('/main/home')} />
        <NavItem icon={<PointsIcon color={activeTab === "points" ? "#DB1E36" : "#5A5A5A"} />} label="Points" onPress={() => onNavigate('/main/points')} />
        <NavItem icon={<PeopleIcon color={activeTab === "people" ? "#DB1E36" : "#5A5A5A"} />} label="Contacts" onPress={() => onNavigate('/main/contacts')} />
    </HStack>
);


export const SecondaryNavItem = ({ icon, label, onPress, isActive }: {
    icon: string;
    label: string;
    onPress: () => void;
    isActive: boolean
}) => (
    <Pressable onPress={onPress}>
        <VStack alignItems="center">
            {/* <Icon as={Ionicons} color={isActive ? "green" : "black"} size="md" /> */}
            <Text color={isActive ? "green" : "black"} fontSize={12}>{label}</Text>
        </VStack>
    </Pressable>
);




export const SecondaryNavigation = ({ onNavigate, activeItem }: {
    onNavigate: (path: string) => void; activeItem: string
}) => (
    <HStack justifyContent="space-around" backgroundColor="white" paddingVertical={15}>
        <SecondaryNavItem icon="location-outline" label="Near Me" onPress={() => onNavigate('/near-me')} isActive={activeItem === 'near-me'} />
        <SecondaryNavItem icon="gift-outline" label="Gifts" onPress={() => onNavigate('/gifts')} isActive={activeItem === 'gifts'} />
        <SecondaryNavItem icon="construct-outline" label="Services" onPress={() => onNavigate('/services')} isActive={activeItem === 'services'} />
        <SecondaryNavItem icon="grid-outline" label="All Shops" onPress={() => onNavigate('/all-shops')} isActive={activeItem === 'all-shops'} />
    </HStack>
);

