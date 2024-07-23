import { ActivityIndicator, Text, TouchableOpacity } from 'react-native';

const Button = ({ title, isBought, onClick, loading }) => {
    return (
        <TouchableOpacity className={`${isBought ? 'bg-[#C2C2C2]' : 'bg-blue'} w-full p-3 rounded-[50px]`} onPress={onClick} disabled={loading || isBought}>
            {loading ? (
                <ActivityIndicator animating={true} color='white' />
            ) : (
                <Text className='text-white text-center font-rbold'>{title}</Text>
            )}
        </TouchableOpacity>
    );
}

export default Button;