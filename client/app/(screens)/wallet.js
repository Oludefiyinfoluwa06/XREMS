import { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, Image, Modal, TextInput, FlatList, ActivityIndicator } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Ionicons from '@expo/vector-icons/Ionicons';
import { angleBack, lightSettings } from '../../constants';
import { transactionHistory } from '../../assets/icons/admin';
import Button from '../../components/Button';
import { useWallet } from '../../contexts/WalletContext';

const Wallet = () => {
    const [user, setUser] = useState(null);
    const [modalVisible, setModalVisible] = useState(false);
    const [amount, setAmount] = useState('');
    const [cardNumber, setCardNumber] = useState('');
    const [name, setName] = useState('');
    const [expiryMonth, setExpiryMonth] = useState('');
    const [expiryYear, setExpiryYear] = useState('');
    const [cvv, setCvv] = useState('');

    const { fundWallet, balance, walletLoading } = useWallet();

    useEffect(() => {
        const getUser = async () => {
            const userDetails = await AsyncStorage.getItem('user');
            setUser(JSON.parse(userDetails));
        }

        getUser();
    }, [balance]);

    const handleFundWallet = async () => {
        await fundWallet(amount, user?.email, name, cardNumber, cvv, expiryMonth, expiryYear);
        setModalVisible(false);
    }

    return (
        <SafeAreaView className='h-full'>
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

                    <Button title='Fund' onClick={() => setModalVisible(true)} />
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

                        <View>
                            <Text className="text-blue ml-[10px] mt-[20px] mb-[8px] text-xl font-rbold">Amount:</Text>
                            <TextInput
                                placeholder='Amount'
                                className='p-[5px] px-[10px] w-full border border-gray rounded-lg font-rregular'
                                value={amount}
                                onChangeText={(value) => setAmount(value)}
                            />
                        </View>

                        <View className='flex flex-row items-center justify-start mt-[13px]'>
                            <Text className='text-lg text-blue font-rbold'>Add Card Details</Text>
                        </View>

                        <View>
                            <Text className="text-blue ml-[10px] mt-[20px] mb-[8px] text-xl font-rbold">Card number:</Text>
                            <TextInput
                                placeholder='**** **** **** 2345'
                                className='p-[5px] px-[10px] w-full border border-gray rounded-lg font-rregular'
                                value={cardNumber}
                                onChangeText={(value) => setCardNumber(value)}
                            />

                            <Text className="text-blue ml-[10px] mt-[20px] mb-[8px] text-xl font-rbold">Name on the card:</Text>
                            <TextInput
                                placeholder='Card name'
                                className='p-[5px] px-[10px] w-full border border-gray rounded-lg font-rregular'
                                value={name}
                                onChangeText={(value) => setName(value)}
                            />

                            <View className='flex flex-row items-center justify-between'>
                                <View>
                                    <Text className="text-blue ml-[10px] mt-[20px] mb-[8px] text-xl font-rbold">Expiry Date:</Text>
                                    <View className='flex items-center justify-start flex-row space-x-[10px]'>
                                        <TextInput
                                            placeholder='04'
                                            className='p-[5px] px-[10px] border border-gray rounded-lg font-rregular'
                                            value={expiryMonth}
                                            onChangeText={(value) => setExpiryMonth(value)}
                                        />
                                        <Text>/</Text>
                                        <TextInput
                                            placeholder='2002'
                                            className='p-[5px] px-[10px] border border-gray rounded-lg font-rregular'
                                            value={expiryYear}
                                            onChangeText={(value) => setExpiryYear(value)}
                                        />
                                    </View>
                                </View>

                                <View>
                                    <Text className="text-blue ml-[10px] mt-[20px] mb-[8px] text-xl font-rbold">CVV:</Text>
                                    <TextInput
                                        placeholder='***'
                                        className='p-[5px] px-[10px] w-[100px] border border-gray rounded-lg font-rregular'
                                        value={cvv}
                                        onChangeText={(value) => setCvv(value)}
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
        </SafeAreaView>
    );
}

export default Wallet;