import { useEffect } from 'react';

import { router } from 'expo-router';
import { View, TouchableOpacity, Image, ScrollView, StatusBar } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { notification, user } from '../../constants';
import SearchBar from '../../components/home/SearchBar';
import FeaturedUnits from '../../components/home/FeaturedUnits';
import TopPlace from '../../components/home/TopPlace';

const Home = () => {
    useEffect(() => {
        const checkAuth = () => {
            const token = AsyncStorage.getItem('token');
            const user = AsyncStorage.getItem('user');

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
                    <TouchableOpacity
                        onPress={() => router.push('/profile')}
                    >
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
                <FeaturedUnits />
                <TopPlace />
            </ScrollView>

            <StatusBar backgroundColor={`#FFF`} />
        </SafeAreaView>
    );
}

export default Home;