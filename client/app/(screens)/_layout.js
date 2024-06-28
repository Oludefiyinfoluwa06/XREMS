import { Stack } from 'expo-router';

const ScreensLayout = () => {
    return (
        <Stack>
            <Stack.Screen
                name='profile'
                options={{ headerShown: false }}
            />
            <Stack.Screen
                name='featured-units'
                options={{ headerShown: false }}
            />
            <Stack.Screen
                name='notifications'
                options={{ headerShown: false }}
            />
        </Stack>
    );
}

export default ScreensLayout;