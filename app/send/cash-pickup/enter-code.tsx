import React, { useState } from 'react';
import { VStack, HStack, Text, Box, Pressable, Input, InputField } from '@gluestack-ui/themed';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import Button from '@/src/components/form/AnimatedButton';
import { getAgentByCode } from '@/src/data/mock-agents';
import { Colors } from '@/src/constants/Colors';

const EnterCode = () => {
    const [code, setCode] = useState('');
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const handleCodeChange = (text: string) => {
        // Convert to uppercase and limit to 6 characters
        const upperText = text.toUpperCase().replace(/[^A-Z0-9]/g, '').slice(0, 6);
        setCode(upperText);
        setError('');
    };

    const handleContinue = () => {
        if (code.length < 3) {
            setError('Please enter a valid agent code');
            return;
        }

        setIsLoading(true);

        // Simulate API lookup
        setTimeout(() => {
            const agent = getAgentByCode(code);

            if (agent) {
                router.push({
                    pathname: '/send/cash-pickup/confirm-agent',
                    params: {
                        agentId: agent.id,
                        agentCode: agent.code,
                        agentName: agent.name,
                        agentLocation: agent.location.city,
                        agentDistance: agent.distance,
                        agentFee: (agent.fees.cashOut * 100).toFixed(1),
                        agentRating: agent.rating.toString(),
                        agentHours: agent.operatingHours,
                        isOpen: agent.isOpen.toString()
                    }
                });
            } else {
                setError('Agent not found. Please check the code and try again.');
                setIsLoading(false);
            }
        }, 800);
    };

    return (
        <VStack backgroundColor="$white" flex={1}>
            {/* Header */}
            <Box backgroundColor={Colors.secondary.DEFAULT} paddingTop={50} paddingBottom={24}>
                <VStack paddingHorizontal={20}>
                    <HStack alignItems="center" marginBottom={16}>
                        <Pressable onPress={() => router.back()} marginRight={16}>
                            <Ionicons name="arrow-back" size={24} color="white" />
                        </Pressable>
                        <Text fontSize={24} fontWeight="700" color="white">
                            Enter Agent Code
                        </Text>
                    </HStack>
                    <Text fontSize={14} color="rgba(255, 255, 255, 0.9)">
                        Ask agent for their code
                    </Text>
                </VStack>
            </Box>

            {/* Content */}
            <VStack flex={1} paddingHorizontal={24} paddingTop={40} justifyContent="space-between">
                <VStack>
                    {/* Code Input */}
                    <VStack space="sm" marginBottom={32}>
                        <Text fontSize={16} fontWeight="600" color={Colors.dark}>
                            Agent Code
                        </Text>
                        <Input
                            borderColor={error ? '#DC2626' : '#E5E7EB'}
                            borderWidth={2}
                            borderRadius={12}
                            height={64}
                            backgroundColor={error ? '#FEE2E2' : '$white'}
                        >
                            <InputField
                                placeholder="e.g., JOHN3"
                                value={code}
                                onChangeText={handleCodeChange}
                                fontSize={24}
                                fontWeight="700"
                                textAlign="center"
                                autoCapitalize="characters"
                                letterSpacing={4}
                            />
                        </Input>
                        {error && (
                            <HStack space="xs" alignItems="center">
                                <Ionicons name="alert-circle" size={16} color={Colors.error} />
                                <Text fontSize={14} color={Colors.error}>
                                    {error}
                                </Text>
                            </HStack>
                        )}
                        <Text fontSize={13} color={Colors.grey} marginTop={4}>
                            Enter the 3-6 character code displayed at the agent location
                        </Text>
                    </VStack>

                    {/* Example Codes (for demo) */}
                    <Box
                        backgroundColor={Colors.background}
                        borderRadius={12}
                        padding={16}
                        borderWidth={1}
                        borderColor={Colors.lightGrey}
                    >
                        <Text fontSize={14} fontWeight="600" color={Colors.dark} marginBottom={12}>
                            Try these demo codes:
                        </Text>
                        <HStack space="sm" flexWrap="wrap">
                            {['JOHN3', 'QUICK', 'SAFARI', 'MPESA7', 'FOREX1'].map((demoCode) => (
                                <Pressable
                                    key={demoCode}
                                    onPress={() => setCode(demoCode)}
                                >
                                    <Box
                                        backgroundColor="rgba(245, 158, 11, 0.08)"
                                        borderRadius={8}
                                        paddingHorizontal={12}
                                        paddingVertical={8}
                                        marginBottom={8}
                                    >
                                        <Text fontSize={13} fontWeight="600" color={Colors.secondary.DEFAULT}>
                                            {demoCode}
                                        </Text>
                                    </Box>
                                </Pressable>
                            ))}
                        </HStack>
                    </Box>

                    {/* Info Card */}
                    <Box
                        backgroundColor="#DBEAFE"
                        borderRadius={12}
                        padding={16}
                        borderWidth={1}
                        borderColor="#3B82F6"
                        marginTop={24}
                    >
                        <HStack space="sm" alignItems="flex-start">
                            <Ionicons name="information-circle" size={20} color="#3B82F6" />
                            <VStack flex={1}>
                                <Text fontSize={14} fontWeight="600" color="#1E3A8A" marginBottom={4}>
                                    Where to Find the Code
                                </Text>
                                <Text fontSize={13} color="#1E3A8A">
                                    The agent code is usually displayed prominently at the agent's location, typically on a poster or sticker near the counter.
                                </Text>
                            </VStack>
                        </HStack>
                    </Box>
                </VStack>

                {/* Continue Button */}
                <Box paddingBottom={32}>
                    <Button
                        backgroundColor={code.length >= 3 ? 'Colors.secondary.DEFAULT' : '#E5E7EB'}
                        borderRadius={50}
                        height={56}
                        width="$full"
                        onPress={handleContinue}
                        disabled={code.length < 3 || isLoading}
                    >
                        <Text color={code.length >= 3 ? '$white' : '#8E8E93'} fontSize={16} fontWeight={600}>
                            {isLoading ? 'Looking up agent...' : 'Continue'}
                        </Text>
                    </Button>
                </Box>
            </VStack>
        </VStack>
    );
};

export default EnterCode;
