import { View, Text, TouchableOpacity, Image, FlatList, ActivityIndicator } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import EmptyList from '../../../components/EmptyList';
import { noHome } from '../../../assets/icons/admin';
import { angleBack, location } from '../../../constants';
import { useProperty } from '../../../contexts/PropertyContext';

const AllProperties = () => {
    const { allProperties, error } = useProperty();

    return (
        <SafeAreaView className='h-full bg-white'>
            {error ? (
                <Text>Error</Text>
            ) : allProperties !== null ? (
                <FlatList
                    data={allProperties}
                    keyExtractor={item => item._id}
                    horizontal={false}
                    ListEmptyComponent={<EmptyList icon={noHome} text='No properties' />}
                    ListHeaderComponent={() => (
                        <View className='flex items-center justify-start flex-row mb-3 px-[20px] pt-[20px]'>
                            <TouchableOpacity
                                className='flex items-center justify-center p-[13px] rounded-lg bg-white mr-3'
                                style={{ backgroundColor: '#fff', shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.8, shadowRadius: 2, elevation: 5 }}
                                onPress={() => router.back()}
                            >
                                <Image
                                    source={angleBack}
                                    resizeMode='contain'
                                    className='w-[24px] h-[24px]'
                                />
                            </TouchableOpacity>
                            <Text className='font-rbold text-2xl'>All Properties</Text>
                        </View>
                    )}
                    renderItem={({ item }) => (
                        <View className='px-[20px] mb-4'>
                            <View className='bg-transparentWhite p-3 rounded-xl' style={{ padding: 20, backgroundColor: '#fff', shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.8, shadowRadius: 2, elevation: 5 }}>
                                <TouchableOpacity onPress={() => router.push(`/properties/${item._id}`)}>
                                    <View className='relative'>
                                        <Image
                                            source={{ uri: item?.img[0] }}
                                            resizeMode='cover'
                                            className='w-full h-[200px] rounded-xl'
                                        />
                                    </View>

                                    <View className='mt-[10px]'>
                                        <Text className='font-rbold text-xl text-blue'>{item.type}</Text>
                                        <View className='flex flex-row items-center justify-start my-[5px]'>
                                            <Image
                                                source={location}
                                                resizeMode='cover'
                                                className='w-[20px] h-[20px] mr-2'
                                            />
                                            <Text className='font-rregular text-md text-blue'>{item.location}</Text>
                                        </View>
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

export default AllProperties;