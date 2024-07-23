import { useEffect, useState } from 'react';
import { View, Text, StatusBar, ImageBackground } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ScrollView } from 'react-native-gesture-handler';
import Header from '../../../components/admin/Header';
import { useWallet } from '../../../contexts/WalletContext';
import { useProperty } from '../../../contexts/PropertyContext';
import { useAuth } from '../../../contexts/AuthContext';

const Dashboard = () => {
    const { getTotalSales, overallSales, pastMonthRevenue, pastWeekSales, walletLoading } = useWallet();
    const { getMyProperties, totalProperties, propertyLoading, totalPropertiesAddedPastMonth, formatPrice } = useProperty();
    const { getUser, user } = useAuth();

    useEffect(() => {
        getUser();
    }, []);

    useEffect(() => {
        const getSales = async () => {
            await getTotalSales();
        }

        getSales();
    }, []);

    useEffect(() => {
        getMyProperties();
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
                        <Text className='text-white text-3xl font-rbold'>Hello, {user?.fullname.split(' ')[1]}</Text>
                        <Text className='text-white font-rregular text-lg'>Welcome to your dashboard</Text>
                    </View>
                </ImageBackground>
                <View className='p-[25px] mt-[-80px]'>
                    <View className='bg-white rounded-xl p-[20px] mb-4' style={{ padding: 20, backgroundColor: '#fff', shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.8, shadowRadius: 2, elevation: 5 }}>
                        <Text className='font-rbold text-blue text-xl'>Total Properties</Text>
                        <Text className='text-[40px] font-rbold text-blue'>{propertyLoading ? 'Loading...' : totalProperties}</Text>
                        <Text className='font-rregular text-lg text-blue'><Text className='font-rbold'>{propertyLoading ? 'Loading...' : `+${totalPropertiesAddedPastMonth}`}</Text> - last month</Text>
                    </View>
                    <View className='bg-white rounded-xl p-[20px] mb-4' style={{ padding: 20, backgroundColor: '#fff', shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.8, shadowRadius: 2, elevation: 5 }}>
                        <Text className='font-rbold text-blue text-xl'>Revenue</Text>
                        <Text className='text-[40px] font-rbold text-blue'>{walletLoading ? 'Loading...' : `₦ ${formatPrice(pastMonthRevenue)}`}</Text>
                        <Text className='font-rregular text-lg text-blue'><Text className='font-rbold'>{walletLoading ? 'Loading...' : `+₦ ${formatPrice(pastWeekSales)}`}</Text> - last week</Text>
                    </View>
                    <View className='bg-white rounded-xl p-[20px]' style={{ padding: 20, backgroundColor: '#fff', shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.8, shadowRadius: 2, elevation: 5 }}>
                        <Text className='font-rbold text-blue text-xl'>Overall Sales</Text>
                        <Text className='text-[40px] font-rbold text-blue'>{walletLoading ? 'Loading...' : `₦ ${formatPrice(overallSales)}`}</Text>
                        <Text className='font-rregular text-lg text-blue'><Text className='font-rbold'>{walletLoading ? 'Loading...' : `+₦ ${formatPrice(pastWeekSales)}`}</Text> - last week</Text>
                    </View>
                </View>
                
            </ScrollView>
            
            <StatusBar backgroundColor='#FFFFFF' />
        </SafeAreaView>
    );
}

export default Dashboard;