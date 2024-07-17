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

interface SecondaryNavigationProps {
    onNavigate: (path: string) => void;
    activeItem: string;
}

// Secondary navigation for shops screen
const ShopsSecondaryNavigation: React.FC<SecondaryNavigationProps> = ({ onNavigate, activeItem }) => (
    <HStack justifyContent="space-around" backgroundColor="white" paddingVertical={15}>
        <NavItem icon={<NearIcon />} label="Near Me" onPress={() => onNavigate('/points')} />
        <NavItem icon={<GiftsIcon />} label="Gifts" onPress={() => onNavigate('/points')} />
        <NavItem icon={<ServicesIcon />} label="Services" onPress={() => onNavigate('/points')} />
        <NavItem icon={<ShopsIcon />} label="All Shops" onPress={() => onNavigate('/points')} />
    </HStack>
);

// Secondary navigation for points screen
const PointsSecondaryNavigation: React.FC<SecondaryNavigationProps> = ({ onNavigate, activeItem }) => (
    <HStack justifyContent="space-around" backgroundColor="white" paddingVertical={15}>
        <NavItem icon={<PointsIcon />} label="Points" onPress={() => onNavigate('/points')} />
        <NavItem icon={<OffersIcon />} label="Offers" onPress={() => onNavigate('/points')} />
        <NavItem icon={<DealsIcon />} label="Deals" onPress={() => onNavigate('/points')} />
        <NavItem icon={<CouponsIcon />} label="Coupons" onPress={() => onNavigate('/points')} />
    </HStack>
);

// Secondary navigation for contacts screen
const ContactsSecondaryNavigation: React.FC<SecondaryNavigationProps> = ({ onNavigate, activeItem }) => (
    <HStack justifyContent="space-around" backgroundColor="white" paddingVertical={15}>
        <NavItem icon={<ConnectedIcon />} label="Connected" onPress={() => onNavigate('/points')} />
        <NavItem icon={<ReferralsIcon />} label="Referrals" onPress={() => onNavigate('/points')} />
        <NavItem icon={<InvitesIcon />} label="Invites" onPress={() => onNavigate('/points')} />
        <NavItem icon={<AllContactsIcon />} label="All Contacts" onPress={() => onNavigate('/points')} />
    </HStack>
);

const HomeHeader = () => {

    const path = usePathname(); // Get the current pathname using usePathname hook
    const [activeRoute, setActiveRoute] = useState<TTopNavigationTab>("shops"); // State to hold the last path name

    useEffect(() => {
        // Split the pathname into an array of path names
        const names = path.split('/').filter(name => name !== ''); // Remove empty segments

        // Set the last path name from the array
        if (names.length > 0) {
            setActiveRoute(names[names.length - 1] as TTopNavigationTab); // Get the last element in the array
        }
    }, [path]);

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
                    <TopNavigation activeTab={activeRoute} onNavigate={handleNavigation} />
                </Card>
            </Box>
            <Card marginBottom={10} marginHorizontal={15} paddingHorizontal={10} paddingVertical={10} backgroundColor='#FFFFFF'>
                {/* Render appropriate secondary navigation based on the active route */}
                {activeRoute === 'shops' && (
                    <ShopsSecondaryNavigation onNavigate={handleNavigation} activeItem={activeRoute} />
                )}
                {activeRoute === 'points' && (
                    <PointsSecondaryNavigation onNavigate={handleNavigation} activeItem={activeRoute} />
                )}
                {activeRoute === 'contacts' && (
                    <ContactsSecondaryNavigation onNavigate={handleNavigation} activeItem={activeRoute} />
                )}
            </Card>
        </Box>
    );
};

export default HomeHeader;
