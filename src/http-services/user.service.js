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

    async downloadFile(data) {
        return http.get(`/session/${data._id}/download`,{
            method: 'GET',
            responseType: 'blob', // important
          });
    }
}

export default new UserService();
