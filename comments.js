// Create web server
const express = require('express');
const app = express();

// Create server
const http = require('http');
const server = http.createServer(app);

// Create socket
const socketio = require('socket.io');
const io = socketio(server);

// Create file system
const fs = require('fs');

// Create database
const mysql = require('mysql');
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'password',
    database: 'comments'
});

// Connect to database
db.connect((err) => {
    if (err) {
        throw err;
    }
    console.log('Connected to database');
});

// Create table
app.get('/createtable', (req, res) => {
    let sql = 'CREATE TABLE comments(id int AUTO_INCREMENT, name VARCHAR(255), comment VARCHAR(255), PRIMARY KEY(id))';
    db.query(sql, (err, result) => {
        if (err) {
            throw err;
        }
        console.log(result);
        res.send('Table created');
    });
});

// Insert comment
app.get('/insert', (req, res) => {
    let comment = { name: 'Jane Doe', comment: 'This is a comment' };
    let sql = 'INSERT INTO comments SET ?';
    let query = db.query(sql, comment, (err, result) => {
        if (err) {
            throw err;
        }
        console.log(result);
        res.send('Comment added');
    });
});

// Select comments
app.get('/getcomments', (req, res) => {
    let sql = 'SELECT * FROM comments';
    let query = db.query(sql, (err, results) => {
        if (err) {
            throw err;
        }
        console.log(results);
        res.send('Comments fetched');
    });
});

// Delete comment
app.get('/deletecomment/:id', (req, res) => {
    let sql = `DELETE FROM comments WHERE id = ${req.params.id}`;
    let query = db.query(sql, (err, result) => {
        if (err) {
            throw err;
        }
        console.log(result);
        res.send('Comment deleted');
    });
});

// Update comment
app.get('/updatecomment/:id', (req, res) => {
    let newComment = 'Updated comment';
    let sql = `UPDATE comments SET comment = '${newComment}' WHERE id = ${req.params.id}`;
    let query = db.query(sql, (err, result) => {
        if (err) {
            throw err;
        }
        console.log(result);
        res.send('Comment updated');
    });
}
);  
