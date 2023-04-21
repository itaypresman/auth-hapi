const Hapi = require('@hapi/hapi');
const Config = require('@auth-hapi/config');
const routes = require('./routes');
const mysql = require('@auth-hapi/mysql');


const server = Hapi.server({
    port: Config.port,
    host: Config.host
});
server.route(routes);

(async () => {
    mysql.connect();
    await server.start();
    console.log(`Server running at: ${server.info.uri}`);
})();
