import http from './http-common';
class UserService {
    getProfile() {
        return http.get('/user/me');
    }

    getUser(id) {
        return http.get(`/user/${id}`);
    }

    getUsageDetails() {
        return http.get('/v2/user/me/usage');
    }

    updateProfile(data) {
        return http.put('/user/me', data);
    }

    getConversations() {
        return http.get(`/v2/user/me/conversation`);
    }

    changePassword(data) {
        return http.put('/user/me/change-password', data);
    }
}

export default new UserService();
