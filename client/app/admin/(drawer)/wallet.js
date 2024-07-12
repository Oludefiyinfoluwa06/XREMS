import { useEffect, useState } from 'react';
import { DrawerActions } from '@react-navigation/native';
import { useNavigation } from 'expo-router';
import { View, Text, StatusBar, ImageBackground, TouchableOpacity, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { pencil, profile2, whiteMenuIcon } from '../../../assets/icons/admin';

const Wallet = () => {
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
        <SafeAreaView className='flex-1'>
            <ImageBackground
                source={require('../../../assets/images/bg-1.png')}
                resizeMode='stretch'
                className='w-full h-[250px]'
            >
                <View className='h-full rounded-b-[20px] p-[25px]'>
                    <View className='flex items-center justify-between flex-row'>
                        <TouchableOpacity onPress={openSidebar}>
                            <Image
                                source={whiteMenuIcon}
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
            </ImageBackground>

            <Text>Wallet</Text>
            
            <StatusBar backgroundColor='#FFFFFF' />
        </SafeAreaView>
    );
}

export default Wallet;