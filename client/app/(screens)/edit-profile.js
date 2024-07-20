import { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, Image, ScrollView, TextInput } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as ImagePicker from 'expo-image-picker';
import { angleBack, user } from '../../constants';
import Button from '../../components/Button';
import { useAuth } from '../../contexts/AuthContext';
import { camera } from '../../assets/icons/admin';

const EditProfile = () => {
    const [fullname, setFullname] = useState('');
    const [email, setEmail] = useState('');
    const [image, setImage] = useState(null);

    const { editProfile, setError, error, loading } = useAuth();

    useEffect(() => {
        const getUser = async () => {
            const user = await AsyncStorage.getItem('user');
            const profileImg = await AsyncStorage.getItem('profile');
            const userData = JSON.parse(user);
            setFullname(userData?.fullname);
            setEmail(userData?.email);
            setImage(profileImg);
            setError('');
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

        formData.append('isAdmin', false);

        await editProfile(formData);
    }

    return (
        <SafeAreaView className='bg-white h-full'>
            <ScrollView>
                <View className='flex items-center justify-start flex-row p-[20px]'>
                    <TouchableOpacity
                        className='flex items-center justify-center p-[13px] rounded-lg bg-white shadow-lg'
                        onPress={() => router.back()}
                    >
                        <Image
                            source={angleBack}
                            resizeMode='contain'
                            className='w-[24px] h-[24px] mr-2'
                        />
                    </TouchableOpacity>

                    <Text className='font-rbold text-xl'>Edit Profile</Text>
                </View>

                <View className='p-[25px]'>
                    <TouchableOpacity className='flex items-center justify-center flex-col mt-[30px]' onPress={pickImage}>
                        <View className='bg-white rounded-full relative w-[90px] h-[90px]'>
                            <Image
                                source={image !== null && image !== '' ? { uri: image } : user}
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

                    {error && <View className='w-full p-3 rounded-[50px] bg-errorBg mt-[20px]'>
                        <Text className='font-rregular text-errorText'>{error}</Text>
                    </View>}

                    <View>
                        <Text className="text-blue ml-[10px] mt-[10px] mb-[8px] text-[15px] font-rbold">Full name:</Text>
                        <TextInput
                            placeholder='Full name'
                            className='p-[5px] px-[10px] w-full border border-gray rounded-[50px] font-rregular'
                            value={fullname}
                            onChangeText={(value) => {
                                setFullname(value);
                                setError('');
                            }}
                        />

                        <Text className="text-blue ml-[10px] mt-[20px] mb-[8px] text-[15px] font-rbold">Email:</Text>
                        <TextInput
                            placeholder='Email'
                            className='p-[5px] px-[10px] w-full border border-gray rounded-[50px] font-rregular mb-[20px]'
                            value={email}
                            onChangeText={(value) => {
                                setEmail(value);
                                setError('');
                            }}
                            keyboardType='email-address'
                        />

                        <Button title='Save' onClick={handleEditProfile} loading={loading} />
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}

export default EditProfile;