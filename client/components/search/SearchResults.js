import { View, Text, FlatList, TouchableOpacity, Image } from 'react-native';
import { featured1, featured2, location, noSearch, star } from '../../constants';
import EmptyList from '../EmptyList';
import { router } from 'expo-router';

const SearchResults = () => {
    const results = [
        {
            id: 1,
            img: featured1,
            price: 100000,
            type: 'Duplex',
            location: 'Abuja, Nigeria',
            rating: 3,
            reviews: 1000,
        },
        {
            id: 2,
            img: featured2,
            price: 900000,
            type: 'Bungalow',
            location: 'Abuja, Nigeria',
            rating: 4.5,
            reviews: 3,
        },
        {
            id: 3,
            img: featured1,
            price: 850000,
            type: 'Twin house',
            location: 'Abuja, Nigeria',
            rating: 2.2,
            reviews: 10,
        },
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
                    <TouchableOpacity className='mb-[20px] flex flex-row justify-start items-center' onPress={() => router.push(`/properties/${item.id}`)}>
                        <View className='mr-[10px]'>
                            <Image
                                source={item.img}
                                resizeMode='cover'
                                className='w-[70px] h-[70px] rounded-lg'
                            />
                        </View>
                        
                        <View className=''>
                            <Text className='font-rbold text-lg text-blue'>{item.type}</Text>
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