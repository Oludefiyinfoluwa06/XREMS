import 'react-native-gesture-handler';

import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { Drawer } from 'expo-router/drawer';
import { dashboard } from '../../../assets/icons/admin';
import { Image } from 'react-native';
import CustomDrawerContent from '../../../components/admin/CustomDrawerContent';

const DrawerIcon = ({ icon, color }) => (
    <Image
        source={icon}
        resizeMode='contain'
        tintColor={color}
        className='w-[25px] h-[25px]'
    />
);

const DrawerLayout = () => {
    return (
        <GestureHandlerRootView style={{ flex: 1 }}>
            <Drawer
                drawerContent={CustomDrawerContent}
                screenOptions={{
                    drawerActiveBackgroundColor: '#191641',
                    drawerActiveTintColor: '#fff',
                    drawerLabelStyle: { marginLeft: -20 }
                }}
            >
                <Drawer.Screen
                    name="dashboard"
                    options={{
                        drawerLabel: 'Dashboard',
                        title: 'dashboard',
                        headerShown: false,
                        drawerIcon: ({ color }) => (
                            <DrawerIcon
                                icon={dashboard}
                                color={color}
                            />
                        )
                    }}
                />
            </Drawer>
        </GestureHandlerRootView>
    );
}

export default DrawerLayout;