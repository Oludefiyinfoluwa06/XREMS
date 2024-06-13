import { View, Text, Image, TouchableOpacity } from 'react-native';
import { angleRight, bookmark, logout, payment, security } from '../../constants';

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
]

const MyAccount = () => {
    return (
        <View className='mt-[30px] bg-white shadow-lg p-[18px] rounded-[10px]'>
            <Text className='text-[25px]'>My Account</Text>

            {settings.map(item => (
                <View key={item.id} className='flex items-center justify-between flex-row'>
                    <View className='flex items-center justify-start flex-row gap-2 mt-3'>
                        <Image
                            source={item.icon}
                            resizeMode='contain'
                            className='w-[23px] h-[23px]'
                        />
                        <Text className='text-lg'>{item.title}</Text>
                    </View>
                    {item.route !== '' && (
                        <TouchableOpacity className='flex items-center justify-end flex-row gap-2 mt-3'>
                            <Image
                                source={angleRight}
                                resizeMode='contain'
                                className='w-[13px] h-[13px]'
                            />
                        </TouchableOpacity>
                    )}
                </View>
            ))}
        </View>
    );
}

export default MyAccount;