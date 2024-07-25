const { getProfileBucket, getPropertyBucket } = require("../helpers/getBuckets");
const { getPictures } = require("../helpers/getPictures");
const Notification = require("../models/notification");

const getUnreadNotifications = async (req, res) => {
    try {
        const user = req.user.id;

        const unreadNotifications = await Notification.find({ user, read: false });

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

        const unreadNotifications = await Notification.find({ user, read: false });

        if (unreadNotifications.length > 0) {
            await Notification.updateMany(
                { user, read: false },
                { $set: { read: true } }
            );
        }

        const notificationsWithImages = await Promise.all(notifications.map(async (notification) => {
            let img;
            if (notification.type === 'user') {
                img = await getPictures(getProfileBucket(), notification.img);
            } else {
                img = await getPictures(getPropertyBucket(), notification.img);
            }
            return {
                ...notification.toObject(),
                img,
            };
        }));

        return res.json({ notifications: notificationsWithImages });
    } catch (error) {
        console.log(error);
        return res.json({ error: 'An error occurred while getting notifications' });
    }
}

module.exports = {
    getUnreadNotifications,
    getNotifications,
}