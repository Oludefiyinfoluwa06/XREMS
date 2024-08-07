import { Stack } from 'expo-router';

const ScreensLayout = () => {
    return (
        <Stack>
            <Stack.Screen
                name='profile'
                options={{ headerShown: false }}
            />
            <Stack.Screen
                name='edit-profile'
                options={{ headerShown: false }}
            />
            <Stack.Screen
                name='notifications'
                options={{ headerShown: false }}
            />
            <Stack.Screen
                name='saved'
                options={{ headerShown: false }}
            />
            <Stack.Screen
                name='wallet'
                options={{ headerShown: false }}
            />
            <Stack.Screen
                name='chat/[chat]'
                options={{ headerShown: false }}
            />
            <Stack.Screen
                name='properties/all-properties'
                options={{ headerShown: false }}
            />
            <Stack.Screen
                name='properties/[id]'
                options={{ headerShown: false }}
            />
            <Stack.Screen
                name='reviews/[id]'
                options={{ headerShown: false }}
            />
        </Stack>
    );
}

export default ScreensLayout;