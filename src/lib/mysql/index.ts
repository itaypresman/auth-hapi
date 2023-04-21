import * as mysql from 'mysql2';
import * as Config from '@auth-hapi/config';


let connection = null;

export const connect = (): void => {
    connection = mysql.createConnection(Config.mysql);
};

export const disconnect = (): void => {
    if (!connection) {
        return;
    }

    connection = null;
};

export const con = () => connection;
