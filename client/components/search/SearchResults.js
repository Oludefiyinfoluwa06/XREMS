import { View, Text, FlatList, TouchableOpacity, Image } from 'react-native'
import React from 'react'
import { featured1, featured2, location, noSearch, star } from '../../constants';
import EmptyList from '../EmptyList';

const SearchResults = () => {
    const results = [
        // {
        //     id: 1,
        //     img: featured1,
        //     title: '2 Bedroom apartment',
        //     location: 'Army Estate, Kurudu, Abuja',
        //     rating: 5,
        // },
        // {
        //     id: 2,
        //     img: featured2,
        //     title: 'Duplex apartment',
        //     location: 'Police Estate, Kurudu, Abuja',
        //     rating: 4,
        // },
        // {
        //     id: 3,
        //     img: featured1,
        //     title: 'Self-contain apartment',
        //     location: 'Maitama, Abuja',
        //     rating: 5,
        // },
    ];

    return (
        <View>
            <View className="flex flex-row items-center justify-between my-[20px]">
                <Text className="font-rbold text-blue">Results for ""</Text>
                <Text className="font-rbold text-blue">0 found</Text>
            </View>

            <FlatList
                data={results}
                keyExtractor={(item) => item.id}
                horizontal={false}
                ListEmptyComponent={<EmptyList icon={noSearch} text='No results' />}
                renderItem={({ item }) => (
                    <TouchableOpacity className='mb-[20px] flex flex-row justify-start items-center'>
                        <View className='mr-[10px]'>
                            <Image
                                source={item.img}
                                resizeMode='cover'
                                className='w-[70px] h-[70px] rounded-lg'
                            />
                        </View>
                        
                        <View className=''>
                            <Text className='font-rbold text-lg text-blue'>{item.title}</Text>
                            <View className='flex flex-row items-center justify-start mt-[-8px]'>
                                <Image 
                                    source={location}
                                    resizeMode='contain'
                                    className='w-[15px]'
                                />
                                <Text className='font-rregular text-blue'>{item.location}</Text>
                            </View>
                            <View className='flex flex-row items-center justify-start mt-[-8px]'>
                                <Image 
                                    source={star}
                                    resizeMode='contain'
                                    className='w-[15px] mr-2'
                                />
                                <Text className='font-rregular text-blue'>{item.rating}</Text>
                            </View>
                        </View>
                    </TouchableOpacity>
                )}
            />
        </View>
    );
}

export default SearchResults