import { useEffect } from 'react';
import { View, Text, TouchableOpacity, Image, FlatList, ActivityIndicator } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router, useNavigation } from 'expo-router';
import { noMessages } from '../../../constants';
import EmptyList from '../../../components/EmptyList';
import { useChat } from '../../../contexts/ChatContext';
import { menuIcon, profile, profile2 } from '../../../assets/icons/admin';
import { DrawerActions } from '@react-navigation/native';
import { useAuth } from '../../../contexts/AuthContext';

const Messages = () => {
  const { users, getUsers } = useChat();
  const { getUser, user } = useAuth();

    useEffect(() => {
      getUser();
    }, []);
  
  const navigation = useNavigation();

  const openSidebar = () => {
    navigation.dispatch(DrawerActions.openDrawer());
  }
  
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
          ListEmptyComponent={<EmptyList icon={noMessages} text='There are no messages' />}
          ListHeaderComponent={() => (
            <View>
              <View className='flex flex-row items-center justify-between p-[30px] bg-white'>
                <View className='flex items-center justify-start flex-row'>
                  <TouchableOpacity onPress={openSidebar}>
                    <Image
                      source={menuIcon}
                      resizeMode='contain'
                      className='w-[25px] h-[25px] mr-2'
                    />
                  </TouchableOpacity>
                  <Text className='text-2xl text-blue font-rbold'>Messages</Text>
                </View>
                <View className='flex items-center justify-end flex-row'>
                  <TouchableOpacity onPress={() => router.push('/admin/profile')}  className='bg-white rounded-full relative w-[30px] h-[30px]'>
                    <Image
                      source={user !== null && user?.profileImg !== '' ? { uri: user?.profileImg } : profile2}
                      resizeMode='cover'
                      className='w-full h-full absolute top-0 left-0 rounded-full'
                    />
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          )}
          renderItem={({ item }) => (
            <TouchableOpacity className='py-[20px] mx-[20px] flex flex-row items-center justify-between border-b border-[#C2C2C2]' onPress={() => router.push(`/admin/chat/${item._id}`)}>
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