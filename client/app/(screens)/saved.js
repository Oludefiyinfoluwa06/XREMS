import { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, Image, FlatList, ActivityIndicator } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { angleBack, bookmark, location, noSavedItems, star } from '../../constants';
import { router } from 'expo-router';
import EmptyList from '../../components/EmptyList';
import { useProperty } from '../../contexts/PropertyContext';

const Saved = () => {
    const [savedProperties, setSavedProperties] = useState([]);

    const { formatPrice } = useProperty();

    useEffect(() => {
        fetchSavedProperties();
    }, []);

    const fetchSavedProperties = async () => {
        try {
            const savedPropertiesString = await AsyncStorage.getItem('bookmarks');
            const savedProperties = savedPropertiesString ? JSON.parse(savedPropertiesString) : [];
            setSavedProperties(savedProperties);
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <SafeAreaView className='bg-white h-full'>
            {savedProperties !== null ? (
                <FlatList
                    data={savedProperties}
                    keyExtractor={item => item.property._id}
                    horizontal={false}
                    ListEmptyComponent={<EmptyList icon={noSavedItems} text='No saved properties' />}
                    ListHeaderComponent={() => (
                        <View className='flex items-center justify-between flex-row p-[20px]'>
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

                            <Text className='font-rbold text-xl'>Saved</Text>

                            <View>
                                <Image
                                    source={bookmark}
                                    resizeMode='contain'
                                    className='w-[30px] h-[30px]'
                                />
                            </View>
                        </View>
                    )}
                    renderItem={({ item }) => (
                        <View className='p-[20px]'>
                            <View className='mb-3 bg-lightGray p-3 shadow-2xl rounded-xl'>
                                <TouchableOpacity onPress={() => router.push(`/properties/${item.property._id}`)}>
                                    <View className='relative'>
                                        <Image
                                            source={{ uri: item.img }}
                                            resizeMode='cover'
                                            className='w-full h-[200px] rounded-xl'
                                        />
                                    </View>

                                    <View>
                                        <Text className='font-rbold text-xl text-blue'>{item.property.type}</Text>
                                        <View className='flex flex-row items-center justify-start my-[5px]'>
                                            <Image
                                                source={location}
                                                resizeMode='cover'
                                                className='w-[20px] h-[20px] mr-2'
                                            />
                                            <Text className='font-rregular text-md text-blue'>{item.property.location}</Text>
                                        </View>
                                        <Text className='font-rregular text-lg text-blue'>₦ {formatPrice(item.property.price)}</Text>
                                    </View>
                                </TouchableOpacity>
                            </View>
                        </View>
                    )}
                />
            ) : (
                <View className='flex items-center justify-center h-full bg-white'>
                    <ActivityIndicator size="large" color="#191641" />
                </View>
            )}
        </SafeAreaView>
    );
}

export default Saved;