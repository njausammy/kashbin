
import React from 'react';
import { ScrollView } from 'react-native';
import { VStack, HStack, Text, Box } from "@gluestack-ui/themed";
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import Button from '@/src/components/form/AnimatedButton';
import { Colors } from '@/src/constants/Colors';
const Pending = () => {
    const handleGoToDashboard = () => {
        router.replace('/main');
    };

    return (
        <ScrollView style={{ flex: 1, backgroundColor: '$white' }}>
            <VStack flex={1} paddingBottom={40}>
                {/* Header Section */}
                <Box backgroundColor={Colors.secondary.DEFAULT} paddingTop={60} paddingBottom={40}>
                    <VStack paddingHorizontal={24} space="sm" alignItems="center">
                        {/* Icon */}
                        <Box
                            width={100}
                            height={100}
                            borderRadius={50}
                            backgroundColor="rgba(255, 255, 255, 0.3)"
                            alignItems="center"
                            justifyContent="center"
                            marginBottom={16}
                        >
                            <Box
                                width={80}
                                height={80}
                                borderRadius={40}
                                backgroundColor="rgba(255, 255, 255, 0.5)"
                                alignItems="center"
                                justifyContent="center"
                            >
                                <Ionicons name="time" size={48} color="white" />
                            </Box>
                        </Box>

                        <Text fontSize={28} fontWeight={700} color="$white" textAlign="center">
                            Under Review
                        </Text>
                        <Text fontSize={16} color="rgba(255, 255, 255, 0.95)" textAlign="center" marginTop={8}>
                            We're verifying your documents
                        </Text>
                    </VStack>
                </Box>

                {/* Content */}
                <VStack paddingHorizontal={24} marginTop={32} space="lg">
                    {/* Status Card */}
                    <Box
                        backgroundColor="rgba(245, 158, 11, 0.06)"
                        borderRadius={16}
                        padding={20}
                        borderWidth={1}
                        borderColor={Colors.secondary.DEFAULT}
                    >
                        <VStack space="md">
                            <HStack space="sm" alignItems="center">
                                <Ionicons name="hourglass" size={24} color={Colors.secondary.DEFAULT} />
                                <Text fontSize={18} fontWeight={600} color="#2A2A2A">
                                    Verification Pending
                                </Text>
                            </HStack>
                            <Text fontSize={14} color="#5A5A5A" lineHeight={20}>
                                Your KYC documents have been submitted successfully. Our team is reviewing your information and will notify you once verification is complete.
                            </Text>
                        </VStack>
                    </Box>

                    {/* Timeline */}
                    <VStack space="md">
                        <Text fontSize={18} fontWeight={600} color="#2A2A2A">
                            What happens next?
                        </Text>

                        <VStack space="sm">
                            {[
                                {
                                    icon: 'checkmark-circle',
                                    title: 'Documents Submitted',
                                    subtitle: 'Your documents have been received',
                                    color: '#1E40AF',
                                    completed: true
                                },
                                {
                                    icon: 'sync',
                                    title: 'Under Review',
                                    subtitle: 'Usually takes 24-48 hours',
                                    color: '#F59E0B',
                                    completed: false
                                },
                                {
                                    icon: 'notifications',
                                    title: "You'll Be Notified",
                                    subtitle: "We'll send you an update",
                                    color: '#5A5A5A',
                                    completed: false
                                }
                            ].map((item, index) => (
                                <Box
                                    key={index}
                                    backgroundColor={item.completed ? "rgba(30, 64, 175, 0.06)" : "#F5F5F5"}
                                    borderRadius={12}
                                    padding={16}
                                >
                                    <HStack space="md" alignItems="center">
                                        <Box
                                            width={48}
                                            height={48}
                                            borderRadius={24}
                                            backgroundColor={item.completed ? "#1E40AF20" : "#E5E7EB"}
                                            alignItems="center"
                                            justifyContent="center"
                                        >
                                            <Ionicons name={item.icon as any} size={24} color={item.color} />
                                        </Box>
                                        <VStack flex={1}>
                                            <Text fontSize={15} fontWeight={600} color="#2A2A2A">
                                                {item.title}
                                            </Text>
                                            <Text fontSize={13} color="#5A5A5A" marginTop={2}>
                                                {item.subtitle}
                                            </Text>
                                        </VStack>
                                    </HStack>
                                </Box>
                            ))}
                        </VStack>
                    </VStack>

                    {/* Limitations Notice */}
                    <Box
                        backgroundColor="rgba(220, 38, 38, 0.06)"
                        borderRadius={12}
                        padding={16}
                        marginTop={8}
                    >
                        <HStack space="sm" alignItems="flex-start">
                            <Ionicons name="lock-closed" size={20} color={Colors.error} />
                            <VStack flex={1}>
                                <Text fontSize={14} color={Colors.error} fontWeight={500}>
                                    Limited Access
                                </Text>
                                <Text fontSize={13} color="#5A5A5A" marginTop={4}>
                                    Until verification is complete, you cannot send money, buy USDT, or cash out. You can still browse merchants and explore the app.
                                </Text>
                            </VStack>
                        </HStack>
                    </Box>

                    {/* Help Card */}
                    <Box
                        backgroundColor="rgba(30, 64, 175, 0.06)"
                        borderRadius={12}
                        padding={16}
                    >
                        <HStack space="sm" alignItems="flex-start">
                            <Ionicons name="help-circle" size={20} color={Colors.primary.DEFAULT} />
                            <VStack flex={1}>
                                <Text fontSize={14} color="#2A2A2A" fontWeight={500}>
                                    Need help?
                                </Text>
                                <Text fontSize={13} color="#5A5A5A" marginTop={4}>
                                    If you have questions about the verification process, contact our support team.
                                </Text>
                            </VStack>
                        </HStack>
                    </Box>

                    {/* Go to Dashboard Button */}
                    <Button
                        backgroundColor={Colors.primary.DEFAULT}
                        borderRadius={50}
                        height={56}
                        width="$full"
                        marginTop={24}
                        onPress={handleGoToDashboard}
                    >
                        <Text color="$white" fontSize={16} fontWeight={600}>
                            Go to Dashboard
                        </Text>
                    </Button>
                </VStack>
            </VStack>
        </ScrollView>
    );
};

export default Pending;
