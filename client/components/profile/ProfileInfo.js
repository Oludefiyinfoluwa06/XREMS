import { View, Text, Image, TouchableOpacity } from 'react-native';
import { angleRight, user } from '../../constants';

const ProfileInfo = () => {
    return (
        <View className='mt-[30px] flex items-center justify-between flex-row'>
            <View className='flex items-center justify-between flex-row gap-3'>
                <Image
                    source={user}
                    resizeMode='contain'
                    className='w-[50px] h-[50px]'
                />
                <View>
                    <Text className='font-rregular text-[20px] font-bold'>Olusegun Samuel</Text>
                    <Text>olusegunsam@gmail.com</Text>
                </View>
            </View>
            <TouchableOpacity
                className='flex items-center justify-content flex-row gap-2'
            >
                <Text className='font-rregular text-[15px]'>Edit</Text>
                <Image
                    source={angleRight}
                    resizeMode='contain'
                    className='w-[14px] h-[14px]'
                />
            </TouchableOpacity>
        </View>
    );
}

export default ProfileInfo;