import AppService from './app.service';


export default class AppController {
    login = async (req, h): Promise<LoginResponse | void> => {
        const {email, password} = req.payload;

        try {
            const accessToken: string = await AppService.login(email, password);
            return {accessToken};
        } catch (error) {
            h.response(error.message).code(401);
        }
    };
    getUser = async (req, h): Promise<User | void> => {
        try {
            const token: string = req.headers.authorization.split(' ')[1];
            const user: User | null = await AppService.getUserInfo(token);

            if (!user) {
                return h.response('User not found').code(404);
            }

            return user;
        } catch (e) {
            h.response('internal server error').code(500);
        }
    };
}
