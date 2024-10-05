import React from 'react';
import FontAwesomeIcon from '@expo/vector-icons/FontAwesome';
// Import your icons here
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
import SecondaryNavigation from '../Navigation/SecondaryNavigation';
import { Box, HStack, Card, Text } from '@gluestack-ui/themed';
import { router } from 'expo-router';
import { TopNavigation } from './navigation';



export const ShopsSecondaryNavigation = () => (
    <SecondaryNavigation
        tabs={[
            { icon: <NearIcon width={18} height={18} />, label: "Near Me", route: "/main/home/shops", "name": "near-me" },
            { icon: <ServicesIcon width={18} height={18} />, label: "Services", route: "/main/home/shops/services", name: "services" },
        ]}
        showSearch
    />
);

export const PointsSecondaryNavigation = () => (
    <SecondaryNavigation
        tabs={[
            { icon: <PointsIcon width={18} height={18} />, label: "Gifts", route: "/main/home/points", name: "gifts" },
            { icon: <OffersIcon width={18} height={18} />, label: "Offers", route: "/main/home/points/offers", name: "offers" },
            { icon: <DealsIcon width={18} height={18} />, label: "Deals", route: "/main/home/points/deals", name: "deals" },
            { icon: <CouponsIcon width={18} height={18} />, label: "Coupons", route: "/main/home/points/coupons", name: "coupons" },
        ]}
        showSearch
    />
);

export const ContactsSecondaryNavigation = () => (
    <SecondaryNavigation

        tabs={[
            { icon: <ConnectedIcon />, label: "Connected", route: "/main/home/contacts/connected", name: "connected" },
            { icon: <ReferralsIcon />, label: "Referrals", route: "/main/home/contacts/referrals", name: "referrals" },
            { icon: <InvitesIcon />, label: "Invites", route: "/main/home/contacts/invites", name: "invites" },
            { icon: <AllContactsIcon />, label: "All Contacts", route: "/main/home/contacts/all-contacts", name: "all-contacts" },
        ]}
        showSearch
    />
);

const HomeHeader = () => {

    const handleNavigation = (route: string) => {
        router.push(route);
    };


    return (
        <Box backgroundColor='#fff'>
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