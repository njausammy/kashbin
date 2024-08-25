import React, { useState, useRef, useEffect } from 'react';
import { useForm } from "react-hook-form";
import { Box, Button, Card, HStack, Input, InputField, Text, VStack } from "@gluestack-ui/themed";
import { router } from 'expo-router';
import PageHeader from '../PageHeader';
import Loader from '../Loader';
import SuccessIcon from '../Icons/success-icon';
import FailIcon from '../Icons/fail-icon';

const ConfirmSignup = () => {
    const { handleSubmit, control, getValues, setValue } = useForm();
    const [code, setCode] = useState(['', '', '', '', '', '']);
    const [progress, setProgress] = useState(40);
    const [verificationState, setVerificationState] = useState<'processing' | 'success' | 'failed' | 'idle'>('idle');
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
            setProgress(100);
        } else {
            setProgress(50);
        }
    }, [isAllFilled]);

    const handleVerify = async () => {
        setProgress(60);
        setVerificationState('processing');
        const timeoutId = setTimeout(() => {
            setVerificationState('success'); // Simulate successful verification
        }, 4000); // Adjust delay as needed

        // Cleanup function to clear the timeout in case the component unmounts prematurely
        return () => clearTimeout(timeoutId);
    };

    useEffect(() => {
        if (verificationState === 'success') {
            const navigationTimeoutId = setTimeout(() => {
                router.push('/account/account-details');
            }, 3000); // Adjust delay as needed

            // Cleanup function to clear the timeout in case the component unmounts prematurely
            return () => clearTimeout(navigationTimeoutId);
        }
    }, [verificationState, router]);

    const isButtonDisabled = !isAllFilled || verificationState === "processing" || verificationState === "success"
    const isResendDisabled = verificationState === "processing" || verificationState === "success"


    return (
        <VStack backgroundColor="$white" flex={1}>
            <PageHeader value={progress} />
            <VStack flex={1} marginTop={24} paddingHorizontal={24} paddingBottom={50}>
                <Text color="#2A2A2A" lineHeight={28} fontSize={22} fontWeight={600}>
                    Confirm your phone number
                </Text>
                <Text lineHeight={19} color='#5A5A5A' fontSize={14} fontWeight={400} marginBottom={48}>
                    We sent a 6 digit code to +254 700 006 003
                </Text>

                <VStack flex={1} justifyContent="space-between">
                    <VStack>
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
                                            ref={el => (inputRefs.current[index] = el)}
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
                            <Text fontWeight={400} fontSize={16} color={isResendDisabled ? '#B8B8B8' : '#DB1E36'}> Resend</Text>
                        </Text>
                    </VStack>
                    {verificationState !== "idle" && <Card size="lg" variant="outline">
                        {verificationState === "processing" &&
                            <>
                                <Loader />
                                <Text textAlign="center" marginTop={30} fontSize={22} fontWeight={600} lineHeight={28} color='#2A2A2A'>Processing...</Text>
                            </>
                        }
                        {verificationState === "success" &&
                            <>
                                <Loader customComponent={<SuccessIcon />} />
                                <Text textAlign="center" marginTop={30} fontSize={22} fontWeight={600} lineHeight={28} color='#2A2A2A'>Verified!</Text>
                            </>
                        }
                        {verificationState === "failed" &&
                            <>
                                <Loader customComponent={<FailIcon />} />
                                <Text textAlign="center" marginTop={30} fontSize={22} fontWeight={600} lineHeight={28} color='#2A2A2A'>Failed!</Text>
                            </>
                        }
                    </Card>}
                    <Button
                        backgroundColor={isButtonDisabled ? "#B8B8B8" : "#DB1E36"}
                        disabled={isButtonDisabled}
                        borderRadius={50}
                        height={56}
                        width="$full"
                        alignSelf="center"
                        marginBottom={30}
                        onPress={handleVerify}
                    >
                        <Text
                            color={isButtonDisabled ? '#5A5A5A' : '#FFFFFF'}
                        >
                            Verify Your Number
                        </Text>
                    </Button>
                </VStack>
            </VStack>
        </VStack>
    );
};

export default ConfirmSignup;