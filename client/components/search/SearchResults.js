import { View, Text, FlatList, TouchableOpacity, Image, ActivityIndicator } from 'react-native';
import { location, noSearch } from '../../constants';
import EmptyList from '../EmptyList';
import { router } from 'expo-router';
import { useProperty } from '../../contexts/PropertyContext';

const SearchResults = ({ query, searchQuery }) => {
    const { propertyLoading, results } = useProperty();

    return (
        <View>
            <View className="flex flex-row items-center justify-between my-[20px]">
                <Text className="font-rbold text-blue">Results for {`"${query && !searchQuery ? query : !query && searchQuery ? searchQuery : searchQuery}"`}</Text>
                <Text className="font-rbold text-blue">{results?.length || 0} found</Text>
            </View>

            {!propertyLoading ? <FlatList
                data={results}
                keyExtractor={(item) => item._id}
                horizontal={false}
                ListEmptyComponent={<EmptyList icon={noSearch} text='No results' />}
                renderItem={({ item }) => (
                    <TouchableOpacity className='mb-[20px] flex flex-row justify-start items-center' onPress={() => router.push(`/properties/${item._id}`)}>
                        <View className='mr-[10px]'>
                            <Image
                                source={{ uri: item.img }}
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
                        </View>
                    </TouchableOpacity>
                )}
            /> : (
                <View className='flex items-center justify-center h-full bg-white'>
                    <ActivityIndicator size="large" color="#191641" />
                </View>
            )}
        </View>
    );
}

export default SearchResults;