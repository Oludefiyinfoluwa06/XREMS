import { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, Image, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { angleBack, lightSettings } from '../../constants';
import { transactionHistory } from '../../assets/icons/admin';
import Button from '../../components/Button';

const Wallet = () => {
    const [user, setUser] = useState(null);

    useEffect(() => {
        const getUser = async () => {
            const userDetails = await AsyncStorage.getItem('user');
            setUser(JSON.parse(userDetails));
        }

        getUser();
    }, []);

    return (
        <SafeAreaView className='h-full'>
            <ScrollView>
                <View className='flex items-center justify-between flex-row bg-white p-[25px]'>
                    <TouchableOpacity
                        className='flex items-center justify-center p-[13px] rounded-lg bg-white shadow-lg'
                        onPress={() => router.back()}
                    >
                        <Image
                            source={angleBack}
                            resizeMode='contain'
                            className='w-[24px] h-[24px]'
                        />
                    </TouchableOpacity>

                    <Text className='font-rbold text-xl -ml-2'>Wallet</Text>

                    <TouchableOpacity onPress={() => router.push('/settings')}>
                        <Image
                            source={lightSettings}
                            resizeMode='contain'
                            className='w-[30px] h-[30px]'
                        />
                    </TouchableOpacity>
                </View>

                <View className='space-y-[20px] p-[25px]'>
                    <View className='p-[13px] bg-white shadow-lg rounded-xl'>
                        <Text className='text-2xl font-rbold text-blue'>Balance</Text>
                        <Text className='text-5xl font-rbold mb-3 mt-2 text-blue'>₦ {user?.balance}</Text>

                        <Button title='Fund' onClick={() => { }} />
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
            </ScrollView>
        </SafeAreaView>
    );
}

export default Wallet;