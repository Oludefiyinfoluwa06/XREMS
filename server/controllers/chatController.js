const Chat = require('../models/chat');
const Notification = require('../models/notification');
const User = require('../models/user');

const getUsers = async (req, res) => {
    try {
        const loggedInUserId = req.user.id;

        const usersSentTo = await Chat.distinct('receipient', { sender: loggedInUserId });
        const usersReceivedFrom = await Chat.distinct('sender', { receipient: loggedInUserId });
        const uniqueUserIds = [...new Set([...usersSentTo, ...usersReceivedFrom])];

        const users = await User.find({ _id: { $in: uniqueUserIds } }).select('-password -balance');

        const usersWithUnreadCount = await Promise.all(users.map(async (user) => {
            const unreadCount = await Chat.countDocuments({ sender: user._id, receipient: loggedInUserId, read: false });
            return { ...user.toObject(), unreadCount };
        }));

        res.json({ users: usersWithUnreadCount });
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
            receipient: receipientId,
            read: false
        });

        const chat = await newChat.save();
        
        if (!chat) return res.json({ error: 'Unable to send message' });

        const sender = await User.findById(req.user.id);

        const receipient = await User.findById(receipientId);

        const newNotification = new Notification({
            img: sender.profileImg,
            user: receipient._id,
            title: 'New message',
            content: `${sender.fullname} sent you a message`,
            link: receipient.isAdmin ? `/admin/messages/${sender._id}` : `/messages/${sender._id}` ,
            read: false
        });

        await newNotification.save();

        return res.json({ message: 'Chat sent successfully' });
    } catch (error) {
        console.log(error);
        return res.json({ error: 'An error occurred while sending message' });
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

        const unreadMessages = await Chat.find({
            sender: receipientId,
            receipient: senderId,
            read: false
        });

        if (unreadMessages?.length > 0) {
            await Chat.updateMany(
                { sender: receipientId, receipient: senderId, read: false },
                { $set: { read: true } }
            );
        }

        res.json({ messages });
    } catch (error) {
        console.log(error);
        return res.json({ error: 'Unable to get messages' });
    }
}

const markMessagesAsRead = async (req, res) => {
    try {
        const { senderId } = req.params;
        const recipientId = req.user.id;

        await Chat.updateMany({ sender: senderId, receipient: recipientId, read: false }, { read: true });

        res.json({ message: 'Messages marked as read' });
    } catch (error) {
        res.json({ error: 'An error occurred while marking messages as read.' });
    }
};

module.exports = {
    getUsers,
    sendMessage,
    getMessages,
    markMessagesAsRead
}