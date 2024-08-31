import { Stack } from 'expo-router';
import { PointsSecondaryNavigation } from '@/src/components/home/header';


export default function HomeLayout() {

    return (
        <>
         <PointsSecondaryNavigation />
            <Stack
                screenOptions={{
                    headerShown: false
                }}
            >
                <Stack.Screen name="transfers" />
                <Stack.Screen name="offers" />
                <Stack.Screen name="deals" />
                <Stack.Screen name="coupons" />
            </Stack>
        </>
    );
}
