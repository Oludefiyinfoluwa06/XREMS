import { View, Text, Image, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import { briefcase, user } from '../constants';

const Choose = () => {
    return (
        <SafeAreaView className='p-[20px] h-full bg-white'>
            <Text className='font-rbold text-xl mb-[20px]'>Select your login type</Text>

            <TouchableOpacity 
                className='flex flex-row p-3 items-center justify-start border-2 rounded-lg border-blue mb-[20px]'
                onPress={() => router.push('/admin/sign-in')}
            >
                <Image 
                    source={briefcase}
                    resizeMode='contain'
                    className='w-[30px] h-[30px] mr-3'
                />
                <View>
                    <Text className='font-rbold text-lg text-blue'>Login as Admin</Text>
                    <Text className='font-rregular text-sm text-blue'>Manage property listings</Text>
                </View>
            </TouchableOpacity>

            <TouchableOpacity 
                className='flex flex-row p-3 items-center justify-start border-2 rounded-lg border-blue mb-[20px]'
                onPress={() => router.push('/sign-in')}
            >
                <Image 
                    source={user}
                    resizeMode='contain'
                    className='w-[30px] h-[30px] mr-3'
                />
                <View>
                    <Text className='font-rbold text-lg text-blue'>Login as User</Text>
                    <Text className='font-rregular text-sm text-blue'>Browse and purchase or rent properties</Text>
                </View>
            </TouchableOpacity>
        </SafeAreaView>
    );
}

export default Choose;