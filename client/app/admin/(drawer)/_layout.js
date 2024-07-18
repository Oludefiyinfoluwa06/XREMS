import 'react-native-gesture-handler';

import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { Drawer } from 'expo-router/drawer';
import { Image } from 'react-native';
import CustomDrawerContent from '../../../components/admin/CustomDrawerContent';
import { dashboard, profile, properties, settings, wallet } from '../../../assets/icons/admin';
import { chat } from '../../../constants';

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
                    name="messages"
                    options={{
                        drawerLabel: 'Messages',
                        title: 'messages',
                        headerShown: false,
                        drawerIcon: ({ color }) => (
                            <DrawerIcon
                                icon={chat}
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
            </Drawer>
        </GestureHandlerRootView>
    );
}

export default DrawerLayout;