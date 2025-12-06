import React from 'react';
import { ScrollView, Share } from 'react-native';
import { VStack, HStack, Text, Box, Pressable } from '@gluestack-ui/themed';
import { Ionicons } from '@expo/vector-icons';
import { router, useLocalSearchParams } from 'expo-router';
import Button from '@/src/components/form/AnimatedButton';
import { Colors } from '@/src/constants/Colors';

const CodeGenerated = () => {
    const params = useLocalSearchParams<{
        agentCode: string;
        agentName: string;
        usdtAmount: string;
        kesAmount: string;
    }>();

    const depositCode = `DP${Date.now().toString().slice(-6)}`;
    const expiresAt = new Date(Date.now() + 24 * 60 * 60 * 1000);
    const expiryTime = expiresAt.toLocaleString('en-US', {
        month: 'short',
        day: 'numeric',
        hour: 'numeric',
        minute: '2-digit',
        hour12: true
    });

    const handleShare = async () => {
        try {
            await Share.share({
                message: `Kash Chain Deposit Code\n\n` +
                    `Code: ${depositCode}\n` +
                    `Bring: KES ${parseFloat(params.kesAmount).toLocaleString('en-KE', { minimumFractionDigits: 2 })}\n` +
                    `You'll Get: ${parseFloat(params.usdtAmount).toFixed(2)} USDT\n` +
                    `Agent: ${params.agentName} (${params.agentCode})\n` +
                    `Valid until: ${expiryTime}\n\n` +
                    `Bring this code and cash to the agent location with your ID.`,
            });
        } catch (error) {
            // Silent fail
        }
    };

    const handleContinue = () => {
        router.push({
            pathname: '/receive/buy-cash/waiting',
            params: { ...params, depositCode, kesAmount: params.kesAmount }
        });
    };

    return (
        <VStack backgroundColor="$white" flex={1}>
            <Box backgroundColor={Colors.success} paddingTop={50} paddingBottom={40}>
                <VStack alignItems="center" paddingHorizontal={20}>
                    <Box width={80} height={80} borderRadius={40} backgroundColor="white" alignItems="center" justifyContent="center" marginBottom={20}>
                        <Ionicons name="checkmark" size={48} color={Colors.success} />
                    </Box>
                    <Text fontSize={28} fontWeight="700" color="white" marginBottom={8}>
                        Code Generated!
                    </Text>
                    <Text fontSize={16} color="rgba(255, 255, 255, 0.9)" textAlign="center">
                        Bring this code and cash to agent
                    </Text>
                </VStack>
            </Box>

            <ScrollView>
                <VStack paddingHorizontal={24} paddingTop={24} paddingBottom={180}>
                    <Box
                        backgroundColor="white"
                        borderRadius={16}
                        padding={24}
                        borderWidth={2}
                        borderColor={Colors.secondary.DEFAULT}
                        alignItems="center"
                        marginBottom={24}
                        style={{
                            shadowColor: '#000',
                            shadowOffset: { width: 0, height: 4 },
                            shadowOpacity: 0.15,
                            shadowRadius: 8,
                            elevation: 6,
                        }}
                    >
                        <Text fontSize={14} fontWeight="600" color={Colors.grey} marginBottom={16}>
                            Deposit Code
                        </Text>

                        <Box backgroundColor="rgba(245, 158, 11, 0.08)" borderRadius={12} paddingVertical={20} paddingHorizontal={32} marginBottom={20}>
                            <Text fontSize={36} fontWeight="700" color={Colors.secondary.DEFAULT} letterSpacing={4} textAlign="center">
                                {depositCode}
                            </Text>
                        </Box>

                        <Box width={200} height={200} backgroundColor={Colors.background} borderRadius={12} borderWidth={2} borderColor={Colors.lightGrey} alignItems="center" justifyContent="center" marginBottom={16}>
                            <Ionicons name="qr-code" size={140} color={Colors.secondary.DEFAULT} />
                        </Box>

                        <Pressable onPress={handleShare}>
                            <HStack space="xs" alignItems="center">
                                <Ionicons name="share-social" size={18} color={Colors.secondary.DEFAULT} />
                                <Text fontSize={14} fontWeight="600" color={Colors.secondary.DEFAULT}>
                                    Share Code
                                </Text>
                            </HStack>
                        </Pressable>
                    </Box>

                    <Box backgroundColor="white" borderRadius={16} borderWidth={1} borderColor={Colors.lightGrey} overflow="hidden" marginBottom={24}>
                        <HStack justifyContent="space-between" padding={16} borderBottomWidth={1} borderBottomColor="#F0F0F0" backgroundColor="rgba(245, 158, 11, 0.08)">
                            <Text fontSize={15} fontWeight="600" color={Colors.dark}>
                                Cash to Bring
                            </Text>
                            <Text fontSize={18} fontWeight="700" color={Colors.secondary.DEFAULT}>
                                KES {parseFloat(params.kesAmount).toLocaleString('en-KE', { minimumFractionDigits: 2 })}
                            </Text>
                        </HStack>

                        <HStack justifyContent="space-between" padding={16} borderBottomWidth={1} borderBottomColor="#F0F0F0">
                            <Text fontSize={14} color={Colors.grey}>Agent</Text>
                            <VStack alignItems="flex-end">
                                <Text fontSize={14} fontWeight="600" color={Colors.dark}>
                                    {params.agentName}
                                </Text>
                                <Text fontSize={13} color={Colors.grey}>
                                    Code: {params.agentCode}
                                </Text>
                            </VStack>
                        </HStack>

                        <HStack justifyContent="space-between" padding={16} borderBottomWidth={1} borderBottomColor="#F0F0F0">
                            <Text fontSize={14} color={Colors.grey}>You'll Receive</Text>
                            <Text fontSize={14} fontWeight="600" color={Colors.dark}>
                                {parseFloat(params.usdtAmount).toFixed(2)} USDT
                            </Text>
                        </HStack>

                        <HStack justifyContent="space-between" padding={16} borderBottomWidth={1} borderBottomColor="#F0F0F0">
                            <Text fontSize={14} color={Colors.grey}>Valid Until</Text>
                            <Text fontSize={14} fontWeight="600" color={Colors.dark}>
                                {expiryTime}
                            </Text>
                        </HStack>

                        <HStack justifyContent="space-between" padding={16} backgroundColor={Colors.background}>
                            <Text fontSize={14} color={Colors.grey}>Status</Text>
                            <HStack space="xs" alignItems="center">
                                <Box width={8} height={8} borderRadius={4} backgroundColor={Colors.secondary.DEFAULT} />
                                <Text fontSize={15} fontWeight="600" color={Colors.secondary.DEFAULT}>
                                    Awaiting Payment
                                </Text>
                            </HStack>
                        </HStack>
                    </Box>

                    <Box backgroundColor="#FEF3C7" borderRadius={12} padding={16} borderWidth={1} borderColor={Colors.secondary.DEFAULT} marginBottom={16}>
                        <HStack space="sm" alignItems="flex-start">
                            <Ionicons name="alert-circle" size={20} color={Colors.secondary.DEFAULT} />
                            <VStack flex={1}>
                                <Text fontSize={14} fontWeight="600" color="#92400E" marginBottom={4}>
                                    Important Instructions
                                </Text>
                                <Text fontSize={13} color="#92400E">
                                    • Bring this code AND exact cash amount{'\n'}
                                    • Bring a valid ID{'\n'}
                                    • Code expires in 24 hours{'\n'}
                                    • Agent releases USDT after verifying payment
                                </Text>
                            </VStack>
                        </HStack>
                    </Box>

                    <Box backgroundColor="#DBEAFE" borderRadius={12} padding={16} borderWidth={1} borderColor="#3B82F6">
                        <HStack space="sm" alignItems="flex-start">
                            <Ionicons name="information-circle" size={20} color="#3B82F6" />
                            <Text fontSize={13} color="#1E3A8A" flex={1}>
                                The agent will verify your code and ID, count the cash, then release USDT to your wallet immediately.
                            </Text>
                        </HStack>
                    </Box>
                </VStack>
            </ScrollView>

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
                <Button backgroundColor={Colors.success} borderRadius={50} height={56} width="$full" onPress={handleContinue}>
                    <Text color="$white" fontSize={16} fontWeight={600}>
                        I've Visited the Agent (Demo)
                    </Text>
                </Button>
            </Box>
        </VStack>
    );
};

export default CodeGenerated;
