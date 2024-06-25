import { View, Text, Image, TouchableOpacity } from 'react-native';
import { aboutUs, angleRight, helpCenter, support, termsAndConditions } from '../../constants';

const settings = [
    {
        id: 1,
        icon: support,
        title: 'Support',
        route: '/support'
    },
    {
        id: 2,
        icon: helpCenter,
        title: 'Help center',
        route: '/help-center'
    },
    {
        id: 3,
        icon: termsAndConditions,
        title: 'Terms & conditions',
        route: '/terms-and-conditions'
    },
    {
        id: 4,
        icon: aboutUs,
        title: 'About us',
        route: '/about-us'
    },
]

const ApplicationSettings = () => {
    return (
        <View className='mt-[30px] bg-white shadow-lg p-[18px] rounded-[10px]'>
            <Text className='font-rregular text-[25px]'>Application Settings</Text>

            {settings.map(item => (
                <View key={item.id} className='flex items-center justify-between flex-row'>
                    <View className='flex items-center justify-start flex-row gap-2 mt-3'>
                        <Image
                            source={item.icon}
                            resizeMode='contain'
                            className='w-[23px] h-[23px]'
                        />
                        <Text className='font-rregular text-lg'>{item.title}</Text>
                    </View>
                    <TouchableOpacity className='flex items-center justify-end flex-row gap-2 mt-3'>
                        <Image
                            source={angleRight}
                            resizeMode='contain'
                            className='w-[13px] h-[13px]'
                        />
                    </TouchableOpacity>
                </View>
            ))}
        </View>
    );
}

export default ApplicationSettings;