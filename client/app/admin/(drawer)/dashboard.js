import { useEffect, useState } from 'react';
import { View, Text, StatusBar, ImageBackground } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ScrollView } from 'react-native-gesture-handler';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Header from '../../../components/admin/Header';
import { useWallet } from '../../../contexts/WalletContext';
import { useProperty } from '../../../contexts/PropertyContext';

const Dashboard = () => {
    const [user, setUser] = useState(null);

    const { getTotalSales, overallSales, pastMonthRevenue, pastWeekSales, walletLoading } = useWallet();
    const { getMyProperties, totalProperties, propertyLoading, totalPropertiesAddedPastMonth } = useProperty();

    useEffect(() => {
        const getUser = async () => {
            const userDetails = await AsyncStorage.getItem('user');
            setUser(JSON.parse(userDetails));
        }

        getUser();
    }, []);

    useEffect(() => {
        const getSales = async () => {
            await getTotalSales();
        }

        getSales();
    }, []);

    useEffect(() => {
        const getProperties = async () => {
            await getMyProperties();
        }

        getProperties();
    }, []);

    return (
        <SafeAreaView>
            <ScrollView>
                <Header title='Dashboard' />

                <ImageBackground
                    source={require('../../../assets/images/bg-1.png')}
                    resizeMode='stretch'
                    className='w-full h-[170px]'
                >
                    <View className='h-full p-[25px]'>
                        <Text className='text-white text-3xl font-rbold'>Hello, {user ? user.fullname.split(' ')[1] : 'Agent'}</Text>
                        <Text className='text-white font-rregular text-lg'>Welcome to your dashboard</Text>
                    </View>
                </ImageBackground>
                <View className='p-[25px] mt-[-80px]'>
                    <View className='bg-white rounded-xl p-[20px] shadow-lg mb-4'>
                        <Text className='font-rbold text-blue text-xl'>Total Properties</Text>
                        <Text className='text-[40px] font-rbold text-blue'>{propertyLoading ? 'Loading...' : totalProperties}</Text>
                        <Text className='font-rregular text-lg text-blue'><Text className='font-rbold'>{propertyLoading ? 'Loading...' : `+${totalPropertiesAddedPastMonth}`}</Text> - last month</Text>
                    </View>
                    <View className='bg-white rounded-xl p-[20px] shadow-lg mb-4'>
                        <Text className='font-rbold text-blue text-xl'>Revenue</Text>
                        <Text className='text-[40px] font-rbold text-blue'>{walletLoading ? 'Loading...' : `₦ ${pastMonthRevenue}`}</Text>
                        <Text className='font-rregular text-lg text-blue'><Text className='font-rbold'>{walletLoading ? 'Loading...' : `+₦ ${pastWeekSales}`}</Text> - last week</Text>
                    </View>
                    <View className='bg-white rounded-xl p-[20px] shadow-lg'>
                        <Text className='font-rbold text-blue text-xl'>Overall Sales</Text>
                        <Text className='text-[40px] font-rbold text-blue'>{walletLoading ? 'Loading...' : `₦ ${overallSales}`}</Text>
                        <Text className='font-rregular text-lg text-blue'><Text className='font-rbold'>{walletLoading ? 'Loading...' : `+₦ ${pastWeekSales}`}</Text> - last week</Text>
                    </View>
                </View>
                
            </ScrollView>
            
            <StatusBar backgroundColor='#FFFFFF' />
        </SafeAreaView>
    );
}

export default Dashboard;