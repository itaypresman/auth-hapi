const jwt = require('jsonwebtoken');
const AppService = require('./app.service');

const login = async (req, h) => {
    const {email, password} = req.payload;

    try {
        const accessToken = await AppService.login(email, password);
        return {accessToken};
    } catch (error) {
        return h.response(error.message).code(401);
    }
};

const getUser = async (req, h) => {
    try {
        const token = req.headers.authorization.split(' ')[1];
        const user = await AppService.getUserInfo(token);

        if (!user) {
            return h.response('User not found').code(404);
        }

        return user;
    } catch (e) {
        return h.response('internal server error').code(500);

    }
};


module.exports = {
    login,
    getUser,
};
