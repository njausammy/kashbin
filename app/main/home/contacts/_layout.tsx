import { Stack } from 'expo-router';
import { ContactsSecondaryNavigation } from '@/src/components/home/header';


export default function HomeLayout() {

    return (
        <>
         <ContactsSecondaryNavigation />

            <Stack
                screenOptions={{
                    headerShown: false
                }}
            >
                <Stack.Screen name="index" />
            </Stack>
        </>
    );
}
