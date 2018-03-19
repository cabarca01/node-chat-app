require('./config/config');

const path = require('path');
const express = require('express');
const socketio = require('socket.io');
const http = require('http');

const {isRealString} = require('./utils/validation');

const publicPath = path.join(__dirname, '../public');
const {generateMessage, generateLocationMessage} = require('./utils/message');
const Users = require('./utils/users');

var app = express();
var server = http.createServer(app);
var users = new Users();

// client-server communications
var io = socketio(server);
io.on('connection', (socket) => {
    console.log ('Incoming connection from browser');

    socket.on('join', (params, callback) => {
        if(!isRealString(params.name) || !isRealString(params.room)) {
            return callback('Please specify a display name and a chat room');
        }
        socket.join(params.room);
        users.removeUser(socket.id);
        users.addUser(socket.id, params.name, params.room);

        io.to(params.room).emit('updateUserList', users.getUserList(params.room));

        socket.emit('newMessage', generateMessage('Admin', 'Welcome to the chat app'));
        socket.broadcast.to(params.room).emit('newMessage', generateMessage('Admin', `${params.name} just joined ${params.room}.`));
        callback();
    });

    socket.on('createMessage', (message, callback) => {
        let user = users.getUser(socket.id);
        if (user && isRealString(message.text)) {
            io.to(user.room).emit('newMessage', generateMessage(user.name, message.text));
        }
        callback();
    });

    socket.on('createLocationMessage', (position, callback) => {
        let user = users.getUser(socket.id);
        if(user) {
            io.to(user.room).emit('newLocationMessage', generateLocationMessage(user.name, position.latitude, position.longitude));
        }
        callback();
    });

    socket.on('disconnect', () => {
        console.log ('user disconnected');
        let user = users.getUser(socket.id);
        users.removeUser(socket.id);
        io.to(user.room).emit('newMessage', generateMessage('Admin', `${user.name} has left ${user.room}.` ));
        io.to(user.room).emit('updateUserList', users.getUserList(user.room));
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
