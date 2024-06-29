import { View, Text, Image } from 'react-native';

const EmptyList = ({ icon, text }) => {
    return (
        <View className='flex items-center justify-center min-h-screen mt-[-150px]'>
            <Image
                source={icon}
                resizeMode='cover'
                className='w-[200px] h-[200px]'
            />
            <Text className='font-rbold text-[30px] text-blue'>{text}</Text>
        </View>
    );
}

export default EmptyList;