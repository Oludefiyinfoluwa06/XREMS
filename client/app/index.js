import { useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { router } from 'expo-router';
import { logo } from '../constants';
import { useAuth } from '../contexts/AuthContext';

const SplashScreen = () => {
    const { getUser, user } = useAuth();

    useEffect(() => {
        const checkAuth = async () => {
            await getUser();

            const token = await AsyncStorage.getItem('token');
            
            setTimeout(() => {
                if (token === null) {
                    return router.replace('/choose');
                }

                if (user?.isAdmin) return router.replace('/admin/dashboard');

                return router.replace('/home');
            }, 3000);
        }

        checkAuth();
    }, []);

    return (
        <SafeAreaView className='items-center justify-center h-full bg-white'>
            <Image
                source={logo}
                resizeMode='contain'
                className='w-[200px] h-[200px]'
            />
        </SafeAreaView>
    );
}

export default SplashScreen;