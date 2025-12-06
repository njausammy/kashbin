import React, { useState, useEffect } from 'react';
import { useForm, Controller } from "react-hook-form"
import { Box, Input, InputField, Spinner, Text, VStack } from "@gluestack-ui/themed";
import { Keyboard, TouchableWithoutFeedback, View } from 'react-native';
import Button from '@/src/components/form/AnimatedButton';
import PhoneNumberInput from '../form/PhoneInput';
import { router } from 'expo-router';
import PageHeader from '../PageHeader';
import { authInstance } from '@/src/api/authentication';

interface IForm {
    phone: string
    password: string
}

const Login = () => {
    const { control, watch, handleSubmit } = useForm({
        defaultValues: {
            phone: '',
            password: ''
        }
    });
    const [isFormValid, setIsFormValid] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(false)


    const handleLogin = async (data: IForm) => {
        try {
            setIsLoading(true)
            const result = await authInstance.login({
                username: data.phone,
                password: data.password
            })
            if (result?.succes) {
                router.push('/main')
            }
            else {
                router.push('/maiin')
                // setError(result?.message)
            }
            setIsLoading(false)
        } catch (error) {
            router.push('/main')
        }
    }


    const phone = watch('phone');
    const password = watch('password');



    useEffect(() => {
        setIsFormValid(!!phone && !!password);
    }, [phone, password]);

    return (
        <>
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <VStack backgroundColor="$white" flex={1}>
                <Box paddingHorizontal={15}>
                    <PageHeader hideProgressBar value={0} />
                </Box>
                <VStack marginTop={24} paddingHorizontal={24}>
                    <Text color="#2A2A2A" lineHeight={28} fontSize={22} fontWeight={600}>
                        Log in
                    </Text>
                    <Text lineHeight={19} color='#5A5A5A' fontSize={14} fontWeight={400} marginBottom={48}>
                        Enter your registered mobile number to log in.
                    </Text>

                    <PhoneNumberInput
                        control={control}
                        onSubmitEditing={() => Keyboard.dismiss()}
                    />

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
                                        returnKeyType="done"
                                        onSubmitEditing={() => {
                                            Keyboard.dismiss();
                                        }}
                                    />
                                </Input>
                            )}
                        />
                    </VStack>
                    {error && (
                        <Text color="red" marginTop={50} textAlign="center" >
                            {error}
                        </Text>
                    )}
                    <Button
                        backgroundColor={isFormValid ? "#DC2626" : "#B8B8B8"}
                        borderRadius={50}
                        marginTop={300}
                        height={56}
                        width="$full"
                        alignSelf="center"
                        marginBottom={30}
                        disabled={!isFormValid}
                        onPress={handleSubmit(handleLogin)}
                    >
                        {isLoading ? (
                            <Spinner color='$white' />
                        ) : (
                            <Text
                                color={isFormValid ? '$white' : '#5A5A5A'}
                            >
                                Sign up
                            </Text>
                        )}
                    </Button>
                </VStack>
            </VStack>
            </TouchableWithoutFeedback>
        </>
    );
};

export default Login;