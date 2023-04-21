const AppController = require('./app.controller');
const authMiddleware = require('./auth.middleware');


const appController = new AppController();

export default [
    {
        method: 'POST',
        path: '/login',
        handler: appController.login,
    }, {
        method: 'GET',
        path: '/user',
        config: {
            handler: appController.getUser,
            pre: [{
                assign: 'auth',
                method: authMiddleware
            }]
        }
    }
];
