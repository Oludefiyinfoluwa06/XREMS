import { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, Image, ScrollView, ActivityIndicator, RefreshControl } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router, useLocalSearchParams } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { angleBack, transparentBookmark, chat, location, star, user, bookmark } from '../../../constants';
import Button from '../../../components/Button';
import { useProperty } from '../../../contexts/PropertyContext';

const HouseDetails = () => {
    const [isExpanded, setIsExpanded] = useState(false);
    const [isBookmarked, setIsBookmarked] = useState(false);
    const [refreshing, setRefreshing] = useState(false);
    const params = useLocalSearchParams();

    const { getPropertyDetails, houseDetails, error, setError } = useProperty();

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
    }, []);

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
                bookmarks.push({ property: houseDetails?.property, img: houseDetails?.img });
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
                            className='flex items-center justify-center p-[13px] rounded-lg bg-white shadow-lg'
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
                        <Image
                            source={{ uri: houseDetails?.img }}
                            resizeMode='stretch'
                            className='w-full h-[200px] rounded-lg mt-3'
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
                        <View className='flex flex-row items-center justify-start'>
                            <View className='flex flex-row items-center justify-start mt-[10px] mr-[50px]'>
                                <Image
                                    source={star}
                                    resizeMode='cover'
                                    className='w-[20px] h-[20px] mr-2'
                                />
                                <Text className='font-rregular text-md'>{houseDetails?.property.rating}</Text>
                            </View>

                            <TouchableOpacity onPress={() => router.push(`/reviews/${params.id}`)}>
                                <Text className='font-rregular text-md text-gray mt-[10px]'>{houseDetails?.property.reviews.length} Reviews</Text>
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
                                        source={houseDetails?.agent?.profileImg ? { uri: houseDetails?.agent?.profileImg } : user}
                                        resizeMode='cover'
                                        className='w-[30px] h-[30px] mr-2'
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
                            title={houseDetails?.property.for === 'rent' ? 'Rent' : 'Buy'}
                            onClick={() => { }}
                            loading={false}
                        />
                    </View>
                    
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