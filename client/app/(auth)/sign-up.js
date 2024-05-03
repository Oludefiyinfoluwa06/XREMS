import { CheckBox } from '@rneui/themed';
import { useState } from 'react';
import { View, Text, Image, TextInput } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Button from '../../components/Button';
import AuthButton from '../../components/AuthButton';

const SignUp = () => {
    const [checked, setChecked] = useState(false);

    return (
        <SafeAreaView className='p-[25px]'>
            <View className='flex items-center justify-center gap-2 mb-5'>
                <Image
                    source={require('../../assets/images/logo.png')}
                    resizeMode='contain'
                    className='w-[102px] h-[119px]'
                />
                <Image
                    source={require('../../assets/images/logo2.png')}
                    resizeMode='contain'
                    className='w-[118px] h-[35px]'
                />
            </View>

            <Text className='font-bold text-[22px] leading-[16px] p-2 text-blue text-center'>Signup for free</Text>

            <View>
                <Text className="text-blue ml-[10px] mt-[20px] mb-[8px] text-[15px] font-bold">Email:</Text>
                <TextInput
                    placeholder='Email'
                    className='p-[5px] w-full border border-gray rounded-[50px]'
                />

                <Text className="text-blue ml-[10px] mt-[15px] mb-[8px] text-[15px] font-bold">Password:</Text>
                <TextInput
                    placeholder='Password'
                    className='p-[5px] w-full border border-gray rounded-[50px]'
                />

                <CheckBox
                    checked={checked}
                    onPress={() => setChecked(prev => !prev)}
                    iconType="material-community"
                    checkedIcon="checkbox-outline"
                    uncheckedIcon={'checkbox-blank-outline'}
                    containerStyle={{ backgroundColor: 'transparent', marginLeft: -10 }}
                    checkedColor="#191641"
                    uncheckedColor="#191641"
                    title='Remember me'
                    textStyle={{ color: '#191641' }}
                />

                <Button title='Sign up' />

                <View className='flex-row items-center justify-center w-full mt-4'>
                    <View className='h-[2px] w-[96px] bg-blue' />
                    <Text className='px-3'>Or continue with</Text>
                    <View className='h-[2px] w-[96px] bg-blue' />
                </View>

                <View className='flex-row items-center justify-between'>
                    <AuthButton icon={require('../../assets/icons/facebook.svg')} title='Facebook' />
                    <AuthButton icon={require('../../assets/icons/google.svg')} title='Google' />
                </View>
            </View>
        </SafeAreaView>
    );
}

export default SignUp;