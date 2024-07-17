// app/main/_layout.tsx
import React from 'react';
import { Tabs } from 'expo-router';

import HomeIcon from "../../src/components/Icons/home"
import CartIcon from "../../src/components/Icons/cart"
import ServicesIcon from "../../src/components/Icons/services"
import MessagesIcon from "../../src/components/Icons/messages"
import ProfileIcon from "../../src/components/Icons/profile"

const MainLayout = () => {
    return (
        <Tabs screenOptions={{ tabBarActiveTintColor: 'blue', headerShown: false, tabBarShowLabel: false, }}>
            <Tabs.Screen
                name="home"
                options={{
                    tabBarIcon: ({ focused }) => <HomeIcon fill={focused ? '#DB1E36' : '#414141'} />,
                }}

            />
            <Tabs.Screen
                name="cart"
                options={{
                    tabBarIcon: ({ focused }) => <CartIcon fill={focused ? '#DB1E36' : '#414141'} />,
                }}
            />
            <Tabs.Screen
                name="services"
                options={{
                    tabBarIcon: ({ focused }) => <ServicesIcon fill={focused ? '#DB1E36' : '#414141'} />,
                    tabBarShowLabel: false
                }}
            />
            <Tabs.Screen
                name="messages"
                options={{
                    tabBarIcon: ({ focused }) => <MessagesIcon fill={focused ? '#DB1E36' : '#414141'} />,
                    tabBarShowLabel: false
                }}
            />
            <Tabs.Screen
                name="profile"
                options={{
                    tabBarIcon: ({ focused }) => <ProfileIcon fill={focused ? '#DB1E36' : '#414141'} />,
                    tabBarShowLabel: false
                }}
            />
        </Tabs>

    );
};

export default MainLayout;
