const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const mysql = require('mysql');

const port = process.env.PORT || 5000;
dotenv.config();
const app = express();

const connection = mysql.createConnection({
    host: process.env.HOST,
    port: process.env.PORT,
    database: process.env.DATABASE,
    user: process.env.USER,
    password: process.env.PASSWORD
})

connection.connect((err) => {
   if(err){
    console.log("error occurred while connecting");
   }
   else{
    console.log("connection created with Mysql successfully");
   }
});

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => res.send('Hello World!'));
app.listen(port, () => console.log(`Server running on http://localhost:${port}`));