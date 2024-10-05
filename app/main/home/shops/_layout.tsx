import { Stack } from 'expo-router';
import { ShopsSecondaryNavigation } from '@/src/components/home/header';


export default function HomeLayout() {

    return (
        <>
         <ShopsSecondaryNavigation />
            <Stack
                screenOptions={{
                    headerShown: false
                }}
            >
                <Stack.Screen name="near-me" />
                <Stack.Screen name="services" />
            </Stack>
        </>
    );
}
