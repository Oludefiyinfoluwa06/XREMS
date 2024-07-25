import { useEffect } from 'react';
import { View, Text, TouchableOpacity, Image, FlatList, ActivityIndicator } from 'react-native';
import { router } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { format, isToday, isYesterday } from 'date-fns';
import { angleBack, noNotification } from '../../constants';
import EmptyList from '../../components/EmptyList';
import { profile } from '../../assets/icons/admin';
import { useAuth } from '../../contexts/AuthContext';
import { useNotification } from '../../contexts/NotificationContext';

const Notifications = () => {
    const { getUser, user } = useAuth();
    const { getNotifications, notifications, notificationLoading } = useNotification();

    useEffect(() => {
        getUser();
    }, []);

    useEffect(() => {
        getNotifications();
    }, [notifications]);

    const formatTimestamp = (timestamp) => {
        const date = new Date(timestamp);

        if (isToday(date)) {
            return `Today, ${format(date, 'h:mm a')}`;
        }

        if (isYesterday(date)) {
            return `Yesterday, ${format(date, 'h:mm a')}`;
        }

        return format(date, 'MMMM d, yyyy, h:mm a');
    };

    return (
        <SafeAreaView className='p-[20px] bg-white h-full'>
            <View className='flex items-center justify-between flex-row'>
                <TouchableOpacity
                    className='flex items-center justify-center p-[13px] rounded-lg bg-white'
                    style={{ padding: 20, backgroundColor: '#fff', shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.8, shadowRadius: 2, elevation: 200 }}
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
                        source={user !== null && user?.profileImg !== '' ? { uri: user?.profileImg } : profile}
                        resizeMode='cover'
                        className='w-[30px] h-[30px] rounded-full'
                    />
                </TouchableOpacity>
            </View>

            {!notificationLoading ? <FlatList
                data={notifications}
                keyExtractor={item => item._id}
                horizontal={false}
                ListEmptyComponent={<EmptyList icon={noNotification} text='No notifications' />}
                renderItem={({ item }) => (
                    <TouchableOpacity className='py-[20px] flex flex-row items-end justify-between space-x-[10px] border-b border-[#C2C2C2]' onPress={() => router.push(`${item?.link}`)}>
                        <View className='flex flex-row items-center justify-start'>
                            <Image
                                source={{ uri: item?.img }}
                                resizeMode='cover'
                                className='w-[40px] h-[40px] rounded-full mr-2'
                            />
                            <View className='flex items-start justify-center'>
                                <Text className='text-blue font-rbold text-lg'>{item?.title}</Text>
                                <Text className='text-blue font-rregular text-md'>{item?.content}</Text>
                           </View>
                        </View>
                        <Text className='font-rbold text-blue text-md'>{formatTimestamp(item?.createdAt)}</Text>
                    </TouchableOpacity>
                )}
            />: (
                <View className='flex items-center justify-center h-full bg-white'>
                    <ActivityIndicator size="large" color="#191641" />
                </View>
            )}
        </SafeAreaView>
    );
}

export default Notifications;