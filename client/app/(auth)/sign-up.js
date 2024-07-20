import { useEffect, useState } from 'react';
import { View, Text, Image, TextInput, TouchableOpacity, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import Button from '../../components/Button';
import { logo, logo2 } from '../../constants';
import { useAuth } from '../../contexts/AuthContext';

const SignUp = () => {
    const [fullname, setFullname] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const { signUp, error, setError, isLoggedIn, currentUser, loading } = useAuth();

    const isAdmin = false;

    useEffect(() => {
        if (isLoggedIn && currentUser !== null) {
            return router.replace('/home');
        }
    }, [isLoggedIn, currentUser]);

    const handleSignup = async () => {
        await signUp(fullname, email, password, isAdmin);
    }

    return (
        <SafeAreaView className='bg-white h-full'>
            <ScrollView className='p-[25px]'>
                <View className='flex items-center justify-center gap-2 mb-5'>
                    <Image
                        source={logo}
                        resizeMode='contain'
                        className='w-[102px] h-[119px]'
                    />
                    <Image
                        source={logo2}
                        resizeMode='contain'
                        className='w-[118px] h-[35px]'
                    />
                </View>

                <Text className='font-rbold text-[22px] leading-[16px] p-2 text-blue text-center'>Signup for free</Text>

                {error && <View className='w-full p-3 rounded-[50px] bg-errorBg mt-2'>
                    <Text className='font-rregular text-errorText'>{error}</Text>
                </View>}

                <View className='w-full'>
                    <Text className="text-blue ml-[10px] mt-[20px] mb-[8px] text-[15px] font-rbold">Full name:</Text>
                    <TextInput
                        placeholder='Full name'
                        className='p-[5px] px-[10px] w-full border border-gray rounded-[50px] font-rregular'
                        value={fullname}
                        onChangeText={(value) => {
                            setFullname(value);
                            setError('');
                        }}
                    />

                    <Text className="text-blue ml-[10px] mt-[20px] mb-[8px] text-[15px] font-rbold">Email:</Text>
                    <TextInput
                        placeholder='Email'
                        className='p-[5px] px-[10px] w-full border border-gray rounded-[50px] font-rregular'
                        value={email}
                        onChangeText={(value) => {
                            setEmail(value);
                            setError('');
                        }}
                        keyboardType='email-address'
                    />

                    <Text className="text-blue ml-[10px] mt-[15px] mb-[8px] text-[15px] font-rbold">Password:</Text>
                    <TextInput
                        placeholder='Password'
                        className='p-[5px] px-[10px] w-full border border-gray rounded-[50px] font-rregular mb-[20px]'
                        secureTextEntry
                        value={password}
                        onChangeText={(value) => {
                            setPassword(value);
                            setError('');
                        }}
                    />

                    <Button title='Sign up' onClick={handleSignup} loading={loading} />

                    <View className='flex-row items-center justify-center gap-2 mt-[10px]'>
                        <Text className='font-rregular text-blue text-lg'>Already have an account?</Text>
                        <TouchableOpacity onPress={() => router.push('/sign-in')}>
                            <Text className='font-rbold text-blue text-lg'>Sign in</Text>
                        </TouchableOpacity>
                    </View>
                </View>

                <View className='mt-[40px]' />
            </ScrollView>
        </SafeAreaView>
    );
}

export default SignUp;