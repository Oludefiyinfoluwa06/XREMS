import { useEffect } from 'react';

import { router } from 'expo-router';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { useAuth } from '../../contexts/AuthContext';
import { notification, user } from '../../constants';

const Home = () => {
    const { logout } = useAuth();

    useEffect(() => {
        const checkAuth = async () => {
            const token = await AsyncStorage.getItem('token');
            const user = await AsyncStorage.getItem('user');

            setTimeout(() => {
                if (!user == '' && !token) {
                    return router.replace('/sign-in');
                }
    
                return;
                
            }, 3000);
        }

        checkAuth();
    }, []);

    const handleLogout = async () => {
        await logout();
    }

    return (
        <SafeAreaView className='p-[20px] bg-white'>
            <View className='flex items-center justify-between flex-row'>
                <TouchableOpacity onPress={() => router.push('profile')}>
                    <Image
                        source={user}
                        resizeMode='contain'
                        className='w-[30px] h-[30px]'
                    />
                </TouchableOpacity>

                <TouchableOpacity
                    className='flex items-center justify-content p-[13px] rounded-lg bg-white shadow-lg'
                    onPress={() => router.push('/notifications')}
                >
                    <Image
                        source={notification}
                        resizeMode='contain'
                        className='w-[24px] h-[24px]'
                    />
                </TouchableOpacity>
            </View>
            <TouchableOpacity onPress={handleLogout} className=''>
                <Text>Logout</Text>
            </TouchableOpacity>
        </SafeAreaView>
    );
}

export default Home;