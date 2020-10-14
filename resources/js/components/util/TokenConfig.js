import { getAuthToken } from "./FetchAuthenticateduser";

export default function() {
    //const token
    const token = getAuthToken();

    let config = {
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json"
        }
    };

    if (token) {
        config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
}
