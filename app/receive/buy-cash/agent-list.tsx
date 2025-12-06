import React, { useState } from 'react';
import { ScrollView } from 'react-native';
import { VStack, HStack, Text, Box, Pressable } from '@gluestack-ui/themed';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { getAllAgents, sortAgentsByDistance, sortAgentsByRating, sortAgentsByFee, type Agent } from '@/src/data/mock-agents';
import { Colors } from '@/src/constants/Colors';

const AgentList = () => {
    const [sortBy, setSortBy] = useState<'distance' | 'rating' | 'fee'>('distance');
    const allAgents = getAllAgents();

    const getSortedAgents = (): Agent[] => {
        switch (sortBy) {
            case 'distance':
                return sortAgentsByDistance(allAgents);
            case 'rating':
                return sortAgentsByRating(allAgents);
            case 'fee':
                return sortAgentsByFee(allAgents, 'buyUsdt');
            default:
                return allAgents;
        }
    };

    const sortedAgents = getSortedAgents();

    const handleSelectAgent = (agent: Agent) => {
        router.push({
            pathname: '/receive/buy-cash/confirm-agent',
            params: {
                agentId: agent.id,
                agentCode: agent.code,
                agentName: agent.name,
                agentLocation: agent.location.city,
                agentDistance: agent.distance,
                agentFee: (agent.fees.buyUsdt * 100).toFixed(1),
                agentRating: agent.rating.toString(),
                agentHours: agent.operatingHours,
                isOpen: agent.isOpen.toString()
            }
        });
    };

    return (
        <VStack backgroundColor="$white" flex={1}>
            <Box backgroundColor="#8B5CF6" paddingTop={50} paddingBottom={24}>
                <VStack paddingHorizontal={20}>
                    <HStack alignItems="center" marginBottom={16}>
                        <Pressable onPress={() => router.back()} marginRight={16}>
                            <Ionicons name="arrow-back" size={24} color="white" />
                        </Pressable>
                        <Text fontSize={24} fontWeight="700" color="white">
                            Select Agent
                        </Text>
                    </HStack>
                    <Text fontSize={14} color="rgba(255, 255, 255, 0.9)">
                        Browse nearby agents
                    </Text>
                </VStack>
            </Box>

            <ScrollView>
                <VStack paddingHorizontal={24} paddingTop={24} paddingBottom={32}>
                    <HStack space="sm" marginBottom={24}>
                        <Pressable flex={1} onPress={() => setSortBy('distance')}>
                            <Box
                                backgroundColor={sortBy === 'distance' ? '#8B5CF6' : '#F9FAFB'}
                                borderRadius={8}
                                padding={12}
                                alignItems="center"
                                borderWidth={1}
                                borderColor={sortBy === 'distance' ? '#8B5CF6' : '#E5E7EB'}
                            >
                                <Text fontSize={13} fontWeight="600" color={sortBy === 'distance' ? '$white' : '#8E8E93'}>
                                    Nearest
                                </Text>
                            </Box>
                        </Pressable>
                        <Pressable flex={1} onPress={() => setSortBy('rating')}>
                            <Box
                                backgroundColor={sortBy === 'rating' ? '#8B5CF6' : '#F9FAFB'}
                                borderRadius={8}
                                padding={12}
                                alignItems="center"
                                borderWidth={1}
                                borderColor={sortBy === 'rating' ? '#8B5CF6' : '#E5E7EB'}
                            >
                                <Text fontSize={13} fontWeight="600" color={sortBy === 'rating' ? '$white' : '#8E8E93'}>
                                    Top Rated
                                </Text>
                            </Box>
                        </Pressable>
                        <Pressable flex={1} onPress={() => setSortBy('fee')}>
                            <Box
                                backgroundColor={sortBy === 'fee' ? '#8B5CF6' : '#F9FAFB'}
                                borderRadius={8}
                                padding={12}
                                alignItems="center"
                                borderWidth={1}
                                borderColor={sortBy === 'fee' ? '#8B5CF6' : '#E5E7EB'}
                            >
                                <Text fontSize={13} fontWeight="600" color={sortBy === 'fee' ? '$white' : '#8E8E93'}>
                                    Lowest Fee
                                </Text>
                            </Box>
                        </Pressable>
                    </HStack>

                    <VStack space="md">
                        {sortedAgents.map((agent) => (
                            <Pressable key={agent.id} onPress={() => handleSelectAgent(agent)}>
                                <Box
                                    backgroundColor="white"
                                    borderRadius={16}
                                    padding={16}
                                    borderWidth={1}
                                    borderColor={Colors.lightGrey}
                                    style={{
                                        shadowColor: '#000',
                                        shadowOffset: { width: 0, height: 2 },
                                        shadowOpacity: 0.1,
                                        shadowRadius: 4,
                                        elevation: 2,
                                    }}
                                >
                                    <HStack space="md" alignItems="flex-start">
                                        <Box
                                            width={48}
                                            height={48}
                                            borderRadius={24}
                                            backgroundColor="#8B5CF615"
                                            alignItems="center"
                                            justifyContent="center"
                                        >
                                            <Ionicons name={agent.type === 'otc' ? 'business' : 'storefront'} size={24} color="#8B5CF6" />
                                        </Box>

                                        <VStack flex={1}>
                                            <HStack alignItems="center" marginBottom={4}>
                                                <Text fontSize={16} fontWeight="600" color={Colors.dark} flex={1}>
                                                    {agent.name}
                                                </Text>
                                                {!agent.isOpen && (
                                                    <Box backgroundColor="#DC262615" borderRadius={4} paddingHorizontal={8} paddingVertical={2}>
                                                        <Text fontSize={11} fontWeight="600" color={Colors.error}>
                                                            Closed
                                                        </Text>
                                                    </Box>
                                                )}
                                            </HStack>

                                            <Text fontSize={13} color={Colors.grey} marginBottom={8}>
                                                {agent.location.city} • {agent.distance}
                                            </Text>

                                            <HStack space="lg" alignItems="center">
                                                <HStack space="xs" alignItems="center">
                                                    <Ionicons name="star" size={14} color={Colors.secondary.DEFAULT} />
                                                    <Text fontSize={13} fontWeight="600" color={Colors.dark}>
                                                        {agent.rating}
                                                    </Text>
                                                    <Text fontSize={12} color={Colors.grey}>
                                                        ({agent.reviews})
                                                    </Text>
                                                </HStack>

                                                <HStack space="xs" alignItems="center">
                                                    <Ionicons name="cash-outline" size={14} color={Colors.grey} />
                                                    <Text fontSize={13} color={Colors.grey}>
                                                        Fee: {(agent.fees.buyUsdt * 100).toFixed(1)}%
                                                    </Text>
                                                </HStack>
                                            </HStack>
                                        </VStack>

                                        <Ionicons name="chevron-forward" size={20} color={Colors.grey} />
                                    </HStack>
                                </Box>
                            </Pressable>
                        ))}
                    </VStack>
                </VStack>
            </ScrollView>
        </VStack>
    );
};

export default AgentList;
