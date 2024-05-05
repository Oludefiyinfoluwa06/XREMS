const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');

const connection = require('./config/dbConnect');
const authRoute = require('./routes/authRoute');

const port = process.env.PORT || 5000;
dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

connection.connect((err) => {
    if (!err) {
        app.listen(port, () => console.log(`Server running on http://localhost:${port}`));
    }

    console.log(err);
});

app.get('/', (req, res) => res.send('Hello World!'));

app.use('/auth', authRoute);