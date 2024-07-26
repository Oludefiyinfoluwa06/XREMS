import { Stack } from 'expo-router';

const AdminAuthLayout = () => {
    return (
        <Stack>
            <Stack.Screen
                name='sign-up'
                options={{ headerShown: false }}
            />
            <Stack.Screen
                name='sign-in'
                options={{ headerShown: false }}
            />
            <Stack.Screen
                name='forgot-password'
                options={{ headerShown: false }}
            />
            <Stack.Screen
                name='reset-password'
                options={{ headerShown: false }}
            />
        </Stack>
    );
}

export default AdminAuthLayout;