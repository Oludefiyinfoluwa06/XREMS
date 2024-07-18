import { useEffect, useState } from 'react';
import { router, useLocalSearchParams } from 'expo-router';
import { View, Text, RefreshControl, FlatList, Image, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { noReviews, angleBack, user } from '../../../../constants';
import { useProperty } from '../../../../contexts/PropertyContext';

const Reviews = () => {
    const [refreshing, setRefreshing] = useState(false);
    
    const params = useLocalSearchParams();
    const { getReviews, reviews } = useProperty();

    const onRefresh = () => {
        setRefreshing(true);
        setTimeout(() => {
            setRefreshing(false);
        }, 2000);
    }

    useEffect(() => {
        setRefreshing(true);
        setTimeout(() => {
            setRefreshing(false);
        }, 2000);

        getReviews(params.id);
    }, []);

    return (
        <SafeAreaView className='bg-white h-full p-[20px]'>
            {reviews && (
                <FlatList
                    refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
                    keyExtractor={(item) => item._id}
                    ListEmptyComponent={<EmptyList icon={noReviews} text='There are no reviews' />}
                    ListHeaderComponent={() => (
                        <View className='flex items-center justify-start flex-row mb-2'>
                            <TouchableOpacity
                                onPress={() => router.back()}
                                className='mr-3'
                            >
                                <Image
                                    source={angleBack}
                                    resizeMode='contain'
                                    className='w-[30px] h-[30px]'
                                />
                            </TouchableOpacity>

                            <Text className='font-rbold text-lg'>Reviews</Text>
                        </View>
                    )}
                    data={reviews}
                    renderItem={({ item }) => (
                        <View className='w-full border border-blue p-3 rounded-lg mt-4'>
                            <View className='flex items-center justify-start flex-row'>
                                <Image
                                    source={item?.profileImg ? { uri: item?.profileImg } : user}
                                    resizeMode='contain'
                                    className='w-[30px] h-[30px] mr-4'
                                />
                                <Text className='font-rbold text-xl'>{item?.reviewer}</Text>
                            </View>
                            <Text className='font-rregular text-lg mt-2'>{item?.review}</Text>
                        </View>
                    )}
                />
            )}
        </SafeAreaView>
    );
}

export default Reviews;