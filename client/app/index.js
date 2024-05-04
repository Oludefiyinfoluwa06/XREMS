import { useEffect } from 'react';

import { Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { router } from 'expo-router';
import { logo } from '../constants';

const SplashScreen = () => {
    useEffect(() => {        
        setTimeout(() => {
            router.replace('/welcome');
        }, 3000);
    }, []);

    return (
        <SafeAreaView className='items-center justify-center min-h-screen'>
            <Image
                source={logo}
                resizeMode='contain'
                className='w-[200px] h-[200px]'
            />
        </SafeAreaView>
    );
}

export default SplashScreen;