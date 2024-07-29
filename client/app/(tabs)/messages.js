import { useEffect } from 'react';
import { View, Text, TouchableOpacity, Image, FlatList, ActivityIndicator } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import EmptyList from '../../components/EmptyList';
import { angleBack, noMessages } from '../../constants';
import { useChat } from '../../contexts/ChatContext';
import { useAuth } from '../../contexts/AuthContext';
import { profile } from '../../assets/icons/admin';

const Messages = () => {
  const { users, getUsers } = useChat();

  const { getUser, user } = useAuth();

  useEffect(() => {
    getUser();
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
              <View className='flex items-center justify-between flex-row py-[20px]'>
                <TouchableOpacity
                  className='rounded-lg p-[10px]'
                  style={{ backgroundColor: '#fff', shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.1, shadowRadius: 10, elevation: 100 }}
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
                  onPress={() => router.push('/profile')}
                >
                  <Image
                    source={user !== null && user?.profileImg !== '' ? { uri: user.profileImg } : profile}
                    resizeMode='cover'
                    className='w-[40px] h-[40px] rounded-full'
                  />
                </TouchableOpacity>
              </View>
            </View>
          )}
          renderItem={({ item }) => (
            <TouchableOpacity className='py-[20px] mx-[20px] flex flex-row items-center justify-between border-b border-[#C2C2C2]' onPress={() => router.push(`/chat/${item._id}`)}>
              <View className='flex flex-row items-center justify-start'>
                <Image
                  source={item?.profileImage && item.profileImage !== '' ? { uri: item.profileImage } : profile}
                  resizeMode='cover'
                  className='w-[40px] h-[40px] rounded-full mr-2'
                />
                <Text className='font-rbold text-blue text-xl'>{item?.fullname}</Text>
              </View>
              {item?.unreadCount > 0 && <View className='pb-1 px-2 rounded-full bg-blue'>
                <Text className='font-rbold text-white text-md'>{item?.unreadCount}</Text>
              </View>}
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