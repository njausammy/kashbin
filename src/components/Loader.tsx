import React, { useEffect } from 'react';
import { Animated, Easing, StyleSheet } from 'react-native';
import { Box, VStack, View } from '@gluestack-ui/themed';
import MiddleGreenCircle from '../../src/components/Icons/green-loader';
import OuterCircle from '../../src/components/Icons/circle-loader';
import InnerRedCircle from '../../src/components/Icons/red-loader';

interface LoaderProps {
    iconComp?: React.ReactNode;
    disableAnimation?: boolean;
    iconPosition?: 'top' | 'bottom' | 'right' | 'left' | 'center';
    customComponent?: React.ReactNode;
}

const Loader = ({ iconComp, disableAnimation, iconPosition = 'center', customComponent }: LoaderProps) => {
    const spinValue = new Animated.Value(0);

    const spin = () => {
        spinValue.setValue(0);
        Animated.timing(spinValue, {
            toValue: 1,
            duration: 1500,
            easing: Easing.linear,
            useNativeDriver: true,
        }).start(() => spin());
    };

    useEffect(() => {
        if (!disableAnimation) {
            spin();
        }
    }, []);

    const rotateClockwise = spinValue.interpolate({
        inputRange: [0, 1],
        outputRange: ['0deg', '360deg'],
    });

    const rotateAntiClockwise = spinValue.interpolate({
        inputRange: [0, 1],
        outputRange: ['360deg', '0deg'],
    });

    const getIconPositionStyle = (innerCircleHeight: number) => {
        const halfHeight = innerCircleHeight / 2;
        switch (iconPosition) {
            case 'top':
                return { transform: [{ translateY: -halfHeight }] };
            case 'bottom':
                return { transform: [{ translateY: halfHeight }] };
            case 'right':
                return { transform: [{ translateX: halfHeight }] };
            case 'left':
                return { transform: [{ translateX: -halfHeight }] };
            default:
                return {};
        }
    };

    return (
        <Box>
            {customComponent ?
                <VStack justifyContent="center" alignItems="center">
                    <OuterCircle />
                    <View style={{ position: 'absolute' }}>
                        {customComponent}
                    </View>
                </VStack>:
                <VStack justifyContent="center" alignItems="center">
                    <OuterCircle />
                    <Animated.View style={{ position: 'absolute', transform: [{ rotate: rotateClockwise }] }}>
                        <MiddleGreenCircle />
                    </Animated.View>
                    <Animated.View style={{ position: 'absolute', transform: [{ rotate: rotateAntiClockwise }] }}>
                        <InnerRedCircle />
                    </Animated.View>
                    <View style={{ position: 'absolute', ...getIconPositionStyle(10) }}>
                        {iconComp ? iconComp : null}
                    </View>
                </VStack>
            }
        </Box>
    );
};

export default Loader;