import { createContext, useContext, useState } from "react";
import axios from 'axios';
import { router } from "expo-router";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [error, setError] = useState('');

    const signUp = async (email, password) => {
        try {
            const response = await axios.post('http://192.168.96.68:5000/auth/sign-up', { email, password });

            if (response.data.error) {
                return setError(response.data.error);
            } else {
                router.push('/home?message='+response.data.message);
            }
        } catch (error) {
            console.log(error);
        }
    }

    const signIn = async (email, password) => {
        try {
            const response = await axios.post('http://192.168.96.68:5000/auth/sign-in', { email, password });

            if (response.data.error) {
                return setError(response.data.error);
            } else {
                router.push('/home?message='+response.data.message);
            }
        } catch (error) {
            console.log(error);
        }
    }
    
    const values = {
        signUp,
        signIn,
        error,
        setError
    }

    return (
        <AuthContext.Provider value={values}>
            {children}
        </AuthContext.Provider>
    );
}

export const useAuth = () => useContext(AuthContext);