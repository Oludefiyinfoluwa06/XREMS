import { useState } from 'react';
import { Image, TextInput, TouchableOpacity, View } from 'react-native';
import { lightSearch } from '../constants';

const SearchBar = ({ placeholder='Search for an apartment' }) => {
    const [searchText, setSearchText] = useState('');

    return (
        <View className='flex items-center justify-between bg-[#EFF1F2] flex-row p-2 rounded-lg my-2'>
            <TextInput
                value={searchText}
                onChangeText={(value) => setSearchText(value)}
                placeholder={placeholder}
                className='basis-[90%] font-rregular'
            />

            <TouchableOpacity onPress={() => console.log('Search results for ' + searchText)}>
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