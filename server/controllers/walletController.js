const User = require('../models/user');
const Sale = require('../models/sale');
const Property = require('../models/property');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const Flutterwave = require('flutterwave-node-v3');
const jwt = require('jsonwebtoken');
const getDateAMonthAgo = require('../helpers/getDateAMonthAgo');
const getPreviousWeekDates = require('../helpers/getPreviousWeekDates');

const flw = new Flutterwave(process.env.FLUTTERWAVE_PUBLIC_KEY, process.env.FLUTTERWAVE_SECRET_KEY);

const createToken = (id) => {
    const maxAge = 60 * 60 * 24 * 3;

    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: maxAge
    });
}

const walletTopup = async (req, res) => {
    try {
        const { amount, email, name, cardNumber, cvv, expiryMonth, expiryYear } = req.body;

        const details = {
            "card_number": cardNumber,
            "cvv": cvv,
            "expiry_month": expiryMonth,
            "expiry_year": expiryYear,
            "currency": "NGN",
            "amount": amount,
            "fullname": name,
            "email": email,
            "tx_ref": "MC-" + Date.now(),
            "enckey": process.env.FLUTTERWAVE_ENCRYPTION_KEY
        }

        const response = await flw.Charge.card(details);

        if (response.status === "success") {
            const updatedUser = await User.findByIdAndUpdate(req.user.id, { $inc: { balance: parseFloat(amount) } }, { new: true });
            
            if (!updatedUser) return res.json({ error: 'Could not update your wallet' });

            const token = createToken(updatedUser._id);
            
            return res.json({ message: "Wallet top-up successfully", updatedUser, token });
        } else {
            return res.json({ error: 'Wallet top-up failed' });
        }
    } catch (error) {
        console.log(error);
        res.json({ error: 'Wallet top-up failed' });
    }
}

const payment = async (req, res) => {
    const { amount, agentId, propertyId, password } = req.body;
    
    try {
        if (!amount) return res.json({ error: 'Enter a valid amount' });

        const user = await User.findById(req.user.id);

        if (!user) return res.json({ error: 'Cannot find user' });

        const passwordMatch = await bcrypt.compare(password, user.password);

        if (!passwordMatch) return res.json({ error: 'Enter a correct password' });

        if (user.balance < parseFloat(amount)) return res.json({ error: 'Could not make payment due to insufficient balance' });

        const updatedAgent = await User.findByIdAndUpdate(agentId, { $inc: { balance: parseFloat(amount) } }, { new: true });

        const updatedUser = await User.findByIdAndUpdate(req.user.id, { $inc: { balance: -parseFloat(amount) } }, { new: true });

        if (!updatedUser || !updatedAgent) return res.json({ error: "Could not make payment to agent. Try again later" });

        const property = await Property.findByIdAndUpdate(propertyId, { isBought: true }, { new: true });

        if (!property) return res.json({ error: "Could not update property" });

        const sale = Sale.create({ agentId: new mongoose.Types.ObjectId(agentId), amount: amount, saleDate: Date.now() });

        if (!sale) return res.json({ error: "Could not save details of this purchase" });
        
        return res.json({ message: 'Payment successful' });
    } catch (error) {
        console.log(error);
        res.json({ error: 'An error occurred. Try again later' });
    }
}

const walletWithdrawal = async (req, res) => {
    const { amount, bankDetails } = req.body;
    try {
        const user = await User.findById(req.user.id);

        if (!user) return res.json({ error: "User not found" });

        if (!user.isAdmin) return res.json({ error: "You cannot withdraw if you're not an agent" });

        if (parseFloat(amount) > user.balance) return res.json({ error: "Cannot withdraw due to insufficient balance" });

        const response = await flw.Transfer.initiate({
            "account_bank": bankDetails.bankCode,
            "account_number": bankDetails.accountNumber,
            "amount": amount,
            "narration": "Withdrawal",
            "currency": "NGN",
            "reference": "MC-" + Date.now(),
            "debit_currency": "NGN"
        });

        if (response.status === "success") {
            const updatedAgent = await User.findByIdAndUpdate(req.user.id, { $inc: { balance: -parseFloat(amount) } }, { new: true });
            
            if (updatedAgent) return res.json({ message: "Withdrawal successful" });
            
            return res.json({ error: 'Could not withdraw' });
        } else {
            return res.json({ error: 'Withdrawal failed' });
        }
    } catch (error) {
        res.json({ error: "An error occurred, try again" });
    }
}

const getTotalSales = async (req, res) => {
    try {
        const agentId = req.user.id;
        
        const user = await User.findById(agentId);

        if (!user) return res.json({ error: "Could not find agent" });

        if (!user.isAdmin) return res.json({ error: "You must be an agent to get total sales" });

        const dateAMonthAgo = getDateAMonthAgo();
        const { startOfPreviousWeek, endOfPreviousWeek } = getPreviousWeekDates();

        const pastMonthRevenue = await Sale.aggregate([
            { $match: { agentId: new mongoose.Types.ObjectId(agentId), saleDate: { $gte: dateAMonthAgo } } },
            { $group: { _id: null, totalSales: { $sum: '$amount' } } }
        ]);

        const overallSales = await Sale.aggregate([
            { $match: { agentId: new mongoose.Types.ObjectId(agentId) } },
            { $group: { _id: null, totalSales: { $sum: '$amount' } } }
        ]);

        const previousWeekSales = await Sale.aggregate([
            { $match: { agentId: new mongoose.Types.ObjectId(agentId), saleDate: { $gte: startOfPreviousWeek, $lte: endOfPreviousWeek } } },
            { $group: { _id: null, totalSales: { $sum: '$amount' } } }
        ]);

        res.json({
            pastMonthRevenue: pastMonthRevenue.length > 0 ? pastMonthRevenue[0].totalSales : 0,
            overallSales: overallSales.length > 0 ? overallSales[0].totalSales : 0,
            previousWeekSales: previousWeekSales.length > 0 ? previousWeekSales[0].totalSales : 0
        });
    } catch (error) {
        console.log(error);
        res.json({ error: "An error occurred, try again" });
    }
}

module.exports = {
    walletTopup,
    payment,
    walletWithdrawal,
    getTotalSales
}