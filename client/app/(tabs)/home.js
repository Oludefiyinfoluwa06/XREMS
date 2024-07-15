import { useEffect } from 'react';

import { router } from 'expo-router';
import { View, TouchableOpacity, Image, ScrollView, StatusBar, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { notification, user } from '../../constants';
import SearchBar from '../../components/SearchBar';
import FeaturedUnits from '../../components/home/FeaturedUnits';
import TopPlace from '../../components/home/TopPlace';
import { useProperty } from '../../contexts/PropertyContext';
import NewProperties from '../../components/home/NewProperties';

const Home = () => {
    const { getAllProperties, featuredProperties, topPlace, newProperties } = useProperty();

    useEffect(() => {
        const checkAuth = async () => {
            const token = await AsyncStorage.getItem('token');
            const userData = await AsyncStorage.getItem('user');

            if (userData === null && token === null) {
                return router.replace('/sign-in');
            }

            return;
        }

        checkAuth();
    }, []);

    useEffect(() => {
        const getProperties = async () => {
            await getAllProperties();
        }

        getProperties();
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
                <FeaturedUnits featuredProperties={featuredProperties} />
                <TopPlace topPlace={topPlace} />
                <NewProperties newProperties={newProperties} />
                <View className='mt-[20px]' />
            </ScrollView>

            <StatusBar backgroundColor='#FFFFFF' />
        </SafeAreaView>
    );
}

export default Home;