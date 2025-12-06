import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { VStack, HStack, Text, Box, Pressable, Spinner } from '@gluestack-ui/themed';
import PhoneNumberInput from '@/src/components/form/PhoneInput';
import Button from '@/src/components/form/AnimatedButton';
import { router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { findUserByPhone } from '@/src/data/mock-users';
import { Colors } from '@/src/constants/Colors';

interface IFormValues {
    phone: string;
}

const P2PPhoneInput = () => {
    const { control, watch } = useForm({
        defaultValues: {
            phone: ''
        }
    });

    const [isFormValid, setIsFormValid] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');

    const phone = watch('phone');

    useEffect(() => {
        const isValid = phone && phone.trim().length >= 9;
        setIsFormValid(isValid);
        setError('');
    }, [phone]);

    const handleContinue = async () => {
        setIsLoading(true);
        setError('');

        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 800));

        // Look up user
        const recipient = findUserByPhone(phone);

        setIsLoading(false);

        if (recipient) {
            // Navigate to confirm recipient screen
            router.push({
                pathname: '/send/p2p/confirm-recipient',
                params: {
                    recipientId: recipient.id,
                    recipientPhone: recipient.phoneNumber,
                    recipientName: `${recipient.firstName} ${recipient.lastName}`,
                    isVerified: recipient.isVerified ? 'true' : 'false',
                }
            });
        } else {
            setError(`No Kash Chain user found with phone number ${phone}. Ask them to sign up first!`);
        }
    };

    return (
        <VStack backgroundColor="$white" paddingBottom={50} flex={1}>
            {/* Header */}
            <Box backgroundColor={Colors.primary.DEFAULT} paddingTop={50} paddingBottom={24}>
                <VStack paddingHorizontal={20}>
                    <HStack alignItems="center" marginBottom={16}>
                        <Pressable onPress={() => router.back()} marginRight={16}>
                            <Ionicons name="arrow-back" size={24} color="white" />
                        </Pressable>
                        <Text fontSize={24} fontWeight="700" color="white">
                            Send to User
                        </Text>
                    </HStack>
                    <Text fontSize={14} color="rgba(255, 255, 255, 0.8)">
                        Enter recipient's phone number
                    </Text>
                </VStack>
            </Box>

            <VStack marginTop={24} paddingHorizontal={24} flex={1}>
                {/* Info Box */}
                <Box
                    backgroundColor="#1E40AF10"
                    borderRadius={12}
                    padding={16}
                    marginBottom={24}
                >
                    <HStack space="sm" alignItems="flex-start">
                        <Ionicons name="information-circle" size={20} color={Colors.primary.DEFAULT} />
                        <VStack flex={1}>
                            <Text fontSize={14} color={Colors.dark} fontWeight="500">
                                Instant Transfer
                            </Text>
                            <Text fontSize={13} color={Colors.grey} marginTop={4}>
                                Send USDT instantly to any Kash Chain user. No fees!
                            </Text>
                        </VStack>
                    </HStack>
                </Box>

                {/* Form */}
                <VStack flex={1} justifyContent="space-between">
                    <Box>
                        <PhoneNumberInput control={control} />

                        {/* Error Message */}
                        {error && (
                            <Box
                                backgroundColor="#DC262610"
                                borderRadius={12}
                                padding={16}
                                marginTop={16}
                            >
                                <HStack space="sm" alignItems="flex-start">
                                    <Ionicons name="alert-circle-outline" size={20} color={Colors.error} />
                                    <Text fontSize={14} color={Colors.error} fontWeight={500} flex={1}>
                                        {error}
                                    </Text>
                                </HStack>
                            </Box>
                        )}

                        {/* Quick Access (Optional) */}
                        <VStack marginTop={24}>
                            <Text fontSize={14} color={Colors.grey} marginBottom={12}>
                                Or scan QR code
                            </Text>
                            <Pressable onPress={() => router.push('/send/p2p/scan-qr')}>
                                <Box
                                    backgroundColor={Colors.background}
                                    borderRadius={12}
                                    padding={16}
                                    borderWidth={1}
                                    borderColor={Colors.lightGrey}
                                >
                                    <HStack space="md" alignItems="center">
                                        <Box
                                            width={48}
                                            height={48}
                                            borderRadius={24}
                                            backgroundColor="#1E40AF15"
                                            alignItems="center"
                                            justifyContent="center"
                                        >
                                            <Ionicons name="qr-code" size={24} color={Colors.primary.DEFAULT} />
                                        </Box>
                                        <VStack flex={1}>
                                            <Text fontSize={15} fontWeight="600" color={Colors.dark}>
                                                Scan QR Code
                                            </Text>
                                            <Text fontSize={13} color={Colors.grey}>
                                                Scan recipient's QR code
                                            </Text>
                                        </VStack>
                                        <Ionicons name="chevron-forward" size={20} color={Colors.grey} />
                                    </HStack>
                                </Box>
                            </Pressable>
                        </VStack>
                    </Box>

                    {/* Continue Button */}
                    <Button
                        backgroundColor={isFormValid ? "#1E40AF" : "#B8B8B8"}
                        borderRadius={50}
                        height={56}
                        width="$full"
                        disabled={!isFormValid || isLoading}
                        onPress={handleContinue}
                    >
                        {isLoading ? (
                            <Spinner color='$white' />
                        ) : (
                            <Text
                                color={isFormValid ? '$white' : '#5A5A5A'}
                                fontSize={16}
                                fontWeight={600}
                            >
                                Continue
                            </Text>
                        )}
                    </Button>
                </VStack>
            </VStack>
        </VStack>
    );
};

export default P2PPhoneInput;
