import React from 'react';
import { Box, Text, VStack, View } from "@gluestack-ui/themed";
import Button from '@/src/components/form/AnimatedButton';
import { router } from 'expo-router';
import PageHeader from '../PageHeader';
import Loader from '../Loader';
import SignupAvatar from '../Icons/create-account/signup-avatar'

const AuthHomeScreen = () => {

    const handleSignup = async () => {
        router.push('/auth/signup');
    };

    const handleLogin = async () => {
        router.push('/auth/login');
    };

    return (
        <VStack backgroundColor="$white" flex={1} alignItems="center">
            <VStack width='100%' flex={1}>
                <PageHeader value={15} />
                <Box justifyContent="center" alignSelf="center" flex={1}>
                    <Loader iconPosition="top" disableAnimation iconComp={<SignupAvatar />} />
                </Box>
            </VStack>
            <VStack flex={1} alignItems="center">
                <Text color='#2A2A2A' alignSelf="center" fontSize={28} fontWeight={600} lineHeight={34}>
                    Create your account
                </Text>
                <VStack flex={1} justifyContent="center">
                    <VStack>
                        <Button
                            backgroundColor="#DC2626"
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
                            borderColor='#DC2626'
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
                                color='#DC2626'
                            >
                                Log in
                            </Text>

                        </Button>
                    </VStack>
                    <Box alignItems="center">
                        <Text fontWeight={400} fontSize={14} marginBottom={5} color='#5A5A5A'>By continuing you accept our</Text>
                        <Text >
                            <Text fontWeight={400} fontSize={14} color='#DC2626'> Terms of Service </Text>
                            <Text fontWeight={400} fontSize={14} color='#5A5A5A'> and </Text>
                            <Text fontWeight={400} fontSize={14} color='#DC2626'> Privacy Policy</Text>
                        </Text>
                    </Box>
                </VStack>
            </VStack>
        </VStack>
    );
};

export default AuthHomeScreen;