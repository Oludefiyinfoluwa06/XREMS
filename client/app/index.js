import { useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { router } from 'expo-router';
import { logo } from '../constants';

const SplashScreen = () => {
    useEffect(() => {
        const checkAuth = async () => {
            const token = await AsyncStorage.getItem('token');
            const isAdmin = await AsyncStorage.getItem('isAdmin');
            
            setTimeout(() => {
                if (token === null && isAdmin === null) {
                    return router.replace('/choose');
                }

                if (isAdmin) {
                    const isAgent = JSON.parse(isAdmin);
                    if (isAgent) {
                        return router.replace('/admin/dashboard');
                    } else {
                        return router.replace('/home');
                    }

                }

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