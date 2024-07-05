import { View, Text, StatusBar, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Header from '../../../components/admin/Header';
import { useAuth } from '../../../contexts/AuthContext';
import { ScrollView } from 'react-native-gesture-handler';

const Dashboard = () => {
    const { logout } = useAuth();
    
    const handleLogout = async () => {
        await logout();
    }

    return (
        <SafeAreaView>
            <Header title='Dashboard' />

            <ScrollView className='px-[30px]'>
                <Text>Dashboard</Text>

                <TouchableOpacity onPress={handleLogout}>
                    <Text>Logout</Text>
                </TouchableOpacity>
            </ScrollView>
            
            <StatusBar backgroundColor='#FFFFFF' />
        </SafeAreaView>
    );
}

export default Dashboard;