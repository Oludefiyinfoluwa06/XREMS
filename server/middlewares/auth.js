const jwt = require('jsonwebtoken');
const User = require('../models/user');

const authenticate = async (req, res, next) => {
    const token = req.header('Authorization').replace('Bearer ', '');

    if (token) {
        jwt.verify(token, process.env.JWT_SECRET, async (err, decodedToken) => {
            if (err) { 
                console.log(err.message);
                return res.json('Please, authenticate');
            } else {
                const user = await User.findById(decodedToken.id);

                if (!user) {
                    return res.json({ error: 'No user' });
                }

                req.token = token;
                req.user = user;
                next();
            }
        })
    } else {
        return res.json('Please, authenticate');
    }

}

module.exports = { authenticate }