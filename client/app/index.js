import { router } from 'expo-router';
import { useEffect } from 'react';
import { Image, Text, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const Home = () => {
    useEffect(() => {
        const timer = setTimeout(() => {
            router.replace('/sign-in');
        }, 3000);

        return () => clearTimeout(timer);
    }, []);

    return (
        <SafeAreaView className='items-center justify-center min-h-screen'>
            <Image
                source={require('../assets/images/logo.png')}
                resizeMode='contain'
                className='w-[200px] h-[200px]'
            />
            <TouchableOpacity onPress={() => router.replace('sign-up')}><Text>Signup</Text></TouchableOpacity>
        </SafeAreaView>
    );
}

export default Home;