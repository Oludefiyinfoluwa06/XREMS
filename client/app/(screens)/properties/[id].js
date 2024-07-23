import { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, Image, ScrollView, ActivityIndicator, RefreshControl, TextInput, Modal, FlatList } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router, useLocalSearchParams } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Ionicons from '@expo/vector-icons/Ionicons';
import { angleBack, transparentBookmark, chat, location, user, bookmark } from '../../../constants';
import Button from '../../../components/Button';
import { useProperty } from '../../../contexts/PropertyContext';
import { useWallet } from '../../../contexts/WalletContext';

const HouseDetails = () => {
    const [isExpanded, setIsExpanded] = useState(false);
    const [isBookmarked, setIsBookmarked] = useState(false);
    const [refreshing, setRefreshing] = useState(false);
    const [password, setPassword] = useState('');
    const params = useLocalSearchParams();

    const { pay, walletLoading, walletError, setWalletError, modalVisible, setModalVisible } = useWallet();
    const { getPropertyDetails, houseDetails, error, setError, formatPrice } = useProperty();

    const toggleExpansion = () => {
        setIsExpanded(!isExpanded);
    }

    const onRefresh = () => {
        setRefreshing(true);
        setTimeout(() => {
            setRefreshing(false);
        }, 2000);
    }

    useEffect(() => {
        setError('');
        getPropertyDetails(params.id);
        checkBookmarkStatus();
    }, [houseDetails]);

    const handleBuy = async (amount, agentId, propertyId) => {
        await pay(amount, agentId, propertyId, password);
    }

    const checkBookmarkStatus = async () => {
        try {
            const bookmarksString = await AsyncStorage.getItem('bookmarks');
            const bookmarks = bookmarksString ? JSON.parse(bookmarksString) : [];
            const existingBookmark = bookmarks.find(bookmark => bookmark.property._id === houseDetails?.property._id);
            setIsBookmarked(existingBookmark ? true : false);
        } catch (error) {
            console.log(error);
        }
    }

    const saveBookmark = async () => {
        try {
            const bookmarksString = await AsyncStorage.getItem('bookmarks');
            let bookmarks = bookmarksString ? JSON.parse(bookmarksString) : [];

            const existingIndex = bookmarks.findIndex(bookmark => bookmark.property._id === houseDetails?.property._id);
            if (existingIndex === -1) {
                bookmarks.push({ property: houseDetails?.property, img: houseDetails?.property.img[0] });
                await AsyncStorage.setItem('bookmarks', JSON.stringify(bookmarks));
                setIsBookmarked(true);
                alert('Property bookmarked successfully!');
            } else {
                bookmarks = bookmarks.filter((_, index) => index !== existingIndex);
                await AsyncStorage.setItem('bookmarks', JSON.stringify(bookmarks));
                setIsBookmarked(false);
                alert('Property removed from bookmarks!');
            }
        } catch (error) {
            console.log(error);
        }
    }
    
    return (
        <SafeAreaView>
            {error ? (
                <Text>Error</Text>
            ) : houseDetails !== null ? (
                <ScrollView className='p-[20px] bg-white h-full' refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}>
                    <View className='flex items-center justify-start flex-row'>
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
                    </View>

                    <View>
                        <FlatList
                            horizontal
                            data={houseDetails?.property.img}
                            renderItem={({ item }) => (
                                <Image
                                    source={{ uri: item }}
                                    className={`${houseDetails?.property.img.length === 1 ? 'w-[398px]' : 'w-[350px]'} h-[200px] mr-3 rounded-lg`}
                                />
                            )}
                            keyExtractor={(item, index) => index.toString()}
                            showsHorizontalScrollIndicator={false}
                            contentContainerStyle={{ marginVertical: 10 }}
                        />

                        <View className='flex flex-row items-center justify-between mt-[20px]'>
                            <Text className='font-rbold text-lg text-blue'>{houseDetails?.property.type}</Text>
                            <TouchableOpacity onPress={saveBookmark}>
                                <Image
                                    source={isBookmarked ? bookmark : transparentBookmark}
                                    resizeMode='contain'
                                    className='w-[23px] h-[23px]'
                                />
                            </TouchableOpacity>
                        </View>
                        <View className='flex flex-row items-center justify-start mt-[10px]'>
                            <Image
                                source={location}
                                resizeMode='cover'
                                className='w-[20px] h-[20px] mr-2'
                            />
                            <Text className='font-rregular text-md'>{houseDetails?.property.location}</Text>
                        </View>
                            
                        <View className='flex flex-row items-center justify-start mt-[10px]'>
                            <Text className='font-rregular text-lg text-blue mr-[10px]'>₦ {formatPrice(houseDetails?.property.price)}</Text>
                            <TouchableOpacity onPress={() => router.push(`/reviews/${params.id}`)}>
                                <Text className='font-rregular text-md text-gray'>{houseDetails?.property.reviews.length} Reviews</Text>
                            </TouchableOpacity>
                        </View>

                        <View className='p-[.3px] bg-gray my-[20px]' />

                        <View>
                            <Text className='font-rbold text-lg text-blue'>Description</Text>
                            <View>
                                <Text className='mt-2 font-rregular'>{isExpanded ? houseDetails?.property.description : `${houseDetails?.property.description.substring(0, 100)}...`}</Text>
                                <TouchableOpacity onPress={toggleExpansion}>
                                    <Text className='text-blue font-rbold'>
                                        {isExpanded ? 'View Less' : 'View More'}
                                    </Text>
                                </TouchableOpacity>
                            </View>

                            <View className='my-[10px] flex flex-row items-center justify-between'>
                                <View className='flex flex-row items-center justify-start'>
                                    <Image
                                        source={houseDetails !== null ? { uri: houseDetails.agent.profileImg } : user}
                                        resizeMode='cover'
                                        className='w-[40px] h-[40px] mr-2 rounded-full'
                                    />
                                    <View>
                                        <Text className='text-blue font-rbold text-lg'>{houseDetails?.agent?.fullname}</Text>
                                        <Text className='text-blue font-rregular'>Agent</Text>
                                    </View>
                                </View>
                                <TouchableOpacity className='bg-lightGray p-3 rounded-lg' onPress={() => router.push(`chat/${houseDetails?.agent?._id}`)}>
                                    <Image
                                        source={chat}
                                        resizeMode='cover'
                                        className='w-[24px] h-[24px]'
                                    />
                                </TouchableOpacity>
                            </View>
                        </View>

                        <Button
                            title={`${houseDetails?.property.isBought ? 'Sold' : 'Buy'}`}
                            isBought={houseDetails?.property.isBought}
                            onClick={() => setModalVisible(true)}
                        />
                    </View>
                    
                    <Modal
                        animationType="slide"
                        transparent={true}
                        visible={modalVisible}
                    >
                        <View className='relative w-full h-full bg-transparentBlack'>
                            <View className='absolute bottom-0 left-0 w-full bg-white rounded-t-[30px] p-[25px]'>
                                <View className='flex flex-row items-center justify-between'>
                                    <Text className='text-xl text-blue font-rbold'>Purchase Property</Text>
                                    <TouchableOpacity onPress={() => setModalVisible(false)}>
                                        <Ionicons name="close" size={32} color="black" />
                                    </TouchableOpacity>
                                </View>
                                
                                {walletError && <View className='w-full p-3 rounded-lg bg-errorBg mt-2'>
                                    <Text className='font-rregular text-errorText'>{walletError}</Text>
                                </View>}

                                <View>
                                    <Text className="text-blue ml-[10px] mt-[20px] mb-[8px] text-xl font-rbold">Password:</Text>
                                    <TextInput
                                        placeholder='Password'
                                        className='p-[5px] px-[10px] w-full border border-gray rounded-lg font-rregular'
                                        secureTextEntry
                                        value={password}
                                        onChangeText={(value) => {
                                            setPassword(value);
                                            setWalletError('');
                                        }}
                                    />
                                </View>

                                <TouchableOpacity className='w-full bg-blue py-3 rounded-lg mt-[20px]' onPress={() => handleBuy(houseDetails?.property.price, houseDetails?.agent?._id, houseDetails?.property._id)}>
                                    {walletLoading ? (
                                        <ActivityIndicator size="large" color="#FFFFFF" />
                                    ): (
                                        <Text className = 'text-white font-rbold text-center text-lg'>Buy</Text>
                                    )}
                                </TouchableOpacity>
                            </View>
                        </View>
                    </Modal>
                    
                    <View className='mt-[40px]' />
                </ScrollView>
            ) : (
                <View className='flex items-center justify-center h-full bg-white'>
                    <ActivityIndicator size="large" color="#191641" />
                </View>
            )}
        </SafeAreaView>
    );
}

export default HouseDetails;