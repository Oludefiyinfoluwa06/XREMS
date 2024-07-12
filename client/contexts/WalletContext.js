import { createContext, useContext, useState } from "react";

import { router } from "expo-router";
import axios from 'axios';
import AsyncStorage from "@react-native-async-storage/async-storage";
import { config } from "../config";

const WalletContext = createContext();

export const WalletProvider = ({ children }) => {
    const [balance, setBalance] = useState(0);
    const [error, setError] = useState('');
    const [walletLoading, setWalletLoading] = useState(false);
    const [overallSales, setOverallSales] = useState(0);
    const [pastMonthRevenue, setPastMonthRevenue] = useState(0);
    const [pastWeekSales, setPastWeekSales] = useState(0);

    const fundWallet = async (amount, cardDetails) => {
        setWalletLoading(true);

        try {
            const token = await AsyncStorage.getItem('token');
            const response = await axios.post(`${config.backendUrl}/wallet/topup`, { amount, cardDetails }, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            });

            console.log(response);
            // if (response.data.error) return setError(response.data.error);

            // router.push('/admin/dashboard');
        } catch (error) {
            console.log(error);
        } finally {
            setWalletLoading(false);
        }
    }

    const pay = async (formData) => {
        setWalletLoading(true);

        try {
            const token = await AsyncStorage.getItem('token');
            const response = await axios.post(`${config.backendUrl}/wallet/payment`, formData, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            });

            console.log(response);
            // if (response.data.error) return setError(response.data.error);

            // router.push('/admin/dashboard');
        } catch (error) {
            console.log(error);
        } finally {
            setWalletLoading(false);
        }
    }

    const withdraw = async (amount, bankDetails) => {
        setWalletLoading(true);

        try {
            const token = await AsyncStorage.getItem('token');
            const response = await axios.post(`${config.backendUrl}/wallet/withdrawal`, { amount, bankDetails }, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            });

            console.log(response);
            // if (response.data.error) return setError(response.data.error);

            // router.push('/admin/dashboard');
        } catch (error) {
            console.log(error);
        } finally {
            setWalletLoading(false);
        }
    }

    const getTotalSales = async () => {
        setWalletLoading(true);

        try {
            const token = await AsyncStorage.getItem('token');
            const response = await axios.get(`${config.backendUrl}/wallet/get-sales`, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            });

            if (response.data.error) return setError(response.data.error);

            setOverallSales(response.data.overallSales);
            setPastMonthRevenue(response.data.pastMonthRevenue);
            setPastWeekSales(response.data.previousWeekSales);
        } catch (error) {
            console.log(error);
        } finally {
            setWalletLoading(false);
        }
    }
    
    const values = {
        fundWallet,
        pay,
        withdraw,
        getTotalSales,
        overallSales,
        pastMonthRevenue,
        pastWeekSales,
        walletLoading,
    }

    return (
        <WalletContext.Provider value={values}>
            {children}
        </WalletContext.Provider>
    );
}

export const useWallet = () => useContext(WalletContext);