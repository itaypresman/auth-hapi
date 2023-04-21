type LoginResponse = {
    accessToken: string;
}

type LoginConfig = {
    headers: LoginHeaders;
}

type LoginHeaders = {
    'Content-Type': string;
    'Authorization': string;
}

type User = {
    authId: string;
    name: string;
    surname: string;
}
