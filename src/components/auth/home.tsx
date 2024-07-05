import React from 'react';
import { Image, } from 'react-native';
import { Box, Button, Text, VStack, Pressable, Progress, ProgressFilledTrack } from "@gluestack-ui/themed";
import { router } from 'expo-router';
import PageHeader from '../PageHeader';

const AuthHomeScreen = () => {

    const handleSignup = async () => {
        router.push('/auth/signup');
    };

    const handleLogin = async () => {
        router.push('/auth/login');
    };

    return (
        <VStack backgroundColor="$white" flex={1} alignItems="center">
            <PageHeader value={20} />
            <Box alignSelf="center" marginTop={24}>
                <Image source={require('../../../assets/images/signup-home.png')} />
            </Box>
            <Text color='#2A2A2A' marginVertical={72} alignSelf="center" fontSize={28} fontWeight={600} lineHeight={34}>
                Create your account
            </Text>
            <Button
                backgroundColor="#DB1E36"
                borderRadius={50}
                paddingHorizontal={10}
                height={56}
                width={360}
                alignSelf="center"
                onPress={handleSignup}
            >
                <Text color='white'>Sign up</Text>
            </Button>
            <Button
                borderColor='#DB1E36'
                borderWidth={1}
                backgroundColor="$white"
                borderRadius={50}
                paddingHorizontal={10}
                marginTop={16}
                height={56}
                width={360}
                alignSelf="center"
                marginBottom={40}
                onPress={handleLogin}

            >
                <Text
                    color='#DB1E36'
                >
                    Log in
                </Text>

            </Button>
            <Text fontWeight={400} fontSize={14} marginBottom={5} color='#5A5A5A'>By continuing you accept our</Text>
            <Text >
                <Text fontWeight={400} fontSize={14} color='#DB1E36'> Terms of Service </Text>
                <Text fontWeight={400} fontSize={14} color='#5A5A5A'> and </Text>
                <Text fontWeight={400} fontSize={14} color='#DB1E36'> Privacy Policy</Text>
            </Text>
        </VStack>
    );
};

export default AuthHomeScreen;