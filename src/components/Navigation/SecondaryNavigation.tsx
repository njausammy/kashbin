import React from 'react';
import { HStack, Pressable, Text, Box, Input, InputField, ScrollView } from "@gluestack-ui/themed";
import { router } from "expo-router";
import useActiveRoute from "@/src/hooks/useActiveRoute";

interface TabItemProps {
    icon: React.ReactElement;
    label: string;
    onPress: () => void;
    isActive: boolean;
}

const TabItem: React.FC<TabItemProps> = ({ icon, label, onPress, isActive }) => (
    <Pressable
        onPress={onPress}
        flexDirection="row"
        alignItems="center"
        justifyContent="center"
        backgroundColor={isActive ? "#FCE9EB" : "#FFFFFF"}
        paddingVertical={8}
        paddingHorizontal={16}
        borderRadius={20}
        marginRight={8}
        borderWidth={isActive?0:1}
        borderColor={isActive ? "" : "#E0E0E0"}
        minWidth={90}
    >
        {React.cloneElement(icon, {
            color: "#2A2A2A",
            size: 16
        })}
        <Text
            color="#2A2A2A"
            fontSize={14}
            fontWeight="medium"
            marginLeft={5}
        >
            {label}
        </Text>
    </Pressable>
);

interface SecondaryNavigationProps {
    tabs: Array<{ icon: React.ReactElement; label: string; route: string, name: string }>;
    showSearch?: boolean;
}

const SecondaryNavigation: React.FC<SecondaryNavigationProps> = ({ tabs, showSearch = false }) => {
    const activeRoute = useActiveRoute();

    return (
        <Box backgroundColor='#fff' paddingHorizontal={10} >
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                <HStack paddingVertical={10} justifyContent="flex-start">
                    {tabs.map((tab, index) => (
                        <TabItem
                            key={index}
                            icon={tab.icon}
                            label={tab.label}
                            onPress={() => router.push(tab.route)}
                            isActive={activeRoute === tab.name}
                        />
                    ))}
                </HStack>
            </ScrollView>

            {showSearch && (
                <Box>
                    <Input
                        borderWidth={0}
                        borderRadius={16}
                        height={48}
                        marginBottom={10}
                        backgroundColor="#F5F5F5"
                    >
                        <InputField
                            type="text"
                            placeholder='Search transfers'
                        />
                    </Input>
                </Box>
            )}
        </Box>
    );
};

export default SecondaryNavigation;
