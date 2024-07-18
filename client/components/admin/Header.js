import { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import { DrawerActions } from '@react-navigation/native';
import { router, useNavigation } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { menuIcon, profile2 } from '../../assets/icons/admin';

const Header = ({ title, icon, iconRoute }) => {
    const [image, setImage] = useState(null);

    useEffect(() => {
        const getUser = async () => {
            const profileImg = await AsyncStorage.getItem('profile');
            setImage(profileImg);
        }

        getUser();
    }, []);

    const navigation = useNavigation();

    const openSidebar = () => {
        navigation.dispatch(DrawerActions.openDrawer());
    }

    return (
        <View className='flex flex-row items-center justify-between p-[30px] bg-white'>
            <View className='flex items-center justify-start flex-row'>
                <TouchableOpacity onPress={openSidebar}>
                    <Image
                        source={menuIcon}
                        resizeMode='contain'
                        className='w-[25px] h-[25px] mr-2'
                    />
                </TouchableOpacity>
                <Text className='text-2xl text-blue font-rbold'>{title}</Text>
            </View>
            <View className='flex items-center justify-end flex-row'>
                {icon && <TouchableOpacity onPress={() => router.push(`${iconRoute}`)}>
                    <Image
                        source={icon}
                        resizeMode='contain'
                        className='w-[30px] h-[30px] mr-4'
                    />
                </TouchableOpacity>}
                <TouchableOpacity onPress={() => router.push('/admin/profile')}  className='bg-white rounded-full relative w-[30px] h-[30px]'>
                    <Image
                        source={image !== null && image !== '' ? { uri: image } : profile2}
                        resizeMode='cover'
                        className='w-full h-full absolute top-0 left-0 rounded-full'
                    />
                </TouchableOpacity>
            </View>
        </View>
    );
}

export default Header;