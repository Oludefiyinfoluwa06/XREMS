const mysql = require('mysql');

const connection = mysql.createConnection({
    host: 'localhost',
    port: 3306,
    database: 'xrems',
    user: 'root',
    password: ''
});

module.exports = connection;