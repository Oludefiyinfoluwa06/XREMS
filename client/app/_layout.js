import { Stack } from 'expo-router';
import { AuthProvider } from '../contexts/AuthContext';

const RootLayout = () => {
    return (
        <AuthProvider>
            <Stack>
                <Stack.Screen
                    name='index'
                    options={{ headerShown: false }}
                />
                <Stack.Screen
                    name='welcome'
                    options={{ headerShown: false }}
                />
                <Stack.Screen
                    name='(auth)'
                    options={{ headerShown: false }}
                />
                <Stack.Screen
                    name='(tabs)'
                    options={{ headerShown: false }}
                />
            </Stack>
        </AuthProvider>
    );
}

export default RootLayout;