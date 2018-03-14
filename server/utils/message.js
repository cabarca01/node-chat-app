const moment = require('moment');

const generateMessage = (from, text) => {
    return {
        from,
        text,
        createdOn: moment().valueOf()
    };
};

const generateLocationMessage = (from, latitude, longitude) => {
    let mapsURL = `https://www.google.com/maps/search/${latitude},${longitude}`;
    return {
        from,
        url: mapsURL,
        createdOn: moment().valueOf()
    }
};

module.exports = {
    generateMessage,
    generateLocationMessage
};