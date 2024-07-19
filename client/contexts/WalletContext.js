import { createContext, useContext, useState } from "react";

import { router } from "expo-router";
import axios from 'axios';
import AsyncStorage from "@react-native-async-storage/async-storage";
import { config } from "../config";

const WalletContext = createContext();

export const WalletProvider = ({ children }) => {
    const [balance, setBalance] = useState(0);
    const [walletError, setWalletError] = useState('');
    const [walletLoading, setWalletLoading] = useState(false);
    const [overallSales, setOverallSales] = useState(0);
    const [pastMonthRevenue, setPastMonthRevenue] = useState(0);
    const [pastWeekSales, setPastWeekSales] = useState(0);

    const fundWallet = async (amount, email, name, cardNumber, cvv, expiryMonth, expiryYear) => {
        setWalletLoading(true);

        try {
            const token = await AsyncStorage.getItem('token');
            const response = await axios.post(`${config.backendUrl}/wallet/topup`, { amount, email, name, cardNumber, cvv, expiryMonth, expiryYear }, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            });

            if (response.data.error) {
                return setWalletError(response.data.error);
            } else {
                await AsyncStorage.setItem('token', response.data.token);
                const user = response.data.updatedUser;
                const userData = {
                    "_id": user._id,
                    "fullname": user.fullname,
                    "email": user.email,
                    "isAdmin": user.isAdmin,
                    "balance":  user.balance
                }

                await AsyncStorage.setItem('user', JSON.stringify(userData));
                await AsyncStorage.setItem('profile', response.data.updatedUser.profileImg);
                
                setBalance(response.data.updatedUser.balance);
            }
        } catch (error) {
            console.log(error);
        } finally {
            setWalletLoading(false);
        }
    }

    const pay = async (amount, agentId, password) => {
        setWalletLoading(true);

        try {
            const token = await AsyncStorage.getItem('token');
            const response = await axios.post(`${config.backendUrl}/wallet/payment`, { amount, agentId, password }, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            });

            console.log(response.data);
            if (response.data.error) return setWalletError(response.data.error);
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
            // if (response.data.error) return setWalletError(response.data.error);

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

            if (response.data.error) return setWalletError(response.data.error);

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
        balance,
        walletError,
        setWalletError,
    }

    return (
        <WalletContext.Provider value={values}>
            {children}
        </WalletContext.Provider>
    );
}

export const useWallet = () => useContext(WalletContext);