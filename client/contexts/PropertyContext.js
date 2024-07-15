import { createContext, useContext, useState } from "react";

import { router } from "expo-router";
import axios from 'axios';
import AsyncStorage from "@react-native-async-storage/async-storage";
import { config } from "../config";

const PropertyContext = createContext();

export const PropertyProvider = ({ children }) => {
    const [properties, setProperties] = useState(null);
    const [error, setError] = useState('');
    const [propertyLoading, setPropertyLoading] = useState(false);
    const [totalProperties, setTotalProperties] = useState(0);
    const [totalPropertiesAddedPastMonth, setTotalPropertiesAddedPastMonth] = useState(0);
    const [houseDetails, setHouseDetails] = useState(null);
    const [featuredProperties, setFeaturedProperties] = useState(null);
    const [topPlace, setTopPlace] = useState(null);
    const [newProperties, setNewProperties] = useState(null);
    const [allProperties, setAllProperties] = useState(null);
    const [agentDetails, setAgentDetails] = useState(null);

    const uploadProperty = async (formData) => {
        setPropertyLoading(true);

        try {
            const token = await AsyncStorage.getItem('token');
            const response = await axios.post('${config.backendUrl}/property/upload', formData, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            });

            console.log(response.data);
            // if (response.data.error) return setError(response.data.error);

            // router.push('/admin/dashboard');
        } catch (error) {
            console.log(error);
        } finally {
            setPropertyLoading(false);
        }
    }

    const getAllProperties = async () => {
        setPropertyLoading(true);

        try {
            const token = await AsyncStorage.getItem('token');
            const response = await axios.get(`${config.backendUrl}/property/all`, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            });

            setAllProperties(response.data.allPropertiesWithImages);
            setFeaturedProperties(response.data.featuredPropertiesWithImages);
            setTopPlace(response.data.popularPropertiesWithImages);
            setNewProperties(response.data.newPropertiesWithImages);
            // if (response.data.error) return setError(response.data.error);
        } catch (error) {
            console.log(error);
        } finally {
            setPropertyLoading(false);
        }
    }

    const getPropertyDetails = async (propertyId) => {
        setPropertyLoading(true);

        try {
            const token = await AsyncStorage.getItem('token');
            const response = await axios.get(`${config.backendUrl}/property/all/${propertyId}`, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            });

            if (!response.data.error) return setHouseDetails(response.data);

            setError(response.data.error);
        } catch (error) {
            console.log(error);
        } finally {
            setPropertyLoading(false);
        }
    }

    const getMyProperties = async () => {
        setPropertyLoading(true);

        try {
            const token = await AsyncStorage.getItem('token');
            const response = await axios.get(`${config.backendUrl}/property/my`, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            });

            if (response.data.error) {
                if (response.data.error === 'No properties') return setTotalProperties(response.data.error.totalProperties);

                setError(response.data.error);
            }

            setProperties(response.data.propertiesWithImage);
            setTotalPropertiesAddedPastMonth(response.data.totalPropertiesAddedPastMonth)
            setTotalProperties(response.data.totalProperties);
            // if (response.data.error) return setError(response.data.error);
        } catch (error) {
            console.log(error);
        } finally {
            setPropertyLoading(false);
        }
    }

    const fetchAgentDetails = async (agentId) => {
        try {
            const token = await AsyncStorage.getItem('token');
            const response = await axios.get(`${config.backendUrl}/property/agent/${agentId}`, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            });

            setAgentDetails(response.data.agentWithoutPassword);
        } catch (error) {
            console.log(error);
        }
    }
    
    const values = {
        error,
        uploadProperty,
        getAllProperties,
        getPropertyDetails,
        getMyProperties,
        totalProperties,
        propertyLoading,
        totalPropertiesAddedPastMonth,
        properties,
        houseDetails,
        featuredProperties,
        topPlace,
        newProperties,
        allProperties,
        fetchAgentDetails,
        agentDetails,
    }

    return (
        <PropertyContext.Provider value={values}>
            {children}
        </PropertyContext.Provider>
    );
}

export const useProperty = () => useContext(PropertyContext);