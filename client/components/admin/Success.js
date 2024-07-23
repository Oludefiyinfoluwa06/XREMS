import { View, Text, Modal, Image } from 'react-native';
import { success } from '../../assets/icons/admin';

const Success = ({ successModalVisible, message }) => {
    return (
        <Modal
            animationType="fade"
            transparent={true}
            visible={successModalVisible}
        >
            <View className='flex-1 items-center justify-center bg-transparentBlack'>
                <View className='w-[60%] bg-white rounded-lg p-[25px] flex items-center justify-center'>
                    <Image
                        source={success}
                        resizeMode='contain'
                        className='w-[100px] h-[100px] mb-3'
                    />
                    <Text className='text-lg font-rbold text-blue'>{message}</Text>
                </View>
            </View>
        </Modal>
    );
}

export default Success;