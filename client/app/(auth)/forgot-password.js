import { router } from 'expo-router';
import { View, Text, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const ForgotPassword = () => {
    return (
        <SafeAreaView>
            <Text className='font-rregular'>ForgotPassword</Text>
            <TouchableOpacity className='mt-[100px] ml-[100px]' onPress={() => router.back()}>
                <Text className='font-rregular'>Go back</Text>
            </TouchableOpacity>
        </SafeAreaView>
    );
}

export default ForgotPassword;