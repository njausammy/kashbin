import React, { useState, useEffect } from 'react';
import { router } from 'expo-router';
import { Box, Text, VStack, HStack, Pressable } from "@gluestack-ui/themed";
import PageHeader from '../PageHeader';

// Define the types for props
interface PinKeypadProps {
    onNumberPress: (number: string) => void;
    onClear: () => void;
}

interface PinSetupScreenProps {
    onPinSet: (pin: string) => void;
    onBack: () => void;
}

const PinKeypad: React.FC<PinKeypadProps> = ({ onNumberPress, onClear }) => {
    const renderKey = (content: string, subContent: string = '') => (
        <Pressable
            onPress={() => content === 'x' ? onClear() : onNumberPress(content)}
            flex={1}
            height={47}
        >
            <VStack
                borderRadius={5}
                alignItems="center"
                justifyContent="center"
                height="100%"
                backgroundColor='#FFFFFF'
                softShadow="4"
            >
                <Text fontSize={24}>{content}</Text>
                {subContent && <Text fontSize={10} color="$gray500">{subContent}</Text>}
            </VStack>
        </Pressable>
    );

    return (
        <VStack space="md">
            <HStack space="md">
                {renderKey('1')}
                {renderKey('2', 'ABC')}
                {renderKey('3', 'DEF')}
            </HStack>
            <HStack space="md">
                {renderKey('4', 'GHI')}
                {renderKey('5', 'JKL')}
                {renderKey('6', 'MNO')}
            </HStack>
            <HStack space="md">
                {renderKey('7', 'PQRS')}
                {renderKey('8', 'TUV')}
                {renderKey('9', 'WXYZ')}
            </HStack>
            <HStack space="md">
                <Pressable flex={1} />
                {renderKey('0')}
                {renderKey('x')}
            </HStack>
        </VStack>
    );
};

const PinSetupScreen = () => {
    const [pin, setPin] = useState<string>('');
    const [confirmPin, setConfirmPin] = useState<string>('');
    const [isConfirmScreen, setIsConfirmScreen] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);


    const handleNumberPress = (number: string) => {
        setError(null)
        if (!isConfirmScreen && pin.length < 4) {
            setPin(prevPin => prevPin + number);
        } else if (isConfirmScreen && confirmPin.length < 4) {
            setConfirmPin(prevPin => prevPin + number);
        }
    };

    const handleClear = () => {
        if (!isConfirmScreen) {
            setPin(prevPin => prevPin.slice(0, -1)); // Remove the last character
        } else {
            setConfirmPin(prevPin => prevPin.slice(0, -1)); // Remove the last character
        }
    };

    useEffect(() => {
        if (pin.length === 4 && !isConfirmScreen) {
            setIsConfirmScreen(true);
        }
        if (confirmPin.length === 4) {
            if (pin === confirmPin) {
                router.push("/onboarding/welcome")
            }
            else {
                setError("Pin does not match.")
            }
        }
    }, [pin, confirmPin, isConfirmScreen]);


    const isPinPositionFilled = (position: number) => pin.length > position && !isConfirmScreen
    const isConfirmPinPositionFilled = (position: number) => confirmPin.length > position && isConfirmScreen


    return (
        <VStack flex={1} backgroundColor="$white">
            <PageHeader value={50} />
            <VStack flex={1} paddingHorizontal={24} justifyContent="space-between">
                <VStack alignItems="flex-start" marginTop={24} flex={1} >
                    <VStack>
                        <Text fontSize={22} fontWeight="600" color="$black">
                            {isConfirmScreen ? 'Confirm account pin' : 'Create account pin'}
                        </Text>
                        <Text fontSize={14} color="$gray500" marginTop={8}>
                            The account pin is required to confirm your transactions.
                        </Text>
                    </VStack>
                    <VStack justifyContent="center" flex={1} width='100%' >

                        <Text textAlign="center" fontSize={14} color="red" marginBottom={5} >
                           {error && error}
                        </Text>
                        <HStack alignItems="center" justifyContent="center" space="md">
                            {[0, 1, 2, 3].map((_, index) => (
                                <Box
                                    key={index}
                                    width={16}
                                    height={16}
                                    borderRadius={16}
                                    backgroundColor={isPinPositionFilled(index) || isConfirmPinPositionFilled(index) ? "#2A2A2A" : "#B8B8B8"}
                                />
                            ))}
                        </HStack>
                    </VStack>
                </VStack>
                <VStack marginBottom={40}>
                    <PinKeypad onNumberPress={handleNumberPress} onClear={handleClear} />
                </VStack>
            </VStack>
        </VStack>
    );
};

export default PinSetupScreen;
