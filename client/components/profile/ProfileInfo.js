import { useEffect, useState } from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { angleRight, user } from '../../constants';

const ProfileInfo = () => {
    const [userData, setUserData] = useState({});

    useEffect(() => {
        const getUserDetails = async () => {
            const user = await AsyncStorage.getItem('user');
            if (user) {
                setUserData(JSON.parse(user));
            }
        };

        getUserDetails();
    }, []);

    return (
        <View className='mt-[30px] flex items-center justify-between flex-row'>
            <View className='flex items-center justify-between flex-row gap-3'>
                <Image
                    source={userData.profileImg === '' ? user : userData.profileImg}
                    resizeMode='contain'
                    className='w-[50px] h-[50px]'
                />
                <View>
                    <Text className='font-rregular text-[20px] font-bold'>{userData?.fullname}</Text>
                    <Text>{userData?.email}</Text>
                </View>
            </View>
            <TouchableOpacity
                className='flex items-center justify-content flex-row gap-2'
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