import { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, Image, ScrollView, ActivityIndicator } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router, useLocalSearchParams } from 'expo-router';
import { angleBack, location } from '../../../../constants';
import Button from '../../../../components/Button';
import { useProperty } from '../../../../contexts/PropertyContext';

const HouseDetails = () => {
    const [isExpanded, setIsExpanded] = useState(false);
    const params = useLocalSearchParams();
    const { getPropertyDetails, houseDetails, error, setError, propertyLoading } = useProperty();

    useEffect(() => {
        getPropertyDetails(params.id);
    }, []);

    const toggleExpansion = () => {
        setIsExpanded(!isExpanded);
    }
    
    return (
        <SafeAreaView>
            {error ? (
                <Text>{error}</Text>
            ) : !propertyLoading ? houseDetails !== null ? (
                <ScrollView className='p-[20px] bg-white h-full'>
                    <View className='flex items-center justify-start flex-row'>
                        <TouchableOpacity
                            className='flex items-center justify-center p-[13px] rounded-lg bg-white shadow-lg'
                            onPress={() => router.back()}
                        >
                            <Image
                                source={angleBack}
                                resizeMode='contain'
                                className='w-[24px] h-[24px]'
                            />
                        </TouchableOpacity>
                        <Text className='font-rbold text-xl'>{houseDetails?.property.type}</Text>
                    </View>

                    <View>
                        <Image
                            source={{ uri: houseDetails?.img }}
                            resizeMode='stretch'
                            className='w-full h-[200px] rounded-lg'
                        />

                        <Text className='font-rbold text-2xl mt-[15px] text-blue'>{houseDetails?.property.type}</Text>
                        <View className='flex flex-row items-center justify-start mt-[10px]'>
                            <Image
                                source={location}
                                resizeMode='cover'
                                className='w-[20px] h-[20px] mr-2'
                            />
                            <Text className='font-rregular text-md'>{houseDetails?.property.location}</Text>
                        </View>
                        <TouchableOpacity className='flex flex-row items-center justify-start' onPress={() => router.push(`/admin/reviews/${houseDetails?.property._id}`)}>
                            <Text className='font-rregular text-md text-gray mt-[10px]'>{houseDetails?.property.reviews.length} Reviews</Text>
                        </TouchableOpacity>

                        <View className='p-[.3px] bg-gray my-[20px]' />

                        <View className='mb-3'>
                            <Text className='font-rbold text-lg text-blue'>Description</Text>
                            <View>
                                <Text className='mt-2 font-rregular'>{isExpanded ? houseDetails?.property.description : `${houseDetails?.property.description.substring(0, 100)}...`}</Text>
                                <TouchableOpacity onPress={toggleExpansion}>
                                    <Text className='text-blue font-rbold'>
                                    {isExpanded ? 'View Less' : 'View More'}
                                    </Text>
                                </TouchableOpacity>
                            </View>
                        </View>

                        <Button
                            title='Edit'
                            onClick={() => router.push(`/property/edit/${houseDetails?.property._id}`)}
                            loading={false}
                        />
                    </View>
                    
                    <View className='mt-[40px]' />
                </ScrollView>
            ) : (
                <View className='flex items-center justify-center h-full bg-white'>
                    <ActivityIndicator size="large" color="#191641" />
                </View>
            ) : (<View className='flex items-center justify-center h-full bg-white'>
                    <ActivityIndicator size="large" color="#191641" />
                </View>
            )}
        </SafeAreaView>
    );
}

export default HouseDetails;