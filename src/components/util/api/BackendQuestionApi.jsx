import instance from "./BackendInstance";
import {BackendAuthApi as backendAuthApi} from "./BackendAuthApi";

export const backendQuestionApi = {
    getQuestions,
    getQuestion,
    addQuestion,
    updateQuestion,
    deleteQuestion
}

function getQuestions(user, page, size, searchTerm) {
    const url = '/questions';
    return instance.get(url, {
        headers: {'Authorization': backendAuthApi.bearerAuth(user)},
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
        headers: {'Authorization': backendAuthApi.bearerAuth(user)}
    });
}

function addQuestion(question, user) {
    return instance.post('/questions', question, {
        headers: {
            'Content-type': 'application/json',
            'Authorization': backendAuthApi.bearerAuth(user)
        }
    })
}

function updateQuestion(id, question, user) {
    return instance.put(`/questions/${id}`, question, {
        headers: {
            'Content-type': 'application/json',
            'Authorization': backendAuthApi.bearerAuth(user)
        }
    })
}

function deleteQuestion(user, id) {
    const url = `/questions/${id}`;
    return instance.delete(url, {
        headers: {'Authorization': backendAuthApi.bearerAuth(user)}
    });
}
