import { useEffect } from 'react';

import { router } from 'expo-router';
import { View, Text, TouchableOpacity, Image, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { useAuth } from '../../contexts/AuthContext';
import { notification, user } from '../../constants';
import SearchBar from '../../components/home/SearchBar';

const Home = () => {
    useEffect(() => {
        const checkAuth = async () => {
            const token = await AsyncStorage.getItem('token');
            const user = await AsyncStorage.getItem('user');

            if (!user == '' && !token) {
                return router.replace('/sign-in');
            }

            return;
        }

        checkAuth();
    }, []);

    return (
        <SafeAreaView>
            <ScrollView className='p-[20px] h-full bg-white'>
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

                <SearchBar />
            </ScrollView>
        </SafeAreaView>
    );
}

export default Home;