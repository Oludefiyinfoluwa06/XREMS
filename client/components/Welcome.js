import { ImageBackground, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { router } from 'expo-router';

import Button from '../components/Button';

const WelcomeComp = ({ bg, title, text, step, setStep, handleNextStep }) => {
    return (
        <SafeAreaView className="relative h-screen w-full">
            <ImageBackground
                source={bg}
                resizeMode='cover'
                className='flex-1'
            >
                <View className='p-4 absolute bottom-[-1px] left-0 rounded-t-[50px] bg-white w-full pt-[30px] h-[320px]'>
                    <Text className='font-rregular text-blue font-bold text-2xl w-[80%] text-center mx-auto'>{title}</Text>
                    <Text className='font-rregular my-3 text-black w-80 text-center mx-auto leading-[24px]'>{text}</Text>

                    <View className='flex-row items-center justify-center gap-2 my-2'>
                        <TouchableOpacity onPress={() => setStep(1)}>
                            <View className={`p-[3px] rounded-full ${step === 1 ? 'bg-blue' : 'bg-lightBlue'}`} />
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => setStep(2)}>
                            <View className={`p-[3px] rounded-full ${step === 2 ? 'bg-blue' : 'bg-lightBlue'}`} />
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => setStep(3)}>
                            <View className={`p-[3px] rounded-full ${step === 3 ? 'bg-blue' : 'bg-lightBlue'}`} />
                        </TouchableOpacity>
                    </View>

                    <View className='space-y-3'>
                        <TouchableOpacity className='w-full my-3 rounded-[50px] bg-transparent' onPress={async () => {
                            await AsyncStorage.setItem('first-time', 'False');
                            router.replace('/sign-up');
                        }}>
                            <Text className='font-rregular text-center'>Skip</Text>
                        </TouchableOpacity>
                        <Button title='Next' onClick={handleNextStep} />
                    </View>
                </View>
            </ImageBackground>
        </SafeAreaView>
    );
}

export default WelcomeComp;