var socket = io();

socket.on('connect', function() {
    console.log('Connected to server');
});

socket.on('disconnect', function() {
    console.log('Disconnected from server');
});

socket.on('newMessage', function(data) {
    let li = jQuery('<li></li>');
    let formattedTime = moment(data.createdOn).format('h:mm a');
    li.text(`(${formattedTime}) ${data.from}: ${data.text}`);
    jQuery('#message-list').append(li);
});

socket.on('newLocationMessage', function(data){
    let formattedTime = moment(data.createdOn).format('h:mm a');
    let li = jQuery('<li></li>');
    let a = jQuery('<a>My Current Location</a>');
    //prepare link
    a.attr('target', '_blank');
    a.attr('href', data.url );
    //message text
    li.text(`(${formattedTime}) ${data.from}: `);
    li.append(a);
    jQuery('#message-list').append(li);
});

jQuery('#message-form').on('submit', function(e){
    e.preventDefault();
    let button = jQuery('#send-button');
    let msgTextbox = jQuery('#message');
    button.attr('disabled', 'disabled').text('Sending...');
    socket.emit('createMessage', {
        from: 'User',
        text: msgTextbox.val()
    }, function() {
        msgTextbox.val('');
        button.removeAttr('disabled').text('Send');
    });
});

let locationButton = jQuery('#location-button');
locationButton.on('click', function(){
    if(!navigator.geolocation) {
        return alert('Your browser doesn\'t support geolocation');
    }
    locationButton.attr('disabled', 'disabled').text('Sending Location...');
    navigator.geolocation.getCurrentPosition(function (position){
        locationButton.removeAttr('disabled').text('Send Location');
        socket.emit('createLocationMessage', {
            longitude: position.coords.longitude,
            latitude: position.coords.latitude
        }, function(){
            jQuery('#message').val('');
        });
    }, function () {
        alert('Unable to obtain you current position');
        locationButton.removeAttr('disabled').text('Send Location');
    });
});