import { View, Text, ScrollView, TouchableOpacity, Image, FlatList } from 'react-native';
import { router } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { angleBack, logo, noNotification, user } from '../../constants';

const Notifications = () => {
    const notification = [
        // {
        //     id: 1,
        //     title: 'Payment succesful',
        //     content: 'Monthly payment of your house is successfully completed',
        //     time: '04:50 PM'
        // },
    ];

    return (
        <SafeAreaView className='p-[20px] bg-white h-full'>
            <View className='flex items-center justify-between flex-row'>
                <TouchableOpacity
                    className='flex items-center justify-content p-[13px] rounded-lg bg-white shadow-lg'
                    onPress={() => router.back()}
                >
                    <Image
                        source={angleBack}
                        resizeMode='contain'
                        className='w-[24px] h-[24px]'
                    />
                </TouchableOpacity>

                <Text className='font-rbold text-xl'>Notifications</Text>

                <TouchableOpacity onPress={() => router.push('/profile')}>
                    <Image
                        source={user}
                        resizeMode='contain'
                        className='w-[30px] h-[30px]'
                    />
                </TouchableOpacity>
            </View>

            <FlatList
                data={notification}
                keyExtractor={item => item.id}
                horizontal={false}
                ListEmptyComponent={() => (
                    <View className='flex items-center justify-center min-h-screen mt-[-100px]'>
                        <Image
                            source={noNotification}
                            resizeMode='cover'
                            className='w-[230px] h-[230px]'
                        />
                        <Text className='font-rbold text-[30px] text-blue'>No notifications</Text>
                    </View>
                )}
                renderItem={({ item }) => (
                    <TouchableOpacity className='flex flex-row items-center justify-start mt-4'>
                        <Image
                            source={logo}
                            resizeMode='cover'
                            className='w-[40px] h-[40px] mr-[10px]'
                        />

                        <View>
                            <View className='flex flex-row items-center justify-between w-[92%]'>
                                <Text className='text-blue font-rbold text-md'>{item.title}</Text>
                                <Text className='text-blue font-rbold text-md'>{item.time}</Text>
                            </View>
                            <Text className='text-blue font-rregular'>{item.content}</Text>
                        </View>
                    </TouchableOpacity>
                )}
            />
        </SafeAreaView>
    );
}

export default Notifications;