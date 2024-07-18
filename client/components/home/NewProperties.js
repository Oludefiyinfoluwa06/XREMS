import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, Image, TouchableOpacity, ActivityIndicator } from 'react-native';
import { router } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';
import SectionHeader from './SectionHeader';
import { transparentBookmark, location, star, bookmark } from '../../constants';

const NewProperties = ({ newProperties }) => {
    return (
        <View>
            <SectionHeader title='New Properties' />

            {newProperties !== null ? (
                <FlatList
                    data={newProperties}
                    keyExtractor={(item) => item._id}
                    horizontal={true}
                    renderItem={({ item }) => (
                        <View className='relative h-[290px] mr-3'>
                            <TouchableOpacity
                                onPress={() => router.push(`/properties/${item._id}`)}
                                className='w-[300px] h-[200px]'
                            >
                                <Image
                                    source={{ uri: item.img }}
                                    resizeMode='stretch'
                                    className='w-full h-full rounded-lg'
                                />
                            </TouchableOpacity>

                            <View className='absolute bg-white rounded-lg p-3 top-[120px] w-[80%] left-[10%] shadow-xl'>
                                <View className='flex flex-row justify-start'>
                                    <Text className='font-rbold text-lg'>₦ {item.price}</Text>
                                </View>

                                <Text className='font-rbold text-lg mt-[1px]'>{item.type}</Text>

                                <View className='flex flex-row gap-2 mt-1'>
                                    <Image
                                        source={location}
                                        resizeMode='contain'
                                        className='w-[20px] h-[20px]'
                                    />
                                    <Text className='font-rregular'>{item.location}</Text>
                                </View>

                                <View className='flex flex-row gap-2 justify-between items-center mt-1'>
                                    <View>
                                        <Text className='font-rregular text-md'>{item.reviews.length} Reviews</Text>
                                    </View>
                                </View>
                            </View>
                        </View>
                    )}
                />
            ) : (
                <View className='h-[250px] flex items-center justify-center'>
                    <ActivityIndicator size="large" color="#191641" />
                </View>
            )}
        </View>
    );
}

export default NewProperties;