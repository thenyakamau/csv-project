import { Route, Redirect } from "react-router-dom";
import SimpleBackdrop from "../widgets/SimpleBackDrop";
import { getAuthToken } from "./FetchAuthenticateduser";

const userAuthenticated = () => {
    const auth_token = getAuthToken;
    if (auth_token != null) {
        return true;
    } else {
        return false;
    }
};

const PrivateRoutes = ({ component: Component, auth, ...rest }) => {
    return (
        <Route
            {...rest}
            render={props => {
                if (!userAuthenticated) return <Redirect to="/login" />;
                else return <Component {...props} />;
            }}
        />
    );
};
