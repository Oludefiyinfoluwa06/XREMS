import { useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { router } from 'expo-router';
import { logo } from '../constants';

const SplashScreen = () => {
    useEffect(() => {
        const checkAuth = () => {
            const token = AsyncStorage.getItem('token');
            const user = AsyncStorage.getItem('user');

            setTimeout(() => {
                if (!user == '' && !token) {
                    return router.replace('/welcome');
                }
                
                return router.replace('/home');
                
            }, 3000);
        }

        checkAuth();
    }, []);

    return (
        <SafeAreaView className='items-center justify-center min-h-screen bg-white'>
            <Image
                source={logo}
                resizeMode='contain'
                className='w-[200px] h-[200px]'
            />
        </SafeAreaView>
    );
}

export default SplashScreen;