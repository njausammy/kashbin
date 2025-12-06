import React from 'react';
import { VStack, Text, Card } from "@gluestack-ui/themed";
import Button from '@/src/components/form/AnimatedButton';
import PageHeader from '../../PageHeader';
import { router, useLocalSearchParams } from 'expo-router';

const ShopDetailsView = () => {
    const { shop } = useLocalSearchParams() as { shop: string };
    const shopDetails = shop ? JSON.parse(shop) : {
        name: 'Niyaleo Wholesale Depot',
        address: 'Bungoma Road, Kahawa Sukari, Kiambu County.',
    };

    const handleRedeem = () => {
        router.push({
            pathname: '/points/transffer/redeem',
            params: { shop: shop },
        });
    };


    const handleRequest = () => {
        router.push({
            pathname: '/points/request',
            params: { shop: shop },
        });
    };

    return (
        <VStack backgroundColor="$white" flex={1}>
            <PageHeader value={0} hideProgressBar />
            <Card marginHorizontal={14} marginTop={94} variant="elevated" borderRadius="$xl" height={372} paddingVertical={94}>
                <Text fontSize={16} fontWeight={400} textAlign="center" >
                    {shopDetails.name}
                </Text>
                <Text marginTop={80} fontSize={12} fontWeight={400} color="#5A5A5A" textAlign="center">
                    {shopDetails.address}
                </Text>
            </Card>

            <Button
                backgroundColor="#DB1E36"
                borderRadius={50}
                paddingHorizontal={10}
                height={56}
                width={307}
                alignSelf="center"
                marginTop={16}
                onPress={handleRedeem}
            >
                <Text color='white'>Redeem Points</Text>
            </Button>
            <Button
                borderColor='#DB1E36'
                borderWidth={1}
                backgroundColor="$white"
                borderRadius={50}
                paddingHorizontal={10}
                marginTop={16}
                height={56}
                width={307}
                alignSelf="center"
                onPress={handleRequest}
            >
                <Text color='#DB1E36'>Request Points</Text>
            </Button>
        </VStack>
    );
};

export default ShopDetailsView;
