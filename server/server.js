const path = require('path');
const express = require('express');

const publicPath = path.join(__dirname, '../public');

var app = express();

// configure middleware
app.use('/', express.static(publicPath));

// routes


// start server
app.listen(3000, () => {
    console.log('Listening on port 3000')
});
