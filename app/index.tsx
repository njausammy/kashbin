import React, { useEffect, useState } from 'react';
import { router } from 'expo-router';
import SplashScreen from "@/src/components/SplashScreen";
import LocalStorage from "@/src/utils/LocalStorage";

const App: React.FC = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [hasOnboarded, setHasOnboarded] = useState(false);

  useEffect(() => {
    const checkOnboarding = async () => {
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
        router.replace('/onboarding');
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
