const mysql = require('mysql');
const config = require('./configdb');

const db = mysql.createConnection(config.database);

db.connect((err) => {
    if (err) {
        console.error('Database connection failed: ' + err.stack);
        return;
    }
    console.log('Connected to the database');
});

module.exports = db;