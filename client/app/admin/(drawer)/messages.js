import { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, Image, FlatList } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Header from '../../../components/admin/Header';
import { noMessages } from '../../../constants';
import EmptyList from '../../../components/EmptyList';
import SearchBar from '../../../components/SearchBar';

const Messages = () => {
  const [ws, setWs] = useState(null);
  const [connectedUsers, setConnectedUsers] = useState([]);

  useEffect(() => {
    const connectWebSocket = async () => {
      const token = await AsyncStorage.getItem('token');

      const ws = new WebSocket(`ws://192.168.204.68:5000?token=${token}`);
      setWs(ws);
  
      ws.addEventListener('message', (e) => {
        try {
          const users = JSON.parse(e.data);
          setConnectedUsers(users);
        } catch (err) {
          console.error('Failed to parse WebSocket message', err);
        }
      });
    }

    connectWebSocket();
  }, []);

  return (
    <SafeAreaView className='bg-white h-full'>
      <FlatList
        data={connectedUsers}
        keyExtractor={item => item._id}
        horizontal={false}
        ListEmptyComponent={<EmptyList icon={noMessages} text='No messages' />}
        ListHeaderComponent={() => (
            <View>
                <Header title='Messages' />
                <View className='px-6 my-2'>
                    <SearchBar placeholder='Search here...' />
                </View>
            </View>
        )}
        renderItem={({ item }) => (
          <TouchableOpacity className='p-[20px] flex flex-row items-center justify-start' onPress={() => router.push(`/admin/chat/${item._id}`)}>
            <View className='mr-2'>
              <Image
                source={item.img}
                resizeMode='contain'
                className='w-[40px] h-[40px]'
              />
            </View>
            <View>
              <View className='flex flex-row items-center justify-between w-[91%] mb-2'>
                <Text className='font-rbold text-blue'>{item.fullname}</Text>
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