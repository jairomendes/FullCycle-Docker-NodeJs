'use strict';

const express = require('express');
const mysql = require('mysql2');

const PORT = 8090;
const HOST = '0.0.0.0';

const con = mysql.createConnection({
    host: 'db',
    user: 'fullcycle',
    password: 'fullcycle',
    database: 'fullcycle'
});

const connectWithRetry = () => {
    return con.connect(function (err) {
        if (err) {
            console.error(err);
            setTimeout(connectWithRetry, 5000);
        }
    });
}

connectWithRetry();
con.query("INSERT INTO people (name) VALUES ('Jairo Mendes')", function (err, result) {
    if (err) throw err;
});

const app = express();

app.get('/', (req, res) => {
    connectWithRetry();
    con.query({ sql: "SELECT name FROM people", rowsAsArray: true }, function (err, result, fields) {
        if (err) throw err;
        res.send('<h1>Full Cycle Rocks!</h1><br><br>' + result.map((item) => item[0]).join('<br>'));
    });
});

app.listen(PORT, HOST);