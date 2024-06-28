import React, { useState, useEffect } from 'react';
import { useForm, Controller } from "react-hook-form"
import { Box, Button, Input, InputField, Progress, ProgressFilledTrack, Text, VStack } from "@gluestack-ui/themed";
import PhoneNumberInput from '../form/PhoneInput';
import SignupModal from './Modal';
import { Image, } from 'react-native';

const Signup = () => {
    const { control, watch } = useForm({
        defaultValues: {
            phone: '',
            password: ''
        }
    });
    const [isFormValid, setIsFormValid] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [progress, setProgress] =useState(40)

    const toggleModal=()=>{
        setShowModal((prev)=>!prev)
    }

    const handleSignup =()=>{
        toggleModal()
        setProgress(60)
    }


    const phone = watch('phone');
    const password = watch('password');

    useEffect(() => {
        setIsFormValid(!!phone && !!password);
    }, [phone, password]);

    return (
        <>
        <SignupModal isOpen={showModal} onClose={toggleModal} />
            <VStack paddingTop={70} backgroundColor="$white" flex={1}>
            <Box width="$full" justifyContent="flex-start" alignItems="flex-start" padding={5}>
                <Image source={require('../../../assets/images/caret-back.png')} />
            </Box>
                <Box>

                    <Progress value={progress} width="$full" height={4} size="md" backgroundColor='#F7F7F7'>
                        <ProgressFilledTrack backgroundColor='#DB1E36' />
                    </Progress>
                </Box>
                <VStack marginTop={24} paddingHorizontal={24}>
                    <Text color="#2A2A2A" lineHeight={28} fontSize={22} fontWeight={600}>
                        Create an account
                    </Text>
                    <Text lineHeight={19} color='#5A5A5A' fontSize={14} fontWeight={400} marginBottom={48}>
                        Enter your mobile number to create your account
                    </Text>

                    <PhoneNumberInput control={control} />

                    <VStack space="xs" marginTop={24}>
                        <Text fontSize={16} color="#414141">
                            Password
                        </Text>
                        <Controller
                            name="password"
                            control={control}
                            render={({ field: { onChange, value } }) => (
                                <Input
                                    borderColor="#B8B8B8"
                                    borderWidth={1}
                                    borderRadius={8}
                                    height={48}
                                    width="$full"
                                >
                                    <InputField
                                        type="password"
                                        onChangeText={onChange}
                                        value={value}
                                        secureTextEntry
                                    />
                                </Input>
                            )}
                        />
                    </VStack>

                    <Button
                        backgroundColor={isFormValid ? "#DB1E36" : "#B8B8B8"}
                        borderRadius={50}
                        marginTop={300}
                        height={56}
                        width="$full"
                        alignSelf="center"
                        marginBottom={30}
                        disabled={!isFormValid}
                        onPress={handleSignup}
                    >
                        <Text
                            color={isFormValid ? '$white' : '#5A5A5A'}
                        >
                            Sign up
                        </Text>
                    </Button>
                </VStack>
            </VStack>
        </>
    );
};

export default Signup;