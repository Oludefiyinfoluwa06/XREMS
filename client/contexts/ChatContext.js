import { createContext, useContext, useEffect, useState } from "react";

import { router } from "expo-router";
import axios from 'axios';
import AsyncStorage from "@react-native-async-storage/async-storage";

const ChatContext = createContext();

export const ChatProvider = ({ children }) => {
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const getToken = async () => {
        const token = await AsyncStorage.getItem('token');
        return token;
    }
     
    const values = {}

    return (
        <ChatContext.Provider value={values}>
            {children}
        </ChatContext.Provider>
    );
}

export const useChat = () => useContext(ChatContext);