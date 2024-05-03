const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');

const port = process.env.PORT || 5000;
dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => res.send('Hello World!'));
app.listen(port, () => console.log(`Server running on http://localhost:${port}`));