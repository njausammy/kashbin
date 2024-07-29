import React, { useState, useEffect } from 'react';
import { useForm, Controller } from "react-hook-form"
import { useCreateEntity } from '@/src/api/queries';
import { Button, Input, InputField, Text, VStack, Spinner } from "@gluestack-ui/themed";
import PhoneNumberInput from '../form/PhoneInput';
import SignupModal from './Modal';
import PageHeader from '../PageHeader';
import { IUserRead, IUserWrite } from '@/src/types/users';

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
    const [progress, setProgress] = useState(40)
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
                setProgress(60);
                toggleModal();
            },
            onError(error: any) {
                console.error("Signup Error:", error);
                if (error?.detail === 'The user with this phone number already exists in the system') {
                    setError("Phone number exists");
                }
                else {
                    setError("An unexpected error occurred.");
                }
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
            <VStack backgroundColor="$white" flex={1}>
                <PageHeader value={progress} />
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
                    {error && (
                        <Text color="red" marginTop={50}>
                            {error}
                        </Text>
                    )}
                    <Button
                        backgroundColor={isFormValid ? "#DB1E36" : "#B8B8B8"}
                        borderRadius={50}
                        marginTop={300}
                        height={56}
                        width="$full"
                        alignSelf="center"
                        marginBottom={30}
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
        </>
    );
};

export default Signup;