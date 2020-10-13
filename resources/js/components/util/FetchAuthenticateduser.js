export function getAuthToken() {
    let auth_token = localStorage.getItem("access_token");

    return auth_token;
}

export function getRefreshToken() {
    let refresh_token = localStorage.getItem("refresh_token");

    return refresh_token;
}

export function getAuthenticatedUser() {
    let auth_user = localStorage.getItem("auth_user");

    return auth_user;
}
