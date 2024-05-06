import { createContext, useContext } from "react";
import axios from 'axios';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const signUp = async (email, password) => {
        try {
            const response = await axios.post('http://localhost:5000/auth/sign-up', { email, password });
            console.log(response);
        } catch (error) {
            console.log(error);
        }
    }

    const signIn = async (email, password) => {
        try {
            const response = await axios.post('http://localhost:5000/auth/sign-in', { email, password });
            console.log(response);
        } catch (error) {
            console.log(error);
        }
    }
    
    const values = {
        signUp,
        signIn
    }

    return (
        <AuthContext.Provider value={values}>
            {children}
        </AuthContext.Provider>
    );
}

export const useAuth = () => useContext(AuthContext);