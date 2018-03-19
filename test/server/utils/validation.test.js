'use strict';
const {isRealString} = require('./../../../server/utils/validation');

describe('isRealString', () => {
    test('Should return true if the parameter passed is a string', () => {
        let result = isRealString('someString');
        expect(result).toBeTruthy();
    });

    test('Should return false if the parameter passed is not a string', () => {
        let result = isRealString(22);
        expect(result).toBeFalsy();
    });

    test('Should return false if the parameter passed is only spaces', () => {
        let result = isRealString('    ');
        expect(result).toBeFalsy();
    });

    test('Should allow strings with spaces in between', () => {
        let result = isRealString('Some String with Spaces');
        expect(result).toBeTruthy();
    });
});