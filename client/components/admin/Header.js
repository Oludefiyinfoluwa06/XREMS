import { DrawerActions } from '@react-navigation/native';
import { useNavigation } from 'expo-router';
import { View, Text, TouchableOpacity, Image } from 'react-native';

import { menuIcon } from '../../assets/icons/admin';

const Header = ({ title }) => {
    const navigation = useNavigation();

    const openSidebar = () => {
        navigation.dispatch(DrawerActions.openDrawer());
    }

    return (
        <View className='flex flex-row items-center justify-start gap-5 py-4'>
            <TouchableOpacity onPress={openSidebar}>
                <Image
                    source={menuIcon}
                    resizeMode='contain'
                    className='w-[25px] h-[25px]'
                />
            </TouchableOpacity>
            <Text className='font-rbold text-xl'>{title}</Text>
        </View>
    );
}

export default Header;