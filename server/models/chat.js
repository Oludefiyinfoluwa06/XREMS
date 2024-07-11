const mongoose = require('mongoose');

const chatSchema = new mongoose.Schema({
    user1: mongoose.Schema.Types.ObjectId,
    user2: mongoose.Schema.Types.ObjectId,
    messages: [
        {
            sender: mongoose.Schema.Types.ObjectId,
            message: String,
            timestamp: Date
        }
    ],
    lastUpdated: Date
});

const Chat = mongoose.model('Chat', chatSchema);

module.exports = Chat;
