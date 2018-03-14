var socket = io();

socket.on('connect', function() {
    console.log('Connected to server');
});

socket.on('disconnect', function() {
    console.log('Disconnected from server');
});

socket.on('newMessage', function(data) {
    let chatMsg = {
        createdOn: moment(data.createdOn).format('h:mm a'),
        from: data.from,
        message: data.text
    };
    let template = jQuery('#message-template').html();
    let html = Mustache.render(template, chatMsg);
    jQuery('#message-list').append(html);
});

socket.on('newLocationMessage', function(data){
    let chatMsg = {
        createdOn: moment(data.createdOn).format('h:mm a'),
        from: data.from,
        url: data.url
    };
    let template = jQuery('#location-template').html();
    let html = Mustache.render(template, chatMsg);
    jQuery('#message-list').append(html);
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