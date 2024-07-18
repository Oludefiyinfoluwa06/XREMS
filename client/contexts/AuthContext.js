import { createContext, useContext, useEffect, useState } from "react";

import { router } from "expo-router";
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { config } from "../config";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const signUp = async (fullname, email, password, isAdmin) => {
        setLoading(true);

        try {
            const response = await axios.post(`${config.backendUrl}/auth/sign-up`, { fullname, email, password, isAdmin }, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            if (response.data.error) {
                return setError(response.data.error);
            } else {
                await AsyncStorage.setItem('token', response.data.token);
                const user = response.data.user;
                const userData = {
                    "_id": user._id,
                    "fullname": user.fullname,
                    "email": user.email,
                    "isAdmin": user.isAdmin,
                    "balance":  user.balance
                }

                await AsyncStorage.setItem('user', JSON.stringify(userData));
                await AsyncStorage.setItem('profile', response.data.user.profileImg);
                
                if (response.data.user.isAdmin) {
                    router.replace('/admin/dashboard');
                } else {
                    router.replace('/home');
                }
            }
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    }

    const signIn = async (email, password) => {
        setLoading(true);

        try {
            const response = await axios.post(`${config.backendUrl}/auth/sign-in`, { email, password }, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            if (response.data.error) {
                return setError(response.data.error);
            } else {
                await AsyncStorage.setItem('token', response.data.token);
                const user = response.data.user;
                const userData = {
                    "_id": user._id,
                    "fullname": user.fullname,
                    "email": user.email,
                    "isAdmin": user.isAdmin,
                    "balance":  user.balance
                }

                await AsyncStorage.setItem('user', JSON.stringify(userData));
                await AsyncStorage.setItem('profile', response.data.user.profileImg);
                
                if (response.data.user.isAdmin) {
                    router.replace('/admin/dashboard');
                } else {
                    router.replace('/home');
                }
            }
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    }

    const editProfile = async (formData) => {
        setLoading(true);

        try {
            const token = await AsyncStorage.getItem('token');

            const response = await axios.put(`${config.backendUrl}/auth/update-profile`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'Authorization': `Bearer ${token}`
                }
            });
            
            if (response.data.error) {
                return setError(response.data.error);
            } else {
                await AsyncStorage.removeItem('token');
                await AsyncStorage.removeItem('user');

                await AsyncStorage.setItem('token', response.data.token);
                const user = response.data.user;
                const userData = {
                    "_id": user._id,
                    "fullname": user.fullname,
                    "email": user.email,
                    "isAdmin": user.isAdmin,
                    "balance":  user.balance
                }

                await AsyncStorage.setItem('user', JSON.stringify(userData));
                await AsyncStorage.setItem('profile', response.data.user.profileImg);
                
                if (response.data.user.isAdmin) {
                    router.replace('/admin/profile');
                } else {
                    router.replace('/profile');
                }
            }
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    }

    const logout = async () => {
        await AsyncStorage.removeItem('token');
        await AsyncStorage.removeItem('user');
        await AsyncStorage.removeItem('profile');
        router.replace('/choose');
    }

    useEffect(() => {
        setError('');
    }, []);
    
    const values = {
        signUp,
        signIn,
        error,
        setError,
        loading,
        logout,
        editProfile,
    }

    return (
        <AuthContext.Provider value={values}>
            {children}
        </AuthContext.Provider>
    );
}

export const useAuth = () => useContext(AuthContext);