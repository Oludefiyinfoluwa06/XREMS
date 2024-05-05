const connection = require('../config/dbConnect');
const bcrypt = require('bcrypt');

const signup = async (req, res) => {
    try {
        const { email, password } = req.body;

        const emailExists = 'SELECT * FROM users WHERE email = ?';

        connection.query(emailExists, [email], async (err, result) => {
            if (err) throw err;

            if (result.length > 0) {
                return res.status(400).json({ message: 'Email exists already' });
            }

            const salt = await bcrypt.genSalt(10);
            const hash = await bcrypt.hash(password, salt);

            const insertUserQuery = 'INSERT INTO users (email, password) VALUES (?, ?)';
            connection.query(insertUserQuery, [email, hash], (err, result) => {
                if (err) throw err;

                res.status(201).json({ message: 'Signup successful' });
            });
        })
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
}

const signin = async (req, res) => {
    try {
        const { email, password } = req.body;

        const emailExists = 'SELECT * FROM users WHERE email = ?';

        connection.query(emailExists, [email], async (err, result) => {
            if (err) throw err;

            if (result.length === 0) {
                return res.status(400).json({ message: 'User does not exist' });
            }


            const user = result[0];

            const passwordMatch = await bcrypt.compare(password, user.password);

            if (!passwordMatch) {
                return res.status(400).json({ message: 'Incorrect password' });
            }

            res.status(200).json({ message: 'Sign in successful' });
        })
    } catch (error) {
        console.error(err);
        res.status(500).json({ message: 'Server error' });
    }
}

module.exports = {
    signup,
    signin
}