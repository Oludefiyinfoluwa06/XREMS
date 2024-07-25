import { createContext, useContext, useEffect, useState } from "react";
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { config } from "../config";

const NotificationContext = createContext();

export const NotificationProvider = ({ children }) => {
    const [notificationError, setNotificationError] = useState('');
    const [notificationLoading, setNotificationLoading] = useState(false);
    const [notifications, setNotifications] = useState(null);
    const [notificationCount, setNotificationCount] = useState(0);

    const getUnreadNotifications = async () => {
        try {
            const token = await AsyncStorage.getItem('token');

            const response = await axios.get(`${config.backendUrl}/notification/unread`, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            });

            if (response.data.error) return setNotificationError(response.data.error);

            setNotificationCount(response.data.unreadNotifications);
        } catch (error) {
            console.log(error);
        }
    }

    const getNotifications = async () => {
        try {
            const token = await AsyncStorage.getItem('token');

            const response = await axios.get(`${config.backendUrl}/notification/all`, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            });

            if (response.data.error) return setNotificationError(response.data.error);

            setNotifications(response.data.notifications);
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        setNotificationError('');
    }, []);
    
    const values = {
        notificationLoading,
        notificationError,
        getUnreadNotifications,
        getNotifications,
        notificationCount,
        notifications,
    }

    return (
        <NotificationContext.Provider value={values}>
            {children}
        </NotificationContext.Provider>
    );
}

export const useNotification = () => useContext(NotificationContext);