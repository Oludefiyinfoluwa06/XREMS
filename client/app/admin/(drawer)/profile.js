import { View, Text, StatusBar } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Header from '../../../components/admin/Header';
import { ScrollView } from 'react-native-gesture-handler';

const Profile = () => {
    return (
        <SafeAreaView>
            <Header title='Profile' />

            <ScrollView className='px-[30px]'>
                <Text>Profile</Text>
            </ScrollView>
            
            <StatusBar backgroundColor='#FFFFFF' />
        </SafeAreaView>
    );
}

export default Profile;