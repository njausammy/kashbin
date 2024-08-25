import React, { useState } from 'react';
import { VStack } from "@gluestack-ui/themed";
import { router } from 'expo-router';
import GeoLocationScreen from './GeoLocationScreen';
import PageHeader from '../../PageHeader';
import LocationProcessingScreen from './LocationProcessingScreen';

const LocationSetupStepper = () => {
    const [currentStep, setCurrentStep] = useState(1);

    const handleLocateMe = () => {
        setCurrentStep(2);
    };

    const handleSkip = () => {
    };

    const handleContinue = () => {
    };



    return (
        <VStack backgroundColor="$white" flex={1}>
            <PageHeader value={100} />
            {currentStep === 1 ? (
                <GeoLocationScreen
                    // onLocateMe={handleLocateMe}
                    onLocationFound={() => setCurrentStep(2)}
                />
            ) : (
                <LocationProcessingScreen
                // onContinue={handleContinue}
                // onSkip={handleSkip}
                />
            )}
        </VStack>
    );
};

export default LocationSetupStepper;