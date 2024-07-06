import { View, Text, Image, TouchableOpacity } from 'react-native';
import { aboutUs, angleRight, helpCenter, privacyPolicy, support, termsAndConditions } from '../../constants';
import { router } from 'expo-router';

const settings = [
    {
        id: 1,
        icon: support,
        title: 'Support us',
        route: 'support-us'
    },
    {
        id: 2,
        icon: helpCenter,
        title: 'Help center',
        route: 'help-center'
    },
    {
        id: 3,
        icon: privacyPolicy,
        title: 'Privacy policy',
        route: 'privacy-policy'
    },
    {
        id: 4,
        icon: termsAndConditions,
        title: 'Terms & conditions',
        route: 'terms-and-conditions'
    },
    {
        id: 5,
        icon: aboutUs,
        title: 'About us',
        route: 'about-us'
    },
]

const ApplicationSettings = () => {
    return (
        <View className='mt-[30px] bg-white shadow-lg p-[18px] rounded-[10px]'>
            <Text className='font-rbold text-[25px]'>Application Settings</Text>

            {settings.map(item => (
                <TouchableOpacity key={item.id} className='flex items-center justify-between flex-row' onPress={() => router.push(`/${item.route}`)}>
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