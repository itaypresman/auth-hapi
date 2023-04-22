import { Server } from '@hapi/hapi';
import {port, host } from './config';
import routes from './routes';
import { connect } from './mysql';


const server: Server = new Server({
    port: port,
    host: host
});
server.route(routes);

(async () => {
    await connect();
    await server.start();
    console.log(`Server running at: ${server.info.uri}`);
})();
