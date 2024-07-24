const Notification = require("../models/notification");

const getUnreadNotifications = async (req, res) => {
    try {
        const user = req.user.id;

        const unreadNotifications = Notification.find({ user, read: false });

        if (!unreadNotifications) return res.json({ error: 'Could not get unread notifications' });

        return res.json({ unreadNotifications: unreadNotifications.length });
    } catch (error) {
        console.log(error);
        return res.json({ error: 'An error occurred while getting unread notifications' });
    }
}

const getNotifications = async (req, res) => {
    try {
        const user = req.user.id;

        const notifications = await Notification.find({ user }).sort({ createdAt: -1 });

        if (!notifications) return res.json({ error: 'Could not get notifications' });

        return res.json({ notifications });
    } catch (error) {
        console.log(error);
        return res.json({ error: 'An error occurred while getting notifications' });
    }
}

module.exports = {
    getUnreadNotifications,
    getNotifications,
}