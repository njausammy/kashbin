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
      if (value !== null) {
        setHasOnboarded(true);
      }
      setIsLoading(false);
    };

    checkOnboarding();
  }, []);

  useEffect(() => {
    if (!isLoading) {
      if (!hasOnboarded) {
        router.replace('/auth/signup');
      } else {
        router.replace('/main');
      }
    }
  }, [isLoading, hasOnboarded, router]);

  if (isLoading) {
    return <SplashScreen />
  }
};

export default App;
