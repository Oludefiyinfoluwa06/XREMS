import { createContext, useContext, useEffect, useState } from "react";

import { router } from "expo-router";
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { config } from "../config";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const [user, setUser] = useState(null);

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
                await AsyncStorage.setItem('isAdmin', JSON.stringify(response.data.isAdmin));
                
                if (response.data.isAdmin) {
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
                await AsyncStorage.setItem('isAdmin', JSON.stringify(response.data.isAdmin));
                
                if (response.data.isAdmin) {
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
                if (response.data.isAdmin) {
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

    const receiveOtp = async (email) => {
        setLoading(true);

        try {
            const response = await axios.post(`${config.backendUrl}/auth/receive-otp`, { email });

            if (response.data.error) return setError(response.data.error);

            await AsyncStorage.setItem('otp', JSON.stringify(response.data.otp));

            if (response.data.isAdmin) return router.push('/admin/reset-password');

            router.push('/reset-password');
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    }

    const resetPassword = async (email, password) => {
        setLoading(true);

        try {
            const response = await axios.put(`${config.backendUrl}/auth/reset-password`, { email, password });

            if (response.data.error) return setError(response.data.error);

            if (response.data.isAdmin) return router.replace('/admin/sign-in');

            router.replace('/sign-in');
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    }

    const logout = async () => {
        await AsyncStorage.removeItem('token');
        await AsyncStorage.removeItem('isAdmin');
        router.replace('/choose');
    }

    const getUser = async () => {
        try {
            const token = await AsyncStorage.getItem('token');
            const response = await axios.get(`${config.backendUrl}/auth/user`, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            });

            if (!response.data.error) return setUser(response.data.user);
            
            setError(response.data.error);
        } catch (error) {
            console.log(error);
        }
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
        getUser,
        user,
        receiveOtp,
        resetPassword,
    }

    return (
        <AuthContext.Provider value={values}>
            {children}
        </AuthContext.Provider>
    );
}

export const useAuth = () => useContext(AuthContext);