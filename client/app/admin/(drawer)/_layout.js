import 'react-native-gesture-handler';

import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { Drawer } from 'expo-router/drawer';
import { customers, dashboard, profile, properties, settings, wallet } from '../../../assets/icons/admin';
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
                    drawerInactiveTintColor: '#191641',
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
                <Drawer.Screen
                    name="profile"
                    options={{
                        drawerLabel: 'Profile',
                        title: 'profile',
                        headerShown: false,
                        drawerIcon: ({ color }) => (
                            <DrawerIcon
                                icon={profile}
                                color={color}
                            />
                        )
                    }}
                />
                <Drawer.Screen
                    name="properties"
                    options={{
                        drawerLabel: 'Properties',
                        title: 'properties',
                        headerShown: false,
                        drawerIcon: ({ color }) => (
                            <DrawerIcon
                                icon={properties}
                                color={color}
                            />
                        )
                    }}
                />
                <Drawer.Screen
                    name="customers"
                    options={{
                        drawerLabel: 'Customers',
                        title: 'customers',
                        headerShown: false,
                        drawerIcon: ({ color }) => (
                            <DrawerIcon
                                icon={customers}
                                color={color}
                            />
                        )
                    }}
                />
                <Drawer.Screen
                    name="wallet"
                    options={{
                        drawerLabel: 'Wallet',
                        title: 'wallet',
                        headerShown: false,
                        drawerIcon: ({ color }) => (
                            <DrawerIcon
                                icon={wallet}
                                color={color}
                            />
                        )
                    }}
                />
                <Drawer.Screen
                    name="settings"
                    options={{
                        drawerLabel: 'Settings',
                        title: 'settings',
                        headerShown: false,
                        drawerIcon: ({ color }) => (
                            <DrawerIcon
                                icon={settings}
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