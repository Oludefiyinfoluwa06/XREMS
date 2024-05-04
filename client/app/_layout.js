import { router, Stack } from 'expo-router';
import { useEffect } from 'react';

const RootLayout = () => {
    useEffect(() => {
        const timer = setTimeout(() => {
            router.push('/sign-up');
        }, 3000);

        return () => clearTimeout(timer);
    }, []);

    return (
        <Stack>
            <Stack.Screen
                name='index'
                options={{ headerShown: false }}
            />
            {/* <Stack.Screen
                name='welcome'
                options={{ headerShown: false }}
            /> */}
            <Stack.Screen
                name='(auth)'
                options={{ headerShown: false }}
            />
            <Stack.Screen
                name='(screens)'
                options={{ headerShown: false }}
            />
        </Stack>
    );
}

export default RootLayout;