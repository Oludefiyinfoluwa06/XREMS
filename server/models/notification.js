const mongoose = require('mongoose');

const notificationSchema = new mongoose.Schema({
    img: String,
    user: mongoose.Schema.Types.ObjectId,
    title: String,
    content: String,
    link: String,
    read: Boolean,
}, { timestamps: true });

const Notification = mongoose.model('notifications', notificationSchema);
module.exports = Notification;