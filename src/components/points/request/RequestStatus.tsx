import React, { useState } from 'react';
import { VStack, Text, Card, Button } from "@gluestack-ui/themed";
import { useLocalSearchParams } from 'expo-router';
import PageHeader from '../../PageHeader';
import FailIcon from '../../Icons/fail-icon';
import SuccessIcon from '../../Icons/success-icon';
import Loader from '../../Loader';

const RequestPointsStatus: React.FC = () => {
    const [requestState, setRequestState] = useState<'input' | 'processing' | 'success' | 'failed'>('input');
    const [pointsToRequest, setPointsToRequest] = useState<string>('3700');

    const { shop } = useLocalSearchParams() as { shop: string };
    const shopDetails = shop ? JSON.parse(shop) : {
        name: 'Niyaleo Wholesale Depot',
        address: 'Bungoma Road, Kahawa Sukari, Kiambu County.',
    };

    const handleRequest = () => {
        setRequestState('processing');
        // Simulate API call
        setTimeout(() => {
            setRequestState(Math.random() > 0.5 ? 'success' : 'failed');
        }, 2000);
    };

    const renderRequestStatus = () => {
        return (
            <Card size="lg" variant="outline" padding={24} alignItems="center" width="100%">
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
            <Text fontSize={22} fontWeight={600} color='#2A2A2A'>Request Points</Text>
            <Text fontSize={14} color="#5A5A5A" fontWeight={400}>
                {requestState === 'processing' && "Sending your points request to the merchant"}
                {requestState === 'success' && "Request successfully sent!"}
                {requestState === 'failed' && "Request operation failed."}
            </Text>


            {requestState === 'input' ? (
                <Card backgroundColor="$white" padding={20} borderRadius={10} marginTop={20}>
                    <VStack space="md">
                        <Text color="#414141" fontSize={16} fontWeight={400} textAlign="center">
                            {shopDetails?.name}
                        </Text>
                        <Text fontSize={12} color="#5A5A5A" textAlign="center">
                            {shopDetails.address}
                        </Text>
                        <Text fontSize={14} color="#5A5A5A" textAlign="center">
                            Request {pointsToRequest} points
                        </Text>
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

export default RequestPointsStatus;