import React, { useState, useEffect } from 'react';
import { Box, Button, Text, VStack, HStack, Pressable } from "@gluestack-ui/themed";
import { router } from 'expo-router';
import PageHeader from '../PageHeader';

const PinScreen = () => {
    const [pin, setPin] = useState('');
    const [confirmPin, setConfirmPin] = useState('');
    const [isConfirmScreen, setIsConfirmScreen] = useState(false);
    const [error, setError] = useState('');



    useEffect(() => {
        if (pin.length === 4 && !isConfirmScreen) {
            setIsConfirmScreen(true);
        }
        if (confirmPin.length === 4) {
            if (pin === confirmPin) {
                // PIN confirmed successfully, navigate to next screen or save PIN
                router.push('/next-screen');
            } else {
                setError('PINs do not match. Please try again.');
                setIsConfirmScreen(false);
                setPin('');
                setConfirmPin('');
            }
        }
    }, [pin, confirmPin]);

    const renderPinDots = () => {
        const dots = [];
        for (let i = 0; i < 4; i++) {
            dots.push(
                <Box
                    key={i}
                    width={10}
                    height={10}
                    borderRadius={5}
                    backgroundColor={
                        (isConfirmScreen ? confirmPin.length > i : pin.length > i)
                            ? "$black"
                            : "$lightGray"
                    }
                    marginHorizontal={4}
                />
            );
        }
        return dots;
    };


    return (
        <VStack flex={1} backgroundColor="$white">
            <Box paddingHorizontal={15}>
                <PageHeader value={100} hideProgressBar />
            </Box>
            <VStack flex={1} paddingHorizontal={24} justifyContent="space-between">
                <VStack  marginTop={24}>
                    <Text fontSize={22} fontWeight="600" color="$black">
                        {isConfirmScreen ? 'Confirm account pin' : 'Create account pin'}
                    </Text>
                    <Text fontSize={14} color="$gray" marginTop={8}>
                        {isConfirmScreen
                            ? 'The account pin is required to confirm your transactions.'
                            : 'The account pin is required to confirm your transactions.'}
                    </Text>
                    <HStack marginTop={32}>
                        {renderPinDots()}
                    </HStack>
                    {error ? (
                        <Text color="$red" marginTop={16}>
                            {error}
                        </Text>
                    ) : null}
                </VStack>
            </VStack>
        </VStack>
    );
};

export default PinScreen;