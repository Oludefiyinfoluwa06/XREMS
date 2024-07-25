import { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, Image, Dimensions } from 'react-native';
import { router } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { angleBack, lightSettings } from '../../constants';
import ProfileInfo from '../../components/profile/ProfileInfo';
import MyAccount from '../../components/profile/MyAccount';
import { useAuth } from '../../contexts/AuthContext';

const Profile = () => {
    const [showLogoutModal, setShowLogoutModal] = useState(false);

    const { logout } = useAuth();
    
    const handleLogout = async () => {
        await logout();
    }

    return (
        <ScrollView className='bg-white h-screen'>
            <SafeAreaView className='p-[20px] h-screen'>
                <View className='flex items-center justify-between flex-row'>
                    <TouchableOpacity
                        className='flex items-center justify-center p-[13px] rounded-lg bg-white'
                        style={{ padding: 20, backgroundColor: '#fff', shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.8, shadowRadius: 2, elevation: 200 }}
                        onPress={() => router.back()}
                    >
                        <Image
                            source={angleBack}
                            resizeMode='contain'
                            className='w-[24px] h-[24px]'
                        />
                    </TouchableOpacity>

                    <Text className='font-rbold text-xl -ml-2'>Profile</Text>

                    <TouchableOpacity onPress={() => router.push('/settings')}>
                        <Image
                            source={lightSettings}
                            resizeMode='contain'
                            className='w-[30px] h-[30px]'
                        />
                    </TouchableOpacity>
                </View>

                <ProfileInfo />
                <MyAccount setShowLogoutModal={setShowLogoutModal} />

                {showLogoutModal && (
                    <View className="absolute top-0 left-0 w-screen h-screen bg-transparentBlack flex items-center justify-center">
                        <View className="bg-white p-4 rounded-lg flex items-center justify-center" style={{ width: Dimensions.get('window').width * 0.8 }}>
                            <Text className="font-rbold text-blue text-xl mb-4 text-center">Are you sure you want to logout?</Text>
                            <View className="flex-row items-center justify-center gap-3">
                                <TouchableOpacity className="px-4 py-2 bg-blue border-2 border-blue rounded-lg" onPress={handleLogout}>
                                    <Text className="font-rbold text-white">Yes</Text>
                                </TouchableOpacity>
                                <TouchableOpacity className="px-4 py-2 border-2 border-blue bg-white rounded-lg" onPress={() => setShowLogoutModal(false)}>
                                    <Text className="font-rbold text-blue">No</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                )}
            </SafeAreaView>
        </ScrollView>
    );
}

export default Profile;