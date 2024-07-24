require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const methodOverride = require('method-override');

const authRoute = require('./routes/authRoute');
const propertyRoute = require('./routes/propertyRoute');
const walletRoute = require('./routes/walletRoute');
const reviewRoute = require('./routes/reviewRoute');
const chatRoute = require('./routes/chatRoute');
const transactionRoute = require('./routes/transactionRoute');
const notificationRoute = require('./routes/notificationRoute');

const port = process.env.PORT || 5000;
const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride('_method'));

mongoose.connect(process.env.dbURI)
    .then(() => {
        console.log('DB connected successfully');

        app.listen(port, () => console.log(`Server running on port: http://localhost:${port}!`));
    })
    .catch(err => console.log(err, 'Connection unsuccessful'));

app.get('/', (req, res) => res.send('Hello World!'));

app.use((err, req, res, next) => {
    if (err.code === 'LIMIT_FILE_SIZE') {
        return res.json({ error: 'File size is too large. Max limit is 5MB.' });
    }
    next(err);
});

app.use('/auth', authRoute);
app.use('/property', propertyRoute);
app.use('/wallet', walletRoute);
app.use('/review', reviewRoute);
app.use('/chat', chatRoute);
app.use('/transaction', transactionRoute);
app.use('/notification', notificationRoute);