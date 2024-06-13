import { View, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { lightSettings } from '../../constants';
import ProfileInfo from '../../components/profile/ProfileInfo';
import MyAccount from '../../components/profile/MyAccount';

const Profile = () => {
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

                    <Text className='text-xl'>Profile</Text>

                    <TouchableOpacity onPress={() => router.push('settings')}>
                        <Image
                        source={lightSettings}
                        resizeMode='contain'
                        className='w-[30px] h-[30px]'
                        />
                    </TouchableOpacity>
                </View>

                <ProfileInfo />
                <MyAccount />
            </SafeAreaView>
        </ScrollView>
    );
}

export default Profile;