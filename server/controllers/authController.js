const bcrypt = require('bcrypt');
const validator = require('validator');
const jwt = require('jsonwebtoken');
const User = require('../models/user');

const maxAge = 60 * 60 * 24 * 3;

const createToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: maxAge
    });
}

const signup = async (req, res) => {
    try {
        const { fullname, email, password, isAdmin } = req.body;

        if (fullname === '') {
            return res.json({ error: 'Enter your full name' });
        }

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

        const user = await User.create({ fullname, email, password: hash, isAdmin, profileImg: '', balance: 0 });

        const token = createToken(user._id);

        const { password: _, ...userWithoutPassword } = user.toObject();

        return res.json({ message: 'Registration successful', token, user: userWithoutPassword });

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

        const token = createToken(user._id);

        return res.json({ message: 'Login successful', token, user });

    } catch (error) {
        console.error(error);
        res.json({ error: 'Server error' });
    }
}

module.exports = {
    signup,
    signin
}