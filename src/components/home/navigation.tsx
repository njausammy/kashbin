import React, { ReactNode } from 'react';
import { HStack, Image } from "@gluestack-ui/themed";
import { Pressable, VStack, Text } from "@gluestack-ui/themed";
import useActiveRoute from "@/src/hooks/useActiveRoute"

import ShopIcon from "../../components/Icons/shop"
import PointsIcon from "../../components/Icons/coins"
import PeopleIcon from "../../components/Icons/people"

export type TTopNavigationTab = "shops" | 'points' | 'contacts'



export const NavItem = ({ icon, label, onPress, color, fontWeight = 400 }: {
    icon: ReactNode;
    label: string;
    onPress: () => void;
    color?: string;
    fontWeight?: number
}) => (
    <Pressable onPress={onPress}>
        <VStack alignItems="center">
            {icon}
            <Text fontWeight={fontWeight} color={color} fontSize={12}>{label}</Text>
        </VStack>
    </Pressable>
);

export const TopNavigation = ({ onNavigate }: { onNavigate: (path: string) => void }) => {
    const activeTab = useActiveRoute();
    console.log({ activeTab })
    const activeRoute = useActiveRoute();

    // Define the routes where you want to hide the navigation
    const hideNavigationForRoutes = ["connected-view"];

    // Conditionally render the navigation
    if (hideNavigationForRoutes.includes(activeRoute)) {
        return null; // Return null to hide the component
    }

    const activeColor = "#DC2626";
    const inactiveColor = "#5A5A5A";

    const getColor = (tabNames: string[]) => (tabNames.includes(activeTab) ? activeColor : inactiveColor);

    return (
        <HStack justifyContent="space-around">
            <NavItem
                color={getColor(["near-me", "services"])}
                icon={<ShopIcon color={getColor(["shops"])} />}
                label="Shops"
                onPress={() => onNavigate('/main/home/shops')}
            />
            <NavItem
                color={getColor(["gifts", "offers", "deals", "coupons"])}
                icon={<PointsIcon color={getColor(["gifts", 'offers', 'deals', 'coupons'])} />}
                label="Points"
                onPress={() => onNavigate('/main/home/points')}
            />
            <NavItem
                color={getColor(["connected", "referrals", "invites", "all-contacts"])}
                icon={<PeopleIcon color={getColor(["contacts"])} />}
                label="Contacts"
                onPress={() => onNavigate('/main/home/contacts')}
            />
        </HStack>
    );
};



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

