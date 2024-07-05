import { View, Text, StatusBar } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Header from '../../../components/admin/Header';
import { ScrollView } from 'react-native-gesture-handler';

const Settings = () => {
    return (
        <SafeAreaView>
            <Header title='Settings' />

            <ScrollView className='px-[30px]'>
                <Text>Settings</Text>
            </ScrollView>
            
            <StatusBar backgroundColor='#FFFFFF' />
        </SafeAreaView>
    );
}

export default Settings;