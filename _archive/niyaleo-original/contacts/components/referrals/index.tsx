import React from 'react';
import { Box, Text, VStack, FlatList, Card, Input, InputField, Button } from "@gluestack-ui/themed";
import { router } from 'expo-router';

interface ReferralItemProps {
    referral: {
        name: string;
        phoneNumber: string;
    };
}

const ReferralItem: React.FC<ReferralItemProps> = ({ referral }) => (
    <Box
        borderBottomWidth={1}
        borderBottomColor="#E8E8E8"
        paddingVertical={15}
        flexDirection="row"
        justifyContent="space-between"
        alignItems="center"
    >
        <VStack alignItems="flex-start">
            <Text color='#414141' fontSize={14} fontWeight={400}>{referral.name}</Text>
            <Text color="#5A5A5A" fontSize={12} fontWeight={400}>{referral.phoneNumber}</Text>
        </VStack>
        <Text fontStyle="italic" color='#414141' fontSize={12} fontWeight={400}>Pending</Text>
    </Box>
);

const ReferralsScreen: React.FC = () => {
    const handleNavigation = (route: string): void => {
        router.push(route);
    };

    const referrals = [
        { name: 'Simba Halisi', phoneNumber: '+254711202156' },
        { name: 'Noel Asambi', phoneNumber: '+254100123456' },
        { name: 'Ruth Atieno', phoneNumber: '+254733123456' },
        { name: 'Jasper Omwami', phoneNumber: '+254755123456' },
        { name: 'Hussein Abdalla', phoneNumber: '+1507123456' },
        { name: 'Grace Vanderbilt', phoneNumber: '+255810123456' },
    ];

    return (
        <VStack flex={1} marginHorizontal={4} paddingHorizontal={4} paddingVertical={4} backgroundColor='#FFFFFF'>
                <FlatList
                    data={referrals}
                    renderItem={({ item }) => <ReferralItem referral={item as any} />}
                    keyExtractor={(item, index) => index.toString()}
                    contentContainerStyle={{ paddingHorizontal: 15, marginTop: 10 }}
                    borderTopWidth={1} borderTopColor="#E8E8E8" 
                />
        
        </VStack>
    );
};

export default ReferralsScreen;
