import { View, Text, Image, TouchableOpacity } from 'react-native';
import { angleRight, bookmark, logOut, payment, security } from '../../constants';
import { router } from "expo-router";

const MyAccount = ({ setShowLogoutModal }) => {
    const settings = [
        // {
        //     id: 1,
        //     icon: security,
        //     title: 'Security',
        //     route: '/security'
        // },
        {
            id: 2,
            icon: payment,
            title: 'Wallet',
            route: '/wallet'
        },
        {
            id: 3,
            icon: bookmark,
            title: 'Saved',
            route: '/saved'
        },
        {
            id: 4,
            icon: logOut,
            title: 'Logout',
            route: ''
        },
    ];    
    
    return (
        <View className='mt-[30px] bg-white p-[18px] rounded-[10px]' style={{ padding: 20, backgroundColor: '#fff', shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.8, shadowRadius: 2, elevation: 5 }}>
            <Text className='font-rbold text-[25px]'>My Account</Text>

            {settings.map(item => (
                <TouchableOpacity
                    key={item.id}
                    className='flex items-center justify-between flex-row'
                    onPress={item.route === '' ? () => setShowLogoutModal(true) : () => router.push(item.route)}
                >
                    <View className='flex items-center justify-start flex-row gap-2 mt-3'>
                        <Image
                            source={item.icon}
                            resizeMode='contain'
                            className='w-[23px] h-[23px]'
                        />
                        <Text className='font-rregular text-xl'>{item.title}</Text>
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