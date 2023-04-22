import AppController from './app.controller';
import authMiddleware from './auth.middleware';


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
