import { View, Text, Image, TouchableOpacity, Linking } from 'react-native';
import { aboutUs, angleRight, helpCenter, privacyPolicy, support, termsAndConditions } from '../../constants';
import { router } from 'expo-router';

const settings = [
    {
        id: 1,
        icon: aboutUs,
        title: 'About us',
        route: 'https://xrh-web.vercel.app'
    },
    {
        id: 2,
        icon: privacyPolicy,
        title: 'Privacy policy',
        route: 'https://xrh-web.vercel.app'
    },
    {
        id: 3,
        icon: termsAndConditions,
        title: 'Terms & conditions',
        route: 'https://xrh-web.vercel.app'
    },
]

const ApplicationSettings = () => {
    return (
        <View className='mt-[30px] bg-white p-[18px] rounded-[10px]' style={{ padding: 20, backgroundColor: '#fff', shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.8, shadowRadius: 2, elevation: 10 }}>
            <Text className='font-rbold text-[25px]'>Application Settings</Text>

            {settings.map(item => (
                <TouchableOpacity key={item.id} className='flex items-center justify-between flex-row' onPress={() => { item.route.startsWith("https") ? Linking.openURL(item.route) : router.push(`/${item.route}`) }}>
                    <View className='flex items-center justify-start flex-row gap-2 mt-3'>
                        <Image
                            source={item.icon}
                            resizeMode='contain'
                            className='w-[23px] h-[23px]'
                        />
                        <Text className='font-rregular text-lg'>{item.title}</Text>
                    </View>
                    <View className='flex items-center justify-end flex-row gap-2 mt-3'>
                        <Image
                            source={angleRight}
                            resizeMode='contain'
                            className='w-[13px] h-[13px]'
                        />
                    </View>
                </TouchableOpacity>
            ))}
        </View>
    );
}

export default ApplicationSettings;