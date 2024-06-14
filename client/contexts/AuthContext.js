import { createContext, useContext, useState } from "react";

import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const signUp = async (email, password) => {
        setLoading(true);

        try {
            const response = await axios.post('http://10.0.2.2:5000/auth/sign-up', { email, password }, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            if (response.data.error) {
                return setError(response.data.error);
            } else {
                await AsyncStorage.setItem('token', response.data.token);
                await AsyncStorage.setItem('user', response.data.user);
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
            const response = await axios.post('http://10.0.2.2:5000/auth/sign-in', { email, password }, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            if (response.data.error) {
                return setError(response.data.error);
            } else {
                await AsyncStorage.setItem('token', response.data.token);
                await AsyncStorage.setItem('user', response.data.user);
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
    }
    
    const values = {
        signUp,
        signIn,
        error,
        setError,
        loading,
        logout
    }

    return (
        <AuthContext.Provider value={values}>
            {children}
        </AuthContext.Provider>
    );
}

export const useAuth = () => useContext(AuthContext);