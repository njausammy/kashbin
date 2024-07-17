import { Stack}  from 'expo-router';
import HomeHeader from '@/src/components/home/header';


export default function HomeLayout() {




    return (
        <>
            <HomeHeader />
            <Stack
                screenOptions={{
                    headerShown: false
                }}
            >
                <Stack.Screen name="shops" />
                <Stack.Screen name="points" />
                <Stack.Screen name="contacts" />
            </Stack>
        </>
    );
}
