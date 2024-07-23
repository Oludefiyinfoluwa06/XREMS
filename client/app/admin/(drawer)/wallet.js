import { useEffect } from 'react';
import { DrawerActions } from '@react-navigation/native';
import { router, useNavigation } from 'expo-router';
import { View, Text, StatusBar, ImageBackground, TouchableOpacity, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { format, isToday, isYesterday } from 'date-fns';
import { pencil, profile2, receive, send, transactions, whiteMenuIcon } from '../../../assets/icons/admin';
import Button from '../../../components/Button';
import { useProperty } from '../../../contexts/PropertyContext';
import { useAuth } from '../../../contexts/AuthContext';
import { useWallet } from '../../../contexts/WalletContext';

const Wallet = () => {
    const { formatPrice } = useProperty();
    const { getUser, user } = useAuth();
    const { getTransactionHistory, transactionHistory } = useWallet();

    useEffect(() => {
        getUser();
    }, [user]);

    useEffect(() => {
        getTransactionHistory();
    }, [transactionHistory]);

    const navigation = useNavigation();

    const openSidebar = () => {
        navigation.dispatch(DrawerActions.openDrawer());
    }

    const formatTimestamp = (timestamp) => {
        const date = new Date(timestamp);

        if (isToday(date)) {
            return `Today, ${format(date, 'h:mm a')}`;
        }

        if (isYesterday(date)) {
            return `Yesterday, ${format(date, 'h:mm a')}`;
        }

        return format(date, 'MMMM d, yyyy, h:mm a');
    };

    const formatAmount = (value) => {
        if (typeof value !== 'string') {
            value = value.toString();
        }
        
        const numericValue = value.replace(/\D/g, '');
        return numericValue.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
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
                                source={user !== null && user?.profileImg !== '' ? { uri: user?.profileImg } : profile2}
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
                <View className='p-[13px] bg-white rounded-xl' style={{ padding: 20, backgroundColor: '#fff', shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.8, shadowRadius: 2, elevation: 5 }}>
                    <Text className='text-2xl font-rbold text-blue'>Balance</Text>
                    <Text className='text-5xl font-rbold mb-3 mt-2 text-blue'>₦ {formatPrice(user?.balance || 0)}</Text>

                    <Button title='Withdraw' onClick={() => { }} />
                </View>

                <View className='p-[13px] bg-white rounded-xl' style={{ padding: 20, backgroundColor: '#fff', shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.8, shadowRadius: 2, elevation: 5 }}>
                    <View className='flex flex-row items-center justify-start'>
                        <Image 
                            source={transactions}
                            resizeMode='contain'
                            className='w-[30px] h-[30px] mr-3'
                        />
                        <Text className='text-2xl font-rbold text-blue'>Transaction History</Text>
                    </View>
                    
                    <View className='w-full mt-4'>
                        {transactionHistory.map(transaction => (
                            <View key={transaction?._id} className='flex flex-row items-center justify-between mb-3 w-full'>
                                <View className='flex flex-row items-center justify-start'>
                                    <Image
                                        source={transaction?.type === 'transfer' ? send : receive}
                                        resizeMode='contain'
                                        className='mr-2 w-[30px] h-[30px]'
                                    />
                                    <View>
                                        <Text className='capitalize text-xl font-rbold text-blue'>{transaction?.type}</Text>
                                        <Text className='text-md font-rregular text-blue'>{transaction?.remark}</Text>
                                    </View>
                                </View>
                                <View className='flex items-end justify-start'>
                                    <Text className={`${transaction?.type === 'receipt' ? 'text-green-600' : 'text-errorText'} font-rbold text-xl`}>₦ {formatAmount(transaction?.amount)}</Text>
                                    <Text className='text-blue font-rregular text-md'>{formatTimestamp(transaction?.date)}</Text>
                                </View>
                            </View>
                        ))}
                    </View>
                </View>
            </View>
            
            <StatusBar backgroundColor='#FFFFFF' />
        </SafeAreaView>
    );
}

export default Wallet;