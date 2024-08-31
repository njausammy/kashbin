import { HStack, Box, Card, Text } from "@gluestack-ui/themed";
import { router, useNavigation, usePathname } from "expo-router";
import React, { useEffect, useState } from "react";
import { NavItem, TopNavigation, TTopNavigationTab } from './navigation';
import FontAwesomeIcon from '@expo/vector-icons/FontAwesome';
// @icons
import NearIcon from "../../components/Icons/near-me";
import GiftsIcon from "../../components/Icons/gifts";
import ServicesIcon from "../../components/Icons/people-solid";
import ShopsIcon from "../../components/Icons/all-shops";
import PointsIcon from "../../components/Icons/points";
import OffersIcon from "../../components/Icons/offers";
import DealsIcon from "../../components/Icons/deals";
import CouponsIcon from "../../components/Icons/coupons";
import ConnectedIcon from "../../components/Icons/connected";
import ReferralsIcon from "../../components/Icons/referrals";
import InvitesIcon from "../../components/Icons/invites";
import AllContactsIcon from "../../components/Icons/contacts-solid";
import useActiveRoute from "@/src/hooks/useActiveRoute";

interface SecondaryNavigationProps {
    onNavigate: (path: string) => void;
    activeItem: string;
}

// Secondary navigation for shops screen
export const ShopsSecondaryNavigation = () => {
    return (
        <Card marginBottom={10} marginHorizontal={15} paddingHorizontal={10} paddingVertical={10} backgroundColor='#FFFFFF'>

            <HStack justifyContent="space-around" backgroundColor="white" paddingVertical={15}>
                <NavItem color="#43A048" icon={<NearIcon />} label="Near Me" onPress={() => router.push('/points')} />
                <NavItem icon={<GiftsIcon />} label="Gifts" onPress={() => router.push('/points')} />
                <NavItem icon={<ServicesIcon />} label="Services" onPress={() => router.push('/points')} />
                <NavItem icon={<ShopsIcon />} label="All Shops" onPress={() => router.push('/points')} />
            </HStack>
        </Card>
    )
};

// Secondary navigation for points screen
export const PointsSecondaryNavigation = () => {
    const activeTab = useActiveRoute();
    const activeColor = "#1E3AE5";
    const inactiveColor = "#414141";

    const getColor = (tabName: string) => (activeTab === tabName ? activeColor : inactiveColor);
    const getFontWeight = (tabName: string) => (activeTab === tabName ? 700 : 400);

    return (<Card marginBottom={10} marginHorizontal={15} paddingHorizontal={10} paddingVertical={10} backgroundColor='#FFFFFF'>
        <HStack justifyContent="space-around" backgroundColor="white" paddingVertical={15}>
            <NavItem fontWeight={getFontWeight('transfers')} color={getColor("transfers")} icon={<PointsIcon />} label="Points" onPress={() => router.push('/main/home/points')} />
            <NavItem fontWeight={getFontWeight('offers')} color={getColor("offers")}  icon={<OffersIcon />} label="Offers" onPress={() => router.push('/main/home/points/offers')} />
            <NavItem fontWeight={getFontWeight('deals')} color={getColor("deals")}  icon={<DealsIcon />} label="Deals" onPress={() => router.push('/main/home/points/deals')} />
            <NavItem fontWeight={getFontWeight('coupons')} color={getColor("coupons")}  icon={<CouponsIcon />} label="Coupons" onPress={() => router.push('/main/home/points/coupons')} />
        </HStack>
    </Card>
    );
}

// Secondary navigation for contacts screen
export const ContactsSecondaryNavigation = () => (
    <Card marginBottom={10} marginHorizontal={15} paddingHorizontal={10} paddingVertical={10} backgroundColor='#FFFFFF'>

        <HStack justifyContent="space-around" backgroundColor="white" paddingVertical={15}>
            <NavItem icon={<ConnectedIcon />} label="Connected" onPress={() => router.push('/points')} />
            <NavItem icon={<ReferralsIcon />} label="Referrals" onPress={() => router.push('/points')} />
            <NavItem icon={<InvitesIcon />} label="Invites" onPress={() => router.push('/points')} />
            <NavItem icon={<AllContactsIcon />} label="All Contacts" onPress={() => router.push('/points')} />
        </HStack>
    </Card>
);

const HomeHeader = () => {



    const handleNavigation = (route: string) => {
        router.push(route);
    };


    return (
        <Box>
            <Box marginBottom={10} backgroundColor="#DB1E36" paddingBottom={10} paddingHorizontal={10}>
                <HStack marginBottom={5} paddingTop={52} space="md">
                    <FontAwesomeIcon name="map-marker" size={24} color="#FFFFFF" />
                    <Text color="white" fontSize={16}>Kahawa Sukari</Text>
                </HStack>
                <Card paddingVertical={10} backgroundColor='#FFFFFF'>
                    <TopNavigation onNavigate={handleNavigation} />
                </Card>
            </Box>

        </Box>
    );
};

export default HomeHeader;
