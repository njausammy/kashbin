
import React, { useState, useEffect } from 'react';
import { ScrollView } from 'react-native';
import { VStack, HStack, Text, Box, Pressable, Input, InputField } from "@gluestack-ui/themed";
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { useForm, Controller } from "react-hook-form";
import Button from '@/src/components/form/AnimatedButton';
import { Colors } from '@/src/constants/Colors';
interface IFormValues {
    idNumber: string;
    fullName: string;
    address: string;
    city: string;
}

const KYCDetails = () => {
    const { control, watch, handleSubmit } = useForm({
        defaultValues: {
            idNumber: '',
            fullName: '',
            address: '',
            city: ''
        }
    });

    const [isFormValid, setIsFormValid] = useState(false);

    const idNumber = watch('idNumber');
    const fullName = watch('fullName');
    const address = watch('address');
    const city = watch('city');

    useEffect(() => {
        setIsFormValid(
            idNumber.trim().length > 0 &&
            fullName.trim().length > 0 &&
            address.trim().length > 0 &&
            city.trim().length > 0
        );
    }, [idNumber, fullName, address, city]);

    const handleContinue = (data: IFormValues) => {
        // TODO: Save details to user data
        router.push('/kyc/submitting');
    };

    return (
        <ScrollView style={{ flex: 1, backgroundColor: '#F5F5F5' }}>
            <VStack flex={1} paddingBottom={40}>
                {/* Header */}
                <Box backgroundColor={Colors.primary.DEFAULT} paddingTop={50} paddingBottom={24}>
                    <HStack
                        paddingHorizontal={16}
                        alignItems="center"
                        space="md"
                    >
                        <Pressable onPress={() => router.back()}>
                            <Ionicons name="arrow-back" size={24} color="white" />
                        </Pressable>
                        <VStack flex={1}>
                            <Text fontSize={20} fontWeight={700} color="$white">
                                Confirm Your Details
                            </Text>
                            <Text fontSize={14} color="rgba(255, 255, 255, 0.8)">
                                Step 3 of 3
                            </Text>
                        </VStack>
                    </HStack>
                </Box>

                {/* Content */}
                <VStack paddingHorizontal={24} marginTop={24} space="lg">
                    {/* Instructions */}
                    <Box
                        backgroundColor="rgba(30, 64, 175, 0.06)"
                        borderRadius={12}
                        padding={16}
                    >
                        <HStack space="sm" alignItems="flex-start">
                            <Ionicons name="information-circle" size={20} color={Colors.primary.DEFAULT} />
                            <VStack flex={1}>
                                <Text fontSize={14} color="#2A2A2A" fontWeight={500}>
                                    Almost done!
                                </Text>
                                <Text fontSize={13} color="#5A5A5A" marginTop={4}>
                                    Please ensure all details match your ID document exactly.
                                </Text>
                            </VStack>
                        </HStack>
                    </Box>

                    {/* Form Fields */}
                    <VStack space="lg">
                        {/* ID Number */}
                        <VStack space="xs">
                            <Text fontSize={16} color="#414141" fontWeight={500}>
                                ID Number
                            </Text>
                            <Controller
                                name="idNumber"
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
                                            placeholder="Enter your ID number"
                                            onChangeText={onChange}
                                            value={value}
                                            fontSize={16}
                                            keyboardType="numeric"
                                        />
                                    </Input>
                                )}
                            />
                            <Text fontSize={12} color="#5A5A5A">
                                Must match the ID number on your document
                            </Text>
                        </VStack>

                        {/* Full Name */}
                        <VStack space="xs">
                            <Text fontSize={16} color="#414141" fontWeight={500}>
                                Full Name (as on ID)
                            </Text>
                            <Controller
                                name="fullName"
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
                                            placeholder="Enter your full name"
                                            onChangeText={onChange}
                                            value={value}
                                            fontSize={16}
                                        />
                                    </Input>
                                )}
                            />
                            <Text fontSize={12} color="#5A5A5A">
                                First name, middle name, and last name
                            </Text>
                        </VStack>

                        {/* Address */}
                        <VStack space="xs">
                            <Text fontSize={16} color="#414141" fontWeight={500}>
                                Residential Address
                            </Text>
                            <Controller
                                name="address"
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
                                            placeholder="Street address, building, etc."
                                            onChangeText={onChange}
                                            value={value}
                                            fontSize={16}
                                        />
                                    </Input>
                                )}
                            />
                        </VStack>

                        {/* City */}
                        <VStack space="xs">
                            <Text fontSize={16} color="#414141" fontWeight={500}>
                                City
                            </Text>
                            <Controller
                                name="city"
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
                                            placeholder="Enter your city"
                                            onChangeText={onChange}
                                            value={value}
                                            fontSize={16}
                                        />
                                    </Input>
                                )}
                            />
                        </VStack>
                    </VStack>

                    {/* Declaration */}
                    <Box
                        backgroundColor="#F5F5F5"
                        borderRadius={12}
                        padding={16}
                        marginTop={8}
                    >
                        <VStack space="sm">
                            <HStack space="xs" alignItems="flex-start">
                                <Ionicons name="checkmark-circle" size={20} color={Colors.primary.DEFAULT} style={{ marginTop: 2 }} />
                                <Text fontSize={13} color="#5A5A5A" flex={1}>
                                    I declare that the information provided is accurate and matches my official ID document.
                                </Text>
                            </HStack>
                            <HStack space="xs" alignItems="flex-start">
                                <Ionicons name="checkmark-circle" size={20} color={Colors.primary.DEFAULT} style={{ marginTop: 2 }} />
                                <Text fontSize={13} color="#5A5A5A" flex={1}>
                                    I consent to Kash Chain verifying my identity for compliance purposes.
                                </Text>
                            </HStack>
                        </VStack>
                    </Box>

                    {/* Submit Button */}
                    <Button
                        backgroundColor={isFormValid ? "#1E40AF" : "#E5E7EB"}
                        borderRadius={50}
                        height={56}
                        width="$full"
                        marginTop={16}
                        disabled={!isFormValid}
                        onPress={handleSubmit(handleContinue)}
                    >
                        <Text color="$white" fontSize={16} fontWeight={600}>
                            Submit for Verification
                        </Text>
                    </Button>
                </VStack>
            </VStack>
        </ScrollView>
    );
};

export default KYCDetails;
