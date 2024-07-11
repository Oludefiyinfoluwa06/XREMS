import { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, Image, FlatList } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import EmptyList from '../../components/EmptyList';
import { angleBack, noMessages, user } from '../../constants';
import SearchBar from '../../components/SearchBar';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Messages = () => {
  const [ws, setWs] = useState(null);
  const messages = [];

  useEffect(() => {
    const connectWebSocket = async () => {
      const token = await AsyncStorage.getItem('token');

      const ws = new WebSocket(`ws://192.168.18.68:5000?token=${token}`);
      setWs(ws);
  
      ws.addEventListener('message', (e) => {
        console.log('new message', e);
      });
    }

    connectWebSocket();
  }, []);

  return (
    <SafeAreaView className='bg-white h-full'>
      <FlatList
        data={messages}
        keyExtractor={item => item.id}
        horizontal={false}
        ListEmptyComponent={<EmptyList icon={noMessages} text='No messages' />}
        ListHeaderComponent={() => (
          <View className='p-[20px]'>
            <View className='flex items-center justify-between flex-row'>
              <TouchableOpacity
                onPress={() => router.back()}
              >
                <Image
                  source={angleBack}
                  resizeMode='contain'
                  className='w-[30px] h-[30px]'
                />
              </TouchableOpacity>

              <Text className='font-rbold text-lg'>Messages</Text>

              <TouchableOpacity
                className='flex items-center justify-content p-[13px] rounded-lg bg-white shadow-lg'
                onPress={() => router.push('/profile')}
              >
                <Image
                  source={user}
                  resizeMode='contain'
                  className='w-[24px] h-[24px]'
                />
              </TouchableOpacity>
            </View>

            <SearchBar placeholder='Search here...' />
          </View>
        )}
        renderItem={({ item }) => (
          <TouchableOpacity className='p-[20px] flex flex-row items-center justify-start'>
            <View className='mr-2'>
              <Image
                source={item.img}
                resizeMode='contain'
                className='w-[40px] h-[40px]'
              />
            </View>
            <View>
              <View className='flex flex-row items-center justify-between w-[91%] mb-2'>
                <Text className='font-rbold text-blue'>{item.name}</Text>
                <Text className='font-rregular text-blue'>{item.time}</Text>
              </View>
              <View className='flex flex-row items-center justify-between w-[91%]'>
                <Text className='font-rregular text-blue'>{item.message}</Text>
                <Text className='font-rregular text-white bg-blue px-3 py-1 mt-0 pt-0 rounded-full'>{item.msgNo}</Text>
              </View>
            </View>
          </TouchableOpacity>
        )}
      />
    </SafeAreaView>
  );
}

export default Messages;