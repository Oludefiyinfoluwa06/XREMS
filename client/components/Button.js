import { Text, TouchableOpacity } from 'react-native';

const Button = ({ title }) => {
    return (
        <TouchableOpacity className='w-full p-3 rounded-[50px] bg-blue'>
            <Text className='text-white text-center font-bold'>{title}</Text>
        </TouchableOpacity>
    );
}

export default Button;