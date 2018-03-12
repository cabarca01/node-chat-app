const generateMessage = (from, text) => {
    return {
        from,
        text,
        createdOn: new Date().getTime()
    };
};

const generateLocationMessage = (from, latitude, longitude) => {
    let mapsURL = `https://www.google.com/maps/search/${latitude},${longitude}`;
    return {
        from,
        url: mapsURL,
        createdOn:new Date().getTime()
    }
};

module.exports = {
    generateMessage,
    generateLocationMessage
};