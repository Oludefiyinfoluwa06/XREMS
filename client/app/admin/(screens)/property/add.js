import { useEffect, useState } from 'react';
import { View, Text, ScrollView, Image, TouchableOpacity, TextInput, FlatList } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import * as ImagePicker from 'expo-image-picker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { uploadImg } from '../../../../assets/images/admin';
import { useProperty } from '../../../../contexts/PropertyContext';
import Button from '../../../../components/Button';
import { angleBack } from '../../../../constants';
import { profile2 } from '../../../../assets/icons/admin';
import { useAuth } from '../../../../contexts/AuthContext';

const Add = () => {
    const [images, setImages] = useState([]);
    const [type, setType] = useState('');
    const [price, setPrice] = useState('');
    const [location, setLocation] = useState('');
    const [description, setDescription] = useState('');

    const { getUser, user } = useAuth();
    const { error, setError, propertyLoading, uploadProperty } = useProperty();

    useEffect(() => {
        getUser();
    }, []);

    const pickImages = async () => {
        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsMultipleSelection: true,
            quality: 1,
        });

        if (!result.canceled) {
            const selectedImages = result.assets.map(asset => asset.uri);
            setImages(selectedImages);
        }
    };

    const formatPrice = (value) => {
        const numericValue = value.replace(/\D/g, '');
        return numericValue.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    }

    const handleUploadProperty = async () => {
        let formData = new FormData();

        images.forEach((uri, index) => {
            formData.append('pictures', {
                uri,
                name: `property_${index}.jpg`,
                type: 'image/jpeg',
            });
        });

        formData.append('type', type);
        formData.append('price', price);
        formData.append('location', location);
        formData.append('description', description);

        await uploadProperty(formData);
    };
    
    return (
        <SafeAreaView>
            <ScrollView>
                <View className='flex flex-row items-center justify-between p-[30px] bg-white'>
                    <View className='flex items-center justify-start flex-row'>
                        <TouchableOpacity onPress={() => router.back()}>
                            <Image
                                source={angleBack}
                                resizeMode='contain'
                                className='w-[25px] h-[25px] mr-2'
                            />
                        </TouchableOpacity>
                        <Text className='text-2xl text-blue font-rbold'>Add Property</Text>
                    </View>
                    <View className='flex items-center justify-end flex-row'>
                        <TouchableOpacity onPress={() => router.push('/admin/profile')}  className='bg-white rounded-full relative w-[30px] h-[30px]'>
                            <Image
                                source={user !== null && user?.profileImg !== '' ? { uri: user?.profileImg } : profile2}
                                resizeMode='cover'
                                className='w-full h-full absolute top-0 left-0 rounded-full'
                            />
                        </TouchableOpacity>
                    </View>
                </View>

                <View className='p-[25px]'>
                    {error && <View className='w-full p-3 rounded-[50px] bg-errorBg mb-[20px]'>
                        <Text className='font-rregular text-errorText'>{error}</Text>
                    </View>}

                    <Button title='Add Pictures' onClick={pickImages} />

                    <View
                        className='w-full h-[200px] flex items-center justify-center bg-white rounded-lg mt-[10px]'
                    >
                        {images.length > 0 ? (
                            <FlatList
                                horizontal
                                data={images}
                                renderItem={({ item }) => (
                                    <Image
                                        key={item}
                                        source={{ uri: item }}
                                        resizeMode='cover'
                                        style={{ width: 350, height: 200, marginRight: 5, borderRadius: 10 }}
                                    />
                                )}
                                keyExtractor={(item) => item}
                            />
                        ) : (
                            <Image
                                source={uploadImg}
                                resizeMode='cover'
                                className='w-full h-full rounded-lg'
                            />
                        )}
                    </View>

                    <Text className="text-blue ml-[10px] mt-[20px] mb-[8px] text-[15px] font-rbold">Type of Property:</Text>
                    <TextInput
                        placeholder='Bungalow, Duplex...'
                        className='p-[5px] px-[10px] w-full border border-gray rounded-[50px] font-rregular'
                        value={type}
                        onChangeText={(value) => {
                            setType(value);
                            setError('');
                        }}
                    />

                    <Text className="text-blue ml-[10px] mt-[20px] mb-[8px] text-[15px] font-rbold">Price (in Naira):</Text>
                    <TextInput
                        placeholder='100000...'
                        className='p-[5px] px-[10px] w-full border border-gray rounded-[50px] font-rregular'
                        value={price}
                        onChangeText={(value) => {
                            setPrice(formatPrice(value));
                            setError('');
                        }}
                    />

                    <Text className="text-blue ml-[10px] mt-[20px] mb-[8px] text-[15px] font-rbold">Location:</Text>
                    <TextInput
                        placeholder='Police Estate, Kurudu, Abuja...'
                        className='p-[5px] px-[10px] w-full border border-gray rounded-[50px] font-rregular'
                        value={location}
                        onChangeText={(value) => {
                            setLocation(value);
                            setError('');
                        }}
                    />

                    <Text className="text-blue ml-[10px] mt-[20px] mb-[8px] text-[15px] font-rbold">Description:</Text>
                    <TextInput
                        placeholder='Description...'
                        className='p-[7px] px-[10px] w-full border border-gray rounded-lg font-rregular mb-[20px]'
                        style={{ height: 80, textAlignVertical: 'top' }}
                        value={description}
                        onChangeText={(value) => {
                            setDescription(value);
                            setError('');
                        }}
                        multiline={true}
                    />

                    <Button title='Save' onClick={handleUploadProperty} loading={propertyLoading} />
                </View>

                <View className='mt-[40px]' />
            </ScrollView>
        </SafeAreaView>
    );
}

export default Add;