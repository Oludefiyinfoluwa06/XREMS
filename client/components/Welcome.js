import { ImageBackground, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';

import Button from '../components/Button';

const WelcomeComp = ({ bg, title, text, step, setStep }) => {
    return (
        <SafeAreaView className="relative h-screen w-full">
            <ImageBackground
                source={bg}
                resizeMode='cover'
                className='flex-1'
            >
                <View className='p-4 absolute bottom-[-1px] left-0 rounded-t-[50px] bg-white w-full pt-[30px] h-[300px]'>
                    <Text className='text-blue font-bold text-2xl w-[80%] text-center mx-auto'>{title}</Text>
                    <Text className='my-3 text-black w-80 text-center mx-auto leading-[24px]'>{text}</Text>

                    <View className='flex-row items-center justify-center gap-2 my-2'>
                        <View className={`p-[3px] rounded-full ${step === 1 ? 'bg-blue' : 'bg-lightBlue'}`} />
                        <View className={`p-[3px] rounded-full ${step === 2 ? 'bg-blue' : 'bg-lightBlue'}`} />
                        <View className={`p-[3px] rounded-full ${step === 3 ? 'bg-blue' : 'bg-lightBlue'}`} />
                    </View>

                    <View className='space-y-3'>
                        <TouchableOpacity className='w-full p-3 mb-3 rounded-[50px] bg-transparent' onPress={() => {
                            router.replace('/sign-up');
                        }}>
                            <Text className='text-center'>Skip</Text>
                        </TouchableOpacity>
                        <Button title='Next' onClick={setStep} />
                    </View>
                </View>
            </ImageBackground>
        </SafeAreaView>
    );
}

export default WelcomeComp;