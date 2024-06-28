import { View, Text, FlatList, TouchableOpacity, Image } from 'react-native';
import { router } from 'expo-router';
import SectionHeader from './SectionHeader';

import { featured1, featured2 } from '../../constants';

const topPlace = [
    {
        id: 1,
        img: featured1,
        location: 'Abuja, Nigeria',
        owner: "Sammy's Property",
    },
    {
        id: 2,
        img: featured2,
        location: 'Abuja, Nigeria',
        owner: 'Oftotech Property',
    },
    {
        id: 3,
        img: featured1,
        location: 'Abuja, Nigeria',
        owner: 'Xceloft Property',
    },
];

const TopPlace = () => {
    return (
        <View>
            <SectionHeader title='Top Place' route='top-place' />

            <FlatList
                data={topPlace}
                keyExtractor={(item) => item.id}
                horizontal={true}
                renderItem={({ item }) => (
                    <TouchableOpacity
                        className='relative h-[170px] w-[160px] bg-white'
                        onPress={() => router.push(`/properties/${id}`)}>
                        <Image 
                            source={item.img}
                            resizeMode='contain'
                            className='w-full h-[100px]'
                        />
                        <View className='mt-2'>
                            <Text className='font-rbold text-center text-sm'>{item.location}</Text>
                            <Text className='font-rregular text-center text-sm'>{item.owner}</Text>
                        </View>
                    </TouchableOpacity>
                )}
            />

            <View className='mt-[20px]' />
        </View>
    );
}

export default TopPlace;