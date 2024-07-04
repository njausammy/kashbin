import React from 'react';
import { HStack, Image } from "@gluestack-ui/themed";
import { Pressable, VStack,  Text } from "@gluestack-ui/themed";

export const NavItem = ({ icon, label, onPress }: {
    icon: string;
    label: string;
    onPress: () => void
}) => (
    <Pressable onPress={onPress}>
        <VStack alignItems="center">
            <Image source={icon} style={{ width: 32, height: 32 }} alt={label} />
            <Text fontSize={12}>{label}</Text>
        </VStack>
    </Pressable>
);

export const TopNavigation = ({ onNavigate }: { onNavigate: (path: string) => void }) => (
    <HStack justifyContent="space-around"  >
        <NavItem icon={require(`../../../assets/icons/shop.png`)} label="Shops" onPress={() => onNavigate('/shops')} />
        <NavItem icon={require(`../../../assets/icons/points.png`)} label="Points" onPress={() => onNavigate('/points')} />
        <NavItem icon={require(`../../../assets/icons/people.png`)} label="Contacts" onPress={() => onNavigate('/contacts')} />
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

