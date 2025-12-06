import React from 'react';
import { ScrollView } from 'react-native';
import { VStack, HStack, Text, Box, Pressable } from '@gluestack-ui/themed';
import { Ionicons } from '@expo/vector-icons';
import { router, useLocalSearchParams } from 'expo-router';
import Button from '@/src/components/form/AnimatedButton';
import { Colors } from '@/src/constants/Colors';

const Confirm = () => {
    const params = useLocalSearchParams<{
        agentId: string;
        agentCode: string;
        agentName: string;
        usdtAmount: string;
        kesAmount: string;
        rate: string;
        fee: string;
    }>();

    const handleConfirm = () => {
        router.push({
            pathname: '/receive/buy-cash/code-generated',
            params: params
        });
    };

    return (
        <VStack backgroundColor="$white" flex={1}>
            <Box backgroundColor={Colors.secondary.DEFAULT} paddingTop={50} paddingBottom={24}>
                <VStack paddingHorizontal={20}>
                    <HStack alignItems="center" marginBottom={16}>
                        <Pressable onPress={() => router.back()} marginRight={16}>
                            <Ionicons name="arrow-back" size={24} color="white" />
                        </Pressable>
                        <Text fontSize={24} fontWeight="700" color="white">
                            Confirm Purchase
                        </Text>
                    </HStack>
                    <Text fontSize={14} color="rgba(255, 255, 255, 0.9)">
                        Review purchase details
                    </Text>
                </VStack>
            </Box>

            <ScrollView>
                <VStack paddingHorizontal={24} paddingTop={32} paddingBottom={180}>
                    <VStack alignItems="center" marginBottom={32}>
                        <Text fontSize={16} color={Colors.grey} marginBottom={8}>
                            Cash to Bring
                        </Text>
                        <Text fontSize={48} fontWeight="700" color={Colors.secondary.DEFAULT}>
                            {parseFloat(params.kesAmount).toLocaleString('en-KE', { minimumFractionDigits: 2 })}
                        </Text>
                        <Text fontSize={20} fontWeight="600" color={Colors.secondary.DEFAULT} marginTop={4}>
                            KES
                        </Text>
                    </VStack>

                    <Box backgroundColor="white" borderRadius={16} borderWidth={1} borderColor={Colors.lightGrey} overflow="hidden" marginBottom={24}>
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
                            <Text fontSize={14} color={Colors.grey}>USDT to Receive</Text>
                            <Text fontSize={15} fontWeight="600" color={Colors.dark}>
                                {parseFloat(params.usdtAmount).toFixed(2)} USDT
                            </Text>
                        </HStack>

                        <HStack justifyContent="space-between" padding={16} borderBottomWidth={1} borderBottomColor="#F0F0F0">
                            <Text fontSize={14} color={Colors.grey}>Exchange Rate</Text>
                            <Text fontSize={14} fontWeight="600" color={Colors.dark}>
                                1 USDT = KES {parseFloat(params.rate).toFixed(2)}
                            </Text>
                        </HStack>

                        <HStack justifyContent="space-between" padding={16} borderBottomWidth={1} borderBottomColor="#F0F0F0">
                            <Text fontSize={14} color={Colors.grey}>Agent Fee (2%)</Text>
                            <Text fontSize={15} fontWeight="600" color={Colors.error}>
                                KES {parseFloat(params.fee).toFixed(2)}
                            </Text>
                        </HStack>

                        <HStack justifyContent="space-between" padding={16} backgroundColor="rgba(245, 158, 11, 0.08)">
                            <Text fontSize={15} fontWeight="600" color={Colors.dark}>
                                Total Cash Needed
                            </Text>
                            <Text fontSize={17} fontWeight="700" color={Colors.secondary.DEFAULT}>
                                KES {parseFloat(params.kesAmount).toLocaleString('en-KE', { minimumFractionDigits: 2 })}
                            </Text>
                        </HStack>
                    </Box>

                    <Box backgroundColor="#FEF3C7" borderRadius={12} padding={16} borderWidth={1} borderColor={Colors.secondary.DEFAULT}>
                        <HStack space="sm" alignItems="flex-start">
                            <Ionicons name="alert-circle" size={20} color={Colors.secondary.DEFAULT} />
                            <VStack flex={1}>
                                <Text fontSize={14} fontWeight="600" color="#92400E" marginBottom={4}>
                                    Important
                                </Text>
                                <Text fontSize={13} color="#92400E">
                                    • Bring exact cash amount to agent{'\n'}
                                    • Bring valid ID{'\n'}
                                    • Code valid for 24 hours{'\n'}
                                    • USDT released after cash confirmed
                                </Text>
                            </VStack>
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
                <Button backgroundColor={Colors.secondary.DEFAULT} borderRadius={50} height={56} width="$full" onPress={handleConfirm}>
                    <Text color="$white" fontSize={16} fontWeight={600}>
                        Generate Deposit Code
                    </Text>
                </Button>
            </Box>
        </VStack>
    );
};

export default Confirm;
