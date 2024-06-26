import { Stack } from 'expo-router';
import { StatusBar } from 'react-native';

const AdminLayout = () => {    
    return (
        <Stack>
            <Stack.Screen
                name='(auth)'
                options={{ headerShown: false }}
            />
            <Stack.Screen
                name='(drawer)'
                options={{ headerShown: false }}
            />
            {/* <Stack.Screen
                name='(screens)'
                options={{ headerShown: false }}
            /> */}
            
            <StatusBar backgroundColor='#FFFFFF' />
        </Stack>
            
    );
}

export default AdminLayout;