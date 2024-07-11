import { DrawerContentScrollView, DrawerItemList } from '@react-navigation/drawer';
import { View, Image } from 'react-native';

import { logo, logo2 } from '../../constants';

const CustomDrawerContent = (props) => {
    return (
        <View style={{ flex: 1, height: '100vh' }}>
            <DrawerContentScrollView
                {...props} 
                scrollEnabled={false}
            >
                <View className='flex flex-row items-center justify-start gap-2 my-2 pl-2'>
                    <Image
                        source={logo}
                        resizeMode='contain'
                        className='w-[60px] h-[60px]'
                    />
                    <Image
                        source={logo2}
                        resizeMode='contain'
                        className='w-[100px] h-[30px]'
                    />
                </View>
                <DrawerItemList {...props} />

            </DrawerContentScrollView>
        </View>
    );
}

export default CustomDrawerContent;