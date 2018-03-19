'use strict';
const _ = require('lodash');

class Users {
    constructor () {
        this.users = [];
    }

    addUser (id, name, room) {
        if(!_.find(this.users, {id})) {
            this.users.push({
                id,
                name,
                room
            });
        }
    }

    removeUser (id) {
        _.remove(this.users, (user) => user.id === id );
    }

    getUser(id) {
        return _.find(this.users, {id});
    }

    getUserList(room) {
        let userList = _.filter(this.users, {room});
        return _.map(userList, (user) => user.name);
    }
}

module.exports = Users;