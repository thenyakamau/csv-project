import React from "react";
import { Route, Redirect } from "react-router-dom";
import SimpleBackdrop from "../widgets/SimpleBackDrop";
import { getAuthenticatedUser, getAuthToken } from "./FetchAuthenticateduser";

const userAuthenticated = () => {
    const auth_token = getAuthToken;
    const auth_user = getAuthenticatedUser;
    if (auth_token != null && auth_user.type === "admin") {
        return true;
    } else {
        return false;
    }
};

export default function PrivateRoutes({ component: Component, auth, ...rest }) {
    return (
        <Route
            {...rest}
            render={props => {
                if (!userAuthenticated) return <Redirect to="/login" />;
                else return <Component {...props} />;
            }}
        />
    );
}
