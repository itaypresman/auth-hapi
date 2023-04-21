import axios, {AxiosResponse} from 'axios';
import jwt from 'jsonwebtoken';
import {keyCloak} from '@auth-hapi/config';
import {con} from '@auth-hapi/mysql';


class AppService {
    login = async (email: string, password: string): Promise<string> => {
        const url: string = `${keyCloak.url}/realms/${keyCloak.realm}/protocol/openid-connect/token`;
        const data: string = `client_id=${keyCloak.resource}&grant_type=password&username=${email}&password=${password}`;
        const config: LoginConfig = {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'Authorization': `Basic ${Buffer.from(`${keyCloak.resource}:${keyCloak.secret}`).toString('base64')}`
            }
        };
        const response: AxiosResponse<any> = await axios.post(url, data, config);
        return response.data.access_token;
    }

    getUserInfo = async (token: string): Promise<User | null> => {
        const decoded = jwt.decode(token);
        const userId: string = decoded.sub;

        return await this.getUserFromDb(userId);
    }

    getUserFromDb = async (authId: string): Promise<User | null> => {
        const sql: string = `
            SELECT auth_id,
                   name,
                   surname
            FROM users
            WHERE auth_id = ?
            LIMIT 1;
        `;

        const [rows]: User[] = await con().query(sql, [authId]);
        return rows[0] || null;
    };
}

export default new AppService();
