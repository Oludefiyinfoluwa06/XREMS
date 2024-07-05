import { DrawerContentScrollView, DrawerItemList } from '@react-navigation/drawer';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { View, Image } from 'react-native';

import { logo } from '../../assets/images/admin';

const CustomDrawerContent = (props) => {
    const { top, bottom } = useSafeAreaInsets();

    return (
        <View className='flex-1'>
            <View>
                <Image
                    source={logo}
                />
            </View>

            <DrawerContentScrollView
                {...props} 
                scrollEnabled={false}
            >
                <DrawerItemList {...props} />
            </DrawerContentScrollView>
        </View>
    );
}

export default CustomDrawerContent;