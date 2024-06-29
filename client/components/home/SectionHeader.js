import { View, Text, TouchableOpacity } from 'react-native';
import { router } from 'expo-router';

const SectionHeader = ({ title }) => {
    return (
        <View className='flex flex-row items-center justify-between my-2 w-full'>
            <Text className='font-rbold text-xl text-blue'>{title}</Text>
            <TouchableOpacity onPress={() => router.push(`/properties/all-properties`)}>
                <Text className='font-rregular text-blue'>See all</Text>
            </TouchableOpacity>
        </View>
    );
}

export default SectionHeader;