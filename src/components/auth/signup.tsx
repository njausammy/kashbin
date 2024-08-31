import React, { useState, useEffect } from 'react';
import { useForm, Controller } from "react-hook-form"
import { useCreateEntity } from '@/src/api/queries';
import { Input, InputField, Text, VStack, Spinner, Box } from "@gluestack-ui/themed";
import PhoneNumberInput from '../form/PhoneInput';
import SignupModal from './Modal';
import PageHeader from '../PageHeader';
import { IUserRead, IUserWrite } from '@/src/types/users';
import Button from '@/src/components/form/AnimatedButton';

interface IFormValues {
    phone: string
    password: string
}

const Signup = () => {
    const { control, watch, handleSubmit } = useForm({
        defaultValues: {
            phone: '',
            password: ''
        }
    });


    const { handleCreateEntity, isLoading, data } = useCreateEntity<IUserRead, IUserWrite>({ entity: "users/signup", requiresToken: false })


    const [isFormValid, setIsFormValid] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [progress, setProgress] = useState(25)
    const [error, setError] = useState<string | null>(null);

    const toggleModal = () => {
        setShowModal((prev) => !prev)
    }


    const handleSignup = async (data: IFormValues) => {

        await handleCreateEntity({
            phone_number: data.phone,
            password: data.password
        }, {
            onSuccess() {
                setProgress(40);
                toggleModal();
            },
            onError(error: any) {
                setProgress(40);
                toggleModal();
                // if (error?.detail === 'The user with this phone number already exists in the system') {
                //     setError("Phone number exists");
                // }
                // else {
                //     setError("An unexpected error occurred.");
                // }
            }
        });


    };

    const phone = watch('phone');
    const password = watch('password');

    useEffect(() => {
        setIsFormValid(!!phone && !!password);
    }, [phone, password]);

    return (
        <>
            <SignupModal phoneNumber={data?.phone_number} isOpen={showModal} onClose={toggleModal} />
            <VStack paddingBottom={50} flex={1} >
                <PageHeader value={progress} />
                <VStack marginTop={24} paddingHorizontal={24} flex={1}>
                    <Text color="#2A2A2A" lineHeight={28} fontSize={22} fontWeight={600}>
                        Create an account
                    </Text>
                    <Text lineHeight={19} color='#5A5A5A' fontSize={14} fontWeight={400} marginBottom={48}>
                        Enter your mobile number to create your account
                    </Text>
                    <VStack flex={1} justifyContent="space-between">
                        <Box>
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
                            {error && (
                                <Text textAlign="center" color="red" marginTop={30}>
                                    {error}
                                </Text>
                            )}
                        </Box>

                        <Button
                            backgroundColor={isFormValid ? "#DB1E36" : "#B8B8B8"}
                            borderRadius={50}
                            height={56}
                            width="$full"
                            alignSelf="center"
                            disabled={!isFormValid}
                            onPress={handleSubmit(handleSignup)}
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
            </VStack>
        </>
    );
};

export default Signup;