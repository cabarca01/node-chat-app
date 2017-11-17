require('./config/config');

const path = require('path');
const express = require('express');
const socketio = require('socket.io');
const http = require('http');

const publicPath = path.join(__dirname, '../public');

var app = express();
var server = http.createServer(app);

// client-server communications
var io = socketio(server);
io.on('connection', (socket) => {
    console.log ('Incomming conection from browser');
    socket.on('disconnect', () => {
        console.log ('user disconnected');
    });
});

// configure middleware
app.use('/', express.static(publicPath));

// routes


// start server
if(!module.parent) {
    server.listen(process.env.PORT, () => {
        console.log(`Server started at port ${process.env.PORT}`);
    });
}
