import React, { useState, useRef, useEffect } from 'react';
import { useForm } from "react-hook-form"
import { Box, Button, HStack, Input, InputField, Progress, ProgressFilledTrack, Text, VStack } from "@gluestack-ui/themed";
import { router } from 'expo-router';
import { Image, } from 'react-native';
import PageHeader from '../PageHeader';

const ConfirmSignup = () => {
    const { handleSubmit, control, getValues, setValue } = useForm()
    const [code, setCode] = useState(['', '', '', '', '', '']);
    const [progress, setProgress] = useState(80)
    const inputRefs = useRef([]);

    const handleCodeChange = (index: number, value: string) => {
        const newCode = [...code];
        newCode[index] = value;
        setCode(newCode);

        // Move focus to next input
        if (value !== '' && index < 5) {
            inputRefs.current[index + 1].focus();
        }
    };

    const isAllFilled = code.every(digit => digit !== '');

    useEffect(() => {
        if (isAllFilled) {
            setProgress(100)
        }
        else {
            setProgress(80)

        }
    }, [isAllFilled])


    const handleVerify = async () => {
        router.push('/account/account-details');
    };


    return (
        <VStack  backgroundColor="$white" flex={1}>
            <PageHeader value={progress} />
            <VStack marginTop={24} paddingHorizontal={24}>
                <Text color="#2A2A2A" lineHeight={28} fontSize={22} fontWeight={600}>
                    Confirm your phone number
                </Text>
                <Text lineHeight={19} color='#5A5A5A' fontSize={14} fontWeight={400} marginBottom={48}>
                    We sent a 6 digit code to +254 700 006 003
                </Text>

                <Box>
                    <HStack alignSelf='center' space="sm" alignItems="flex-start">
                        {code.map((digit, index) => (
                            <Input
                                key={index}
                                width={40}
                                height={40}
                                borderColor={digit?.length ? "#DB1E36" : "#B8B8B8"}
                                borderWidth={0}
                                borderBottomWidth={1}

                            >
                                <InputField
                                    ref={el => inputRefs.current[index] = el}
                                    textAlign="center"
                                    fontSize="$xl"
                                    keyboardType="number-pad"
                                    maxLength={1}
                                    value={digit}
                                    onChangeText={(value) => handleCodeChange(index, value)}
                                />
                            </Input>
                        ))}
                    </HStack>
                </Box>
                <Text marginTop={32} alignSelf='center'>
                    <Text fontWeight={400} fontSize={16} color='#5A5A5A'> Didn’t get a code? </Text>
                    <Text fontWeight={400} fontSize={16} color='#DB1E36'> Resend</Text>
                </Text>

                <Button
                    backgroundColor={isAllFilled ? "#DB1E36" : "#B8B8B8"}
                    borderRadius={50}
                    marginTop={400}
                    height={56}
                    width="$full"
                    alignSelf="center"
                    marginBottom={30}
                    onPress={handleVerify}
                >
                    <Text
                        color={isAllFilled ? '#FFFFFF' : '#5A5A5A'}
                    >
                        Verify Your Number
                    </Text>
                </Button>
            </VStack>
        </VStack>
    );
};

export default ConfirmSignup;