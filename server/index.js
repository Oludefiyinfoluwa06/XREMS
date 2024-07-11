require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const methodOverride = require('method-override');
const ws = require('ws');
const url = require('url');
const jwt = require('jsonwebtoken');

const authRoute = require('./routes/authRoute');
const propertyRoute = require('./routes/propertyRoute');
const walletRoute = require('./routes/walletRoute');
const User = require('./models/user');

const port = process.env.PORT || 5000;
const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride('_method'));

mongoose.connect(process.env.dbURI)
    .then(() => {
        console.log('DB connected successfully');

        const server = app.listen(port, () => console.log(`Server running on port: http://localhost:${port}!`));
        const wss = new ws.WebSocketServer({ server });

        wss.on('connection', (connection, req) => {
            const query = url.parse(req.url, true).query;
            const token = query.token;
            jwt.verify(token, process.env.JWT_SECRET, async (err, decodedToken) => {
                if (err) {
                    console.log(err.message);
                    return res.json('Please, authenticate');
                } else {
                    console.log(decodedToken);
                    const user = await User.findById(decodedToken.id);

                    if (!user) {
                        return res.json({ error: 'No user' });
                    }

                    console.log(user);
                }
            });
        });
    })
    .catch(err => console.log(err, 'Connection unsuccessful'));

app.get('/', (req, res) => res.send('Hello World!'));

app.use('/auth', authRoute);
app.use('/property', propertyRoute);
app.use('/wallet', walletRoute);