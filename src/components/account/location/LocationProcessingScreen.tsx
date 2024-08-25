import React, { useState, useEffect } from 'react';
import { Button, Text, VStack, Card, Pressable, HStack } from "@gluestack-ui/themed";
import { router } from 'expo-router';
import PageHeader from '../../PageHeader';
import Loader from '../../Loader';
import SuccessIcon from '../../Icons/success-icon';
import FailIcon from '../../Icons/fail-icon';

const LocationStatusScreen = () => {
    const [locationState, setLocationState] = useState('processing');

    useEffect(() => {
        const timer = setTimeout(() => {
            // setLocationState('success');
        }, 3000);

        return () => clearTimeout(timer);
    }, []);

    const handleContinue = () => {
        router.push('/next-screen');
    };

    const handleSkip = () => {
        router.push('/next-screen');
    };

    return (
        <VStack backgroundColor="$white" flex={1} paddingBottom={24}>
            <VStack flex={1} padding={24} justifyContent="space-between">
                <VStack>
                    <Text color='#2A2A2A' fontSize={22} fontWeight={600} marginBottom={8}>
                        Location
                    </Text>
                    <HStack>
                        <Text color='#5A5A5A' fontSize={14}>
                            {locationState === 'processing' ? "Creating your address..." :
                                locationState === 'success' ? "Congratulations! Your address is ready for use." :
                                    "Location not found. Retry"}
                        </Text >
                        {locationState === "failed" && <Pressable><Text color='#DB1E36' fontSize={14}> Locate Me</Text></Pressable>
                        }
                    </HStack>
                </VStack>

                <VStack flex={1} justifyContent="space-around" alignItems="center" >
                    <Card size="lg" variant="outline" padding={24} alignItems="center" width="100%">
                        {locationState === 'processing' && (
                            <>
                                <Loader />
                                <Text textAlign="center" marginTop={30} fontSize={22} fontWeight={600} lineHeight={28} color='#2A2A2A'>Creating address...</Text>
                            </>
                        )}
                        {locationState === 'success' && (
                            <>
                                <Loader customComponent={<SuccessIcon />} />
                                <Text textAlign="center" marginTop={30} fontSize={22} fontWeight={600} lineHeight={28} color='#2A2A2A'>Address Created!</Text>
                                <Text textAlign="center" marginTop={8} fontSize={14} color='#5A5A5A'>
                                    Your address is set! You can now receive parcels using +254700000635 or @mwangiitu
                                </Text>
                            </>
                        )}
                        {locationState === 'failed' && (
                            <>
                                <Loader customComponent={<FailIcon />} />
                                <Text textAlign="center" marginTop={30} fontSize={22} fontWeight={600} lineHeight={28} color='#2A2A2A'>Sorry!</Text>
                                <Text textAlign="center" marginTop={8} fontSize={14} color='#5A5A5A'>
                                    Please check your phone's location settings, then retry "Locate Me" or enter your address manually.
                                </Text>
                            </>
                        )}
                    </Card>
                    {locationState === 'failed' && (
                        <Button
                            backgroundColor="#DB1E36"
                            borderRadius={50}
                            paddingHorizontal={10}
                            height={56}
                            width="100%"
                            marginBottom={16}
                        >
                            <Text color='white'>Enter Address Manually</Text>
                        </Button>
                    )}
                </VStack>



                <Text color="#5A5A5A" alignSelf="center" onPress={() => { }}>
                    Skip
                </Text>
            </VStack>
        </VStack>
    );
};

export default LocationStatusScreen;