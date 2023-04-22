export default (request, h): any => {
    const authorizationHeader: string = request.headers.authorization;

    if (!authorizationHeader) {
        return h.response('Authorization header is missing').code(401);
    }
    return h.continue;
};
