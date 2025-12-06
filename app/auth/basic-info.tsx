
import React, { useState, useEffect } from 'react';
import { useForm, Controller } from "react-hook-form";
import { Text, VStack, HStack, Spinner, Box, Pressable, Input, InputField } from "@gluestack-ui/themed";
import { Keyboard } from 'react-native';
import PageHeader from '@/src/components/PageHeader';
import Button from '@/src/components/form/AnimatedButton';
import { router, useLocalSearchParams } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import LocalStorage from '@/src/utils/LocalStorage';
import localDB from '@/src/utils/LocalDatabase';
import { Colors } from '@/src/constants/Colors';
interface IFormValues {
    firstName: string;
    lastName: string;
}

const BasicInfo = () => {
    const { phone } = useLocalSearchParams<{ phone: string }>();
    const [isLoading, setIsLoading] = useState(false);

    const { control, watch, handleSubmit } = useForm({
        defaultValues: {
            firstName: '',
            lastName: ''
        }
    });

    const firstName = watch('firstName');
    const lastName = watch('lastName');

    const isFormValid = firstName.trim().length > 0 && lastName.trim().length > 0;

    const handleCreateAccount = async (data: IFormValues) => {
        setIsLoading(true);

        try {
            // Create user in local database (no PIN for now)
            const newUser = await localDB.createUser({
                phoneNumber: phone as string,
                firstName: data.firstName.trim(),
                lastName: data.lastName.trim(),
            });

            // Set as current user (logs them in)
            await localDB.setCurrentUser(newUser);

            // Save onboarding status
            await LocalStorage.setItem('hasOnboarded', 'onboard');

            setIsLoading(false);

            // Navigate to KYC prompt (user can skip)
            router.replace('/kyc/prompt');
        } catch (error: any) {
            setIsLoading(false);
            console.error('Account creation error:', error);
            // TODO: Show error message to user
            alert(error.message || 'Failed to create account');
        }
    };

    return (
        <VStack backgroundColor="$white" paddingBottom={50} flex={1}>
            <Box paddingHorizontal={15}>
                <PageHeader hideProgressBar value={0} />
            </Box>

            <VStack marginTop={24} paddingHorizontal={24} flex={1}>
                {/* Header */}
                <VStack marginBottom={32}>
                    <Pressable onPress={() => router.back()} marginBottom={16}>
                        <Ionicons name="arrow-back" size={24} color="#2A2A2A" />
                    </Pressable>

                    <Text color="#2A2A2A" lineHeight={28} fontSize={24} fontWeight={700}>
                        What's your name?
                    </Text>
                    <Text lineHeight={20} color='#5A5A5A' fontSize={14} fontWeight={400} marginTop={8}>
                        Help us personalize your wallet experience
                    </Text>
                </VStack>

                {/* Form */}
                <VStack flex={1} justifyContent="space-between">
                    <VStack space="lg">
                        {/* First Name */}
                        <VStack space="xs">
                            <Text fontSize={16} color="#414141" fontWeight={500}>
                                First Name
                            </Text>
                            <Controller
                                name="firstName"
                                control={control}
                                render={({ field: { onChange, value } }) => (
                                    <Input
                                        borderColor={value ? "#1E40AF" : "#E5E7EB"}
                                        borderWidth={1}
                                        borderRadius={12}
                                        height={56}
                                        width="$full"
                                    >
                                        <InputField
                                            placeholder="Enter your first name"
                                            onChangeText={onChange}
                                            value={value}
                                            fontSize={16}
                                            returnKeyType="done"
                                            onSubmitEditing={() => Keyboard.dismiss()}
                                        />
                                    </Input>
                                )}
                            />
                        </VStack>

                        {/* Last Name */}
                        <VStack space="xs">
                            <Text fontSize={16} color="#414141" fontWeight={500}>
                                Last Name
                            </Text>
                            <Controller
                                name="lastName"
                                control={control}
                                render={({ field: { onChange, value } }) => (
                                    <Input
                                        borderColor={value ? "#1E40AF" : "#E5E7EB"}
                                        borderWidth={1}
                                        borderRadius={12}
                                        height={56}
                                        width="$full"
                                    >
                                        <InputField
                                            placeholder="Enter your last name"
                                            onChangeText={onChange}
                                            value={value}
                                            fontSize={16}
                                            returnKeyType="done"
                                            onSubmitEditing={() => Keyboard.dismiss()}
                                        />
                                    </Input>
                                )}
                            />
                        </VStack>

                        {/* Success Info */}
                        <Box
                            backgroundColor="rgba(30, 64, 175, 0.06)"
                            borderRadius={12}
                            padding={16}
                            marginTop={8}
                        >
                            <HStack space="sm" alignItems="flex-start">
                                <Ionicons name="checkmark-circle-outline" size={20} color={Colors.primary.DEFAULT} />
                                <VStack flex={1}>
                                    <Text fontSize={14} color="#2A2A2A" fontWeight={500}>
                                        Almost there!
                                    </Text>
                                    <Text fontSize={13} color="#5A5A5A" marginTop={4}>
                                        You're one step away from accessing your crypto wallet
                                    </Text>
                                </VStack>
                            </HStack>
                        </Box>
                    </VStack>

                    {/* Create Account Button */}
                    <Button
                        backgroundColor={isFormValid ? "#1E40AF" : "#E5E7EB"}
                        borderRadius={50}
                        height={56}
                        width="$full"
                        disabled={!isFormValid || isLoading}
                        onPress={handleSubmit(handleCreateAccount)}
                    >
                        {isLoading ? (
                            <Spinner color='$white' />
                        ) : (
                            <Text
                                color={isFormValid ? '$white' : '#5A5A5A'}
                                fontSize={16}
                                fontWeight={600}
                            >
                                Create Account
                            </Text>
                        )}
                    </Button>
                </VStack>
            </VStack>
        </VStack>
    );
};

export default BasicInfo;
