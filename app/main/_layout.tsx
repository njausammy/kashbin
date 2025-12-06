// app/main/_layout.tsx
// Simplified 3-tab navigation for crypto wallet
// Send/Receive accessible via Home screen quick actions
import React from 'react';
import { Tabs } from 'expo-router';
import { Platform } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Colors } from '@/src/constants/Colors';

import WalletIcon from "../../src/components/Icons/wallet"
import MerchantIcon from "../../src/components/Icons/merchant"
import ProfileIcon from "../../src/components/Icons/profile"

const MainLayout = () => {
    const insets = useSafeAreaInsets();

    return (
        <Tabs screenOptions={{
            tabBarActiveTintColor: Colors.primary.DEFAULT, // Deep Blue
            tabBarInactiveTintColor: Colors.grey, // Elephant Grey
            headerShown: false,
            tabBarShowLabel: true,
            tabBarLabelStyle: {
                fontSize: 12,
                fontWeight: '500',
            },
            tabBarStyle: {
                height: 60 + insets.bottom,
                paddingBottom: insets.bottom || 8,
                paddingTop: 8,
                borderTopWidth: 1,
                borderTopColor: Colors.lightGrey,
            },
            tabBarItemStyle: {
                paddingVertical: 4,
            }
        }}>
            <Tabs.Screen
                name="home"
                options={{
                    href: '/main/home',
                    tabBarIcon: ({ focused }) => <WalletIcon fill={focused ? Colors.primary.DEFAULT : Colors.grey} width={24} height={24} />,
                    tabBarLabel: 'Home',
                    title: 'Home',
                }}
            />
            <Tabs.Screen
                name="merchants"
                options={{
                    href: '/main/merchants',
                    tabBarIcon: ({ focused }) => <MerchantIcon fill={focused ? Colors.primary.DEFAULT : Colors.grey} width={24} height={24} />,
                    tabBarLabel: 'Merchants',
                    title: 'Merchants',
                }}
            />
            <Tabs.Screen
                name="profile"
                options={{
                    href: '/main/profile',
                    tabBarIcon: ({ focused }) => <ProfileIcon fill={focused ? Colors.primary.DEFAULT : Colors.grey} width={24} height={24} />,
                    tabBarLabel: 'Profile',
                    title: 'Profile',
                }}
            />
            {/* Hidden tabs - accessible via navigation but not shown in tab bar */}
            <Tabs.Screen
                name="send"
                options={{
                    href: null, // Hide from tab bar
                }}
            />
            <Tabs.Screen
                name="receive"
                options={{
                    href: null, // Hide from tab bar
                }}
            />
        </Tabs>
    );
};

export default MainLayout;
