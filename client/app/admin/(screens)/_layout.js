import { Stack } from 'expo-router';

const ScreensLayout = () => {
    return (
        <Stack>
            <Stack.Screen
                name='chat/[chat]'
                options={{ headerShown: false }}
            />
            <Stack.Screen
                name='property/[id]'
                options={{ headerShown: false }}
            />
            <Stack.Screen
                name='property/add'
                options={{ headerShown: false }}
            />
            <Stack.Screen
                name='property/edit/[id]'
                options={{ headerShown: false }}
            />
            <Stack.Screen
                name='edit-profile'
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