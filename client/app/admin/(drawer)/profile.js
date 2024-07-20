import { View, Text, StatusBar, TouchableOpacity, Image, ImageBackground } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router, useNavigation } from 'expo-router';
import { DrawerActions } from '@react-navigation/native';
import { useEffect } from 'react';
import { bgEnvelope, bgUser, profile2, whiteMenuIcon } from '../../../assets/icons/admin';
import Button from '../../../components/admin/Button';
import { useAuth } from '../../../contexts/AuthContext';

const Profile = () => {
    const { getUser, user, logout } = useAuth();

    useEffect(() => {
        getUser();
    }, []);

    const handleLogout = async () => {
        await logout();
    }

    const navigation = useNavigation();

    const openSidebar = () => {
        navigation.dispatch(DrawerActions.openDrawer());
    }

    return (
        <SafeAreaView className='flex-1'>
            <ImageBackground
                source={require('../../../assets/images/bg-2.png')}
                resizeMode='stretch'
                className='w-full h-[320px]'
            >
                <View className='h-full p-[25px]'>
                    <View className='flex items-center justify-between flex-row'>
                        <TouchableOpacity onPress={openSidebar}>
                            <Image
                                source={whiteMenuIcon}
                                resizeMode='contain'
                                className='w-[25px] h-[25px]'
                            />
                        </TouchableOpacity>
                        <View />
                    </View>

                    <View className='flex items-center justify-center flex-col mt-[30px]'>
                        <View className='bg-white rounded-full relative w-[90px] h-[90px]'>
                            <Image
                                source={user !== null && user?.profileImg !== '' ? { uri: user?.profileImg } : profile2}
                                resizeMode='cover'
                                className='w-full h-full absolute top-0 left-0 rounded-full'
                            />
                        </View>
                        <Text className='text-white mt-1 font-rbold text-2xl'>{user?.fullname}</Text>
                        <Text className='text-white mt-1 font-rbold text-[12px]'>{user?.email}</Text>
                    </View>
                </View>
            </ImageBackground>
            
            <View className='flex-1 bg-transparentWhite mt-[-60px] rounded-t-[40px] p-[40px]'>
                <View className='flex-1 bg-white rounded-[20px] p-[25px]'>
                    <View>
                        <View className='flex flex-row items-center justify-start'>
                            <Image
                                source={bgUser}
                                resizeMode='contain'
                                className='w-[35px] h-[35px] mr-2'
                            />
                            <View className='flex items-start justify-center'>
                                <Text className='text-blue font-rbold text-lg'>Firstname</Text>
                                <Text className='text-blue font-rregular text-sm'>{user?.fullname.split(' ')[1]}</Text>
                            </View>
                        </View>

                        <View className='w-full p-[.5px] bg-blue my-3' />

                        <View className='flex flex-row items-center justify-start'>
                            <Image
                                source={bgUser}
                                resizeMode='contain'
                                className='w-[35px] h-[35px] mr-2'
                            />
                            <View className='flex items-start justify-center'>
                                <Text className='text-blue font-rbold text-lg'>Lastname</Text>
                                <Text className='text-blue font-rregular text-sm'>{user?.fullname.split(' ')[0]}</Text>
                            </View>
                        </View>

                        <View className='w-full p-[.5px] bg-blue my-3' />

                        <View className='flex flex-row items-center justify-start'>
                            <Image
                                source={bgEnvelope}
                                resizeMode='contain'
                                className='w-[35px] h-[35px] mr-2'
                            />
                            <View className='flex items-start justify-center'>
                                <Text className='text-blue font-rbold text-lg'>Email</Text>
                                <Text className='text-blue font-rregular text-sm'>{user?.email}</Text>
                            </View>
                        </View>
                    </View>

                    <View className='absolute bottom-4 left-0 right-0 flex items-center justify-center flex-row mx-auto'>
                        <Button text='Edit Profile' bg={true} onClick={() => router.push('/admin/edit-profile')} />
                        <Button text='Logout' bg={false} onClick={handleLogout} />
                    </View>
                </View>
            </View>
            
            <StatusBar backgroundColor='#FFFFFF' />
        </SafeAreaView>
    );
}

export default Profile;
