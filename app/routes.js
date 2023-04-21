const AppController = require('./app.controller');
const authMiddleware = require('./auth.middleware');


const routes = [
    {
        method: 'POST',
        path: '/login',
        handler: AppController.login,
    }, {
        method: 'GET',
        path: '/user',
        config: {
            handler: AppController.getUser,
            pre: [{
                assign: 'auth',
                method: authMiddleware
            }]
        }
    }
];


module.exports = routes;
