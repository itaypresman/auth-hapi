require('dotenv').config();
const env = process.env;


module.exports = {
    port: env.PORT || 3000,
    host: env.HOST || 'localhost',
    mysql: {
        host: env.MYSQL_HOST,
        port: env.MYSQL_PORT || 3306,
        user: env.MYSQL_USER,
        password: env.MYSQL_PASSWORD,
        database: env.MYSQL_DB
    },
    keyCloak: {
        realm: env.KC_REALM,
        url: env.KC_URL,
        resource: env.KC_RESOURCE,
        secret: env.KC_SECRET
    }
};
