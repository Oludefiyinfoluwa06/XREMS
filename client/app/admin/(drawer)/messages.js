import { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, Image, FlatList, ActivityIndicator } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router, useNavigation } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { noMessages, user } from '../../../constants';
import EmptyList from '../../../components/EmptyList';
import SearchBar from '../../../components/SearchBar';
import { useChat } from '../../../contexts/ChatContext';
import { menuIcon } from '../../../assets/icons/admin';
import { DrawerActions } from '@react-navigation/native';

const Messages = () => {
  const [image, setImage] = useState(null);
  const { users, getUsers } = useChat();

    useEffect(() => {
      const getUser = async () => {
        const profileImg = await AsyncStorage.getItem('profile');
        setImage(profileImg);
      }

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
                      source={image !== null && image !== '' ? { uri: image } : profile2}
                      resizeMode='cover'
                      className='w-full h-full absolute top-0 left-0 rounded-full'
                    />
                  </TouchableOpacity>
                </View>
              </View>

              <View className='px-[25px]'>
                <SearchBar placeholder='Search here...' />
              </View>
            </View>
          )}
          renderItem={({ item }) => (
            <TouchableOpacity className='p-[20px] flex flex-row items-center justify-start w-full' onPress={() => router.push(`admin/chat/${item._id}`)}>
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