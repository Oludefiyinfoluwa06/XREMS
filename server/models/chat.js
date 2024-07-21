const mongoose = require('mongoose');

const chatSchema = new mongoose.Schema({
    message: String,
    sender: mongoose.Schema.Types.ObjectId,
    receipient: mongoose.Schema.Types.ObjectId,
    read: Boolean,
}, { timestamps: true });

const Chat = mongoose.model('chats', chatSchema);
module.exports = Chat;