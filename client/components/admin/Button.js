import { Text, TouchableOpacity } from 'react-native';

const Button = ({ text, bg, onClick }) => {
    return (
        <TouchableOpacity className={`${bg ? 'bg-blue' : 'bg-white'} border-2 border-blue font-rsemibold rounded-lg w-[140px] px-[20px] py-[10px] m-2`} onPress={onClick}>
            <Text className={`${bg ? 'text-white' : 'text-blue'} text-center font-rregular`}>{text}</Text>
        </TouchableOpacity>
    );
}

export default Button;