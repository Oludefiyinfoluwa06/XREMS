import { Image, Text, TouchableOpacity } from 'react-native';

const AuthButton = ({ icon, title }) => {
    return (
        <TouchableOpacity className='p-3 rounded-[50px] bg-transparent shadow-lg'>
            <Image source={icon} resizeMode='contain' className='w-4 h-4' />
            <Text className='text-blue text-center font-bold'>{title}</Text>
        </TouchableOpacity>
    );
}

export default AuthButton;