import React, { useState } from 'react';
import { VStack, Text, Button, Input, InputField, Card } from "@gluestack-ui/themed";
import PageHeader from '../../PageHeader';
import { useLocalSearchParams } from 'expo-router';

const RequestPointsView = () => {
    const [pointsToRequest, setPointsToRequest] = useState('500');

    const { shop } = useLocalSearchParams() as { shop: string };
    const shopDetails = shop ? JSON.parse(shop) : {
        name: 'Niyaleo Wholesale Depot',
        address: 'Bungoma Road, Kahawa Sukari, Kiambu County.',
    };

    return (
        <VStack backgroundColor="$white" flex={1} paddingHorizontal={24}>
            <PageHeader value={0} hideProgressBar />
            <Text fontSize={22} fontWeight={600} color='#2A2A2A'>Request Points</Text>
            <Text fontSize={14} color="#5A5A5A" fontWeight={400}>Request for points from the merchant</Text>

            <Card backgroundColor="$white" padding={20} borderRadius={10} marginTop={40}>
                <VStack space="md">
                    <Text color="#414141" fontSize={16} fontWeight={400} textAlign="center">
                        Please enter the total amount spent at
                    </Text>
                    <Text fontSize={12} color="#5A5A5A" textAlign="center">
                        Niyaleo Wholesale Depot to request your
                    </Text>
                    <Text fontSize={12} color="#5A5A5A" textAlign="center">
                        points.
                    </Text>
                    <Input variant="underlined">
                        <InputField
                            textAlign="center"
                            fontSize={36}
                            keyboardType="numeric"
                            value={pointsToRequest}
                            onChangeText={setPointsToRequest}
                        />
                    </Input>


                    <Button
                        backgroundColor="#DB1E36"
                        borderRadius={50}
                        height={56}
                        width="$full"
                        marginTop={20}
                    >
                        <Text color='#FFFFFF'>
                            Request Points
                        </Text>
                    </Button>
                </VStack>
            </Card>
        </VStack>
    );
};

export default RequestPointsView;