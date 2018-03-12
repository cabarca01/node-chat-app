'use strict';

const {generateMessage, generateLocationMessage} = require('./../../../server/utils/message');

describe('server/utils', () => {
    describe('message/generateMessage', () => {
        test('Should return a message object', () => {
            let testMsg = {
                from: 'someone',
                text: 'some text'
            };

            let result = generateMessage(testMsg.from, testMsg.text);
            expect(result).toBeInstanceOf(Object);
            expect(result.from).toBe(testMsg.from);
            expect(result.text).toBe(testMsg.text);
            expect(result).toHaveProperty('createdOn');
            expect(typeof result.createdOn).toBe('number');
        });
    });

    describe('message/generateLocationMessage', () => {
        test('Should return a location message', () => {
            let testMsg = {
               from: 'someone',
               longitude: '23',
               latitude: '45'
            };
            let url = `https://www.google.com/maps/search/${testMsg.latitude},${testMsg.longitude}`;
            let result = generateLocationMessage(testMsg.from, testMsg.latitude, testMsg.longitude);
            expect(result).toBeInstanceOf(Object);
            expect(result.from).toBe(testMsg.from);
            expect(result.url).toBe(url);
            expect(result).toHaveProperty('createdOn');
            expect(typeof result.createdOn).toBe('number');
        });
    });
});