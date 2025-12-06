import React, { useEffect, useRef } from 'react';
import { Box, VStack, Text, Spinner } from "@gluestack-ui/themed";
import { Animated, Easing } from 'react-native';
import WalletIcon from './Icons/wallet';

const SplashScreen = () => {
    const fadeAnim = useRef(new Animated.Value(0)).current;
    const scaleAnim = useRef(new Animated.Value(0.8)).current;

    useEffect(() => {
        Animated.parallel([
            Animated.timing(fadeAnim, {
                toValue: 1,
                duration: 800,
                easing: Easing.out(Easing.cubic),
                useNativeDriver: true,
            }),
            Animated.spring(scaleAnim, {
                toValue: 1,
                friction: 4,
                tension: 40,
                useNativeDriver: true,
            }),
        ]).start();
    }, []);

    return (
        <Box
            flex={1}
            backgroundColor="#1E40AF"
            alignItems="center"
            justifyContent="center"
        >
            <VStack space="lg" alignItems="center">
                {/* Animated Logo Icon */}
                <Animated.View
                    style={{
                        opacity: fadeAnim,
                        transform: [{ scale: scaleAnim }],
                    }}
                >
                    <Box
                        width={120}
                        height={120}
                        borderRadius={60}
                        backgroundColor="rgba(255, 255, 255, 0.15)"
                        alignItems="center"
                        justifyContent="center"
                        marginBottom={20}
                    >
                        <Box
                            width={100}
                            height={100}
                            borderRadius={50}
                            backgroundColor="rgba(255, 255, 255, 0.2)"
                            alignItems="center"
                            justifyContent="center"
                        >
                            <WalletIcon fill="white" width={60} height={60} />
                        </Box>
                    </Box>
                </Animated.View>

                {/* App Name */}
                <Animated.View style={{ opacity: fadeAnim }}>
                    <VStack space="xs" alignItems="center">
                        <Text fontSize={32} fontWeight={700} color="$white" letterSpacing={0.5}>
                            Kash Chain
                        </Text>
                        <Text fontSize={14} color="rgba(255, 255, 255, 0.85)" fontWeight={400}>
                            Send • Buy • Pay with Crypto
                        </Text>
                    </VStack>
                </Animated.View>

                {/* Loading Indicator */}
                <Box marginTop={40}>
                    <Spinner color="$white" size="small" />
                </Box>
            </VStack>

            {/* Footer */}
            <Box position="absolute" bottom={40}>
                <Text fontSize={12} color="rgba(255, 255, 255, 0.6)" fontWeight={400}>
                    Powered by USDT Stablecoin
                </Text>
            </Box>
        </Box>
    );
};

export default SplashScreen;
