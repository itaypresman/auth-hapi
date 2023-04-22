import {config} from 'dotenv';


config();
const env: NodeJS.ProcessEnv = process.env;


export const port: number = +env.PORT || 3000;
export const host = env.HOST || 'localhost';

type MysqlConfig = {
    host: string,
    port: number,
    user: string,
    password: string,
    database: string,
}
export const mysql: MysqlConfig = {
    host: env.MYSQL_HOST,
    port: +env.MYSQL_PORT || 3306,
    user: env.MYSQL_USER,
    password: env.MYSQL_PASSWORD,
    database: env.MYSQL_DB
};

export const keyCloak = {
    realm: env.KC_REALM,
    url: env.KC_URL,
    resource: env.KC_RESOURCE,
    secret: env.KC_SECRET
};
