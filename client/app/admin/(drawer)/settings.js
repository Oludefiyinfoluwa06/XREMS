import { View, Text, StatusBar, TouchableOpacity, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ScrollView } from 'react-native-gesture-handler';
import { useNavigation } from 'expo-router';
import { DrawerActions } from '@react-navigation/native';
import { menuIcon, pencil, profile2 } from '../../../assets/icons/admin';
import { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Settings = () => {
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
                <View className='bg-blue h-[250px] rounded-b-[20px] p-[25px]'>
                    <View className='flex items-center justify-between flex-row'>
                        <TouchableOpacity onPress={openSidebar}>
                            <Image
                                source={menuIcon}
                                resizeMode='contain'
                                className='w-[25px] h-[25px]'
                            />
                        </TouchableOpacity>
                        <TouchableOpacity>
                            <Image
                                source={pencil}
                                resizeMode='contain'
                                className='w-[16px] h-[16px]'
                            />
                        </TouchableOpacity>
                    </View>

                    <View className='flex items-center justify-center flex-col mt-[50px]'>
                        <View className='bg-white rounded-full relative w-[60px] h-[60px]'>
                            <Image
                                source={user ? user.profilePicture ? { uri: user.profilePicture } : profile2 : profile2}
                                resizeMode='contain'
                                className='w-full h-full absolute'
                            />
                        </View>
                        <Text className='text-white mt-1 font-rbold text-2xl'>{user && user.fullname}</Text>
                        <Text className='text-white mt-1 font-rbold text-[12px]'>{user && user.email}</Text>
                    </View>
                </View>
                <Text>Settings</Text>
            </ScrollView>
            
            <StatusBar backgroundColor='#FFFFFF' />
        </SafeAreaView>
    );
}

export default Settings;