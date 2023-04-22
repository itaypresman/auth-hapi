import * as mysql from 'mysql2';
import * as Config from './config';


let connection = null;

export const connect = async (): Promise<void> => {
    connection = await mysql.createConnection(Config.mysql).promise();
};

export const disconnect = (): void => {
    if (!connection) {
        return;
    }

    connection = null;
};

export const con = () => connection;
