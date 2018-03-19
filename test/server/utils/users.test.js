'use strict';

const Users = require('./../../../server/utils/users');
const _ = require('lodash');

describe('Users', () => {
    let users;

    beforeEach(() => {
        users = new Users();
        users.users = [{
            id: 1,
            name: 'user1',
            room: 'room1'
        },
        {
            id: 2,
            name: 'user2',
            room: 'room1'
        },
        {
            id: 3,
            name: 'user3',
            room: 'room2'
        }];
    });

    test('should create a new user when the user id does not exist', () => {
        let newUser = {
            id: 4,
            name: 'newUser',
            room: 'room2'
        };
        users.addUser(newUser.id, newUser.name, newUser.room);
        let result = _.find(users.users, {id: newUser.id});
        expect(result).toEqual(newUser);
    });

    test('should not duplicate users', () => {
        let newUser = {
            id: 1,
            name: 'newUser',
            room: 'room1'
        };
        users.addUser(newUser.id, newUser.name, newUser.room);
        expect(users.users.length).toBe(3);
    });

    test('should remove a user if it exists', () => {
        users.removeUser(1);
        let result = _.find(users.users, {id: 1});
        expect(users.users.length).toBe(2);
        expect(result).toBeFalsy();
    });

    test('should not remove a user that does not exist', () => {
        users.removeUser(4);
        expect(users.users.length).toBe(3);
    });

    test('should find an existing user', () => {
        let user = users.getUser(1);
        let result = {
            id: 1,
            name: 'user1',
            room: 'room1'
        };
        expect(user).toEqual(result);
    });

    test('should not find a non existent user', () => {
        let user = users.getUser(4);
        expect(user).toBeFalsy();
    });

    test('should return the list of users in room1', () => {
        let userList = users.getUserList('room1');
        let expectedList = ['user1', 'user2'];

        expect(userList.length).toBe(2);
        expect(userList).toEqual(expectedList);
    });

    test('should return the list of users in room2', () => {
        let userList = users.getUserList('room2');
        let expectedList = ['user3'];

        expect(userList.length).toBe(1);
        expect(userList).toEqual(expectedList);
    });
});