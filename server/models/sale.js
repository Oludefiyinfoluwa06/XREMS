const mongoose = require('mongoose');

const saleSchema = new mongoose.Schema({
    agentId: mongoose.Schema.Types.ObjectId,
    amount: Number,
    saleDate: Date
});

const Sale = mongoose.model('sales', saleSchema);
module.exports = Sale;