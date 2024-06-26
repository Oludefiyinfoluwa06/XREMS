import { useState } from 'react';

import { View } from 'react-native';
import { router } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';

import WelcomeComp from '../components/Welcome';
import { welcomeImgOne, welcomeImgThree, welcomeImgTwo } from '../constants';

const Welcome = () => {
    const [step, setStep] = useState(1);

    const handleNextStep = async () => {
        if (step === 3) {
            const token = await AsyncStorage.getItem('token');
            const user = await AsyncStorage.getItem('user');

            if (user === null && token === null) {
                return router.push('/sign-up');
            }
            
            await AsyncStorage.setItem('first-time', 'False');
            return router.replace('/home');
        } else {
            setStep((prevStep) => prevStep + 1);
        }
    }

    return (
        <View className='flex-1 h-screen'>
            {step === 1 ? (
                <WelcomeComp bg={welcomeImgOne} title="Let's find your dream house" text='Lorem ipsum dolor sit amet consectetur adipisicing elit. Expedita quos quis sequi ipsam voluptatibus nemo omnis ab dolor quasi rerum.' step={step} handleNextStep={handleNextStep} setStep={setStep} />
            ) : step === 2 ? (
                <WelcomeComp bg={welcomeImgTwo} title="We focus on providing a comfortable place for you" text='Lorem ipsum dolor sit amet consectetur adipisicing elit. Expedita quos quis sequi ipsam voluptatibus nemo omnis ab dolor quasi rerum.' step={step} handleNextStep={handleNextStep} setStep={setStep} />
            ) : (
                <WelcomeComp bg={welcomeImgThree} title="Find your beloved family's dream house" text='Lorem ipsum dolor sit amet consectetur adipisicing elit. Expedita quos quis sequi ipsam voluptatibus nemo omnis ab dolor quasi rerum.' step={step} handleNextStep={handleNextStep} setStep={setStep} />
            )}
        </View>
    );
}

export default Welcome;