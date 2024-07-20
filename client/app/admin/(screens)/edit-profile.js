import { useEffect, useState } from 'react';
import { View, Text, StatusBar, TouchableOpacity, Image, ImageBackground, TextInput, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as ImagePicker from 'expo-image-picker';
import { camera, profile2 } from '../../../assets/icons/admin';
import { useAuth } from '../../../contexts/AuthContext';
import { angleBack } from '../../../constants';
import Button from '../../../components/Button';

const EditProfile = () => {
    const [fullname, setFullname] = useState('');
    const [email, setEmail] = useState('');
    const [image, setImage] = useState(null);

    const { editProfile, loading } = useAuth();

    useEffect(() => {
        const getUser = async () => {
            const userDetails = await AsyncStorage.getItem('user');
            const profileImg = await AsyncStorage.getItem('profile');
            const user = JSON.parse(userDetails);
            setFullname(user?.fullname);
            setEmail(user?.email);
            setImage(profileImg);
        }

        getUser();
    }, []);

    const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });

        if (!result.canceled) {
            setImage(result.assets[0].uri);
        }
    };

    const handleEditProfile = async () => {
        let formData = new FormData();
        formData.append('fullname', fullname);
        formData.append('email', email);

        if (image) {
            formData.append('image', {
                uri: image,
                name: 'profile.jpg',
                type: 'image/jpeg'
            });
        }

        formData.append('isAdmin', true);

        await editProfile(formData);
    }

    return (
        <SafeAreaView className='flex-1'>
            <ScrollView>
                <ImageBackground
                    source={require('../../../assets/images/bg-2.png')}
                    resizeMode='stretch'
                    className='w-full h-[320px]'
                >
                    <View className='h-full p-[25px]'>
                        <View className='flex items-center justify-between flex-row'>
                            <TouchableOpacity onPress={() => router.back()} className='bg-white p-2 rounded-lg'>
                                <Image
                                    source={angleBack}
                                    resizeMode='contain'
                                    className='w-[25px] h-[25px]'
                                />
                            </TouchableOpacity>
                            <View />
                        </View>

                        <TouchableOpacity className='flex items-center justify-center flex-col mt-[30px]' onPress={pickImage}>
                            <View className='bg-white rounded-full relative w-[90px] h-[90px]'>
                                <Image
                                    source={image !== null && image !== '' ? { uri: image } : profile2}
                                    resizeMode='cover'
                                    className='w-full h-full absolute top-0 left-0 rounded-full'
                                />
                                <Image
                                    source={camera}
                                    resizeMode='contain'
                                    className='bg-transparentWhite flex items-center justify-center rounded-full w-[27px] h-[27px] absolute bottom-0 right-0'
                                />
                            </View>
                        </TouchableOpacity>
                    </View>
                </ImageBackground>
                
                <View className='flex-1 bg-transparentWhite mt-[-60px] rounded-t-[40px] p-[40px]'>
                    <View className='bg-white rounded-[20px] p-[25px]'>
                        <View>
                            <View className='flex items-start justify-center mb-3'>
                                <Text className='text-blue font-rbold text-lg mb-2'>Fullname</Text>
                                <TextInput
                                    placeholder='Full name'
                                    className='p-[5px] px-[10px] w-full border border-gray rounded-[50px] font-rregular'
                                    value={fullname}
                                    onChangeText={(value) => setFullname(value)}
                                />
                            </View>

                            <View className='flex items-start justify-center mb-3'>
                                <Text className='text-blue font-rbold text-lg mb-2'>Email</Text>
                                <TextInput
                                    placeholder='Full name'
                                    className='p-[5px] px-[10px] w-full border border-gray rounded-[50px] font-rregular'
                                    value={email}
                                    onChangeText={(value) => setEmail(value)}
                                />
                            </View>
                        </View>

                        <View className='fixed bottom-0 left-0 right-0 flex items-center justify-center flex-row mx-auto w-full'>
                            <Button title='Save' onClick={handleEditProfile} loading={loading} />
                        </View>
                    </View>
                </View>
                
                <StatusBar backgroundColor='#FFFFFF' />
            </ScrollView>
        </SafeAreaView>
    );
}

export default EditProfile;
