import { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import { useProperty } from '../../contexts/PropertyContext';

const AddReview = ({ propertyId, setRefreshing }) => {
    const [reviewText, setReviewText] = useState('');

    const { addReview } = useProperty();

    const handleAddReview = async () => {
        await addReview(propertyId, reviewText);
        setReviewText('');
        setRefreshing(true);
        setTimeout(() => {
            setRefreshing(false);
        }, 2000);
    }

    return (
        <View className='flex items-center justify-between flex-row h-[30px]'>
            <TextInput
                value={reviewText}
                onChangeText={(value) => setReviewText(value)}
                className='w-[68%] border h-full rounded-md font-rregular text-md px-2'
            />
            <TouchableOpacity className='bg-blue px-3 w-[30%] h-full rounded-md flex items-center justify-center' onPress={handleAddReview}>
                <Text className='text-white font-rbold'>Add Review</Text>
            </TouchableOpacity>
        </View>
    );
}

export default AddReview;