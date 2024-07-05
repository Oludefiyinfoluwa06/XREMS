import { View, Text, StatusBar } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Header from '../../../components/admin/Header';
import { ScrollView } from 'react-native-gesture-handler';

const Properties = () => {
    return (
        <SafeAreaView>
            <Header title='Properties' />

            <ScrollView className='px-[30px]'>
                <Text>Properties</Text>
            </ScrollView>
            
            <StatusBar backgroundColor='#FFFFFF' />
        </SafeAreaView>
    );
}

export default Properties;