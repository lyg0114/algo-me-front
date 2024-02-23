import axios from 'axios'
import {config} from '../../Constants'
import {parseJwt} from './Helpers'

export const backendApi = {
    authenticate,
    signup,
    getQuestions,
    getQuestion,
    addQuestion,
    updateQuestion,
    deleteQuestion
}

function authenticate(username, password) {
    const email = username;
    return instance.post('/rest/auth/login', {email, password}, {
        headers: {'Content-type': 'application/json'}
    })
}

function signup(user) {
    return instance.post('/auth/signup', user, {
        headers: {'Content-type': 'application/json'}
    })
}

function getQuestions(user, page, size, searchTerm) {
    const url = '/questions';
    return instance.get(url, {
        headers: {'Authorization': bearerAuth(user)},
        params: {
            page: page,
            size: size,
            searchTerm: searchTerm
        }
    });
}

function getQuestion(user, id) {
    const url = `/questions/${id}`;
    return instance.get(url, {
        headers: {'Authorization': bearerAuth(user)}
    });
}

function addQuestion(question, user) {
    return instance.post('/questions', question, {
        headers: {
            'Content-type': 'application/json',
            'Authorization': bearerAuth(user)
        }
    })
}

function updateQuestion(id, question, user) {
    return instance.put(`/questions/${id}`, question, {
        headers: {
            'Content-type': 'application/json',
            'Authorization': bearerAuth(user)
        }
    })
}

function deleteQuestion(user, id) {
    const url = `/questions/${id}`;
    return instance.delete(url, {
        headers: {'Authorization': bearerAuth(user)}
    });
}

const instance = axios.create({
    baseURL: config.url.API_BASE_URL
})

instance.interceptors.request.use(function (config) {
    if (config.headers.Authorization) {
        const token = config.headers.Authorization.split(' ')[1]
        const data = parseJwt(token)
        if (Date.now() > data.exp * 1000) {
            window.location.href = "/login"
        }
    }
    return config
}, function (error) {
    return Promise.reject(error)
})

// -- Helper functions
function bearerAuth(user) {
    return `Bearer ${user.accessToken}`
}
