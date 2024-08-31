import React from 'react';
import { Text, VStack } from "@gluestack-ui/themed";
import Button from '@/src/components/form/AnimatedButton';
import Loader from '../../Loader';
import LocationAvatar from '../../Icons/location-icon'
import { Pressable } from 'react-native';

interface IProps {
    onLocationFound: () => void
}

const GeoLocationScreen = ({ onLocationFound }: IProps) => {
    const handleLocateMe = () => {
        // Implement location detection logic here
        onLocationFound()
    };

    const handleEnterAddress = () => {
        // Navigate to manual address entry screen
    };

    const handleSkip = () => {
        // Skip location entry
    };

    return (
        <VStack backgroundColor="$white" flex={1} alignItems="center" paddingBottom={40}>
            <VStack width='100%' flex={1}>
                <VStack flex={1} justifyContent="center" padding={20}>
                    <Text color='#2A2A2A' fontSize={20} fontWeight={600} marginBottom={10}>
                        Location
                    </Text>
                    <Text color='#5A5A5A' fontSize={14} marginBottom={40}>
                        Tap "Locate Me" to create your address or Enter Address Manually
                    </Text>
                    <VStack justifyContent="space-around" alignSelf="center" flex={1} width="100%">
                        <Loader iconPosition="top" disableAnimation iconComp={<LocationAvatar />} />
                        <VStack width="100%">
                            <Button
                                backgroundColor="#DB1E36"
                                borderRadius={50}
                                paddingHorizontal={10}
                                height={56}
                                width="100%"
                                onPress={handleLocateMe}
                                marginBottom={16}
                            >
                                <Text color='white'>Locate Me</Text>
                            </Button>
                            <Button
                                borderColor='#DB1E36'
                                borderWidth={1}
                                backgroundColor="$white"
                                borderRadius={50}
                                paddingHorizontal={10}
                                height={56}
                                width="100%"
                                onPress={handleEnterAddress}
                                marginBottom={16}
                            >
                                <Text color='#DB1E36'>Enter Address Manually</Text>
                            </Button>
                        </VStack>
                    </VStack>

                    <Pressable onPress={onLocationFound}>
                        <Text color="#5A5A5A" alignSelf="center" >
                            Skip
                        </Text>
                    </Pressable>

                </VStack>
            </VStack>
        </VStack>
    );
};

export default GeoLocationScreen;