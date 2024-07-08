import { DrawerActions } from '@react-navigation/native';
import { router, useNavigation } from 'expo-router';
import { View, Text, TouchableOpacity, Image } from 'react-native';

import { menuIcon } from '../../assets/icons/admin';
import { user } from '../../constants';

const Header = ({ title }) => {
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
            <TouchableOpacity onPress={() => router.push('/admin/profile')}>
                <Image
                    source={user}
                    resizeMode='contain'
                    className='w-[25px] h-[25px]'
                />
            </TouchableOpacity>
        </View>
    );
}

export default Header;