import React, { useState, useEffect } from 'react';
import { useForm, Controller } from "react-hook-form"
import { Box, Button, Input, InputField,  Text, VStack } from "@gluestack-ui/themed";
import PhoneNumberInput from '../form/PhoneInput';
import { router } from 'expo-router';
import PageHeader from '../PageHeader';

const Login = () => {
    const { control, watch } = useForm({
        defaultValues: {
            phone: '',
            password: ''
        }
    });
    const [isFormValid, setIsFormValid] = useState(false);
    const [progress, setProgress] = useState(40)


    const handleLogin = () => {
        router.push('/onboarding/welcome')
        setProgress(60)
    }


    const phone = watch('phone');
    const password = watch('password');

    useEffect(() => {
        setIsFormValid(!!phone && !!password);
    }, [phone, password]);

    return (
        <>
            <VStack backgroundColor="$white" flex={1}>
                <Box paddingHorizontal={15}>
                    <PageHeader hideProgressBar value={progress} />
                </Box>
                <VStack marginTop={24} paddingHorizontal={24}>
                    <Text color="#2A2A2A" lineHeight={28} fontSize={22} fontWeight={600}>
                        Log in
                    </Text>
                    <Text lineHeight={19} color='#5A5A5A' fontSize={14} fontWeight={400} marginBottom={48}>
                        Enter your registered mobile number to log in.
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
                        onPress={handleLogin}
                    >
                        <Text
                            color={isFormValid ? '$white' : '#5A5A5A'}
                        >
                            Log in
                        </Text>
                    </Button>
                </VStack>
            </VStack>
        </>
    );
};

export default Login;