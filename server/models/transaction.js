const mongoose = require('mongoose');

const transactionSchema = new mongoose.Schema({
    user: mongoose.Schema.Types.ObjectId,
    type: String,
    amount: Number,
    remark: String,
    date: Date,
});

const Transaction = mongoose.model('transactions', transactionSchema);
module.exports = Transaction;