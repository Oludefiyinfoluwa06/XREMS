import { useEffect, useState } from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import { router } from 'expo-router';
import { angleRight } from '../../constants';
import { useAuth } from '../../contexts/AuthContext';
import { profile } from '../../assets/icons/admin';

const ProfileInfo = () => {
    const { getUser, user } = useAuth();

    useEffect(() => {
        getUser();
    }, []);

    return (
        <View className='mt-[30px] flex items-center justify-between flex-row'>
            <View className='flex items-center justify-between flex-row gap-3'>
                <Image
                    source={user !== null && user?.profileImg !== '' ? { uri: user?.profileImg } : profile}
                    resizeMode='cover'
                    className='w-[50px] h-[50px] rounded-full'
                />
                <View>
                    <Text className='font-rregular text-[20px] font-bold'>{user?.fullname}</Text>
                    <Text>{user?.email}</Text>
                </View>
            </View>
            <TouchableOpacity
                className='flex items-center justify-content flex-row gap-2'
                onPress={() => router.push('/edit-profile')}
            >
                <Text className='font-rregular text-[15px]'>Edit</Text>
                <Image
                    source={angleRight}
                    resizeMode='contain'
                    className='w-[14px] h-[14px]'
                />
            </TouchableOpacity>
        </View>
    );
}

export default ProfileInfo;