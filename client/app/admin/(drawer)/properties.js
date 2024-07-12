import { View, Text, TouchableOpacity, Image, FlatList } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import EmptyList from '../../../components/EmptyList';
import { location, star } from '../../../constants';
import Header from '../../../components/admin/Header';
import { bgPencil, homePlus, noHome } from '../../../assets/icons/admin';
import { useProperty } from '../../../contexts/PropertyContext';

const Properties = () => {
    const { properties } = useProperty();

    return (
        <SafeAreaView className='h-full'>
            <FlatList
                data={properties}
                keyExtractor={item => item._id}
                horizontal={false}
                ListEmptyComponent={<EmptyList icon={noHome} text='No properties' />}
                ListHeaderComponent={() => <Header title='Properties' icon={homePlus} iconRoute='/admin/property/add' />}
                renderItem={({ item }) => (
                    <View className='p-[20px]'>
                        <View className='bg-white p-3 shadow-2xl rounded-xl'>
                            <TouchableOpacity onPress={() => router.push(`/admin/property/${item._id}`)}>
                                <View className='relative'>
                                    <Image
                                        source={{ uri: item.img }}
                                        resizeMode='cover'
                                        className='w-full h-[200px] rounded-xl'
                                    />

                                    <View className='absolute bottom-[10px] left-[10px] flex flex-row items-center justify-center bg-white rounded-full p-1 pb-2 w-[50px]'>
                                        <Image
                                            source={star}
                                            resizeMode='cover'
                                            className='w-[14px] h-[14px] mr-2'
                                        />
                                        <Text className='font-rregular'>{item.rating}</Text>
                                    </View>
                                </View>

                                <View>
                                    <Text className='font-rbold text-xl text-blue'>{item.type}</Text>
                                    <View className='flex flex-row items-center justify-start my-[5px]'>
                                        <Image
                                            source={location}
                                            resizeMode='cover'
                                            className='w-[20px] h-[20px] mr-2'
                                        />
                                        <Text className='font-rregular text-md text-blue'>{item.location}</Text>
                                    </View>
                                    <View className='flex items-center justify-between flex-row'>
                                        <Text className='font-rregular text-lg text-blue'>₦ {item.price}</Text>
                                        <TouchableOpacity onPress={() => router.push(`/admin/property/edit/${item._id}`)}>
                                            <Image
                                                source={bgPencil}
                                                resizeMode='contain'
                                                className='w-[30px] h-[30px] rounded-full'
                                            />
                                        </TouchableOpacity>
                                    </View>
                                </View>
                            </TouchableOpacity>
                        </View>
                    </View>
                )}
            />
        </SafeAreaView>
    );
}

export default Properties;