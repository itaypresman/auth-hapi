const axios = require("axios");
const jwt = require("jsonwebtoken");
const Config = require('@auth-hapi/config');
const mysql = require('@auth-hapi/mysql');


const login = async (email, password) => {
    const url = `${Config.keyCloak.url}/realms/${Config.keyCloak.realm}/protocol/openid-connect/token`;
    const data = `client_id=${Config.keyCloak.resource}&grant_type=password&username=${email}&password=${password}`;
    const config = {
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Authorization': `Basic ${Buffer.from(`${Config.keyCloak.resource}:${Config.keyCloak.secret}`).toString('base64')}`
        }
    };
    const response = await axios.post(url, data, config);
    return response.data.access_token;
}

const getUserInfo = async token => {
    const decoded = jwt.decode(token);
    const userId = decoded.sub;

    return await getUserFromDb(userId);
}


const getUserFromDb = async authId => {
    const sql = `
        SELECT
            auth_id,
            name,
            surname
        FROM users
        WHERE auth_id = ?
        LIMIT 1;
    `;

    const [rows] = await mysql.pool().query(sql, [authId]);
    return rows[0] || null;
};



module.exports = {
    login,
    getUserInfo,
};
