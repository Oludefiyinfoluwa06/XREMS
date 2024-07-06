import { DrawerContentScrollView, DrawerItemList } from '@react-navigation/drawer';
import { View, Image, TouchableOpacity, Text } from 'react-native';

import { logo, logo2, logOut } from '../../constants';
import { useAuth } from '../../contexts/AuthContext';

const CustomDrawerContent = (props) => {
    const { logout } = useAuth();
    
    const handleLogout = async () => {
        await logout();
    }

    return (
        <View style={{ flex: 1, height: '100vh' }}>
            <DrawerContentScrollView
                {...props} 
                scrollEnabled={false}
            >
                <View className='flex flex-row items-center justify-start gap-2 my-2 pl-2'>
                    <Image
                        source={logo}
                        resizeMode='contain'
                        className='w-[60px] h-[60px]'
                    />
                    <Image
                        source={logo2}
                        resizeMode='contain'
                        className='w-[100px] h-[30px]'
                    />
                </View>
                <DrawerItemList {...props} />

            </DrawerContentScrollView>

            <TouchableOpacity 
                className='flex flex-row items-center justify-start absolute left-[15px] bottom-[20px] w-full' 
                onPress={handleLogout}
            >
                <Image
                    source={logOut}
                    resizeMode='contain'
                    className='w-[30px] h-[30px] mr-2'
                />
                <Text>Logout</Text>
            </TouchableOpacity>
        </View>
    );
}

export default CustomDrawerContent;