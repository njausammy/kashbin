import React, { useState } from 'react';
import { Box, VStack, Text, Button, HStack, Input, InputField, Card } from "@gluestack-ui/themed";
import PageHeader from '../../PageHeader';
import { useLocalSearchParams } from 'expo-router';

const RedeemPointsView = () => {
    const [pointsToRedeem, setPointsToRedeem] = useState('500');

    const { shop } = useLocalSearchParams() as { shop: string };
    const shopDetails = shop ? JSON.parse(shop) : {
        name: 'Niyaleo Wholesale Depot',
        address: 'Bungoma Road, Kahawa Sukari, Kiambu County.',
    };

    return (
        <VStack backgroundColor="$white" flex={1} paddingHorizontal={24}>
            <PageHeader value={0} hideProgressBar />
            <Text fontSize={22} fontWeight={600} color='#2A2A2A' >Redeem Points</Text>
            <Text fontSize={14} color="#5A5A5A" fontWeight={400} >Enter the number of points to redeem</Text>

            <HStack space="md" justifyContent="space-between" marginVertical={60}>
                <Card backgroundColor="#DB1E36" padding={10} borderRadius={10} flex={1}>
                    <Text color="$white" fontSize={20} fontWeight="$bold">3850</Text>
                    <Text color="$white" fontSize={12}>Total Points</Text>
                    <Text color="$white" fontSize={12}>Value: KES 3850</Text>
                </Card>
                <Card backgroundColor="#81C784" padding={10} borderRadius={10} flex={1}>
                    <Text color="$white" fontSize={20} fontWeight="$bold">350</Text>
                    <Text color="$white" fontSize={12}>This outlet</Text>
                    <Text color="$white" fontSize={12}>Value: KES 350</Text>
                </Card>
            </HStack>

            <Card backgroundColor="$white" padding={20} borderRadius={10} height={295}>
                <VStack space="md">
                    <Text color="#414141" fontSize={16} fontWeight={400} textAlign="center">
                        {shopDetails?.name}
                    </Text>
                    <Text fontSize={12} color="#5A5A5A" textAlign="center">
                        {shopDetails.address}
                    </Text>
                    <Input
                        variant="underlined"
                    >
                        <InputField
                            textAlign="center"
                            fontSize={36}
                            keyboardType="numeric"
                            value={pointsToRedeem}
                            onChangeText={setPointsToRedeem}
                        />
                    </Input>
                    <Text fontSize={14} color="#5A5A5A" textAlign="center">
                        Transfer 150 points, charge 10 points, total transfer 160 points
                    </Text>

                    <Button
                        backgroundColor="#DB1E36"
                        borderRadius={50}
                        height={56}
                        width="$full"
                        marginBottom={30}
                    >
                        <Text
                            color='#FFFFFF'
                        >
                            Redeem
                        </Text>
                    </Button>
                </VStack>
            </Card>
        </VStack>

    );
};

export default RedeemPointsView;