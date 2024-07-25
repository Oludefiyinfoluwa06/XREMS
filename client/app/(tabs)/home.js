import { useEffect, useState } from 'react';
import { router } from 'expo-router';
import { View, TouchableOpacity, Image, ScrollView, StatusBar, Text, RefreshControl } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { notification } from '../../constants';
import SearchBar from '../../components/SearchBar';
import FeaturedUnits from '../../components/home/FeaturedUnits';
import TopPlace from '../../components/home/TopPlace';
import { useProperty } from '../../contexts/PropertyContext';
import NewProperties from '../../components/home/NewProperties';
import { useAuth } from '../../contexts/AuthContext';
import { profile } from '../../assets/icons/admin';
import { useNotification } from '../../contexts/NotificationContext';

const Home = () => {
    const [refreshing, setRefreshing] = useState(false);
    const { getUser, user } = useAuth();
    const { getAllProperties, featuredProperties, topPlace, newProperties } = useProperty();
    const { getUnreadNotifications, notificationCount, notifications } = useNotification();

    useEffect(() => {
        const checkAuth = async () => {
            await getUser();

            const token = await AsyncStorage.getItem('token');
            
            setTimeout(() => {
                if (token === null) {
                    return router.replace('/sign-in');
                }                
            }, 3000);
        }

        checkAuth();
    }, []);

    useEffect(() => {
        const getProperties = async () => {
            await getAllProperties();
        }

        getProperties();
    }, []);

    useEffect(() => {
        getUnreadNotifications();
    }, [notifications]);

    const onRefresh = () => {
        setRefreshing(true);
        setTimeout(() => {
            setRefreshing(false);
        }, 2000);
    }

    return (
        <SafeAreaView>
            <ScrollView className='h-full bg-white'
                refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
            >
                <View className='flex items-center justify-between flex-row p-[20px]'>
                    <TouchableOpacity
                        onPress={() => router.push('/profile')}
                    >
                        <Image
                            source={user !== null && user?.profileImg !== '' ? { uri: user?.profileImg } : profile}
                            resizeMode='cover'
                            className='w-[40px] h-[40px] rounded-full'
                        />
                    </TouchableOpacity>

                    <TouchableOpacity
                        className='relative flex items-center justify-content p-[13px] rounded-lg bg-white'
                        style={{ padding: 20, backgroundColor: '#fff', shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.1, shadowRadius: 10, elevation: 200 }}
                        onPress={() => router.push('/notifications')}
                    >
                        <Image
                            source={notification}
                            resizeMode='contain'
                            className='w-[24px] h-[24px]'
                        />
                        {notificationCount > 0 && (
                            <View className='absolute top-[-4px] right-[-4px] pb-1 px-2 rounded-full bg-blue'>
                                <Text className='font-rbold text-white text-sm'>{notificationCount}</Text>
                            </View>
                        )}
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