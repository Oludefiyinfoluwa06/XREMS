const bcrypt = require('bcrypt');
const validator = require('validator');
const jwt = require('jsonwebtoken');
const { getPictures } = require('../helpers/getPictures');
const { getProfileBucket } = require('../helpers/getBuckets');
const User = require('../models/user');

const createToken = (id) => {
    const maxAge = 60 * 60 * 24 * 3;

    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: maxAge
    });
}

const signup = async (req, res) => {
    try {
        const { fullname, email, password, isAdmin } = req.body;

        if (!fullname) return res.json({ error: 'Enter your full name' });

        if (!email) return res.json({ error: 'Enter an email address' });

        if (!validator.isEmail(email)) return res.json({ error: 'Enter a valid email' });

        if (!password) return res.json({ error: 'Enter a password' });

        if (password.length < 8) return res.json({ error: 'Password length must be more than 8 characters' });

        const emailExists = await User.findOne({ email });

        if (emailExists) return res.json({ error: 'Email exists already' });

        const salt = await bcrypt.genSalt(10);
        const hash = await bcrypt.hash(password, salt);

        const user = await User.create({ fullname, email, password: hash, isAdmin, profileImg: '', balance: 0 });

        const token = createToken(user._id);

        return res.json({ message: 'Registration successful', token, isAdmin: user.isAdmin });

    } catch (error) {
        console.error(error);
        res.json({ error: 'Server error' });
    }
}

const signin = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email) return res.json({ error: 'Enter an email address' });

        if (!password) return res.json({ error: 'Enter a password' });

        const user = await User.findOne({ email });

        if (!user) return res.json({ error: 'Email does not exist' });

        const passwordMatch = await bcrypt.compare(password, user.password);

        if (!passwordMatch) return res.json({ error: 'Enter a correct password' });

        const token = createToken(user._id);

        return res.json({ message: 'Login successful', token, isAdmin: user.isAdmin });

    } catch (error) {
        console.error(error);
        return res.json({ error: 'Server error' });
    }
}

const updateProfile = async (req, res) => {
    try {
        const { fullname, email, isAdmin } = req.body;

        const userId = req.user.id;
        
        if (!fullname) return res.json({ error: 'Enter your full name' });

        if (!email) return res.json({ error: 'Enter an email address' });

        if (!validator.isEmail(email)) return res.json({ error: 'Enter a valid email' });

        if (!req.file) return res.json({ error: 'Profile picture upload unsuccessful' });

        const emailExists = await User.findOne({ email });

        if (emailExists.email !== email) return res.json({ error: 'Email exists already' });

        const user = await User.findByIdAndUpdate(userId, { fullname, email, profileImg: req.file.id, isAdmin }, { new: true });

        if (!user) return res.json({ error: 'Could not update user' });

        return res.json({ message: 'Profile updated successfully', token, isAdmin: user.isAdmin });
    } catch (error) {
        console.log(error);
        return res.json({ error: "An error occurred, try again" });
    }
}

const receiveOtp = async () => {
    try {
        const { email } = req.body;
    
        if (!email) return res.json({ error: 'Enter your email' });

        if (!validator.isEmail(email)) return res.json({ error: 'Enter a valid email' });
    
        const user = await User.findOne({ email });
    
        if (!user) return res.json({ error: 'Email does not exist' });

        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASSWORD
            }
        });

        const otp = Math.floor(Math.random() * 900000);

        const mailOptions = {
            from: process.env.EMAIL_USER,
            to: email,
            subject: 'Your OTP for email verification',
            text: `Your OTP is ${otp}`
        }

        await transporter.sendMail(mailOptions, (err, info) => {
            if (err) {
                return res.json({ error: 'An error occured' });
            }

            return res.json({ message: 'OTP sent succesfully', otp });
        });
    } catch (error) {
        console.log(error);
        return res.json({ error: error.message });
    }
}

const resetPassword = async () => {
    const { email, password } = req.body;

    if (!email) return res.json({ error: 'Enter an email' });

    if (!password) return res.json({ error: 'Enter a password' });

    if (password.length < 8) return res.json({ error: 'Password must be 8 characters or more' });

    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);

    await User.findOneAndUpdate({ email }, { password: hash }, { new: true });

    return res.json({ message: 'Password updated successfully' });
}

const getUser = async (req, res) => {
    const userId = req.user.id;

    const user = await User.findById(userId);

    if (!user) return res.json({ error: 'User not found' });

    const img = await getPictures(getProfileBucket(), user.profileImg);
    
    return res.json({ user:  { ...user.toObject(), profileImg: img } });
}

module.exports = {
    signup,
    signin,
    updateProfile,
    receiveOtp,
    resetPassword,
    getUser,
}