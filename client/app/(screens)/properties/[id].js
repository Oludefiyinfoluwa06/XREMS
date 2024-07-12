import { View, Text, TouchableOpacity, Image, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { angleBack, bookmark, chat, featured1, heart, location, star, user } from '../../../constants';
import { router } from 'expo-router';
import { useState } from 'react';
import Button from '../../../components/Button';

const HouseDetails = () => {
    const [isExpanded, setIsExpanded] = useState(false);

    const toggleExpansion = () => {
        setIsExpanded(!isExpanded);
    }

    const houseDetails = {
        img: featured1,
        type: 'Duplex apartment',
        location: 'Maitama, Abuja',
        for: 'rent',
        rating: 4.6,
        reviews: 3577,
        price: 1450000,
        agent: {
            _id: 1,
            fullname: 'Pyotr Kodzhebash'
        },
        description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quidem corporis, consequuntur numquam dolores esse unde, nulla, quisquam accusamus excepturi blanditiis deserunt sapiente quaerat quas laboriosam nisi. In corporis veritatis nam dolor quo voluptates, perspiciatis deleniti, blanditiis odit corrupti at fuga voluptatum quidem eaque! Aut aliquam consequatur quibusdam obcaecati ex. Incidunt numquam, nisi placeat rem dicta harum illo cupiditate! Ipsa accusamus illum ea, porro repudiandae aperiam. Veniam obcaecati velit ea vero explicabo laudantium repellendus saepe fuga? Porro dolores est ipsa corrupti iure id voluptatum quidem, ipsum vitae ex. Laboriosam ab dignissimos, aliquid est, tempore laudantium, hic quaerat natus voluptatibus dolor vel',
    };
    
    return (
        <SafeAreaView>
            <ScrollView className='p-[20px] bg-white h-full'>
                <View className='flex items-center justify-between flex-row'>
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

                    <TouchableOpacity>
                        <Image
                            source={heart}
                            resizeMode='contain'
                            className='w-[30px] h-[30px]'
                        />
                    </TouchableOpacity>
                </View>

                <View>
                    <Image
                        source={houseDetails.img}
                        resizeMode='contain'
                        className='w-full h-[300px]'
                    />

                    <View className='flex flex-row items-center justify-between'>
                        <Text className='font-rbold text-lg mt-[-20px] mr-2 text-blue'>{houseDetails.type}</Text>
                        <TouchableOpacity>
                            <Image
                                source={bookmark}
                                resizeMode='contain'
                                className='w-[23px] h-[23px]'
                            />
                        </TouchableOpacity>
                    </View>
                    <View className='flex flex-row items-center justify-start mt-[10px]'>
                        <Image
                            source={location}
                            resizeMode='cover'
                            className='w-[20px] h-[20px] mr-2'
                        />
                        <Text className='font-rregular text-md'>{houseDetails.location}</Text>
                    </View>
                    <View className='flex flex-row items-center justify-start'>
                        <View className='flex flex-row items-center justify-start mt-[10px] mr-[50px]'>
                            <Image
                                source={star}
                                resizeMode='cover'
                                className='w-[20px] h-[20px] mr-2'
                            />
                            <Text className='font-rregular text-md'>{houseDetails.rating}</Text>
                        </View>

                        <Text className='font-rregular text-md text-gray mt-[10px]'>{houseDetails.reviews} Reviews</Text>
                    </View>

                    <View className='p-[.3px] bg-gray my-[20px]' />

                    <View>
                        <Text className='font-rbold text-lg text-blue'>Description</Text>
                        <View>
                            <Text className='mt-2 font-rregular'>{isExpanded ? houseDetails.description : `${houseDetails.description.substring(0, 100)}...`}</Text>
                            <TouchableOpacity onPress={toggleExpansion}>
                                <Text className='text-blue font-rbold'>
                                {isExpanded ? 'View Less' : 'View More'}
                                </Text>
                            </TouchableOpacity>
                        </View>

                        <View className='my-[10px] flex flex-row items-center justify-between'>
                            <View className='flex flex-row items-center justify-start'>
                                <Image
                                    source={user}
                                    resizeMode='cover'
                                    className='w-[30px] h-[30px] mr-2'
                                />
                                <View>
                                    <Text className='text-blue font-rbold text-lg'>{houseDetails.agent.fullname}</Text>
                                    <Text className='text-blue font-rregular'>Agent</Text>
                                </View>
                            </View>
                            <TouchableOpacity className='bg-lightGray p-3 rounded-lg' onPress={() => router.push(`chat/${houseDetails.agent._id}`)}>
                                <Image
                                    source={chat}
                                    resizeMode='cover'
                                    className='w-[24px] h-[24px]'
                                />
                            </TouchableOpacity>
                        </View>
                    </View>

                    <Button
                        title={houseDetails.for === 'rent' ? 'Rent' : 'Buy'}
                        onClick={() => { }}
                        loading={false}
                    />
                </View>
                
                <View className='mt-[40px]' />
            </ScrollView>
        </SafeAreaView>
    );
}

export default HouseDetails;