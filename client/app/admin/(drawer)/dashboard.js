import { View, Text, StatusBar, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ScrollView } from 'react-native-gesture-handler';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Header from '../../../components/admin/Header';
import { useEffect, useState } from 'react';

const Dashboard = () => {
    const [user, setUser] = useState(null);

    useEffect(() => {
        const getUser = async () => {
            const userDetails = await AsyncStorage.getItem('user');
            setUser(JSON.parse(userDetails));
        }

        getUser();
    }, []);

    return (
        <SafeAreaView>
            <ScrollView>
                <Header title='Dashboard' />

                <View className='bg-blue h-[170px] rounded-b-[20px] p-[25px]'>
                    <Text className='text-white text-3xl font-rbold'>Hello, {user ? user.fullname.split(' ')[1] : 'Agent'}</Text>
                    <Text className='text-white font-rregular text-lg'>Welcome to your dashboard</Text>
                </View>

                <View className='p-[25px] mt-[-80px]'>
                    <View className='bg-white rounded-xl p-[20px] shadow-lg mb-4'>
                        <Text className='font-rbold text-blue text-xl'>Total Properties</Text>
                        <Text className='text-[40px] font-rbold text-blue'>0</Text>
                        <Text className='font-rregular text-lg text-blue'><Text className='font-rbold'>+0</Text> - last month</Text>
                    </View>
                    <View className='bg-white rounded-xl p-[20px] shadow-lg mb-4'>
                        <Text className='font-rbold text-blue text-xl'>Revenue</Text>
                        <Text className='text-[40px] font-rbold text-blue'>₦ 0</Text>
                        <Text className='font-rregular text-lg text-blue'><Text className='font-rbold'>+0</Text> - last month</Text>
                    </View>
                    <View className='bg-white rounded-xl p-[20px] shadow-lg'>
                        <Text className='font-rbold text-blue text-xl'>Overall Sales</Text>
                        <Text className='text-[40px] font-rbold text-blue'>₦ 0</Text>
                        <Text className='font-rregular text-lg text-blue'><Text className='font-rbold'>+0</Text> - last month</Text>
                    </View>
                </View>
                
            </ScrollView>
            
            <StatusBar backgroundColor='#FFFFFF' />
        </SafeAreaView>
    );
}

export default Dashboard;