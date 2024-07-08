import { Text, TouchableOpacity } from 'react-native';

const Button = ({ text }) => {
    return (
        <TouchableOpacity className='bg-white text-blue font-rsemibold rounded-lg px-[30px] py-[10px] m-2'>
            <Text>{text}</Text>
        </TouchableOpacity>
    );
}

export default Button;