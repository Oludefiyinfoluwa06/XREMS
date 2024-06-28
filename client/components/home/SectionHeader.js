import { View, Text, TouchableOpacity } from 'react-native';
import { router } from 'expo-router';

const SectionHeader = ({ title, route }) => {
    return (
        <View className='flex flex-row items-center justify-between my-2 w-full'>
            <Text className='font-rbold text-xl'>{title}</Text>
            <TouchableOpacity onPress={() => router.push(`/${route}`)}>
                <Text className='font-rregular'>See all</Text>
            </TouchableOpacity>
        </View>
    );
}

export default SectionHeader;