const mysql = require('mysql2');
const Config = require('../config');

let pool = null;

const connect = () => {
    pool = mysql.createConnection(Config.mysql).promise();
};

const disconnect = () => {
    if (!pool) {
        return;
    }

    pool = null;
};

module.exports = {
    pool: () => {
        return pool
    },
    connect,
    disconnect,
};
