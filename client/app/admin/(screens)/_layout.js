import { Stack } from 'expo-router';

const ScreensLayout = () => {
    return (
        <Stack>
            <Stack.Screen
                name='chat/[chat]'
                options={{ headerShown: false }}
            />
        </Stack>
    );
}

export default ScreensLayout;