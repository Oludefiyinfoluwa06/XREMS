const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const mongoose = require('mongoose');

const authRoute = require('./routes/authRoute');
const propertyRoute = require('./routes/propertyRoute');

const port = process.env.PORT || 5000;
dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

mongoose.connect(process.env.dbURI)
    .then(() => {
        console.log('Connection successful');
        app.listen(port, () => console.log(`Server running on port: http://localhost:${port}!`));
    })
    .catch(err => console.log(err, 'Connection unsuccessful'));

app.get('/', (req, res) => res.send('Hello World!'));

app.use('/auth', authRoute);
app.use('/property', propertyRoute);