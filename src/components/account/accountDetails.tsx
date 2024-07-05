import React from 'react';
import { useForm, Controller } from "react-hook-form";
import { Box, Button, Input, InputField, Progress, ProgressFilledTrack, Text, VStack } from "@gluestack-ui/themed";
import { router } from 'expo-router';
import { Image, } from 'react-native';
import PageHeader from '../PageHeader';

const AccountView = () => {
    const { control, handleSubmit, watch } = useForm({
        defaultValues: {
            firstName: '',
            lastName: '',
            username: '',
            dateOfBirth: ''
        }
    });

    const onSubmit = (data: any) => {
        console.log(data);
        // Handle form submission
    };

    const firstName = watch('firstName');
    const lastName = watch('lastName');
    const username = watch('username');
    const dateOfBirth = watch('dateOfBirth');

    const isFormValid = firstName && lastName && username && dateOfBirth;


    const handleNext = async () => {
        router.push('/account/location');
    };


    return (
        <VStack backgroundColor="$white" flex={1}>
    
            <PageHeader value={50} />

            <VStack marginTop={24} paddingHorizontal={24}>
                <Text color="#2A2A2A" lineHeight={28} fontSize={22} fontWeight={600}>
                    Own your account
                </Text>
                <Text lineHeight={19} color='#5A5A5A' fontSize={14} fontWeight={400} marginBottom={48}>
                    This account is yours, make it personal.
                </Text>

                <VStack space="xs" marginTop={24}>
                    <Text fontSize={16} color="#414141">
                        First Name
                    </Text>
                    <Controller
                        name="firstName"
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
                                    onChangeText={onChange}
                                    value={value}
                                />
                            </Input>
                        )}
                    />
                </VStack>

                <VStack space="xs" marginTop={24}>
                    <Text fontSize={16} color="#414141">
                        Last Name
                    </Text>
                    <Controller
                        name="lastName"
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
                                    onChangeText={onChange}
                                    value={value}
                                />
                            </Input>
                        )}
                    />
                </VStack>

                <VStack space="xs" marginTop={24}>
                    <Text fontSize={16} color="#414141">
                        Add a username
                    </Text>
                    <Controller
                        name="username"
                        control={control}
                        render={({ field: { onChange, value } }) => (
                            <Input
                                borderColor="#B8B8B8"
                                borderWidth={1}
                                borderRadius={8}
                                height={48}
                                width="$full"
                                // leftElement={<Text>@</Text>}
                            >
                                <InputField
                                    onChangeText={onChange}
                                    value={value}
                                />
                            </Input>
                        )}
                    />
                </VStack>

                <VStack space="xs" marginTop={24}>
                    <Text fontSize={16} color="#414141">
                        Date of Birth
                    </Text>
                    <Controller
                        name="dateOfBirth"
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
                                    placeholder="DD/MM/YYYY"
                                    onChangeText={onChange}
                                    value={value}
                                />
                            </Input>
                        )}
                    />
                </VStack>

                <Button
                    backgroundColor={isFormValid ? "#DB1E36" : "#B8B8B8"}
                    borderRadius={50}
                    marginTop={30}
                    height={56}
                    width="$full"
                    alignSelf="center"
                    marginBottom={30}
                    disabled={!isFormValid}
                    onPress={handleNext}
                >
                    <Text
                        color={isFormValid ? '$white' : '#5A5A5A'}
                    >
                        Continue
                    </Text>
                </Button>
            </VStack>
        </VStack>
    );
};

export default AccountView;
