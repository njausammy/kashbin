
import React, { useState, useEffect, useRef } from 'react';
import { Text, VStack, HStack, Spinner, Box, Pressable, Input, InputField } from "@gluestack-ui/themed";
import { TextInput, Keyboard } from 'react-native';
import PageHeader from '@/src/components/PageHeader';
import Button from '@/src/components/form/AnimatedButton';
import { router, useLocalSearchParams } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '@/src/constants/Colors';
// TEMPORARY: Hardcoded OTP for testing (no API yet)
const TEMP_VALID_OTP = '123456';

const VerifyOTP = () => {
    const { phone } = useLocalSearchParams<{ phone: string }>();
    const [otp, setOtp] = useState(['', '', '', '', '', '']);
    const [isLoading, setIsLoading] = useState(false);
    const [canResend, setCanResend] = useState(false);
    const [countdown, setCountdown] = useState(60);
    const [error, setError] = useState('');

    // Create refs for all 6 OTP inputs
    const inputRefs = useRef<Array<TextInput | null>>([null, null, null, null, null, null]);

    useEffect(() => {
        if (countdown > 0) {
            const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
            return () => clearTimeout(timer);
        } else {
            setCanResend(true);
        }
    }, [countdown]);

    // Auto-focus first input on mount
    useEffect(() => {
        setTimeout(() => {
            inputRefs.current[0]?.focus();
        }, 100);
    }, []);

    const handleOtpChange = (value: string, index: number) => {
        // Clear error when user types
        if (error) setError('');

        // Handle pasted content
        if (value.length > 1) {
            // If user pastes multiple digits, fill all boxes
            const digits = value.slice(0, 6).split('');
            const newOtp = [...otp];
            digits.forEach((digit, i) => {
                if (index + i < 6) {
                    newOtp[index + i] = digit;
                }
            });
            setOtp(newOtp);

            // Focus the last filled input or the next empty one
            const nextIndex = Math.min(index + digits.length, 5);
            setTimeout(() => {
                inputRefs.current[nextIndex]?.focus();
            }, 0);
            return;
        }

        // Handle single digit input
        const newOtp = [...otp];
        newOtp[index] = value;
        setOtp(newOtp);

        // Auto-focus next input immediately
        if (value && index < 5) {
            setTimeout(() => {
                inputRefs.current[index + 1]?.focus();
            }, 0);
        }
    };

    const handleKeyPress = (key: string, index: number) => {
        // If backspace and current input is empty, focus previous input
        if (key === 'Backspace' && !otp[index] && index > 0) {
            setTimeout(() => {
                inputRefs.current[index - 1]?.focus();
            }, 0);
        }
    };

    const isFormValid = otp.every(digit => digit.length === 1);

    const handleVerify = async () => {
        setIsLoading(true);
        setError('');

        // TEMPORARY: Check against hardcoded OTP (no API yet)
        const enteredOtp = otp.join('');

        setTimeout(() => {
            if (enteredOtp === TEMP_VALID_OTP) {
                // OTP is correct - skip PIN, go to basic info
                setIsLoading(false);
                router.push({
                    pathname: '/auth/basic-info',
                    params: { phone }
                });
            } else {
                // OTP is incorrect - show error
                setIsLoading(false);
                setError(`Invalid code. Use ${TEMP_VALID_OTP} for testing.`);
                setOtp(['', '', '', '', '', '']); // Clear OTP
            }
        }, 1000);
    };

    const handleResend = async () => {
        setCountdown(60);
        setCanResend(false);
        setError('');
        // TEMPORARY: Show info message (no real SMS sent)
        // TODO: Resend OTP via API when available
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
                        Enter verification code
                    </Text>
                    <Text lineHeight={20} color='#5A5A5A' fontSize={14} fontWeight={400} marginTop={8}>
                        We sent a 6-digit code to {phone}
                    </Text>
                </VStack>

                {/* TEMP: Info box for testing */}
                <Box
                    backgroundColor="#3B82F610"
                    borderRadius={12}
                    padding={16}
                    marginBottom={24}
                >
                    <HStack space="sm" alignItems="flex-start">
                        <Ionicons name="information-circle" size={20} color={Colors.info} />
                        <VStack flex={1}>
                            <Text fontSize={14} color="#2A2A2A" fontWeight={600}>
                                Testing Mode
                            </Text>
                            <Text fontSize={13} color="#5A5A5A" marginTop={4}>
                                Use code: <Text fontWeight={700} color={Colors.info}>{TEMP_VALID_OTP}</Text> (no real SMS sent)
                            </Text>
                        </VStack>
                    </HStack>
                </Box>

                {/* OTP Input */}
                <HStack space="md" justifyContent="center" marginBottom={16}>
                    {otp.map((digit, index) => (
                        <Box key={index} flex={1} maxWidth={50}>
                            <Input
                                borderColor={error ? "#DC2626" : digit ? "#1E40AF" : "#E5E7EB"}
                                borderWidth={2}
                                borderRadius={12}
                                height={60}
                                backgroundColor="$white"
                            >
                                <InputField
                                    ref={(ref) => {
                                        inputRefs.current[index] = ref as TextInput | null;
                                    }}
                                    value={digit}
                                    onChangeText={(value) => handleOtpChange(value, index)}
                                    onKeyPress={({ nativeEvent }) => handleKeyPress(nativeEvent.key, index)}
                                    keyboardType="numeric"
                                    maxLength={1}
                                    textAlign="center"
                                    fontSize={24}
                                    fontWeight={600}
                                    autoFocus={index === 0}
                                    returnKeyType="done"
                                    onSubmitEditing={() => Keyboard.dismiss()}
                                />
                            </Input>
                        </Box>
                    ))}
                </HStack>

                {/* Error Message */}
                {error && (
                    <Box
                        backgroundColor="rgba(220, 38, 38, 0.06)"
                        borderRadius={12}
                        padding={12}
                        marginBottom={16}
                    >
                        <HStack space="sm" alignItems="center">
                            <Ionicons name="alert-circle-outline" size={20} color={Colors.error} />
                            <Text fontSize={14} color={Colors.error} fontWeight={500} flex={1}>
                                {error}
                            </Text>
                        </HStack>
                    </Box>
                )}

                {/* Resend Link */}
                <Box alignSelf="center" marginBottom={32}>
                    {canResend ? (
                        <Pressable onPress={handleResend}>
                            <Text fontSize={14} color={Colors.primary.DEFAULT} fontWeight={600}>
                                Resend Code
                            </Text>
                        </Pressable>
                    ) : (
                        <Text fontSize={14} color="#5A5A5A">
                            Resend code in {countdown}s
                        </Text>
                    )}
                </Box>

                {/* Verify Button */}
                <Button
                    backgroundColor={isFormValid ? "#1E40AF" : "#E5E7EB"}
                    borderRadius={50}
                    height={56}
                    width="$full"
                    disabled={!isFormValid || isLoading}
                    onPress={handleVerify}
                >
                    {isLoading ? (
                        <Spinner color='$white' />
                    ) : (
                        <Text
                            color={isFormValid ? '$white' : '#5A5A5A'}
                            fontSize={16}
                            fontWeight={600}
                        >
                            Verify
                        </Text>
                    )}
                </Button>
            </VStack>
        </VStack>
    );
};

export default VerifyOTP;
