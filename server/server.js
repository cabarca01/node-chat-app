require('./config/config');

const path = require('path');
const express = require('express');
const socketio = require('socket.io');
const http = require('http');

const publicPath = path.join(__dirname, '../public');
const {generateMessage, generateLocationMessage} = require('./utils/message');

var app = express();
var server = http.createServer(app);

// client-server communications
var io = socketio(server);
io.on('connection', (socket) => {
    console.log ('Incomming connection from browser');

    socket.emit('newMessage', generateMessage('Admin', 'Welcome to the chat app'));

    socket.broadcast.emit('newMessage', generateMessage('Admin', 'New user joined'));

    socket.on('createMessage', (message) => {
        console.log('createMessage', message);
        io.emit('newMessage', generateMessage(message.from, message.text));
    });

    socket.on('createLocationMessage', (position) => {
       io.emit('newLocationMessage', generateLocationMessage('Admin',position.latitude, position.longitude));
    });

    socket.on('disconnect', () => {
        console.log ('user disconnected');
        socket.broadcast.emit('newMessage', generateMessage('Admin', 'The user has left the chat'));
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
