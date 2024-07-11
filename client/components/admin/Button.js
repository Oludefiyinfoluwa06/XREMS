import { Text, TouchableOpacity } from 'react-native';

const Button = ({ text, bg, onClick }) => {
    return (
        <TouchableOpacity className={`${bg ? 'bg-blue' : 'bg-white'}  border-2 border-blue font-rsemibold rounded-lg px-[30px] py-[10px] m-2`} onPress={onClick}>
            <Text className={`${bg ? 'text-white' : 'text-blue'}`}>{text}</Text>
        </TouchableOpacity>
    );
}

export default Button;