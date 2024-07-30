import { useEffect, useState } from 'react';
import { DrawerActions } from '@react-navigation/native';
import { router, useNavigation } from 'expo-router';
import { View, Text, StatusBar, ImageBackground, TouchableOpacity, Image, Modal, ActivityIndicator, TextInput } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { format, isToday, isYesterday } from 'date-fns';
import SelectDropdown from 'react-native-select-dropdown';
import axios from 'axios';
import { pencil, profile2, receive, send, transactions, whiteMenuIcon } from '../../../assets/icons/admin';
import Button from '../../../components/Button';
import { useProperty } from '../../../contexts/PropertyContext';
import { useAuth } from '../../../contexts/AuthContext';
import { useWallet } from '../../../contexts/WalletContext';
import Ionicons from '@expo/vector-icons/Ionicons';
import Success from '../../../components/admin/Success';

const Wallet = () => {
    const [amount, setAmount] = useState('');
    const [password, setPassword] = useState('');
    const [bankCode, setBankCode] = useState('');
    const [accountNumber, setAccountNumber] = useState('');
    const [banks, setBanks] = useState([]);
    const { formatPrice } = useProperty();
    const { getUser, user } = useAuth();
    const { modalVisible, setModalVisible, successModalVisible, message, walletLoading, walletError, setWalletError, getTransactionHistory, transactionHistory, withdraw } = useWallet();

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

    useEffect(() => {
        const getBanks = async () => {
            const response = await axios.get('https://api.flutterwave.com/v3/banks/NG', {
                headers: {
                    'Authorization': 'FLWSECK_TEST-e937de93f518e393ee99c71518677238-X',
                }
            });

            setBanks(response.data.data);
        }

        getBanks();
    }, []);

    const handleWithdraw = async () => {
        await withdraw(amount, password, bankCode, accountNumber);

        setAmount('');
        setPassword('');
        setBankCode('');
        setAccountNumber('');
    }

    const sortedData = banks.sort((a, b) => a.name.localeCompare(b.name));

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
                <View className='p-[13px] bg-white rounded-xl' style={{ padding: 20, backgroundColor: '#fff', shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.8, shadowRadius: 2, elevation: 200 }}>
                    <Text className='text-2xl font-rbold text-blue'>Balance</Text>
                    <Text className='text-5xl font-rbold mb-3 mt-2 text-blue'>₦ {formatPrice(user?.balance || 0)}</Text>

                    <Button title='Withdraw' onClick={() => setModalVisible(true)} />
                </View>

                <View className='p-[13px] bg-white rounded-xl' style={{ padding: 20, backgroundColor: '#fff', shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.8, shadowRadius: 2, elevation: 200 }}>
                    <View className='flex flex-row items-center justify-start'>
                        <Image 
                            source={transactions}
                            resizeMode='contain'
                            className='w-[30px] h-[30px] mr-3'
                        />
                        <Text className='text-2xl font-rbold text-blue'>Transaction History</Text>
                    </View>
                    
                    <View className='w-full mt-4'>
                        {transactionHistory.length > 0 ? transactionHistory.map(transaction => (
                            <View key={transaction?._id} className='flex flex-row items-center justify-between mb-3 w-full'>
                                <View className='flex flex-row items-center justify-start flex-shrink'>
                                    <Image
                                        source={transaction?.type === 'transfer' ? send : receive}
                                        resizeMode='contain'
                                        className='mr-2 w-[30px] h-[30px]'
                                    />
                                    <View className='flex-shrink'>
                                        <Text className='capitalize text-xl font-rbold text-blue overflow-hidden' numberOfLines={1}>{transaction?.type}</Text>
                                        <Text className='text-md font-rregular text-blue overflow-hidden' numberOfLines={1}>{transaction?.remark}</Text>
                                    </View>
                                </View>
                                <View className='flex items-end justify-start'>
                                    <Text className={`${transaction?.type === 'receipt' ? 'text-green-600' : 'text-errorText'} font-rbold text-xl overflow-hidden`} numberOfLines={1}>₦ {formatAmount(transaction?.amount)}</Text>
                                    <Text className='text-blue font-rregular text-md overflow-hidden' numberOfLines={1}>{formatTimestamp(transaction?.date)}</Text>
                                </View>
                            </View>
                        )) : (
                            <View>
                                <Text className='text-blue font-rbold text-[20px]'>No transaction history</Text>
                            </View>
                        )}
                    </View>
                </View>
            </View>

            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
            >
                <View className='relative w-full h-full bg-transparentBlack'>
                    <View className='absolute bottom-0 left-0 w-full bg-white rounded-t-[30px] p-[25px]'>
                        <View className='flex flex-row items-center justify-between'>
                            <Text className='text-xl text-blue font-rbold'>Withdraw</Text>
                            <TouchableOpacity onPress={() => setModalVisible(false)}>
                                <Ionicons name="close" size={32} color="black" />
                            </TouchableOpacity>
                        </View>

                        {walletError && <View className='w-full p-3 rounded-lg bg-errorBg mt-[20px]'>
                            <Text className='font-rregular text-errorText'>{walletError}</Text>
                        </View>}

                        <View className='w-full border border-gray rounded-lg p-[5px] px-[10px] mt-3'>
                            <SelectDropdown
                                data={sortedData}
                                onSelect={(selectedItem, index) => {
                                    setBankCode(selectedItem.code);
                                }}
                                renderButton={(selectedItem, isOpened) => {
                                    return (
                                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                                            <Text className='font-rbold text-blue text-lg'>
                                                {(selectedItem && selectedItem.name) || 'Select a bank'}
                                            </Text>
                                            <View>
                                                <Ionicons name={isOpened ? 'chevron-up' : 'chevron-down'} size={20} />
                                            </View>
                                        </View>
                                    );
                                }}
                                renderItem={(item, index, isSelected) => {
                                    return (
                                        <View
                                            style={{
                                                height: 50,
                                                paddingTop: 30,
                                                borderBottomWidth: 1,
                                                borderBottomColor: 'gray',
                                                backgroundColor: isSelected ? 'gray' : 'transparent',
                                                width: '100%',
                                            }}
                                        >
                                            <Text style={{ flex: 1, alignItems: 'center', marginLeft: 10, textTransform: 'capitalize' }}>{item.name}</Text>
                                        </View>
                                    );
                                }}
                                showsVerticalScrollIndicator={false}
                            />
                        </View>

                        <View>
                            <Text className="text-blue ml-[10px] mt-[20px] mb-[8px] text-xl font-rbold">Account number:</Text>
                            <TextInput
                                placeholder='Account number'
                                placeholderTextColor={'#C2C2C2'}
                                className='p-[5px] px-[10px] w-full border border-gray rounded-lg font-rregular'
                                value={accountNumber}
                                onChangeText={(value) => {
                                    setAccountNumber(value);
                                    setWalletError('');
                                }}
                            />
                        </View>

                        <View>
                            <Text className="text-blue ml-[10px] mt-[20px] mb-[8px] text-xl font-rbold">Amount:</Text>
                            <TextInput
                                placeholder='Amount'
                                placeholderTextColor={'#C2C2C2'}
                                className='p-[5px] px-[10px] w-full border border-gray rounded-lg font-rregular'
                                value={amount}
                                onChangeText={(value) => {
                                    setAmount(value);
                                    setWalletError('');
                                }}
                            />
                        </View>

                        <View>
                            <Text className="text-blue ml-[10px] mt-[20px] mb-[8px] text-xl font-rbold">Password:</Text>
                            <TextInput
                                placeholder='Password'
                                placeholderTextColor={'#C2C2C2'}
                                className='p-[5px] px-[10px] w-full border border-gray rounded-lg font-rregular'
                                secureTextEntry
                                value={password}
                                onChangeText={(value) => {
                                    setPassword(value);
                                    setWalletError('');
                                }}
                            />
                        </View>

                        <TouchableOpacity className='w-full bg-blue py-3 rounded-lg mt-[20px]' onPress={handleWithdraw}>
                            {walletLoading ? (
                                <ActivityIndicator size="large" color="#FFFFFF" />
                            ): (
                                <Text className='text-white font-rbold text-center text-lg'>Withdraw</Text>
                            )}
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>

            <Success successModalVisible={successModalVisible} message={message} />
            
            <StatusBar backgroundColor='#FFFFFF' />
        </SafeAreaView>
    );
}

export default Wallet;