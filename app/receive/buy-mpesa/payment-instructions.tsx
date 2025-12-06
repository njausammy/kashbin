import React, { useState } from 'react';
import { ScrollView } from 'react-native';
import { VStack, HStack, Text, Box, Pressable, Checkbox, CheckboxIndicator, CheckboxIcon, CheckIcon } from '@gluestack-ui/themed';
import Button from '@/src/components/form/AnimatedButton';
import { router, useLocalSearchParams } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { getProviderById } from '@/src/data/mock-liquidity-providers';
import { Colors } from '@/src/constants/Colors';

const PaymentInstructions = () => {
    const params = useLocalSearchParams<{
        kesAmount: string;
        usdtAmount: string;
        rate: string;
        fee: string;
        providerId: string;
    }>();

    const [confirmSent, setConfirmSent] = useState(false);

    const provider = getProviderById(params.providerId);

    if (!provider) {
        return (
            <VStack backgroundColor="$white" flex={1} padding={24}>
                <Text>Provider not found</Text>
            </VStack>
        );
    }

    const handleContinue = () => {
        router.push({
            pathname: '/receive/buy-mpesa/waiting',
            params: {
                ...params,
                providerName: provider.name,
                providerNumber: provider.mpesaNumber,
            }
        });
    };

    const instructions = [
        {
            number: 1,
            title: 'Open M-Pesa',
            description: 'Go to the M-Pesa menu on your phone'
        },
        {
            number: 2,
            title: 'Select "Send Money"',
            description: 'Choose the option to send money to a phone number'
        },
        {
            number: 3,
            title: 'Enter Phone Number',
            description: `Enter: ${provider.mpesaNumber}`
        },
        {
            number: 4,
            title: 'Enter Amount',
            description: `Send exactly: KES ${parseFloat(params.kesAmount).toLocaleString('en-KE', { minimumFractionDigits: 2 })}`
        },
        {
            number: 5,
            title: 'Enter PIN & Confirm',
            description: 'Complete the M-Pesa transaction'
        },
        {
            number: 6,
            title: 'Return Here',
            description: 'Come back and confirm you\'ve sent the payment'
        }
    ];

    return (
        <VStack backgroundColor="$white" flex={1}>
            {/* Header */}
            <Box backgroundColor={Colors.primary.DEFAULT} paddingTop={50} paddingBottom={24}>
                <VStack paddingHorizontal={20}>
                    <HStack alignItems="center" marginBottom={16}>
                        <Pressable onPress={() => router.back()} marginRight={16}>
                            <Ionicons name="arrow-back" size={24} color="white" />
                        </Pressable>
                        <Text fontSize={24} fontWeight="700" color="white">
                            Payment Instructions
                        </Text>
                    </HStack>
                    <Text fontSize={14} color="rgba(255, 255, 255, 0.9)">
                        Send M-Pesa to the provider below
                    </Text>
                </VStack>
            </Box>

            <ScrollView>
                <VStack paddingHorizontal={24} paddingTop={24} paddingBottom={140}>
                    {/* Provider Card */}
                    <Box
                        backgroundColor="rgba(30, 64, 175, 0.08)"
                        borderRadius={16}
                        padding={20}
                        borderWidth={2}
                        borderColor={Colors.primary.DEFAULT}
                        marginBottom={24}
                    >
                        <HStack space="md" alignItems="center" marginBottom={16}>
                            <Box
                                width={56}
                                height={56}
                                borderRadius={28}
                                backgroundColor={Colors.primary.DEFAULT}
                                alignItems="center"
                                justifyContent="center"
                            >
                                <Ionicons name="wallet" size={28} color="white" />
                            </Box>
                            <VStack flex={1}>
                                <HStack space="xs" alignItems="center" marginBottom={4}>
                                    <Text fontSize={18} fontWeight="600" color="#1C1C1E">
                                        {provider.name}
                                    </Text>
                                    {provider.isVerified && (
                                        <Ionicons name="checkmark-circle" size={18} color={Colors.primary.DEFAULT} />
                                    )}
                                </HStack>
                                <Text fontSize={14} color="#8E8E93">
                                    {provider.mpesaName}
                                </Text>
                            </VStack>
                        </HStack>

                        {/* M-Pesa Number - Large */}
                        <Box
                            backgroundColor="white"
                            borderRadius={12}
                            padding={16}
                            marginBottom={12}
                        >
                            <Text fontSize={12} color="#8E8E93" marginBottom={4}>
                                M-Pesa Number
                            </Text>
                            <Text fontSize={28} fontWeight="700" color={Colors.primary.DEFAULT}>
                                {provider.mpesaNumber}
                            </Text>
                        </Box>

                        {/* Amount to Send */}
                        <Box
                            backgroundColor="white"
                            borderRadius={12}
                            padding={16}
                        >
                            <Text fontSize={12} color="#8E8E93" marginBottom={4}>
                                Amount to Send
                            </Text>
                            <Text fontSize={28} fontWeight="700" color="#1C1C1E">
                                KES {parseFloat(params.kesAmount).toLocaleString('en-KE', { minimumFractionDigits: 2 })}
                            </Text>
                        </Box>
                    </Box>

                    {/* Instructions */}
                    <Text fontSize={18} fontWeight="600" color="#1C1C1E" marginBottom={16}>
                        How to Send Payment
                    </Text>

                    <VStack space="md" marginBottom={24}>
                        {instructions.map((instruction) => (
                            <Box
                                key={instruction.number}
                                backgroundColor="white"
                                borderRadius={12}
                                padding={16}
                                borderWidth={1}
                                borderColor="#E5E7EB"
                            >
                                <HStack space="md" alignItems="flex-start">
                                    <Box
                                        width={32}
                                        height={32}
                                        borderRadius={16}
                                        backgroundColor={Colors.primary.DEFAULT}
                                        alignItems="center"
                                        justifyContent="center"
                                    >
                                        <Text fontSize={16} fontWeight="700" color="white">
                                            {instruction.number}
                                        </Text>
                                    </Box>
                                    <VStack flex={1}>
                                        <Text fontSize={15} fontWeight="600" color="#1C1C1E" marginBottom={4}>
                                            {instruction.title}
                                        </Text>
                                        <Text fontSize={14} color="#8E8E93">
                                            {instruction.description}
                                        </Text>
                                    </VStack>
                                </HStack>
                            </Box>
                        ))}
                    </VStack>

                    {/* Warning Box */}
                    <Box
                        backgroundColor="#FEF3C7"
                        borderRadius={12}
                        padding={16}
                        borderWidth={1}
                        borderColor="#F59E0B"
                        marginBottom={24}
                    >
                        <HStack space="sm" alignItems="flex-start">
                            <Ionicons name="warning" size={20} color="#F59E0B" />
                            <VStack flex={1}>
                                <Text fontSize={14} fontWeight="600" color="#92400E" marginBottom={4}>
                                    Important Notes
                                </Text>
                                <Text fontSize={13} color="#92400E">
                                    • Send the exact amount shown above{'\n'}
                                    • Double-check the phone number{'\n'}
                                    • Processing time: {provider.processingTime}{'\n'}
                                    • Keep your M-Pesa confirmation message
                                </Text>
                            </VStack>
                        </HStack>
                    </Box>

                    {/* Confirmation Checkbox */}
                    <Pressable onPress={() => setConfirmSent(!confirmSent)}>
                        <Box
                            backgroundColor={confirmSent ? 'Colors.primary.DEFAULT15' : '#F9FAFB'}
                            borderRadius={12}
                            padding={16}
                            borderWidth={2}
                            borderColor={confirmSent ? 'Colors.primary.DEFAULT' : '#E5E7EB'}
                        >
                            <HStack space="md" alignItems="center">
                                <Checkbox
                                    value="sent"
                                    isChecked={confirmSent}
                                    onChange={() => setConfirmSent(!confirmSent)}
                                    size="md"
                                >
                                    <CheckboxIndicator
                                        borderColor={confirmSent ? 'Colors.primary.DEFAULT' : '#B8B8B8'}
                                        backgroundColor={confirmSent ? 'Colors.primary.DEFAULT' : 'transparent'}
                                    >
                                        <CheckboxIcon as={CheckIcon} color="white" />
                                    </CheckboxIndicator>
                                </Checkbox>
                                <Text fontSize={15} fontWeight="500" color="#1C1C1E" flex={1}>
                                    I have sent the M-Pesa payment
                                </Text>
                            </HStack>
                        </Box>
                    </Pressable>
                </VStack>
            </ScrollView>

            {/* Fixed Bottom Button */}
            <Box
                position="absolute"
                bottom={0}
                left={0}
                right={0}
                backgroundColor="white"
                paddingHorizontal={24}
                paddingVertical={16}
                borderTopWidth={1}
                borderTopColor="#E5E7EB"
                style={{
                    shadowColor: '#000',
                    shadowOffset: { width: 0, height: -2 },
                    shadowOpacity: 0.1,
                    shadowRadius: 4,
                    elevation: 4,
                }}
            >
                <Button
                    backgroundColor={confirmSent ? "Colors.primary.DEFAULT" : "#B8B8B8"}
                    borderRadius={50}
                    height={56}
                    width="$full"
                    disabled={!confirmSent}
                    onPress={handleContinue}
                >
                    <Text
                        color={confirmSent ? '$white' : '#5A5A5A'}
                        fontSize={16}
                        fontWeight={600}
                    >
                        Continue
                    </Text>
                </Button>
            </Box>
        </VStack>
    );
};

export default PaymentInstructions;
