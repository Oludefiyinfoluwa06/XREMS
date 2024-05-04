import { Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import Button from '../components/Button';

const Welcome = () => {
    return (
        <SafeAreaView className='relative'>
            <View className='p-4'>
                <Text className='text-blue font-bold text-2xl w-40 text-center'>Let's find your dream house</Text>
                <Text className='my-3 text-black w-80'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Expedita quos quis sequi ipsam voluptatibus nemo omnis ab dolor quasi rerum.</Text>

                <View className='flex-row items-center justify-center gap-2'>
                    <View />
                    <View />
                    <View />
                </View>

                <View className='space-y-3'>
                    <TouchableOpacity className='w-full p-3 rounded-[50px] bg-transparent'>
                        <Text>Skip</Text>
                    </TouchableOpacity>
                    <Button title='Next' />
                </View>
            </View>
        </SafeAreaView>
    );
}

export default Welcome;