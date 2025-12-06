import React, { useEffect, useState } from 'react';
import { router } from 'expo-router';
import SplashScreen from "@/src/components/SplashScreen";
import LocalStorage from "@/src/utils/LocalStorage";
import localDB from "@/src/utils/LocalDatabase";

// DEVELOPER MODE: Set to true to clear storage and reset app on launch
const CLEAR_STORAGE_ON_LAUNCH = false;

const App: React.FC = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const checkAppState = async () => {
      try {
        // Developer mode: Clear all storage
        if (CLEAR_STORAGE_ON_LAUNCH) {
          console.log('🔧 DEVELOPER MODE: Clearing all storage...');
          await localDB.clearAllUsers();
          await LocalStorage.removeItem('hasOnboarded');
          console.log('✅ Storage cleared successfully');
        }

        // Check if user has completed onboarding
        const hasOnboarded = await LocalStorage.getItem('hasOnboarded');

        // Check if user is logged in
        const currentUser = await localDB.getCurrentUser();

        if (!hasOnboarded || hasOnboarded !== 'onboard') {
          // First time user - show onboarding
          router.replace('/onboarding');
        } else if (currentUser) {
          // User is logged in - go to dashboard
          router.replace('/main');
        } else {
          // User has onboarded but not logged in
          router.replace('/auth/phone');
        }
      } catch (error) {
        console.error('Error checking app state:', error);
        router.replace('/onboarding');
      } finally {
        setIsLoading(false);
      }
    };

    checkAppState();
  }, []);

  if (isLoading) {
    return <SplashScreen />
  }

  return null;
};

export default App;
