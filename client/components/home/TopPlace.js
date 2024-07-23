import { View, Text, FlatList, TouchableOpacity, Image, ActivityIndicator } from 'react-native';
import { router } from 'expo-router';
import SectionHeader from './SectionHeader';

const TopPlace = ({ topPlace }) => {
    return (
        <View>
            <SectionHeader title='Popular Properties' />

            {topPlace !== null ? (
                <FlatList
                    data={topPlace}
                    keyExtractor={(item) => item._id}
                    horizontal={true}
                    renderItem={({ item }) => {
                        const img = item.img[0];
                        return (
                            <TouchableOpacity
                                className='relative h-[170px] w-[160px] bg-white mr-3'
                                onPress={() => router.push(`/properties/${item._id}`)}
                            >
                                <Image 
                                    source={{ uri: img }}
                                    resizeMode='cover'
                                    className='w-full h-[100px] rounded-lg'
                                />
                                <View className='mt-2'>
                                    <Text className='font-rbold text-center text-sm'>{item.location}</Text>
                                </View>
                            </TouchableOpacity>
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

export default TopPlace;