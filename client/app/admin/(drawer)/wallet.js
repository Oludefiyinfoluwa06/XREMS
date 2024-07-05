import { View, Text, StatusBar } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Header from '../../../components/admin/Header';
import { ScrollView } from 'react-native-gesture-handler';

const Wallet = () => {
    return (
        <SafeAreaView>
            <Header title='Wallet' />

            <ScrollView className='px-[30px]'>
                <Text>Wallet</Text>
            </ScrollView>
            
            <StatusBar backgroundColor='#FFFFFF' />
        </SafeAreaView>
    );
}

export default Wallet;