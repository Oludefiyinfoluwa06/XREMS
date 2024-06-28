import { View, Text, FlatList, TouchableHighlight, Image } from 'react-native';
import { router } from 'expo-router';
import SectionHeader from './SectionHeader';

import { featured1, featured2, heart, location } from '../../constants';

const featuredProperties = [
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

const FeaturedUnits = () => {
    return (
        <View>
            <SectionHeader title='Featured Units' route='featured-units' />

            <FlatList
                data={featuredProperties}
                keyExtractor={(item) => item.id}
                horizontal={true}
                renderItem={({ item }) => (
                    <View className='relative h-[290px]'>
                        <TouchableHighlight
                            key={item.id}
                            onPress={() => router.push(`/properties/${item.id}`)}
                            className='w-[300px] h-[200px]'
                        >
                            <Image
                                source={item.img}
                                resizeMode='contain'
                                className='w-full h-full'
                            />
                        </TouchableHighlight>

                        <View className='absolute bg-white rounded-lg p-3 top-[120px] w-[80%] left-[10%] shadow-xl'>
                            <View className='flex flex-row justify-between'>
                                <Text className='font-rbold text-lg'>₦ {item.price}</Text>
                                <TouchableHighlight>
                                    <Image
                                        source={heart}
                                        resizeMode='contain'
                                        className='w-[24px] h-[24px]'
                                    />
                                </TouchableHighlight>
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
                                <View className='flex flex-row gap-2 mt-1'>
                                    
                                    <Text className='font-rbold text-lg'>{item.rating}</Text>
                                </View>
                                <View>
                                    <Text className='font-rregular text-md'>{item.reviews} Reviews</Text>
                                </View>
                            </View>
                        </View>
                    </View>
                )}
            />
        </View>
    );
}

export default FeaturedUnits;