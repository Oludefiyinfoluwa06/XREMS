import { View, Text, TouchableOpacity, Image, ScrollView, StatusBar } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import SearchBar from '../../components/SearchBar';
import { angleBack } from '../../constants';
import SearchResults from '../../components/search/SearchResults';

const Search = () => {
  return (
    <SafeAreaView className='p-[20px] h-full bg-white'>
      <View className='flex items-center justify-between flex-row'>
        <TouchableOpacity
          className='flex items-center justify-content p-[13px] rounded-lg bg-white shadow-lg'
          onPress={() => router.back()}
        >
          <Image
            source={angleBack}
            resizeMode='contain'
            className='w-[24px] h-[24px]'
          />
        </TouchableOpacity>

        <Text className='font-rbold text-xl ml-[-40px]'>Search</Text>

        <View />
      </View>

      <SearchBar />
      <SearchResults />

      <StatusBar backgroundColor={`#FFF`} />
    </SafeAreaView>
  );
}

export default Search;