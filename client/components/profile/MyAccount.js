import { View, Text, Image, TouchableOpacity } from 'react-native';
import { angleRight, bookmark, logout, payment, security } from '../../constants';
import { useAuth } from '../../contexts/AuthContext';
import { router } from "expo-router";

const settings = [
    {
        id: 1,
        icon: security,
        title: 'Security',
        route: '/security'
    },
    {
        id: 2,
        icon: payment,
        title: 'Payment',
        route: '/payment'
    },
    {
        id: 3,
        icon: bookmark,
        title: 'Saved',
        route: '/saved'
    },
    {
        id: 4,
        icon: logout,
        title: 'Logout',
        route: ''
    },
];

const MyAccount = () => {
    const { logout } = useAuth();
    
    const handleLogout = async () => {
        await logout();
        router.replace('/home');
    }
    
    return (
        <View className='mt-[30px] bg-white shadow-lg p-[18px] rounded-[10px]'>
            <Text className='font-rregular text-[25px]'>My Account</Text>

            {settings.map(item => (
                <TouchableOpacity key={item.id} className='flex items-center justify-between flex-row' onPress={item.route === '' ? handleLogout() : router.push(item.route)}>
                    <View className='flex items-center justify-start flex-row gap-2 mt-3'>
                        <Image
                            source={item.icon}
                            resizeMode='contain'
                            className='w-[23px] h-[23px]'
                        />
                        <Text className='font-rregular text-lg'>{item.title}</Text>
                    </View>
                    {item.route !== '' && (
                        <View className='flex items-center justify-end flex-row gap-2 mt-3'>
                            <Image
                                source={angleRight}
                                resizeMode='contain'
                                className='w-[13px] h-[13px]'
                            />
                        </View>
                    )}
                </TouchableOpacity>
            ))}
        </View>
    );
}

export default MyAccount;