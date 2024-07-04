import User from '../models/user';
const bcrypt = require('bcrypt');
const Flutterwave = require('flutterwave-node-v3');

const flw = new Flutterwave(process.env.FLUTTERWAVE_SECRET_KEY, process.env.FLUTTERWAVE_PUBLIC_KEY);

const walletTopup = async (req, res) => {
    const { amount, cardDetails } = req.body;

    try {
        const response = await flw.Charge.card({
            "tx_ref": "MC-" + Date.now(),
            "amount": amount,
            "currency": "NGN",
            "payment_type": "card",
            "customer": {
                "email": cardDetails.email,
                "phonenumber": cardDetails.phone,
                "name": cardDetails.name
            },
            "card": {
                "number": cardDetails.number,
                "cvv": cardDetails.cvv,
                "expiry_month": cardDetails.expiryMonth,
                "expiry_year": cardDetails.expiryYear
            }
        });

        if (response.status === "success") {
            const updatedUser = await User.findByIdAndUpdate(req.user.id, { $inc: { walletBalance: parseFloat(amount) } }, { new: true });
            
            if (updatedUser) return res.json({ message: "Wallet top-up successfully" });
            
            return res.json({ error: 'Could not update your wallet' });
        } else {
            return res.json({ error: 'Wallet top-up failed' });
        }
    } catch (error) {
        console.log(error);
        res.json({ error: 'Wallet top-up failed' });
    }
}

const payment = async (req, res) => {
    const { amount, agentId, password } = req.body;
    
    try {
        if (!amount) return res.json({ error: 'Enter a valid amount' });

        const updatedAgent = await User.findByIdAndUpdate(agentId, { $inc: { walletBalance: parseFloat(amount) } }, { new: true });
        
        if (!updatedAgent) return res.json({ error: "Could not make payment to agent. Try again later" });

        const user = await User.findById(req.user.id);

        if (!user) return res.json({ error: 'Cannot find user' });

        const passwordMatch = await bcrypt.compare(password, user.password);

        if (!passwordMatch) return res.json({ error: 'Enter a correct password' });

        if (user.walletBalance < parseFloat(amount)) return res.json({ error: 'Could not make payment due to insufficient balance' });

        const updatedUser = await User.findByIdAndUpdate(req.user.id, { $inc: { walletBalance: -parseFloat(amount) } }, { new: true });

        if (!updatedUser) return res.json({ error: "Could not make payment to agent. Try again later" });
        
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

        if (parseFloat(amount) > user.walletBalance) return res.json({ error: "Cannot withdraw due to insufficient balance" });

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
            const updatedAgent = await User.findByIdAndUpdate(req.user.id, { $inc: { walletBalance: -parseFloat(amount) } }, { new: true });
            
            if (updatedAgent) return res.json({ message: "Withdrawal successful" });
            
            return res.json({ error: 'Could not withdraw' });
        } else {
            return res.json({ error: 'Withdrawal failed' });
        }
    } catch (error) {
        res.json({ error: "An error occurred, try again" });
    }
}

module.exports = {
    walletTopup,
    payment,
    walletWithdrawal,
}