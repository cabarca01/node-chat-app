var socket = io();

socket.on('connect', function() {
    console.log('Connected to server');
});

socket.on('disconnect', function() {
    console.log('Disconnected from server');
});

socket.on('newMessage', function(data) {
    let li = jQuery('<li></li>');
    li.text(`${data.from}: ${data.text}`);
    jQuery('#message-list').append(li);
});

socket.on('newLocationMessage', function(data){
    let li = jQuery('<li></li>');
    let a = jQuery('<a>My Current Location</a>');
    //prepare link
    a.attr('target', '_blank');
    a.attr('href', data.url );
    //message text
    li.text(`${data.from}: `);
    li.append(a);
    jQuery('#message-list').append(li);
});

jQuery('#message-form').on('submit', function(e){
    e.preventDefault();
    socket.emit('createMessage', {
        from: 'User',
        text: jQuery('#message').val()
    });
});

let locationButton = jQuery('#location-button');
locationButton.on('click', function(){
    if(!navigator.geolocation) {
        return alert('Your browser doesn\'t support geolocation');
    }
    navigator.geolocation.getCurrentPosition(function (position){
        socket.emit('createLocationMessage', {
            longitude: position.coords.longitude,
            latitude: position.coords.latitude
        });
    }, function () {
        return alert('Unable to obtain you current position')
    });
});