require('./config/config');

const path = require('path');
const express = require('express');

const publicPath = path.join(__dirname, '../public');

var app = express();

// configure middleware
app.use('/', express.static(publicPath));

// routes


// start server
if(!module.parent) {
    app.listen(process.env.PORT, () => {
        console.log(`Server started at port ${process.env.PORT}`);
    });
}
