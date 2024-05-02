import instance from "./BackendInstance";

export const BackendAuthApi = {
    authenticate,
    signup,
    checkEmail,
    bearerAuth,
}

function authenticate(email, password) {
    return instance.post('/rest/auth/login', {email, password}, {
        headers: {'Content-type': 'application/json'}
    })
}

function signup(user) {
    return instance.post('/rest/auth/signup', user, {
        headers: {'Content-type': 'application/json'}
    })
}

function checkEmail(token) {
    const url = '/rest/auth/check-email/' + token;
    return instance.get(url);
}

function bearerAuth(user) {
    return `Bearer ${user.accessToken}`
}
