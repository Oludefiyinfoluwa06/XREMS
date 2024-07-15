import { Image, Text, TouchableOpacity } from 'react-native';

const AuthButton = ({ icon, title }) => {
    return (
        <TouchableOpacity className='flex-row p-[8px] pl-[-5px] pt-[-5px] rounded-lg bg-white gap-2 items-center justify-center w-[45%]' style={{ shadowColor: '#000', shadowOpacity: 0.25, shadowRadius: 3.84, elevation: 5 }}>
            <Image source={icon} resizeMode='contain' className='w-[20px] h-[20px]' />
            <Text className='text-blue text-center font-rbold text-lg'>{title}</Text>
        </TouchableOpacity>
    );
}

export default AuthButton;