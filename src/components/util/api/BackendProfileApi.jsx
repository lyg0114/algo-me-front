import instance from "./BackendInstance";
import {BackendAuthApi as backendAuthApi} from "./BackendAuthApi";
import axios from "axios";

const BASE_URL = "http://localhost:3000/api/profile"
export const BackendProfileApi = {
    getProfile,
    updateProfile,
    uploadThumnail,
}

function uploadThumnail(formData) {
    debugger
    return axios.post(
        BASE_URL + '/upload',
        formData,
        {
            headers: {
                'Content-type': 'multipart/form-data',
                'Authorization': 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJleHAiOjE3MTQyOTIyNTcsImlhdCI6MTcxNDI4ODY1NywianRpIjoiMzJiZjIwMDYtYTBhNi00MTJhLTk3M2YtZThlNWE1NGU2YWYzIiwiaXNzIjoib3JkZXItYXBpIiwiYXVkIjoib3JkZXItYXBwIiwic3ViIjoidXNlckBleGFtcGxlLmNvbSIsInJvbGVzIjpbIlVTRVIiXSwibmFtZSI6Imt5bGUiLCJwcmVmZXJyZWRfdXNlcm5hbWUiOiJ1c2VyQGV4YW1wbGUuY29tIiwiZW1haWwiOiJ1c2VyQGV4YW1wbGUuY29tIn0.Rj5Qck0vP55GaxrS5jsYfRhEmWqotYfkQGsuljtlEqQ'
            }
        }
    );
}


// function uploadThumnail(formData, user) {
//     debugger
//     instance.post(`/profile/upload`,
//         formData,
//         {
//             headers: {
//                 'Content-type': 'multipart/form-data',
//                 'Authorization': backendAuthApi.bearerAuth(user)
//             }
//         }).then(response => {
//         console.log('File uploaded successfully:', response.data); // 파일 업로드 후 필요한 작업 수행
//     }).catch(error => {
//         console.error('Error uploading file:', error);
//     });
// }

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

