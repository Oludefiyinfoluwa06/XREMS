import { View, Text, TouchableOpacity, Image, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { angleBack, user } from '../../constants';
import { router } from 'expo-router';
import Preferences from '../../components/settings/Preferences';
import ApplicationSettings from '../../components/settings/ApplicationSettings';

const Settings = () => {
  return (
    <ScrollView className='bg-white h-full'>
      <SafeAreaView className='p-[20px]'>
        <View className='flex items-center justify-between flex-row'>
          <TouchableOpacity
            className='flex items-center justify-content p-[13px] rounded-lg bg-white shadow-lg'
            onPress={() => router.back()}
          >
            <Image
              source={angleBack}
              resizeMode='contain'
              className='w-[24px] h-[24px]'
            />
          </TouchableOpacity>

          <Text className='text-xl'>Settings</Text>

          <TouchableOpacity onPress={() => router.push('profile')}>
            <Image
              source={user}
              resizeMode='contain'
              className='w-[30px] h-[30px]'
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