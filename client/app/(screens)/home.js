import { useEffect, useState } from 'react';

import { useLocalSearchParams } from 'expo-router';
import { View, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const Home = () => {
    const [successMsg, setsuccessMsg] = useState('');
    const { message } = useLocalSearchParams();

    useEffect(() => {
        setsuccessMsg(message);

        const timer = setTimeout(() => {
            setsuccessMsg('');
        }, 2000);

        return () => clearTimeout(timer);
    }, []);

    return (
        <SafeAreaView>
            {successMsg && <View className='bg-green-500 p-2 absolute top-[30px] left-0 w-full z-10'>
                <Text className='text-white'>{successMsg}</Text>
            </View>}
            <Text className='text-3xl'>Home</Text>
        </SafeAreaView>
    );
}

export default Home;