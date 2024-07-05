import { View, Text, StatusBar, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Header from '../../../components/admin/Header';
import { useAuth } from '../../../contexts/AuthContext';

const Dashboard = () => {
    const { logout } = useAuth();
    
    const handleLogout = async () => {
        await logout();
    }

    return (
        <SafeAreaView className='px-3 bg-white h-full'>
            <Header title='Dashboard' />
            <Text>Dashboard</Text>

            <TouchableOpacity onPress={handleLogout}>
                <Text>Logout</Text>
            </TouchableOpacity>
            
            <StatusBar backgroundColor='#FFFFFF' />
        </SafeAreaView>
    );
}

export default Dashboard;