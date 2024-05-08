import { ActivityIndicator, Text, TouchableOpacity } from 'react-native';

const Button = ({ title, onClick, loading }) => {
    return (
        <TouchableOpacity className='w-full p-3 rounded-[50px] bg-blue' onPress={onClick} disabled={loading}>
            {loading ? (
                <ActivityIndicator animating={true} color='white' />
            ) : (
                <Text className='text-white text-center font-bold'>{title}</Text>
            )}
        </TouchableOpacity>
    );
}

export default Button;