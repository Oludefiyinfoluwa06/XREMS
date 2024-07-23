import { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, Image, Modal, TextInput, ActivityIndicator } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import Ionicons from '@expo/vector-icons/Ionicons';
import { format, isToday, isYesterday } from 'date-fns';
import { angleBack, lightSettings } from '../../constants';
import { receive, send, transactions } from '../../assets/icons/admin';
import Button from '../../components/Button';
import { useWallet } from '../../contexts/WalletContext';
import { useProperty } from '../../contexts/PropertyContext';
import { useAuth } from '../../contexts/AuthContext';
import Success from '../../components/admin/Success';

const Wallet = () => {
    const [amount, setAmount] = useState('');
    const [cardNumber, setCardNumber] = useState('');
    const [name, setName] = useState('');
    const [expiryMonth, setExpiryMonth] = useState('');
    const [expiryYear, setExpiryYear] = useState('');
    const [cvv, setCvv] = useState('');

    const { formatPrice } = useProperty();
    const { walletError, setWalletError, fundWallet, walletLoading, getTransactionHistory, transactionHistory, modalVisible, setModalVisible, successModalVisible, message } = useWallet();
    const { getUser, user } = useAuth();

    useEffect(() => {
        getUser();
    }, [user]);

    useEffect(() => {
        getTransactionHistory();
    }, [transactionHistory]);

    const handleFundWallet = async () => {
        await fundWallet(amount, user?.email, name, cardNumber, cvv, expiryMonth, expiryYear);

        setAmount('');
        setCardNumber('');
        setName('');
        setExpiryMonth('');
        setExpiryYear('');
        setCvv('');
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
        <SafeAreaView className='h-full'>
            <View className='flex items-center justify-between flex-row bg-white p-[25px]'>
                <TouchableOpacity
                    className='flex items-center justify-center p-[13px] rounded-lg bg-white'
                    style={{ padding: 20, backgroundColor: '#fff', shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.8, shadowRadius: 2, elevation: 5 }}
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
                <View className='p-[13px] bg-white rounded-xl' style={{ padding: 20, backgroundColor: '#fff', shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.8, shadowRadius: 2, elevation: 5 }}>
                    <Text className='text-2xl font-rbold text-blue'>Balance</Text>
                    <Text className='text-5xl font-rbold mb-3 mt-2 text-blue'>₦ {formatPrice(user?.balance)}</Text>

                    <Button title='Fund' onClick={() => setModalVisible(true)} />
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
                                    <Text className={`${transaction?.type === 'deposit' ? 'text-green-600' : 'text-errorText'} font-rbold text-xl`}>₦ {formatAmount(transaction?.amount)}</Text>
                                    <Text className='text-blue font-rregular text-md'>{formatTimestamp(transaction?.date)}</Text>
                                </View>
                            </View>
                        ))}
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
                            <Text className='text-xl text-blue font-rbold'>Fund wallet</Text>
                            <TouchableOpacity onPress={() => setModalVisible(false)}>
                                <Ionicons name="close" size={32} color="black" />
                            </TouchableOpacity>
                        </View>

                        {walletError && <View className='w-full p-3 rounded-lg bg-errorBg mt-[20px]'>
                            <Text className='font-rregular text-errorText'>{walletError}</Text>
                        </View>}

                        <View>
                            <Text className="text-blue ml-[10px] mt-[20px] mb-[8px] text-xl font-rbold">Amount:</Text>
                            <TextInput
                                placeholder='Amount'
                                placeholderTextColor={'#C2C2C2'}
                                className='p-[5px] px-[10px] w-full border border-gray rounded-lg font-rregular'
                                value={formatAmount(amount)}
                                onChangeText={(value) => {
                                    setAmount(value);
                                    setWalletError('');
                                }}
                            />
                        </View>

                        <View className='flex flex-row items-center justify-start mt-[13px]'>
                            <Text className='text-lg text-blue font-rbold'>Add Card Details</Text>
                        </View>

                        <View>
                            <Text className="text-blue ml-[10px] mt-[20px] mb-[8px] text-xl font-rbold">Card number:</Text>
                            <TextInput
                                placeholder='5531************'
                                placeholderTextColor={'#C2C2C2'}
                                className='p-[5px] px-[10px] w-full border border-gray rounded-lg font-rregular'
                                value={cardNumber}
                                onChangeText={(value) => {
                                    setCardNumber(value);
                                    setWalletError('');
                                }}
                            />

                            <Text className="text-blue ml-[10px] mt-[20px] mb-[8px] text-xl font-rbold">Name on the card:</Text>
                            <TextInput
                                placeholder='Card name'
                                placeholderTextColor={'#C2C2C2'}
                                className='p-[5px] px-[10px] w-full border border-gray rounded-lg font-rregular'
                                value={name}
                                onChangeText={(value) => {
                                    setName(value);
                                    setWalletError('');
                                }}
                            />

                            <View className='flex flex-row items-center justify-between'>
                                <View>
                                    <Text className="text-blue ml-[10px] mt-[20px] mb-[8px] text-xl font-rbold">Expiry Date:</Text>
                                    <View className='flex items-center justify-start flex-row space-x-[10px]'>
                                        <TextInput
                                            placeholder='09'
                                            placeholderTextColor={'#C2C2C2'}
                                            className='p-[5px] px-[10px] border border-gray rounded-lg font-rregular'
                                            value={expiryMonth}
                                            onChangeText={(value) => {
                                                setExpiryMonth(value);
                                                setWalletError('');
                                            }}
                                        />
                                        <Text>/</Text>
                                        <TextInput
                                            placeholder='32'
                                            placeholderTextColor={'#C2C2C2'}
                                            className='p-[5px] px-[10px] border border-gray rounded-lg font-rregular'
                                            value={expiryYear}
                                            onChangeText={(value) => {
                                                setExpiryYear(value);
                                                setWalletError('');
                                            }}
                                        />
                                    </View>
                                </View>

                                <View>
                                    <Text className="text-blue ml-[10px] mt-[20px] mb-[8px] text-xl font-rbold">CVV:</Text>
                                    <TextInput
                                        placeholder='564'
                                        placeholderTextColor={'#C2C2C2'}
                                        className='p-[5px] px-[10px] w-[100px] border border-gray rounded-lg font-rregular'
                                        value={cvv}
                                        onChangeText={(value) => {
                                            setCvv(value);
                                            setWalletError('');
                                        }}
                                    />
                                </View>
                            </View>
                        </View>

                        <TouchableOpacity className='w-full bg-blue py-3 rounded-lg mt-[20px]' onPress={handleFundWallet}>
                            {walletLoading ? (
                                <ActivityIndicator size="large" color="#FFFFFF" />
                            ): (
                                <Text className = 'text-white font-rbold text-center text-lg'>Fund</Text>
                            )}
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>

            <Success successModalVisible={successModalVisible} message={message} />
        </SafeAreaView>
    );
}

export default Wallet;