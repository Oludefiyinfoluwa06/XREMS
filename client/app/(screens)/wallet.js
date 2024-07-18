import { View, Text, TouchableOpacity, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import { angleBack } from '../../constants';

const Wallet = () => {
    return (
        <SafeAreaView className='bg-white h-full'>
            <View className='flex items-center justify-start flex-row p-[20px]'>
                <TouchableOpacity
                    className='flex items-center justify-center p-[13px] rounded-lg bg-white shadow-lg'
                    onPress={() => router.back()}
                >
                    <Image
                        source={angleBack}
                        resizeMode='contain'
                        className='w-[24px] h-[24px] mr-2'
                    />
                </TouchableOpacity>

                <Text className='font-rbold text-xl'>Wallet</Text>
            </View>
        </SafeAreaView>
    );
}

export default Wallet;