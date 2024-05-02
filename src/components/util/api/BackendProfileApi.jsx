import instance from "./BackendInstance";
import {BackendAuthApi as backendAuthApi} from "./BackendAuthApi";

export const backendProfileApi = {
    getProfile,
    updateProfile,
}

function getProfile(user) {
    const url = `profile/info`;
    return instance.get(url, {
        headers: {'Authorization': backendAuthApi.bearerAuth(user)}
    });
}

function updateProfile(profileInfo, user) {
    return instance.put(`profile/info`, profileInfo, {
        headers: {
            'Content-type': 'application/json',
            'Authorization': backendAuthApi.bearerAuth(user)
        }
    })
}

