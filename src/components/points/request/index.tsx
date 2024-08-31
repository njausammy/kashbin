import React, { useState } from 'react';
import { VStack, Text, Card, InputField, Input } from "@gluestack-ui/themed";
import Button from '@/src/components/form/AnimatedButton';
import { useLocalSearchParams } from 'expo-router';
import PageHeader from '../../PageHeader';
import FailIcon from '../../Icons/fail-icon';
import SuccessIcon from '../../Icons/success-icon';
import Loader from '../../Loader';

const RequestPoints: React.FC = () => {
    const [requestState, setRequestState] = useState<'input' | 'processing' | 'success' | 'failed'>('input');
    const [pointsToRequest, setPointsToRequest] = useState<string>('0');

    const { shop } = useLocalSearchParams() as { shop: string };
    const shopDetails = shop ? JSON.parse(shop) : {
        name: 'Niyaleo Wholesale Depot',
        address: 'Bungoma Road, Kahawa Sukari, Kiambu County.',
    };

    const handleRequest = () => {
        setRequestState('processing');
        // Simulate API call
        setTimeout(() => {
            if (parseInt(pointsToRequest, 10) > 5000) {
                setRequestState('failed');
            }
            else {
                setRequestState("success");
            }
        }, 2000);
    };

    const renderRequestStatus = () => {
        return (
            <Card size="lg" variant="outline" padding={24} alignItems="center" width="100%" marginTop={50}>
                {requestState === 'processing' && (
                    <>
                        <Loader />
                        <Text textAlign="center" marginTop={30} fontSize={22} fontWeight={600} lineHeight={28} color='#2A2A2A'>Processing...</Text>
                        <Text textAlign="center" marginTop={8} fontSize={14} color='#5A5A5A'>
                            Sending your points request to the merchant
                        </Text>
                    </>
                )}
                {requestState === 'success' && (
                    <>
                        <Loader customComponent={<SuccessIcon />} />
                        <Text textAlign="center" marginTop={30} fontSize={22} fontWeight={600} lineHeight={28} color='#2A2A2A'>Request Sent!</Text>
                        <Text textAlign="center" marginTop={8} fontSize={14} color='#5A5A5A'>
                            Your points request for KES {pointsToRequest} at {shopDetails.name} has been sent successfully on {new Date().toLocaleDateString()}. You'll be notified once it's approved. Reference ID: RR1690389342.
                        </Text>
                    </>
                )}
                {requestState === 'failed' && (
                    <>
                        <Loader customComponent={<FailIcon />} />
                        <Text textAlign="center" marginTop={30} fontSize={22} fontWeight={600} lineHeight={28} color='#2A2A2A'>Failed!</Text>
                        <Text textAlign="center" marginTop={8} fontSize={14} color='#5A5A5A'>
                            Points request for KES {pointsToRequest} at {shopDetails.name} failed to send. Please try again later. If this issue persists, contact support. Reference ID: RR1690389702.
                        </Text>
                    </>
                )}
            </Card>
        );
    };

    return (
        <VStack backgroundColor="$white" flex={1} paddingHorizontal={24}>
            <PageHeader value={0} hideProgressBar />
            <Text marginTop={50}  fontSize={22} fontWeight={600} color='#2A2A2A'>Request Points</Text>
            <Text fontSize={14} color="#5A5A5A" fontWeight={400}>
                {requestState === 'processing' && "Sending your points request to the merchant"}
                {requestState === 'success' && "Request successfully sent!"}
                {requestState === 'failed' && "Request operation failed."}
                {requestState === 'input' && "Request for points from the merchant."}

            </Text>


            {requestState === 'input' ? (
                <Card backgroundColor="$white" padding={20} borderRadius={10} marginTop={50}>
                    <VStack >
                        <Text color="#414141" fontSize={16} fontWeight={400} textAlign="center">
                            Please enter the total amount spent at
                        </Text>
                        <Text fontSize={12} color="#5A5A5A" textAlign="center">
                            Niyaleo Wholesale Depot to request your
                        </Text>
                        <Text marginBottom={60} fontSize={12} color="#5A5A5A" textAlign="center"> points.</Text>
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
                            onPress={handleRequest}
                        >
                            <Text color='#FFFFFF'>Request Points</Text>
                        </Button>
                    </VStack>
                </Card>
            ) : renderRequestStatus()}
        </VStack>
    );
};

export default RequestPoints;