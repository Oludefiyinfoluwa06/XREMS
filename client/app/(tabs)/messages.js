import { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, Image, FlatList, ActivityIndicator } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';
import EmptyList from '../../components/EmptyList';
import { angleBack, noMessages, user } from '../../constants';
import SearchBar from '../../components/SearchBar';
import { useChat } from '../../contexts/ChatContext';

const Messages = () => {
  const { users, getUsers } = useChat();
  const [image, setImage] = useState(null);

  useEffect(() => {
    const getProfile = async () => {
      const profileImg = await AsyncStorage.getItem('profile');
      setImage(profileImg);
    }

    getProfile();
  }, []);
  
  useEffect(() => {
    getUsers();
  }, [users]);

  return (
    <SafeAreaView className='bg-white h-full'>
      {users ? (
        <FlatList
          data={users}
          keyExtractor={item => item._id}
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
                    source={image !== null && image !== '' ? { uri: image } : user}
                    resizeMode='cover'
                    className='w-[30px] h-[30px] rounded-full'
                  />
                </TouchableOpacity>
              </View>

              <SearchBar placeholder='Search here...' />
            </View>
          )}
          renderItem={({ item }) => (
            <TouchableOpacity className='p-[20px] flex flex-row items-center justify-start w-full' onPress={() => router.push(`/chat/${item._id}`)}>
              <View className='mr-2'>
                <Image
                  source={item?.profileImg ? { uri: item.profileImg } : user}
                  resizeMode='cover'
                  className='w-[40px] h-[40px] rounded-full'
                />
              </View>
              <View>
                <Text className='font-rbold text-blue text-xl'>{item.fullname}</Text>
              </View>
            </TouchableOpacity>
          )}
        />
      ) : (
        <View className='flex items-center justify-center h-full bg-white'>
          <ActivityIndicator size="large" color="#191641" />
        </View>
      )}
    </SafeAreaView>
  );
}

export default Messages;