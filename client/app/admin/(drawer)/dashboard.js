import { View, Text, StatusBar, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Header from '../../../components/admin/Header';
import { ScrollView } from 'react-native-gesture-handler';

const Dashboard = () => {
    return (
        <SafeAreaView>
            <Header title='Dashboard' />

            <ScrollView className='px-[25px]'>
                <Text className='text-3xl text-blue font-rbold mt-4'>Dashboard</Text>
                <Text className='text-lg text-blue font-rregular mt-1'>Xceloft / <Text className='font-rbold'>Dashboard</Text></Text>

                <TouchableOpacity className='w-full shadow-xl rounded-lg flex items-center justify-center bg-white mt-4'>
                    <Text className='text-2xl text-blue font-rextrabold text-center my-2 mb-3'>Export</Text>
                </TouchableOpacity>


                <View>
                    <View>
                        <Text>Total Properties</Text>
                        <Text>102</Text>
                    </View>
                    <View>
                        <Text>Total Properties</Text>
                        <Text>102</Text>
                    </View>
                    <View>
                        <Text>Total Properties</Text>
                        <Text>102</Text>
                    </View>
                </View>
                
            </ScrollView>
            
            <StatusBar backgroundColor='#FFFFFF' />
        </SafeAreaView>
    );
}

export default Dashboard;