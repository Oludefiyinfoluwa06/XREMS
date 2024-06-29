import { View, Text, ScrollView, TouchableOpacity, Image, FlatList } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { angleBack, bookmark, featured1, featured2, location, noSavedItems, star } from '../../constants';
import { router } from 'expo-router';
import EmptyList from '../../components/EmptyList';

const Saved = () => {
    const savedProperties = [
        // {
        //     id: 1,
        //     img: featured1,
        //     type: 'Self-contain apartment',
        //     location: 'Police Estate, Kurudu, Abuja',
        //     price: 2000000,
        //     rating: 5.0
        // },
        // {
        //     id: 2,
        //     img: featured2,
        //     type: 'Self-contain apartment',
        //     location: 'Police Estate, Kurudu, Abuja',
        //     price: 2000000,
        //     rating: 5.0
        // },
    ];

    return (
        <SafeAreaView className='bg-white h-full'>
            <FlatList
                data={savedProperties}
                keyExtractor={item => item.id}
                horizontal={false}
                ListEmptyComponent={<EmptyList icon={noSavedItems} text='No saved properties' />}
                ListHeaderComponent={() => (
                    <View className='flex items-center justify-between flex-row p-[20px]'>
                        <TouchableOpacity
                            className='flex items-center justify-content p-[13px] rounded-lg bg-white shadow-lg'
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
                            <TouchableOpacity onPress={() => router.push(`/properties/${item.id}`)}>
                                <View className='relative'>
                                    <Image
                                        source={item.img}
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
                                    <Text className='font-rregular text-lg text-blue'>₦ {item.price}</Text>
                                </View>
                            </TouchableOpacity>
                        </View>
                    </View>
                )}
            />
        </SafeAreaView>
    );
}

export default Saved;