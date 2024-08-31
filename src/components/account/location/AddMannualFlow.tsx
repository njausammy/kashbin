import React, { useState } from 'react';
import { VStack } from "@gluestack-ui/themed";
import { router } from 'expo-router';
import LocationForm from './LocationForm';
import PageHeader from '../../PageHeader';
import LocationProcessingScreen from './LocationProcessingScreen';

const ManualLocationSetupStepper = () => {
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
            {currentStep === 1 ? (
                <LocationForm
                    // onLocateMe={handleLocateMe}
                    onLocationSearch={() => setCurrentStep(2)}
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

export default ManualLocationSetupStepper;