import { Stack } from 'expo-router';

const ScreensLayout = () => {
    return (
        <Stack>
            <Stack.Screen
                name='profile'
                options={{ headerShown: false }}
            />
        </Stack>
    );
}

export default ScreensLayout;