import { useEffect, useState } from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import { router } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { angleRight, user } from '../../constants';

const ProfileInfo = () => {
    const [userData, setUserData] = useState(null);
    const [image, setImage] = useState(null);

    useEffect(() => {
        const getUserDetails = async () => {
            const user = await AsyncStorage.getItem('user');
            setUserData(JSON.parse(user));

            const profileImg = await AsyncStorage.getItem('profile');
            setImage(profileImg);
        };

        getUserDetails();
    }, []);

    return (
        <View className='mt-[30px] flex items-center justify-between flex-row'>
            <View className='flex items-center justify-between flex-row gap-3'>
                <Image
                    source={image !== null && image !== '' ? { uri: image } : user}
                    resizeMode='cover'
                    className='w-[50px] h-[50px] rounded-full'
                />
                <View>
                    <Text className='font-rregular text-[20px] font-bold'>{userData?.fullname}</Text>
                    <Text>{userData?.email}</Text>
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