const Transaction = require("../models/transaction");

const getTransactionHistory = async (req, res) => {
    const user = req.user.id;

    const transactionHistory = await Transaction.find({ user }).sort({ date: -1 }).limit(5);

    if (!transactionHistory) return res.json({ error: 'Transaction history not found' });

    return res.json({ transactionHistory });
}

module.exports = {
    getTransactionHistory,
}