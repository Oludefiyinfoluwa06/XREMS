import { createContext, useContext, useState } from "react";

import { router } from "expo-router";
import axios from 'axios';
import AsyncStorage from "@react-native-async-storage/async-storage";
import { config } from "../config";

const WalletContext = createContext();

export const WalletProvider = ({ children }) => {
    const [balance, setBalance] = useState(0);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const getToken = async () => {
        const token = await AsyncStorage.getItem('token');
        return token;
    }

    const fundWallet = async (amount, cardDetails) => {
        setLoading(true);

        try {
            const response = await axios.post(`${config.backendUrl}/wallet/topup`, { amount, cardDetails }, {
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

    const pay = async (formData) => {
        setLoading(true);

        try {
            const response = await axios.post(`${config.backendUrl}/wallet/payment`, formData, {
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

    const withdraw = async (amount, bankDetails) => {
        setLoading(true);

        try {
            const response = await axios.post(`${config.backendUrl}/wallet/withdrawal`, { amount, bankDetails }, {
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

    const getTotalSales = async () => {
        setLoading(true);

        try {
            const response = await axios.get(`${config.backendUrl}/wallet/get-sales`, {
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
    
    const values = {
        fundWallet,
        pay,
        withdraw,
        getTotalSales
    }

    return (
        <WalletContext.Provider value={values}>
            {children}
        </WalletContext.Provider>
    );
}

export const useWallet = () => useContext(WalletContext);