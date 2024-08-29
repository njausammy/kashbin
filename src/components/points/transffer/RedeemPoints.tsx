import React, { useState } from 'react';
import { VStack, Text, Button, Input, InputField, Card, Alert, AlertIcon, AlertText } from "@gluestack-ui/themed";
import Icon from '@expo/vector-icons/AntDesign';
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
            <Text fontSize={22} fontWeight={600} color='#2A2A2A'>Redeem Points</Text>
            <Text fontSize={14} color="#5A5A5A" fontWeight={400}>Enter the number of points to redeem</Text>

            <VStack space="md" marginVertical={20}>
                <Alert height={56} borderRadius={12} variant="solid" backgroundColor='#E8F5E9'>
                    <Icon name="checkcircle" size={20} color="#1B5E21" />
                    <AlertText marginLeft={10}>
                        <Text fontWeight={400}>Points Balance: 3850 Value: KES 3850</Text>
                    </AlertText>
                </Alert>
                <Alert height={56} borderRadius={12} variant="solid" backgroundColor='#EAEBFF'>
                    <Icon name="checkcircle" size={20} color="#1E3AE5"  />
                    <AlertText marginLeft={10} >
                        <Text fontWeight={400}>Points from this shop: 350</Text>
                    </AlertText>
                </Alert>
            </VStack>

            <Card backgroundColor="$white" padding={20} borderRadius={10} height={295}>
                <VStack space="md">
                    <Text color="#414141" fontSize={16} fontWeight={400} textAlign="center">
                        {shopDetails?.name}
                    </Text>
                    <Text fontSize={12} color="#5A5A5A" textAlign="center">
                        {shopDetails.address}
                    </Text>
                    <Input variant="underlined">
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
                        <Text color='#FFFFFF'>
                            Redeem
                        </Text>
                    </Button>
                </VStack>
            </Card>
        </VStack>
    );
};

export default RedeemPointsView;