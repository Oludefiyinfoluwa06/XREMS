import { useEffect, useState } from 'react';
import { useLocalSearchParams } from 'expo-router';
import { View, Text, RefreshControl, FlatList, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useProperty } from '../../../contexts/PropertyContext';
import EmptyList from '../../../components/EmptyList';
import { noReviews, user } from '../../../constants';
import AddReview from '../../../components/admin/AddReview';

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
                    data={reviews}
                    renderItem={({ item }) => (
                        <View className='w-full border border-blue p-3 rounded-lg'>
                            <View className='flex items-center justify-start flex-row'>
                                <Image
                                    source={item?.profilePic ? { uri: item?.profilePic } : user}
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

            <AddReview propertyId={params.id} setRefreshing={setRefreshing} />
        </SafeAreaView>
    );
}

export default Reviews;