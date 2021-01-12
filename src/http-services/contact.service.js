import http from './http-common';
class ContactService {
    sendMailQuota(data) {
        return http.post('/contact/mail/quota', data);
    }

    sendMailAccount(data) {
        return http.post('/contact/mail/account', data);
    }
}

export default new ContactService();
