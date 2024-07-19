const Chat = require('../models/chat');
const User = require('../models/user');

const getUsers = async (req, res) => {
    try {
        const loggedInUserId = req.user.id;

        const usersSentTo = await Chat.distinct('receipient', { sender: loggedInUserId });

        const usersReceivedFrom = await Chat.distinct('sender', { receipient: loggedInUserId });

        const uniqueUserIds = [...new Set([...usersSentTo, ...usersReceivedFrom])];

        const users = await User.find({ _id: { $in: uniqueUserIds } }).select('-password -balance');

        res.json({ users });
    } catch (error) {
        res.json({ error: 'An error occurred while fetching users.' });
    }
}

const sendMessage = async (req, res) => {
    try {
        const { message } = req.body;
        const { receipientId } = req.params;
        const senderId = req.user.id;

        if (!message) return res.json({ error: 'Enter a message' });

        const newChat = new Chat({
            message,
            sender: senderId,
            receipient: receipientId
        });

        const chat = await newChat.save();
        
        if (!chat) return res.json({ error: 'Unable to send message' });

        return res.json({ message: 'Chat sent successfully' });
    } catch (error) {
        console.log(error);
        return res.json({ error: 'An error occurred, while sending message' })
    }
}

const getMessages = async (req, res) => {
    try {
        const senderId = req.user.id;
        const { receipientId } = req.params;

        const messages = await Chat.find({
            $or: [
                { sender: senderId, receipient: receipientId },
                { sender: receipientId, receipient: senderId }
            ]
        }).sort({ createdAt: 1 });

        if (!messages) return res.json({ error: 'Start a conversation' });

        res.json({ messages });
    } catch (error) {
        console.log(error);
        return res.json({ error: 'Unable to get messages' });
    }
}

module.exports = {
    getUsers,
    sendMessage,
    getMessages
}