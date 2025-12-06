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

    // Generate withdrawal code
    const withdrawalCode = `WD-${Date.now().toString().slice(-6)}`;
    const expiresAt = new Date(Date.now() + 24 * 60 * 60 * 1000); // 24 hours from now
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
                message: `Kash Chain Withdrawal Code\n\n` +
                    `Code: ${withdrawalCode}\n` +
                    `Amount: KES ${parseFloat(params.kesAmount).toLocaleString('en-KE', { minimumFractionDigits: 2 })}\n` +
                    `Agent: ${params.agentName} (${params.agentCode})\n` +
                    `Valid until: ${expiryTime}\n\n` +
                    `Show this code at the agent location with your ID.`,
            });
        } catch (error) {
            // Silent fail
        }
    };

    return (
        <VStack backgroundColor="$white" flex={1}>
            {/* Header */}
            <Box backgroundColor={Colors.success} paddingTop={50} paddingBottom={40}>
                <VStack alignItems="center" paddingHorizontal={20}>
                    <Box
                        width={80}
                        height={80}
                        borderRadius={40}
                        backgroundColor="white"
                        alignItems="center"
                        justifyContent="center"
                        marginBottom={20}
                    >
                        <Ionicons name="checkmark" size={48} color={Colors.success} />
                    </Box>
                    <Text fontSize={28} fontWeight="700" color="white" marginBottom={8}>
                        Code Generated!
                    </Text>
                    <Text fontSize={16} color="rgba(255, 255, 255, 0.9)" textAlign="center">
                        Show this code at agent location
                    </Text>
                </VStack>
            </Box>

            <ScrollView>
                <VStack paddingHorizontal={24} paddingTop={24} paddingBottom={180}>
                    {/* Withdrawal Code */}
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
                            Withdrawal Code
                        </Text>

                        {/* Large Code Display */}
                        <Box
                            backgroundColor="rgba(245, 158, 11, 0.08)"
                            borderRadius={12}
                            paddingVertical={20}
                            paddingHorizontal={32}
                            marginBottom={20}
                        >
                            <Text
                                fontSize={36}
                                fontWeight="700"
                                color={Colors.secondary.DEFAULT}
                                letterSpacing={4}
                                textAlign="center"
                            >
                                {withdrawalCode}
                            </Text>
                        </Box>

                        {/* QR Code Placeholder */}
                        <Box
                            width={200}
                            height={200}
                            backgroundColor={Colors.background}
                            borderRadius={12}
                            borderWidth={2}
                            borderColor={Colors.lightGrey}
                            alignItems="center"
                            justifyContent="center"
                            marginBottom={16}
                        >
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

                    {/* Amount & Details */}
                    <Box
                        backgroundColor="white"
                        borderRadius={16}
                        borderWidth={1}
                        borderColor={Colors.lightGrey}
                        overflow="hidden"
                        marginBottom={24}
                    >
                        {/* Cash Amount */}
                        <HStack
                            justifyContent="space-between"
                            padding={16}
                            borderBottomWidth={1}
                            borderBottomColor="#F0F0F0"
                            backgroundColor="#22C55E15"
                        >
                            <Text fontSize={15} fontWeight="600" color={Colors.dark}>
                                Cash to Collect
                            </Text>
                            <Text fontSize={18} fontWeight="700" color={Colors.success}>
                                KES {parseFloat(params.kesAmount).toLocaleString('en-KE', { minimumFractionDigits: 2 })}
                            </Text>
                        </HStack>

                        {/* Agent */}
                        <HStack
                            justifyContent="space-between"
                            padding={16}
                            borderBottomWidth={1}
                            borderBottomColor="#F0F0F0"
                        >
                            <Text fontSize={14} color={Colors.grey}>Pickup Agent</Text>
                            <VStack alignItems="flex-end">
                                <Text fontSize={14} fontWeight="600" color={Colors.dark}>
                                    {params.agentName}
                                </Text>
                                <Text fontSize={13} color={Colors.grey}>
                                    Code: {params.agentCode}
                                </Text>
                            </VStack>
                        </HStack>

                        {/* USDT Deducted */}
                        <HStack
                            justifyContent="space-between"
                            padding={16}
                            borderBottomWidth={1}
                            borderBottomColor="#F0F0F0"
                        >
                            <Text fontSize={14} color={Colors.grey}>USDT Deducted</Text>
                            <Text fontSize={14} fontWeight="600" color={Colors.dark}>
                                {parseFloat(params.usdtAmount).toFixed(2)} USDT
                            </Text>
                        </HStack>

                        {/* Valid Until */}
                        <HStack
                            justifyContent="space-between"
                            padding={16}
                            borderBottomWidth={1}
                            borderBottomColor="#F0F0F0"
                        >
                            <Text fontSize={14} color={Colors.grey}>Valid Until</Text>
                            <Text fontSize={14} fontWeight="600" color={Colors.dark}>
                                {expiryTime}
                            </Text>
                        </HStack>

                        {/* Status */}
                        <HStack
                            justifyContent="space-between"
                            padding={16}
                            backgroundColor={Colors.background}
                        >
                            <Text fontSize={14} color={Colors.grey}>Status</Text>
                            <HStack space="xs" alignItems="center">
                                <Box width={8} height={8} borderRadius={4} backgroundColor={Colors.secondary.DEFAULT} />
                                <Text fontSize={15} fontWeight="600" color={Colors.secondary.DEFAULT}>
                                    Awaiting Pickup
                                </Text>
                            </HStack>
                        </HStack>
                    </Box>

                    {/* Important Instructions */}
                    <Box
                        backgroundColor="#FEF3C7"
                        borderRadius={12}
                        padding={16}
                        borderWidth={1}
                        borderColor={Colors.secondary.DEFAULT}
                        marginBottom={16}
                    >
                        <HStack space="sm" alignItems="flex-start">
                            <Ionicons name="alert-circle" size={20} color={Colors.secondary.DEFAULT} />
                            <VStack flex={1}>
                                <Text fontSize={14} fontWeight="600" color="#92400E" marginBottom={4}>
                                    Important Instructions
                                </Text>
                                <Text fontSize={13} color="#92400E">
                                    • Bring this code AND a valid ID{'\n'}
                                    • Code expires in 24 hours{'\n'}
                                    • Visit agent during operating hours{'\n'}
                                    • Don't share this code publicly
                                </Text>
                            </VStack>
                        </HStack>
                    </Box>

                    {/* Success Info */}
                    <Box
                        backgroundColor="#DBEAFE"
                        borderRadius={12}
                        padding={16}
                        borderWidth={1}
                        borderColor="#3B82F6"
                    >
                        <HStack space="sm" alignItems="flex-start">
                            <Ionicons name="information-circle" size={20} color="#3B82F6" />
                            <Text fontSize={13} color="#1E3A8A" flex={1}>
                                USDT has been deducted from your wallet. The agent will verify your code and ID before releasing the cash.
                            </Text>
                        </HStack>
                    </Box>
                </VStack>
            </ScrollView>

            {/* Fixed Bottom Buttons */}
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
                <VStack space="sm">
                    <Button
                        backgroundColor={Colors.success}
                        borderRadius={50}
                        height={56}
                        width="$full"
                        onPress={() => router.replace('/main/home')}
                    >
                        <Text color="$white" fontSize={16} fontWeight={600}>
                            Done
                        </Text>
                    </Button>
                    <Button
                        backgroundColor="transparent"
                        borderRadius={50}
                        height={56}
                        width="$full"
                        borderWidth={2}
                        borderColor={Colors.lightGrey}
                        onPress={() => router.replace('/send/menu')}
                    >
                        <Text color={Colors.dark} fontSize={16} fontWeight={600}>
                            Send Again
                        </Text>
                    </Button>
                </VStack>
            </Box>
        </VStack>
    );
};

export default CodeGenerated;
