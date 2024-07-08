import { View, Text, StatusBar, TouchableOpacity, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ScrollView } from 'react-native-gesture-handler';
import { useNavigation } from 'expo-router';
import { DrawerActions } from '@react-navigation/native';
import { useEffect, useState } from 'react';
import { menuIcon, profile2 } from '../../../assets/icons/admin';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Button from '../../../components/admin/Button';

const Profile = () => {
    const [user, setUser] = useState(null);

    useEffect(() => {
        const getUser = async () => {
            const userDetails = await AsyncStorage.getItem('user');
            setUser(JSON.parse(userDetails));
        }

        getUser();
    }, []);

    const navigation = useNavigation();

    const openSidebar = () => {
        navigation.dispatch(DrawerActions.openDrawer());
    }

    return (
        <SafeAreaView>
            <ScrollView>
                <View className='bg-blue h-[320px] rounded-b-[20px] p-[25px]'>
                    <View className='flex items-center justify-between flex-row'>
                        <TouchableOpacity onPress={openSidebar}>
                            <Image
                                source={menuIcon}
                                resizeMode='contain'
                                className='w-[25px] h-[25px]'
                            />
                        </TouchableOpacity>
                        <View />
                    </View>

                    <View className='flex items-center justify-center flex-col mt-[30px]'>
                        <View className='bg-white rounded-full relative w-[90px] h-[90px]'>
                            <Image
                                source={user ? user.profilePicture ? { uri: user.profilePicture } : profile2 : profile2}
                                resizeMode='contain'
                                className='w-full h-full absolute'
                            />
                        </View>
                        <Text className='text-white mt-1 font-rbold text-2xl'>{user && user.fullname}</Text>
                        <Text className='text-white mt-1 font-rbold text-[12px]'>{user && user.email}</Text>
                    </View>

                    <View className='flex items-center justify-center flex-row mt-2'>
                        <Button text='Edit Profile' />
                        <Button text='Edit Profile' />
                    </View>
                </View>
                <Text>Profile</Text>
            </ScrollView>
            
            <StatusBar backgroundColor='#FFFFFF' />
        </SafeAreaView>
    );
}

export default Profile;