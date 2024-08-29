import React, { useState } from 'react';
import { Box, Text, VStack, HStack, Pressable, Icon } from "@gluestack-ui/themed";

const EnterPinScreen = () => {
    const [pin, setPin] = useState('');



    const renderPinDots = () => {
        return Array(4).fill(0).map((_, i) => (
            <Box
                key={i}
                width={10}
                height={10}
                borderRadius={5}
                backgroundColor={pin.length > i ? "$black" : "$lightGray"}
                marginHorizontal={4}
            />
        ));
    };



    return (
        <VStack flex={1} backgroundColor="$white">
            <HStack alignItems="center" paddingHorizontal={15} paddingTop={20}>
                <Pressable >
                    <Icon  size="md" />
                </Pressable>
                <Box flex={1} height={2} backgroundColor="$red500" marginLeft={10} />
            </HStack>
            <VStack flex={1} paddingHorizontal={24} justifyContent="space-between">
                <VStack alignItems="flex-start" marginTop={24}>
                    <Text fontSize={22} fontWeight="600" color="$black">
                        Enter account PIN
                    </Text>
                    <Text fontSize={14} color="$gray500" marginTop={8}>
                        Enter your account PIN to confirm the transaction.
                    </Text>
                    <HStack marginTop={32} alignSelf="center">
                        {renderPinDots()}
                    </HStack>
                </VStack>
            </VStack>
        </VStack>
    );
};

export default EnterPinScreen;