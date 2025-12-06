import React from 'react';
import { VStack, HStack, Text, Box, Pressable } from '@gluestack-ui/themed';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { Colors } from '@/src/constants/Colors';
import Button from '@/src/components/form/AnimatedButton';

const LinkInput = () => {
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
                            Send via Pesa Link
                        </Text>
                    </HStack>
                    <Text fontSize={14} color="rgba(255, 255, 255, 0.9)">
                        Generate a payment link to share
                    </Text>
                </VStack>
            </Box>

            {/* Coming Soon Content */}
            <VStack flex={1} paddingHorizontal={24} paddingTop={80} alignItems="center">
                <Box
                    width={120}
                    height={120}
                    borderRadius={60}
                    backgroundColor="rgba(30, 64, 175, 0.08)"
                    alignItems="center"
                    justifyContent="center"
                    marginBottom={32}
                >
                    <Ionicons name="link-outline" size={64} color={Colors.primary.DEFAULT} />
                </Box>

                <Text fontSize={28} fontWeight="700" color="#1C1C1E" textAlign="center" marginBottom={16}>
                    Coming Soon
                </Text>

                <Text fontSize={16} color="#8E8E93" textAlign="center" marginBottom={32} lineHeight={24}>
                    Pesa Link will allow you to create shareable payment links that anyone can use to send you money.
                </Text>

                <Box
                    backgroundColor="rgba(30, 64, 175, 0.08)"
                    borderRadius={12}
                    padding={16}
                    borderWidth={1}
                    borderColor={Colors.primary.DEFAULT}
                    width="$full"
                >
                    <HStack space="sm" alignItems="flex-start">
                        <Ionicons name="information-circle" size={20} color={Colors.primary.DEFAULT} />
                        <VStack flex={1}>
                            <Text fontSize={14} fontWeight="600" color="#7C2D12" marginBottom={4}>
                                What You'll Be Able To Do
                            </Text>
                            <Text fontSize={13} color="#7C2D12">
                                • Generate instant payment links{'\n'}
                                • Share via WhatsApp, SMS, or email{'\n'}
                                • Set custom amounts or leave open{'\n'}
                                • Track link usage and payments{'\n'}
                                • Set expiration dates for links
                            </Text>
                        </VStack>
                    </HStack>
                </Box>
            </VStack>

            {/* Bottom Button */}
            <Box paddingHorizontal={24} paddingBottom={32}>
                <Button
                    backgroundColor={Colors.primary.DEFAULT}
                    borderRadius={50}
                    height={56}
                    width="$full"
                    onPress={() => router.back()}
                >
                    <Text color="$white" fontSize={16} fontWeight={600}>
                        Go Back
                    </Text>
                </Button>
            </Box>
        </VStack>
    );
};

export default LinkInput;
