const bcrypt = require('bcrypt');
const validator = require('validator');
const User = require('../models/user');

const signup = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (email === '') {
            return res.json({ error: 'Enter an email address' });
        }

        if (!validator.isEmail(email)) {
            return res.json({ error: 'Enter a valid email' })
        }

        if (password === '') {
            return res.json({ error: 'Enter a password' });
        }

        if (password.length < 8) {
            return res.json({ error: 'Password length must be more than 8 characters' });
        }

        const emailExists = await User.findOne({ email });

        if (emailExists) return res.json({ error: 'Email exists already' });

        const salt = await bcrypt.genSalt(10);
        const hash = await bcrypt.hash(password, salt);

        const user = await User.create({ email, password: hash });

        return res.json({ message: 'Registration successful', user: user._id });


    } catch (error) {
        console.error(error);
        res.json({ error: 'Server error' });
    }
}

const signin = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (email === '') {
            return res.json({ error: 'Enter an email address' });
        }

        if (password === '') {
            return res.json({ error: 'Enter a password' });
        }

        const user = await User.findOne({ email });

        if (!user) return res.json({ error: 'Email does not exist' });

        const passwordMatch = await bcrypt.compare(password, user.password);

        if (!passwordMatch) return res.json({ error: 'Enter a correct password' });

        return res.json({ message: 'Login successful', user: user._id });

    } catch (error) {
        console.error(err);
        res.json({ error: 'Server error' });
    }
}

module.exports = {
    signup,
    signin
}