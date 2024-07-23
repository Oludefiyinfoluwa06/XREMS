import { useEffect } from 'react';
import { View, Text, TouchableOpacity, Image, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { angleBack } from '../../constants';
import { router } from 'expo-router';
import Preferences from '../../components/settings/Preferences';
import ApplicationSettings from '../../components/settings/ApplicationSettings';
import { useAuth } from '../../contexts/AuthContext';
import { profile } from '../../assets/icons/admin';

const Settings = () => {
  const { getUser, user } = useAuth();

  useEffect(() => {
    getUser();
  }, []);

  return (
    <ScrollView className='bg-white h-full'>
      <SafeAreaView className='p-[20px]'>
        <View className='flex items-center justify-between flex-row'>
          <TouchableOpacity
            className='flex items-center justify-content p-[13px] rounded-lg bg-white'
            style={{ padding: 20, backgroundColor: '#fff', shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.8, shadowRadius: 2, elevation: 5 }}
            onPress={() => router.back()}
          >
            <Image
              source={angleBack}
              resizeMode='contain'
              className='w-[24px] h-[24px]'
            />
          </TouchableOpacity>

          <Text className='font-rbold text-xl'>Settings</Text>

          <TouchableOpacity onPress={() => router.push('/profile')}>
            <Image
              source={user !== null && user?.profileImg !== '' ? { uri: user?.profileImg } : profile}
              resizeMode='cover'
              className='w-[30px] h-[30px] rounded-full'
            />
          </TouchableOpacity>
        </View>

        <Preferences />
        <ApplicationSettings />
      </SafeAreaView>
    </ScrollView>
  );
}

export default Settings;