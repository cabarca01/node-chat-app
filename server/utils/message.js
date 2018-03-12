const generateMessage = (from, text) => {
    return {
        from,
        text,
        createdOn: new Date().getTime()
    };
};

module.exports = {
    generateMessage
};