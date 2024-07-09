import { createContext, useContext, useState } from "react";

import { router } from "expo-router";
import axios from 'axios';
import AsyncStorage from "@react-native-async-storage/async-storage";

const PropertyContext = createContext();

export const PropertyProvider = ({ children }) => {
    const [properties, setProperties] = useState(null);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const getToken = async () => {
        const token = await AsyncStorage.getItem('token');
        return token;
    }

    const uploadProperty = async (formData) => {
        setLoading(true);

        try {
            const response = await axios.post('http://192.168.55.68:5000/property/upload', formData, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${getToken()}`
                }
            });

            console.log(response);
            // if (response.data.error) return setError(response.data.error);

            // router.push('/admin/dashboard');
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    }

    const getAllProperties = async () => {
        setLoading(true);

        try {
            const response = await axios.post('http://192.168.55.68:5000/property/all', {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${getToken()}`
                }
            });

            console.log(response);
            // if (response.data.error) return setError(response.data.error);
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    }

    const getPropertyDetails = async (propertyId) => {
        setLoading(true);

        try {
            const response = await axios.post(`http://192.168.55.68:5000/property/all/${propertyId}`, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${getToken()}`
                }
            });

            if (response.data.error) return setError(response.data.error);

            router.push('/admin/dashboard');
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    }

    const getMyProperties = async () => {
        setLoading(true);

        try {
            const response = await axios.post(`http://192.168.55.68:5000/property/my`, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${getToken()}`
                }
            });

            console.log(response);

            // if (response.data.error) return setError(response.data.error);
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    }
    
    const values = {
        uploadProperty,
        getAllProperties,
        getPropertyDetails,
        getMyProperties,
    }

    return (
        <PropertyContext.Provider value={values}>
            {children}
        </PropertyContext.Provider>
    );
}

export const useProperty = () => useContext(PropertyContext);