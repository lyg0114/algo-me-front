import instance from "./BackendInstance";
import {BackendAuthApi as backendAuthApi} from "./BackendAuthApi";

export const BackendProfileApi = {
    getProfile,
    updateProfile,
    uploadThumnail,
}

function uploadThumnail(selectedFile, user) {
    const formData = new FormData();
    formData.append('file', selectedFile);
    debugger
    instance.post(`/profile/upload`, formData, {
        headers: {
            'Content-type': 'multipart/form-data',
            'Authorization': backendAuthApi.bearerAuth(user)
        }
    }).then(response => {
        console.log('File uploaded successfully:', response.data); // 파일 업로드 후 필요한 작업 수행
    }).catch(error => {
        console.error('Error uploading file:', error);
    });
}

function getProfile(user, id) {
    const url = `/questions/${id}`;
    return instance.get(url, {
        headers: {'Authorization': backendAuthApi.bearerAuth(user)}
    });
}

function updateProfile(id, question, user) {
    return instance.put(`/questions/${id}`, question, {
        headers: {
            'Content-type': 'application/json',
            'Authorization': backendAuthApi.bearerAuth(user)
        }
    })
}

