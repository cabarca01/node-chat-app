var socket = io();
socket.on('connect', function() {
    console.log('Conected to server');

    // socket.emit('createMessage', {
    //     from: 'mike',
    //     text: 'First message'
    // });
});

socket.on('disconnect', function() {
    console.log('Disconnected from server');
});

socket.on('newMessage', function(data) {
    console.log('new Message:', data);
});
