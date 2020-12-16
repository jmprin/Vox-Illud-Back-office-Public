import http from './http-common';
class AuthService {

    signUp(data) {
        return http.post("/demo/signup", data);
    }

    signIn(data) {
        return http.post("/signin", data);
    }
}

export default new AuthService();
