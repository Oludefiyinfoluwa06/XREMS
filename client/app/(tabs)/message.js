import { View, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const Message = () => {
  return (
    <SafeAreaView className='p-[20px]'>
      <Text>Message</Text>
    </SafeAreaView>
  );
}

export default Message;