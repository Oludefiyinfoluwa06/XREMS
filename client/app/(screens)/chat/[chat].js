import { useEffect, useState, useRef } from 'react';
import { View, Text, ScrollView, TextInput, TouchableOpacity, Image, StatusBar } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router, useLocalSearchParams } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { angleBack, sendMessageIcon, user, startConversation } from '../../../constants';
import { useProperty } from '../../../contexts/PropertyContext';
import { useChat } from '../../../contexts/ChatContext';
import EmptyList from '../../../components/EmptyList';

const Chat = () => {
    const [newMessage, setNewMessage] = useState('');
    const [userData, setUserData] = useState(null);
    const params = useLocalSearchParams();
    const { fetchAgentDetails, agentDetails } = useProperty();
    const { sendMessage, getMessages, messages } = useChat();
    const scrollViewRef = useRef();

    useEffect(() => {
        const getUserDetails = async () => {
            const user = await AsyncStorage.getItem('user');
            const userDetails = JSON.parse(user);
            setUserData(userDetails);
        };

        getUserDetails();
    }, []);

    useEffect(() => {
        fetchAgentDetails(params.chat);
    }, [params.chat]);

    useEffect(() => {
        getMessages(params.chat);
    }, [params.chat]);

    useEffect(() => {
        if (scrollViewRef.current) {
            scrollViewRef.current.scrollToEnd({ animated: true });
        }
    }, [messages]);

    const handleSendMessage = async () => {
        await sendMessage(newMessage, params.chat);
        setNewMessage('');
    };

    const formatTimestamp = (timestamp) => {
        const date = new Date(timestamp);

        const options = {
            hour: 'numeric',
            minute: 'numeric',
            hour12: true,
        };

        return new Intl.DateTimeFormat('en-US', options).format(date);
    };

    return (
        <SafeAreaView className='relative bg-white h-full'>
            <View className='flex items-center justify-start flex-row py-[20px] shadow-lg'>
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
                        source={agentDetails?.profileImg ? { uri: agentDetails.profileImg } : user}
                        resizeMode='cover'
                        className='w-[40px] h-[40px] mr-2 rounded-full'
                    />
                    <View className='flex items-start justify-center'>
                        <Text className='font-rbold text-2xl text-blue'>{agentDetails?.fullname}</Text>
                        <Text className='font-rregular text-lg text-blue'>Agent</Text>
                    </View>
                </View>
            </View>
            {messages !== null ? (
                <ScrollView 
                    ref={scrollViewRef}
                    className='px-[25px] pb-[20px]'
                >
                    <View className='mb-[20px]' />

                    {messages.map(message => (
                        <View 
                            key={message._id} 
                            className={`${message?.sender === userData?._id ? 'bg-blue self-end' : 'bg-lightBlue self-start'} w-[65%] mb-[10px] p-3 rounded-xl`}
                        >
                            <Text className='text-white font-rregular text-xl'>{message?.message}</Text>
                            <Text className={`text-white font-regular text-sm ${message?.sender === userData?._id ? 'text-right' : ''}`}>
                                {formatTimestamp(message?.updatedAt)}
                            </Text>
                        </View>
                    ))}

                    <View className='mt-[60px]' />
                </ScrollView>
            ) : (
                <EmptyList icon={startConversation} text='Start a conversation' />
            )}

            <View className='absolute bottom-0 left-0 w-full flex items-center justify-between flex-row p-2 bg-white'>
                <TextInput
                    placeholder='Enter a message'
                    className='p-[5px] px-[10px] w-[85%] border border-gray rounded-[50px] h-[50px]'
                    value={newMessage}
                    onChangeText={setNewMessage}
                    multiline
                />
                <TouchableOpacity 
                    className='flex items-center justify-center bg-blue p-2 pl-3 py-[10px] rounded-full w-[13%] h-[50px]' 
                    onPress={handleSendMessage}
                >
                    <Image
                        source={sendMessageIcon}
                        resizeMode='contain'
                        className='w-[20px] h-[20px]'
                    />
                </TouchableOpacity>
            </View>

            <StatusBar backgroundColor='#FFFFFF' />
        </SafeAreaView>
    );
};

export default Chat;
