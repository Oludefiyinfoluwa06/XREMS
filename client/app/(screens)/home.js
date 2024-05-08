import { useEffect, useState } from 'react';

import { router } from 'expo-router';
import { View, Text, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { useAuth } from '../../contexts/AuthContext';

const Home = () => {
    const { currentUser, logout } = useAuth();

    useEffect(() => {
        if (currentUser === null) {
            return router.replace('sign-in');
        }
    }, []);

    const handleLogout = async () => {
        await logout();
    }

    return (
        <SafeAreaView>
            <Text className='text-xl'>Hi, {currentUser}</Text>
            <TouchableOpacity onPress={handleLogout} className='mt-[200px] ml-[100px]'>
                <Text>Logout</Text>
            </TouchableOpacity>
        </SafeAreaView>
    );
}

export default Home;