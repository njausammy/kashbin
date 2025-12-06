import React, { useState, useEffect } from 'react';
import { VStack, HStack, Text, Box, Pressable, Input, InputField } from '@gluestack-ui/themed';
import Button from '@/src/components/form/AnimatedButton';
import { router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { findMerchantByCode } from '@/src/data/mock-merchants';
import { Colors } from '@/src/constants/Colors';

const EnterCode = () => {
    const [code, setCode] = useState('');
    const [isValid, setIsValid] = useState(false);
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        // Clear error when user types
        if (error) setError('');

        // Validate 6-digit code
        const valid = /^[0-9]{6}$/.test(code);
        setIsValid(valid);
    }, [code]);

    const handleContinue = async () => {
        if (!isValid) {
            setError('Please enter a valid 6-digit merchant code');
            return;
        }

        setIsLoading(true);

        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 800));

        const merchant = findMerchantByCode(code);

        setIsLoading(false);

        if (merchant) {
            router.push({
                pathname: '/main/merchants/confirm-merchant',
                params: {
                    merchantId: merchant.id,
                    merchantName: merchant.name,
                    merchantCategory: merchant.category,
                    merchantLocation: merchant.location,
                    merchantCode: merchant.merchantCode,
                    isVerified: merchant.isVerified ? 'true' : 'false',
                }
            });
        } else {
            setError('Merchant not found. Please check the code and try again.');
        }
    };

    const handleCodeChange = (text: string) => {
        // Only allow numbers, max 6 digits
        const cleaned = text.replace(/\D/g, '').slice(0, 6);
        setCode(cleaned);
    };

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
                            Enter Merchant Code
                        </Text>
                    </HStack>
                    <Text fontSize={14} color="rgba(255, 255, 255, 0.9)">
                        Enter the 6-digit code from the merchant
                    </Text>
                </VStack>
            </Box>

            <VStack flex={1} paddingHorizontal={24} marginTop={32} justifyContent="space-between">
                <VStack>
                    {/* Info Card */}
                    <Box
                        backgroundColor="rgba(30, 64, 175, 0.08)"
                        borderRadius={12}
                        padding={16}
                        marginBottom={32}
                    >
                        <HStack space="sm" alignItems="flex-start">
                            <Ionicons name="information-circle" size={20} color={Colors.primary.DEFAULT} />
                            <Text fontSize={14} color={Colors.dark} flex={1}>
                                Ask the merchant for their 6-digit payment code. You can find it displayed at their checkout counter.
                            </Text>
                        </HStack>
                    </Box>

                    {/* Code Input */}
                    <VStack space="xs">
                        <Text fontSize={14} color={Colors.grey} marginBottom={8}>
                            Merchant Code
                        </Text>
                        <Input
                            borderColor={error ? Colors.error : isValid ? Colors.primary.DEFAULT : Colors.lightGrey}
                            borderWidth={2}
                            borderRadius={12}
                            height={80}
                            backgroundColor={error ? "#FEE2E2" : '$white'}
                        >
                            <InputField
                                placeholder="000000"
                                value={code}
                                onChangeText={handleCodeChange}
                                keyboardType="number-pad"
                                fontSize={32}
                                fontWeight="700"
                                textAlign="center"
                                color={Colors.dark}
                                maxLength={6}
                                letterSpacing={8}
                            />
                        </Input>
                        {error && (
                            <HStack space="xs" alignItems="center" marginTop={8}>
                                <Ionicons name="alert-circle" size={16} color={Colors.error} />
                                <Text fontSize={14} color={Colors.error}>
                                    {error}
                                </Text>
                            </HStack>
                        )}
                        <Text fontSize={13} color={Colors.grey} marginTop={4}>
                            Enter the 6-digit merchant payment code
                        </Text>
                    </VStack>

                    {/* Demo Codes */}
                    <Box
                        backgroundColor={Colors.background}
                        borderRadius={12}
                        padding={16}
                        borderWidth={1}
                        borderColor={Colors.lightGrey}
                        marginTop={24}
                    >
                        <Text fontSize={14} fontWeight="600" color={Colors.dark} marginBottom={12}>
                            Try these demo codes:
                        </Text>
                        <HStack space="sm" flexWrap="wrap">
                            {['100001', '100002', '100003', '100004', '100005'].map((demoCode) => (
                                <Pressable
                                    key={demoCode}
                                    onPress={() => setCode(demoCode)}
                                >
                                    <Box
                                        backgroundColor={"rgba(30, 64, 175, 0.08)"}
                                        borderRadius={8}
                                        paddingHorizontal={12}
                                        paddingVertical={8}
                                        marginBottom={8}
                                    >
                                        <Text fontSize={13} fontWeight="600" color={Colors.primary.DEFAULT}>
                                            {demoCode}
                                        </Text>
                                    </Box>
                                </Pressable>
                            ))}
                        </HStack>
                    </Box>
                </VStack>

                {/* Continue Button */}
                <Button
                    backgroundColor={isValid ? Colors.primary.DEFAULT : Colors.lightGrey}
                    borderRadius={50}
                    height={56}
                    width="$full"
                    marginBottom={24}
                    disabled={!isValid || isLoading}
                    onPress={handleContinue}
                >
                    <Text
                        color={isValid ? '$white' : Colors.grey}
                        fontSize={16}
                        fontWeight={600}
                    >
                        {isLoading ? 'Finding Merchant...' : 'Continue'}
                    </Text>
                </Button>
            </VStack>
        </VStack>
    );
};

export default EnterCode;
