const connection = require('../config/dbConnect');
const bcrypt = require('bcrypt');
const validator = require('validator');

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

        const emailExists = 'SELECT * FROM users WHERE email = ?';

        connection.query(emailExists, [email], async (err, result) => {
            if (err) throw err;

            if (result.length > 0) {
                return res.json({ error: 'Email exists already' });
            }

            const salt = await bcrypt.genSalt(10);
            const hash = await bcrypt.hash(password, salt);

            const insertUserQuery = 'INSERT INTO users (email, password) VALUES (?, ?)';
            connection.query(insertUserQuery, [email, hash], (err, result) => {
                if (err) throw err;

                res.json({ message: 'Signup successful' });
            });
        })
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

        const emailExists = 'SELECT * FROM users WHERE email = ?';

        connection.query(emailExists, [email], async (err, result) => {
            if (err) throw err;

            if (result.length === 0) {
                return res.json({ error: 'User does not exist' });
            }

            const user = result[0];

            const passwordMatch = await bcrypt.compare(password, user.password);

            if (!passwordMatch) {
                return res.json({ error: 'Incorrect password' });
            }

            res.json({ message: 'Sign in successful' });
        })
    } catch (error) {
        console.error(err);
        res.json({ error: 'Server error' });
    }
}

module.exports = {
    signup,
    signin
}