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
                    renderItem={({ item }) => (
                        <TouchableOpacity
                            className='relative h-[170px] w-[160px] bg-white mr-3'
                            onPress={() => router.push(`/properties/${item._id}`)}
                        >
                            <Image 
                                source={{ uri: item.img }}
                                resizeMode='stretch'
                                className='w-full h-[100px] rounded-lg'
                            />
                            <View className='mt-2'>
                                <Text className='font-rbold text-center text-sm'>{item.location}</Text>
                                <Text className='font-rregular text-center text-sm'>{item.owner}</Text>
                            </View>
                        </TouchableOpacity>
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

export default TopPlace;