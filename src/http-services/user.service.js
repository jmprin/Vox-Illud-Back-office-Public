import http from './http-common';
class UserService {
    getProfile() {
        return http.get('/user/me');
    }

    getUser(id) {
        return http.get(`/user/${id}`);
    }

    getUsageDetails() {
        return http.get('/user/me/usage');
    }

    updateProfile(data) {
        return http.put('/user/me', data);
    }
}

export default new UserService();
