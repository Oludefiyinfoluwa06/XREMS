import { View, Text, Image } from 'react-native';
import { globe, language } from '../../constants';

const Preferences = () => {
    return (
        <View className='mt-[30px] bg-white p-[18px] rounded-[10px]' style={{ padding: 20, backgroundColor: '#fff', shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.8, shadowRadius: 2, elevation: 5 }}>
            <Text className='font-rbold text-[25px]'>Preferences</Text>

            <View className='flex items-center justify-between flex-row'>
                <View className='flex items-center justify-start flex-row gap-2 mt-3'>
                    <Image
                        source={globe}
                        resizeMode='contain'
                        className='w-[25px] h-[25px]'
                    />
                    <Text className='font-rregular text-xl'>Country</Text>
                </View>
                <View className='flex items-center justify-end flex-row gap-2 mt-3'>
                    <Text className='font-rregular text-sm'>Nigeria</Text>
                    {/* <Image
                        source={angleRight}
                        resizeMode='contain'
                        className='w-[13px] h-[13px]'
                    /> */}
                </View>
            </View>
            <View className='flex items-center justify-between flex-row'>
                <View className='flex items-center justify-start flex-row gap-2 mt-3'>
                    <Image
                        source={language}
                        resizeMode='contain'
                        className='w-[25px] h-[25px]'
                    />
                    <Text className='font-rregular text-xl'>Language</Text>
                </View>
                <View className='flex items-center justify-end flex-row gap-2 mt-3'>
                    <Text className='font-rregular text-sm'>English</Text>
                    {/* <Image
                        source={angleRight}
                        resizeMode='contain'
                        className='w-[13px] h-[13px]'
                    /> */}
                </View>
            </View>
        </View>
    );
}

export default Preferences;