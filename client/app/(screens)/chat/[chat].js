import { useState } from 'react';
import { View, Text, ScrollView, TextInput, TouchableOpacity, Image, StatusBar } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import { angleBack, sendMessage, user } from '../../../constants';

const Chat = () => {
    const [message, setMessage] = useState('');

    return (
        <SafeAreaView className='relative bg-white'>
            <ScrollView className='h-full p-2 pb-[20px]'>
                <View className='flex items-center justify-start flex-row'>
                    <TouchableOpacity
                        className='flex items-center justify-content p-[13px] rounded-lg bg-white shadow-lg mr-4'
                        onPress={() => router.back()}
                    >
                        <Image
                            source={angleBack}
                            resizeMode='contain'
                            className='w-[24px] h-[24px]'
                        />
                    </TouchableOpacity>
                    <View className='flex items-center justify-start flex-row'>
                        <Image
                            source={user}
                            resizeMode='contain'
                            className='w-[40px] h-[40px] mr-2'
                        />
                        <View className='flex items-start justify-center'>
                            <Text className='font-rbold text-xl text-blue'>Olude Fiyinfoluwa</Text>
                            <Text className='font-rregular text-sm text-blue'>Offline</Text>
                        </View>
                    </View>
                </View>
            </ScrollView>

            <View className='absolute bottom-0 left-0 w-full flex items-center justify-between flex-row p-2'>
                <TextInput
                    placeholder='Enter a message'
                    className='p-[5px] px-[10px] w-[85%] border border-gray rounded-[50px]'
                    value={message}
                    onChangeText={(value) => setMessage(value)}
                />
                <TouchableOpacity className='flex items-center justify-center bg-blue p-2 pl-3 py-[10px] rounded-full'>
                    <Image
                        source={sendMessage}
                        resizeMode='contain'
                        className='w-[20px] h-[20px]'
                    />
                </TouchableOpacity>
            </View>

            <StatusBar backgroundColor='#FFFFFF' />
        </SafeAreaView>
    );
}

export default Chat;