import { useEffect, useState } from 'react';
import { DrawerActions } from '@react-navigation/native';
import { router, useNavigation } from 'expo-router';
import { View, Text, StatusBar, ImageBackground, TouchableOpacity, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { pencil, profile2, transactionHistory, whiteMenuIcon } from '../../../assets/icons/admin';
import Button from '../../../components/Button';

const Wallet = () => {
    const [user, setUser] = useState(null);
    const [image, setImage] = useState(null);

    useEffect(() => {
        const getUser = async () => {
            const userDetails = await AsyncStorage.getItem('user');
            setUser(JSON.parse(userDetails));

            const profileImg = await AsyncStorage.getItem('profile');
            setImage(profileImg);
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
                        <TouchableOpacity onPress={() => router.push('/admin/edit-profile')}>
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
                                source={image !== null && image !== '' ? { uri: image } : profile2}
                                resizeMode='cover'
                                className='w-full h-full absolute top-0 left-0 rounded-full'
                            />
                        </View>
                        <Text className='text-white mt-1 font-rbold text-2xl'>{user?.fullname}</Text>
                        <Text className='text-white mt-1 font-rbold text-[12px]'>Welcome to your wallet</Text>
                    </View>
                </View>
            </ImageBackground>

            <View className='p-[25px] space-y-[20px]'>
                <View className='p-[13px] bg-white shadow-lg rounded-xl'>
                    <Text className='text-2xl font-rbold text-blue'>Balance</Text>
                    <Text className='text-5xl font-rbold mb-3 mt-2 text-blue'>₦ {user?.balance}</Text>

                    <Button title='Withdraw' onClick={() => { }} />
                </View>

                <View className='p-[13px] bg-white shadow-lg rounded-xl'>
                    <View className='flex flex-row items-center justify-start'>
                        <Image 
                            source={transactionHistory}
                            resizeMode='contain'
                            className='w-[30px] h-[30px] mr-3'
                        />
                        <Text className='text-2xl font-rbold text-blue'>Transaction History</Text>
                    </View>
                    
                </View>
            </View>
            
            <StatusBar backgroundColor='#FFFFFF' />
        </SafeAreaView>
    );
}

export default Wallet;