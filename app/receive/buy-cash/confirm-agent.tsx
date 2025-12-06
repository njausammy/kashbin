import React from 'react';
import { ScrollView } from 'react-native';
import { VStack, HStack, Text, Box, Pressable } from '@gluestack-ui/themed';
import { Ionicons } from '@expo/vector-icons';
import { router, useLocalSearchParams } from 'expo-router';
import Button from '@/src/components/form/AnimatedButton';
import { Colors } from '@/src/constants/Colors';

const ConfirmAgent = () => {
    const params = useLocalSearchParams<{
        agentId: string;
        agentCode: string;
        agentName: string;
        agentLocation: string;
        agentDistance: string;
        agentFee: string;
        agentRating: string;
        agentHours: string;
        isOpen: string;
    }>();

    const isOpen = params.isOpen === 'true';

    const handleContinue = () => {
        router.push({
            pathname: '/receive/buy-cash/amount',
            params: {
                agentId: params.agentId,
                agentCode: params.agentCode,
                agentName: params.agentName,
                agentFee: params.agentFee
            }
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
                            Confirm Agent
                        </Text>
                    </HStack>
                    <Text fontSize={14} color="rgba(255, 255, 255, 0.9)">
                        Verify agent details
                    </Text>
                </VStack>
            </Box>

            <ScrollView>
                <VStack paddingHorizontal={24} paddingTop={32} paddingBottom={180}>
                    <Box alignItems="center" marginBottom={24}>
                        <Box
                            width={80}
                            height={80}
                            borderRadius={40}
                            backgroundColor="rgba(245, 158, 11, 0.08)"
                            alignItems="center"
                            justifyContent="center"
                            marginBottom={16}
                        >
                            <Ionicons name="business" size={40} color={Colors.secondary.DEFAULT} />
                        </Box>
                        <Text fontSize={22} fontWeight="700" color={Colors.dark} textAlign="center">
                            {params.agentName}
                        </Text>
                        <Text fontSize={14} color={Colors.grey} marginTop={4}>
                            Agent Code: {params.agentCode}
                        </Text>
                    </Box>

                    <Box
                        backgroundColor="white"
                        borderRadius={16}
                        borderWidth={1}
                        borderColor={Colors.lightGrey}
                        overflow="hidden"
                        marginBottom={24}
                    >
                        <HStack justifyContent="space-between" alignItems="center" padding={16} borderBottomWidth={1} borderBottomColor="#F0F0F0">
                            <HStack space="sm" alignItems="center" flex={1}>
                                <Ionicons name="location" size={20} color={Colors.grey} />
                                <Text fontSize={14} color={Colors.grey}>Location</Text>
                            </HStack>
                            <Text fontSize={14} fontWeight="600" color={Colors.dark} textAlign="right" flex={1}>
                                {params.agentLocation}
                            </Text>
                        </HStack>

                        <HStack justifyContent="space-between" alignItems="center" padding={16} borderBottomWidth={1} borderBottomColor="#F0F0F0">
                            <HStack space="sm" alignItems="center">
                                <Ionicons name="navigate" size={20} color={Colors.grey} />
                                <Text fontSize={14} color={Colors.grey}>Distance</Text>
                            </HStack>
                            <Text fontSize={14} fontWeight="600" color={Colors.dark}>
                                {params.agentDistance}
                            </Text>
                        </HStack>

                        <HStack justifyContent="space-between" alignItems="center" padding={16} borderBottomWidth={1} borderBottomColor="#F0F0F0">
                            <HStack space="sm" alignItems="center">
                                <Ionicons name="star" size={20} color={Colors.secondary.DEFAULT} />
                                <Text fontSize={14} color={Colors.grey}>Rating</Text>
                            </HStack>
                            <HStack space="xs" alignItems="center">
                                <Text fontSize={14} fontWeight="600" color={Colors.dark}>
                                    {params.agentRating}
                                </Text>
                                <Ionicons name="star" size={14} color={Colors.secondary.DEFAULT} />
                            </HStack>
                        </HStack>

                        <HStack justifyContent="space-between" alignItems="center" padding={16} borderBottomWidth={1} borderBottomColor="#F0F0F0">
                            <HStack space="sm" alignItems="center">
                                <Ionicons name="cash" size={20} color={Colors.grey} />
                                <Text fontSize={14} color={Colors.grey}>Purchase Fee</Text>
                            </HStack>
                            <Text fontSize={14} fontWeight="600" color={Colors.dark}>
                                {params.agentFee}%
                            </Text>
                        </HStack>

                        <HStack justifyContent="space-between" alignItems="center" padding={16} borderBottomWidth={1} borderBottomColor="#F0F0F0">
                            <HStack space="sm" alignItems="center">
                                <Ionicons name="time" size={20} color={Colors.grey} />
                                <Text fontSize={14} color={Colors.grey}>Hours</Text>
                            </HStack>
                            <Text fontSize={14} fontWeight="600" color={Colors.dark}>
                                {params.agentHours}
                            </Text>
                        </HStack>

                        <HStack justifyContent="space-between" alignItems="center" padding={16} backgroundColor={isOpen ? '#22C55E15' : '#DC262615'}>
                            <HStack space="sm" alignItems="center">
                                <Ionicons name={isOpen ? 'checkmark-circle' : 'close-circle'} size={20} color={isOpen ? '#22C55E' : '#DC2626'} />
                                <Text fontSize={14} color={Colors.grey}>Status</Text>
                            </HStack>
                            <Text fontSize={14} fontWeight="600" color={isOpen ? '#22C55E' : '#DC2626'}>
                                {isOpen ? 'Open Now' : 'Closed'}
                            </Text>
                        </HStack>
                    </Box>

                    <Box backgroundColor="#DBEAFE" borderRadius={12} padding={16} borderWidth={1} borderColor="#3B82F6">
                        <HStack space="sm" alignItems="flex-start">
                            <Ionicons name="information-circle" size={20} color="#3B82F6" />
                            <VStack flex={1}>
                                <Text fontSize={14} fontWeight="600" color="#1E3A8A" marginBottom={4}>
                                    Next Steps
                                </Text>
                                <Text fontSize={13} color="#1E3A8A">
                                    After confirming, you'll enter the amount of USDT to buy and receive a deposit code. Bring cash and the code to the agent.
                                </Text>
                            </VStack>
                        </HStack>
                    </Box>

                    {!isOpen && (
                        <Box backgroundColor="#FEF3C7" borderRadius={12} padding={16} borderWidth={1} borderColor={Colors.secondary.DEFAULT} marginTop={16}>
                            <HStack space="sm" alignItems="flex-start">
                                <Ionicons name="alert-circle" size={20} color={Colors.secondary.DEFAULT} />
                                <Text fontSize={13} color="#92400E" flex={1}>
                                    This agent is currently closed. You can still proceed, but you'll need to visit during operating hours.
                                </Text>
                            </HStack>
                        </Box>
                    )}
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
                <VStack space="sm">
                    <Button backgroundColor={Colors.secondary.DEFAULT} borderRadius={50} height={56} width="$full" onPress={handleContinue}>
                        <Text color="$white" fontSize={16} fontWeight={600}>
                            Continue with this Agent
                        </Text>
                    </Button>
                    <Pressable onPress={() => router.back()}>
                        <Box borderWidth={2} borderColor={Colors.lightGrey} borderRadius={50} height={56} alignItems="center" justifyContent="center">
                            <Text color={Colors.grey} fontSize={16} fontWeight={600}>
                                Choose Different Agent
                            </Text>
                        </Box>
                    </Pressable>
                </VStack>
            </Box>
        </VStack>
    );
};

export default ConfirmAgent;
