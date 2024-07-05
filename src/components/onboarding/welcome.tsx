import React from 'react';
import { Image, } from 'react-native';
import { Box, Button, Text, VStack, Progress, ProgressFilledTrack, Heading } from "@gluestack-ui/themed";
import { router } from 'expo-router';
import PageHeader from '../PageHeader';

const HomeScreen = () => {

    const handleContinue = async () => {
        router.push('/main');
    };

    return (
        <VStack backgroundColor="$white" flex={1} alignItems="center">
            <PageHeader value={100} />
            <Box flex={1} top="25%" >
                <Heading
                    textAlign="center"
                    lineHeight={41}
                    color={"#2A2A2A"}
                    fontSize={34}
                    fontWeight={600}
                    fontFamily="$heading"
                    paddingHorizontal={30}
                >

                    Wewe umeweza!
                    Karibu Niyaleo!
                </Heading>
                <Text
                    paddingHorizontal={30}
                    lineHeight={19}
                    color='#5A5A5A'
                    fontSize={14}
                    fontWeight={400}
                    marginBottom={48}
                    textAlign='center'
                >
                    We are happy to have you. It’s time to earn points every time you shop at your local kiosk!
                </Text>
            </Box>
            <Button
                backgroundColor="#DB1E36"
                borderRadius={50}
                paddingHorizontal={10}
                height={56}
                width={360}
                alignSelf="center"
                onPress={handleContinue}
                bottom="45%"
            >
                <Text color='white'>Continue</Text>
            </Button>
        </VStack>
    );
};

export default HomeScreen;