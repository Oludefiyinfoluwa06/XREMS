import { View, Text, FlatList, Image, TouchableOpacity, ActivityIndicator } from 'react-native';
import { router } from 'expo-router';
import SectionHeader from './SectionHeader';
import { location } from '../../constants';
import { useProperty } from '../../contexts/PropertyContext';

const FeaturedUnits = ({ featuredProperties }) => {
    const { formatPrice } = useProperty();

    return (
        <View>
            <SectionHeader title='Featured Properties' />

            {featuredProperties !== null ? (
                <FlatList
                    data={featuredProperties}
                    keyExtractor={(item) => item._id}
                    horizontal={true}
                    renderItem={({ item }) => {
                        const img = item.img[0];
                        return (
                            <View className='relative h-[290px] mr-3'>
                                <TouchableOpacity
                                    onPress={() => router.push(`/properties/${item._id}`)}
                                    className='w-[300px] h-[200px]'
                                >
                                    <Image
                                        source={{ uri: img }}
                                        resizeMode='cover'
                                        className='w-full h-full rounded-lg'
                                    />
                                </TouchableOpacity>

                                <View className='absolute bg-white rounded-lg p-3 top-[120px] w-[80%] left-[10%]' style={{ padding: 20, backgroundColor: '#fff', shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.8, shadowRadius: 2, elevation: 5 }}>
                                    <View className='flex flex-row justify-start'>
                                        <Text className='font-rbold text-lg'>₦ {formatPrice(item.price)}</Text>
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
                        )
                    }}
                />
            ) : (
                <View className='h-[250px] flex items-center justify-center'>
                    <ActivityIndicator size="large" color="#191641" />
                </View>
            )}
        </View>
    );
}

export default FeaturedUnits;