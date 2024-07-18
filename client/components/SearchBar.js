import { useState } from 'react';
import { Image, TextInput, TouchableOpacity, View } from 'react-native';
import { router } from 'expo-router';
import { lightSearch } from '../constants';
import { useProperty } from '../contexts/PropertyContext';

const SearchBar = ({ placeholder='Search for an apartment', searchQuery, setSearchQuery }) => {
    const [searchText, setSearchText] = useState('');
    
    const { searchProperties } = useProperty();

    return (
        <View className='flex items-center justify-between bg-[#EFF1F2] flex-row p-2 rounded-lg my-2'>
            <TextInput
                value={searchQuery ? searchQuery : searchText}
                onChangeText={(value) => setSearchQuery ? setSearchQuery(value) : setSearchText(value)}
                placeholder={placeholder}
                className='basis-[90%] font-rregular'
                returnKeyType='done'
            />

            <TouchableOpacity onPress={!searchQuery ? () => {
                router.push(`/search?query=${searchText}`);
                searchProperties(searchText);
            } : () => searchProperties(searchQuery)}>
                <Image
                    source={lightSearch}
                    resizeMode='contain'
                    className='w-[30px] h-[30px]'
                />
            </TouchableOpacity>
        </View>
    );
}

export default SearchBar;