'use strict';

const {generateMessage} = require('./../../../server/utils/message');

describe('server/utils', () => {
    describe('message/generateMessage', () => {
        test('Should return a message json object', () => {
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
});