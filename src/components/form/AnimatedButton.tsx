import React, { useRef } from 'react';
import { Animated, Easing, StyleProp, ViewStyle } from 'react-native';
import { Button } from '@gluestack-ui/themed';

interface AnimatedButtonProps extends React.ComponentProps<typeof Button> {
    children: React.ReactNode;
    onPress?: () => void;
}

const AnimatedButton: React.FC<AnimatedButtonProps> = ({ children, ...props }) => {
    // Animated value for button scale
    const animationValue = useRef(new Animated.Value(1)).current;

    // Function to handle button press animation
    const animateButton = () => {
        Animated.sequence([
            Animated.timing(animationValue, {
                toValue: 0.94,  // Slightly shrink button for visual feedback
                duration: 100,
                useNativeDriver: true,
                easing: Easing.inOut(Easing.ease),
            }),
            Animated.timing(animationValue, {
                toValue: 1,  // Return to original size
                duration: 100,
                useNativeDriver: true,
                easing: Easing.inOut(Easing.ease),
            }),
        ]).start();
    };

    // Handle button press
    const handlePress = () => {
        animateButton();
        if (props.onPress) {
            props.onPress();
        }
    };

    return (
        <Animated.View
            style={[
                {
                    transform: [{ scale: animationValue }],  // Apply scaling animation
                } as StyleProp<ViewStyle>,
            ]}
        >
            <Button {...props} onPress={handlePress}>
                {children}
            </Button>
        </Animated.View>
    );
};

export default AnimatedButton;
