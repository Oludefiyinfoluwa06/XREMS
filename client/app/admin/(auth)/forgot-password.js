import { useState } from 'react';
import { router } from 'expo-router';
import { View, Text, TouchableOpacity, Image, TextInput } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { angleBack } from '../../../constants';
import Button from '../../../components/Button';
import { useAuth } from '../../../contexts/AuthContext';

const ForgotPassword = () => {
    const [email, setEmail] = useState('');

    const { receiveOtp, error, setError, loading } = useAuth();

    const handleGetResetCode = async () => {
        receiveOtp(email);
    }

    return (
        <SafeAreaView className='p-[20px] h-full bg-white'>
            <View className='flex items-center justify-between flex-row mb-3'>
                <TouchableOpacity
                    className='flex items-center justify-content p-[13px] rounded-lg bg-white'
                    style={{ padding: 20, backgroundColor: '#fff', shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.8, shadowRadius: 2, elevation: 200 }}
                    onPress={() => router.back()}
                >
                <Image
                    source={angleBack}
                    resizeMode='contain'
                    className='w-[24px] h-[24px]'
                />
                </TouchableOpacity>

                <Text className='font-rbold text-xl ml-[-40px]'>Forgot Password</Text>

                <View />
            </View>

            {error && <View className='w-full p-3 rounded-[50px] bg-errorBg mt-2'>
                <Text className='font-rregular text-errorText'>{error}</Text>
            </View>}
            
            <View className='mb-3'>
                <Text className="text-blue ml-[10px] mt-[15px] mb-[8px] text-[15px] font-bold">Email:</Text>

                <TextInput
                    placeholder='Enter your email'
                    className='p-[5px] px-[10px] w-full border border-gray rounded-[50px]'
                    value={email}
                    onChangeText={(value) => {
                        setEmail(value);
                        setError('');
                    }}
                />
            </View>

            <Button title='Continue' onClick={handleGetResetCode} loading={loading} />
        </SafeAreaView>
    );
}

export default ForgotPassword;