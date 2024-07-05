import FontAwesome from '@expo/vector-icons/FontAwesome';
import { Tabs } from 'expo-router';

import HomeIcon from "../../src/components/Icons/home"
import CartIcon from "../../src/components/Icons/cart"
import ServicesIcon from "../../src/components/Icons/services"
import MessagesIcon from "../../src/components/Icons/messages"
import ProfileIcon from "../../src/components/Icons/profile"



export default function TabLayout() {
    return (
        <Tabs  screenOptions={{ tabBarActiveTintColor: 'blue', headerShown: false, tabBarShowLabel: false, }}>
            <Tabs.Screen
                name="home"
                options={{
                    tabBarIcon: ({ focused }) => <HomeIcon fill={focused ? '#DB1E36' : '#414141'} />,
                }}

            />
            <Tabs.Screen
                name="points"
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
                name="contacts"
                options={{
                    tabBarIcon: ({ focused }) => <MessagesIcon fill={focused ? '#DB1E36' : '#414141'} />,
                }}
            />
            <Tabs.Screen
                name="profile"
                options={{
                    tabBarIcon: ({ focused }) => <ProfileIcon fill={focused ? '#DB1E36' : '#414141'} />,

                }}
            />
        </Tabs>
    );
}
