import React, { useState } from 'react';
import { Box, VStack, Text, Button, HStack, Input, InputField, Card, Alert, AlertText } from "@gluestack-ui/themed";
import Icon from '@expo/vector-icons/AntDesign';
import PageHeader from '../../PageHeader';
import { useLocalSearchParams } from 'expo-router';
import FailIcon from '../../Icons/fail-icon';
import SuccessIcon from '../../Icons/success-icon';
import Loader from '../../Loader';

const RedeemPointsView = () => {
    const [pointsToRedeem, setPointsToRedeem] = useState('500');
    const [redeemState, setRedeemState] = useState('input');
    const [totalPoints, setTotalPoints] = useState(3850);
    const [outletPoints, setOutletPoints] = useState(350);

    const { shop } = useLocalSearchParams() as { shop: string };
    const shopDetails = shop ? JSON.parse(shop) : {
        name: 'Niyaleo Wholesale Depot',
        address: 'Bungoma Road, Kahawa Sukari, Kiambu County.',
    };

    const handleRedeem = () => {
        setRedeemState('processing');
        // Simulate API call
        setTimeout(() => {
            if (parseInt(pointsToRedeem) <= totalPoints) {
                setRedeemState('success');
                setTotalPoints(prev => prev - parseInt(pointsToRedeem));
            } else {
                setRedeemState('failed');
            }
        }, 2000);
    };

    const renderRedeemStatus = () => {
        return (
            <Card size="lg" variant="outline" padding={24} alignItems="center" width="100%">
                {redeemState === 'processing' && (
                    <>
                        <Loader />
                        <Text textAlign="center" marginTop={30} fontSize={22} fontWeight={600} lineHeight={28} color='#2A2A2A'>Processing redemption...</Text>
                    </>
                )}
                {redeemState === 'success' && (
                    <>
                        <Loader customComponent={<SuccessIcon />} />
                        <Text textAlign="center" marginTop={30} fontSize={22} fontWeight={600} lineHeight={28} color='#2A2A2A'>Redemption Successful!</Text>
                        <Text textAlign="center" marginTop={8} fontSize={14} color='#5A5A5A'>
                            You have successfully redeemed {pointsToRedeem} points. Your new balance is {totalPoints} points.
                        </Text>
                    </>
                )}
                {redeemState === 'failed' && (
                    <>
                        <Loader customComponent={<FailIcon />} />
                        <Text textAlign="center" marginTop={30} fontSize={22} fontWeight={600} lineHeight={28} color='#2A2A2A'>Redemption Failed!</Text>
                        <Text textAlign="center" marginTop={8} fontSize={14} color='#5A5A5A'>
                            Insufficient balance to redeem {pointsToRedeem} points. Your current balance is {totalPoints} points.
                        </Text>
                    </>
                )}
            </Card>
        );
    };

    return (
        <VStack backgroundColor="$white" flex={1} paddingHorizontal={24}>
            <PageHeader value={0} hideProgressBar />
            <Text fontSize={22} fontWeight={600} color='#2A2A2A' >Redeem Points</Text>
            <Text fontSize={14} color="#5A5A5A" fontWeight={400} >Enter the number of points to redeem</Text>


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

            {redeemState === 'input' ? (
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
                            Transfer {pointsToRedeem} points, charge 10 points, total transfer {parseInt(pointsToRedeem) + 10} points
                        </Text>

                        <Button
                            backgroundColor="#DB1E36"
                            borderRadius={50}
                            height={56}
                            width="$full"
                            marginBottom={30}
                            onPress={handleRedeem}
                        >
                            <Text color='#FFFFFF'>Redeem</Text>
                        </Button>
                    </VStack>
                </Card>
            ) : renderRedeemStatus()}
        </VStack>
    );
};

export default RedeemPointsView;