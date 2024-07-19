import { useState, createContext, useContext } from "react";
import axios from 'axios';
import AsyncStorage from "@react-native-async-storage/async-storage";
import { config } from "../config";

const ChatContext = createContext();

export const ChatProvider = ({ children }) => {
    const [users, setUsers] = useState(null);
    const [messages, setMessages] = useState(null);

    const getUsers = async () => {
        try {
            const token = await AsyncStorage.getItem('token');
            const response = await axios.get(`${config.backendUrl}/chat/users`, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            });

            setUsers(response.data.users);
        } catch (error) {
            console.log(error);
        }
    }

    const sendMessage = async (message, receipientId) => {
        try {
            const token = await AsyncStorage.getItem('token');
            const response = await axios.post(`${config.backendUrl}/chat/send/${receipientId}`, { message }, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            });

            await getMessages(receipientId);
        } catch (error) {
            console.log(error);
        }
    }

    const getMessages = async (receipientId) => {
        try {
            const token = await AsyncStorage.getItem('token');
            const response = await axios.get(`${config.backendUrl}/chat/messages/${receipientId}`, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            });

            // console.log(response.data);
            setMessages(response.data.messages);
        } catch (error) {
            console.log(error);
        }
    }
    
    const values = {
        getUsers,
        sendMessage,
        getMessages,
        users,
        messages,
    };

    return (
        <ChatContext.Provider value={values}>
            {children}
        </ChatContext.Provider>
    );
}

export const useChat = () => useContext(ChatContext);