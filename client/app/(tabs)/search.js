import { useState } from 'react';
import { View, Text, TouchableOpacity, Image, ScrollView, StatusBar } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router, useLocalSearchParams } from 'expo-router';
import SearchBar from '../../components/SearchBar';
import { angleBack } from '../../constants';
import SearchResults from '../../components/search/SearchResults';

const Search = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const { query } = useLocalSearchParams();

  return (
    <SafeAreaView className='h-full bg-white'>
      <View className='flex items-center justify-between flex-row p-[20px]'>
        <TouchableOpacity
          className='flex items-center justify-content p-[13px] rounded-lg'
          style={{ padding: 20, backgroundColor: '#fff', shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.1, shadowRadius: 10, elevation: 200 }}
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

      <SearchBar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
      <SearchResults query={query} searchQuery={searchQuery} />

      <StatusBar backgroundColor='#FFFFFF' />
    </SafeAreaView>
  );
}

export default Search;