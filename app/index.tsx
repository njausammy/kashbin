import React, { useEffect, useState } from 'react';
import Constants from 'expo-constants';
import { router } from 'expo-router';
import SplashScreen from "@/src/components/SplashScreen";
import LocalStorage from "@/src/utils/LocalStorage";

const isDeveloperMode = Constants.expoConfig?.extra?.DEVELOPER_MODE;

const App: React.FC = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [hasOnboarded, setHasOnboarded] = useState(false);

  useEffect(() => {
    const checkOnboarding = async () => {
      if (isDeveloperMode) {
        await LocalStorage.removeItem('hasOnboarded');
      }
      const value = await LocalStorage.getItem('hasOnboarded');
      if (value === 'onboard') {
        setHasOnboarded(true);
      }
      setIsLoading(false);
    };

    checkOnboarding();
  }, []);

  useEffect(() => {
    if (!isLoading) {
      if (!hasOnboarded) {
        router.replace('/points/transffer/redeem');
      } else {
        router.replace('/auth/login');
      }
    }
  }, [isLoading, hasOnboarded, router]);

  if (isLoading) {
    return <SplashScreen />
  }
};

export default App;
