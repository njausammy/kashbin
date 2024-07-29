import React, { useState } from 'react';
import { Box, VStack, Text, Button, HStack, Input, InputField, Card } from "@gluestack-ui/themed";

const RedeemPointsView = () => {
    const [pointsToRedeem, setPointsToRedeem] = useState('500');

    return (
        <Box flex={1} backgroundColor="$lightGray100" padding={20}>
            <VStack space="md">
                <Text fontSize={24} fontWeight="$bold">Redeem Points</Text>
                <Text fontSize={16} color="$blueGray400">Enter the number of points to redeem</Text>

                <HStack space="md" justifyContent="space-between">
                    <Card backgroundColor="$red500" padding={10} borderRadius={10} flex={1}>
                        <Text color="$white" fontSize={20} fontWeight="$bold">3850</Text>
                        <Text color="$white" fontSize={12}>Total Points</Text>
                        <Text color="$white" fontSize={12}>Value: KES 3850</Text>
                    </Card>
                    <Card backgroundColor="$green500" padding={10} borderRadius={10} flex={1}>
                        <Text color="$white" fontSize={20} fontWeight="$bold">350</Text>
                        <Text color="$white" fontSize={12}>This outlet</Text>
                        <Text color="$white" fontSize={12}>Value: KES 350</Text>
                    </Card>
                </HStack>

                <Card backgroundColor="$white" padding={20} borderRadius={10}>
                    <VStack space="md">
                        <Text fontSize={16} fontWeight="$medium" textAlign="center">
                            Niyaleo Wholesale Depot
                        </Text>
                        <Text fontSize={14} color="$blueGray400" textAlign="center">
                            Bungoma Road, Kahawa Sukari, Kiambu County
                        </Text>
                        <Input
                            variant="underlined"
                        >
                            <InputField
                                textAlign="center"
                                fontSize={36}
                                fontWeight="$bold"
                                keyboardType="numeric"
                                value={pointsToRedeem}
                                onChangeText={setPointsToRedeem}
                            />
                        </Input>
                        <Text fontSize={14} color="$blueGray400" textAlign="center">
                            Transfer 150 points, charge 10 points, total transfer 160 points
                        </Text>
                        <Button
                            backgroundColor="$red500"
                            borderRadius="$full"
                            padding={12}
                        >
                            <Text color="$white" fontSize={16} fontWeight="$medium">
                                Redeem
                            </Text>
                        </Button>
                    </VStack>
                </Card>
            </VStack>
        </Box>
    );
};

export default RedeemPointsView;