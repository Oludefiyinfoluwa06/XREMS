import { Tabs, Redirect } from 'expo-router';
import { Image, Text, View } from 'react-native';
import { darkHome, darkMessage, darkSearch, lightHome, lightMessage, lightSearch, lightSettings } from '../../constants';

const TabIcon = ({ lightIcon, darkIcon, color, focused, name }) => (
    <View className={`w-[95px] flex items-center justify-center flex-row py-2 px-3 rounded-[50px] ${focused ? 'bg-tabIconBg' : ''}`}>
        <Image
            source={focused ? darkIcon : lightIcon}
            resizeMode='contain'
            tintColor={color}
            className='w-[25px] h-[25px]'
        />
        <Text className={`text-blue ${focused ? 'ml-2' : 'ml-0'} font-rbold`}>
            {focused ? name : ''}
        </Text>
    </View>
);

const TabLayout = () => {
    return (
        <Tabs
            screenOptions={{
                tabBarShowLabel: false,
                tabBarActiveTintColor: '#191641',
                tabBarInactiveTintColor: '#808080',
                tabBarHideOnKeyboard: true,
                tabBarStyle: {
                    height: 70,
                    paddingHorizontal: 10,
                    borderTopEndRadius: 34,
                    borderTopStartRadius: 34,
                }
            }}
        >
            <Tabs.Screen
                name='home'
                options={{ 
                    title: 'Home',
                    headerShown: false,
                    tabBarIcon: ({ color, focused }) => (
                        <TabIcon
                            lightIcon={lightHome}
                            darkIcon={darkHome}
                            color={color}
                            focused={focused}
                            name='Home'
                        />
                    ),
                }}
            />
            <Tabs.Screen
                name='search'
                options={{ 
                    title: 'Search',
                    headerShown: false,
                    tabBarIcon: ({ color, focused }) => (
                        <TabIcon
                            lightIcon={lightSearch}
                            darkIcon={darkSearch}
                            color={color}
                            focused={focused}
                            name='Search'
                        />
                    ),
                }}
            />
            <Tabs.Screen
                name='messages'
                options={{ 
                    title: 'Messages',
                    headerShown: false,
                    tabBarIcon: ({ color, focused }) => (
                        <TabIcon
                            lightIcon={lightMessage}
                            darkIcon={darkMessage}
                            color={color}
                            focused={focused}
                            name='Messages'
                        />
                    ),
                }}
            />
            <Tabs.Screen
                name='settings'
                options={{ 
                    title: 'Settings',
                    headerShown: false,
                    tabBarIcon: ({ color, focused }) => (
                        <TabIcon
                            lightIcon={lightSettings}
                            darkIcon={lightSettings}
                            color={color}
                            focused={focused}
                            name='Settings'
                        />
                    ),
                }}
            />
        </Tabs>
    );
}

export default TabLayout;