import { createContext, useContext, useState } from "react";
import axios from 'axios';
import { router } from "expo-router";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [error, setError] = useState('');
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [currentUser, setCurrentUser] = useState(null);
    const [loading, setLoading] = useState(false);

    const signUp = async (email, password) => {
        setLoading(true);

        try {
            const response = await axios.post('http://192.168.132.68:5000/auth/sign-up', { email, password });

            if (response.data.error) {
                return setError(response.data.error);
            } else {
                setIsLoggedIn(true);
                setCurrentUser(email);
                router.replace('/home');
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
            const response = await axios.post('http://192.168.132.68:5000/auth/sign-in', { email, password });

            if (response.data.error) {
                return setError(response.data.error);
            } else {
                setIsLoggedIn(true);
                setCurrentUser(email);
                router.replace('/home');
            }
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    }

    const logout = () => {
        setCurrentUser(null);
        router.replace('/sign-in');
    }
    
    const values = {
        signUp,
        signIn,
        error,
        setError,
        currentUser,
        isLoggedIn,
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