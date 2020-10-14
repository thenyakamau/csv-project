export function getAuthToken() {
    let auth_token = localStorage.getItem("access_token");

    return auth_token;
}

export function getRefreshToken() {
    let refresh_token = localStorage.getItem("refresh_token");

    return refresh_token;
}

export function getAuthenticatedUser() {
    let name = localStorage.getItem("user");
    let type = localStorage.getItem("user_type");
    return { name, type };
}

export function saveAuthUser(user, token) {
    localStorage.setItem("access_token", token.access_token);
    localStorage.setItem("refresh_token", token.refresh_token);
    localStorage.setItem("user_type", user.type);
    localStorage.setItem("user", user.name);
}

export function deleteAuthUser() {
    localStorage.removeItem("access_token");
    localStorage.removeItem("refresh_token");
    localStorage.removeItem("user_type");
    localStorage.removeItem("user");
}
