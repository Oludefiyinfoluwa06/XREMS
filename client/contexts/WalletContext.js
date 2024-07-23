import { createContext, useContext, useState } from "react";

import { router } from "expo-router";
import axios from 'axios';
import AsyncStorage from "@react-native-async-storage/async-storage";
import { config } from "../config";

const WalletContext = createContext();

export const WalletProvider = ({ children }) => {
    const [walletError, setWalletError] = useState('');
    const [walletLoading, setWalletLoading] = useState(false);
    const [overallSales, setOverallSales] = useState(0);
    const [pastMonthRevenue, setPastMonthRevenue] = useState(0);
    const [pastWeekSales, setPastWeekSales] = useState(0);
    const [transactionHistory, setTransactionHistory] = useState([]);
    const [modalVisible, setModalVisible] = useState(false);
    const [successModalVisible, setSuccessModalVisible] = useState(false);
    const [message, setMessage] = useState('');

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

            if (response.data.error) return setWalletError(response.data.error);

            setModalVisible(false);

            setMessage(response.data.message);
            setSuccessModalVisible(true);

            setTimeout(() => {
                setSuccessModalVisible(false);
            }, 3000);
        } catch (error) {
            console.log(error);
        } finally {
            setWalletLoading(false);
        }
    }

    const pay = async (amount, agentId, propertyId, password) => {
        setWalletLoading(true);

        try {
            const token = await AsyncStorage.getItem('token');
            const response = await axios.post(`${config.backendUrl}/wallet/payment/${propertyId}`, { amount, agentId, password }, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            });

            if (response.data.error) return setWalletError(response.data.error);

            setMessage(response.data.message);
            setModalVisible(false);
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

    const getTransactionHistory = async () => {
        try {
            const token = await AsyncStorage.getItem('token');
            const response = await axios.get(`${config.backendUrl}/transaction/all`, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            });

            if (!response.data.error) return setTransactionHistory(response.data.transactionHistory);
        } catch (error) {
            console.log(error);
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
        walletError,
        setWalletError,
        getTransactionHistory,
        transactionHistory,
        modalVisible,
        setModalVisible,
        successModalVisible,
        message,
    }

    return (
        <WalletContext.Provider value={values}>
            {children}
        </WalletContext.Provider>
    );
}

export const useWallet = () => useContext(WalletContext);