const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    fullname: String,
    email: String,
    password: String,
    isAdmin: Boolean,
    profileImg: String,
    walletBalance: Number,
});

const User = mongoose.model('users', userSchema);
module.exports = User;