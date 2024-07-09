import { View, Text, Image, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import { briefcase, logo, user } from '../constants';

const Choose = () => {
    return (
        <SafeAreaView className='p-[20px] flex items-center justify-center min-h-screen bg-white'>
            <View className='flex items-center justify-center flex-col'>
                <Image
                    source={logo}
                    resizeMode='contain'
                    className='w-[200px] h-[200px]'
                />
                <Text className='font-rbold text-xl mb-[20px]'>Select your login type</Text>
            </View>

            <TouchableOpacity 
                className='flex flex-row p-3 items-center justify-start border-2 rounded-2xl border-blue mb-[20px] w-full'
                onPress={() => router.push('/admin/sign-in')}
            >
                <Image 
                    source={briefcase}
                    resizeMode='contain'
                    className='w-[30px] h-[30px] mr-3'
                />
                <View>
                    <Text className='font-rbold text-lg'>Login as Admin</Text>
                    <Text className='font-rregular text-sm'>Manage property listings</Text>
                </View>
            </TouchableOpacity>

            <TouchableOpacity 
                className='flex flex-row p-3 items-center justify-start border-2 rounded-2xl border-blue mb-[20px] w-full'
                onPress={() => router.push('/sign-in')}
            >
                <Image 
                    source={user}
                    resizeMode='contain'
                    className='w-[30px] h-[30px] mr-3'
                />
                <View>
                    <Text className='font-rbold text-lg'>Login as User</Text>
                    <Text className='font-rregular text-sm'>Browse and purchase or rent properties</Text>
                </View>
            </TouchableOpacity>
        </SafeAreaView>
    );
}

export default Choose;