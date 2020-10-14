import Axios from "axios";
import React, { Component } from "react";
import { Link } from "react-router-dom";
import {
    deleteAuthUser,
    getAuthenticatedUser,
    getAuthToken
} from "../util/FetchAuthenticateduser";
import TokenConfig from "../util/TokenConfig";
import CustomAlertBar from "../widgets/CustomAlertBar";
import SimpleBackdrop from "../widgets/SimpleBackDrop";
import "./NavBar.css";
import Snackbar from "@material-ui/core/Snackbar";

export default class NavBar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            authUser: {},
            authToken: "",
            loading: false,
            isError: null,
            responseMessage: null,
            openSnackBar: false,
            snackPosition: { vertical: "top", horizontal: "center" }
        };
        this.logOut = this.logOut.bind(this);
        this.closeSnackBar = this.closeSnackBar.bind(this);
        this.setResponse = this.setResponse.bind(this);
    }

    componentDidMount() {
        const authUser = getAuthenticatedUser();
        const authToken = getAuthToken();

        this.setState({ authUser: authUser, authToken: authToken });
    }

    logOut() {
        const config = TokenConfig();
        this.setState({ loading: true });
        Axios.post("logout", null, config)
            .then(res => {
                this.setState({ loading: false });
                deleteAuthUser();
                window.location.reload();
            })
            .catch(error => {
                this.setState({ loading: false });
                const errors = {
                    responseMessage: error.response.data,
                    status: error.response.status
                };
                if (errors.status === 401) {
                    let responseMessage = {
                        message: "Authentication details are not correct"
                    };
                    let isError = true;
                    this.setResponse({ responseMessage, isError });
                } else {
                    this.setResponse(errors);
                }
            });
    }

    closeSnackBar() {
        this.setState({ openSnackBar: false });
    }

    setResponse(response) {
        let value = Object.keys(response.responseMessage)[0];
        const responseMessage = response.responseMessage[value];
        if (responseMessage instanceof Array)
            this.setState({
                responseMessage: responseMessage[0],
                isError: response.isError,
                openSnackBar: true
            });
        else
            this.setState({
                responseMessage: responseMessage,
                isError: response.isError,
                openSnackBar: true
            });
    }

    render() {
        const {
            authUser,
            loading,
            isError,
            responseMessage,
            snackPosition,
            openSnackBar,
            authToken
        } = this.state;
        return (
            <nav className="navbar navbar-expand-md navbar-light shadow-sm nav_layout">
                <SimpleBackdrop open={loading} />
                <div className="container">
                    <Link className="navbar-brand text-white" to="/">
                        <i className="fas fa-book-open text-primary"></i>
                        MyICDList
                    </Link>
                    <button
                        className="navbar-toggler"
                        type="button"
                        data-toggle="collapse"
                        data-target="#navbarSupportedContent"
                        aria-controls="navbarSupportedContent"
                        aria-expanded="false"
                    >
                        <span className="navbar-toggler-icon"></span>
                    </button>

                    <div
                        className="collapse navbar-collapse"
                        id="navbarSupportedContent"
                    >
                        <ul className="navbar-nav mr-auto">
                            <li className="nav-item">
                                <Link
                                    className="nav-link text-white"
                                    to="/search"
                                >
                                    Search
                                </Link>
                            </li>

                            {authUser != null && authToken != null ? (
                                <li className="nav-item">
                                    <Link
                                        className="nav-link text-white"
                                        to="/mapping"
                                    >
                                        Manual map
                                    </Link>
                                </li>
                            ) : (
                                <div />
                            )}
                        </ul>
                        <ul className="navbar-nav ml-auto">
                            {authUser != null && authToken != null ? (
                                <li className="nav-item dropdown">
                                    <a
                                        id="navbarDropdown"
                                        className="nav-link dropdown-toggle text-white"
                                        href="#"
                                        role="button"
                                        data-toggle="dropdown"
                                        aria-haspopup="true"
                                        aria-expanded="false"
                                    >
                                        {authUser.name}
                                    </a>

                                    <div
                                        className="dropdown-menu dropdown-menu-right"
                                        aria-labelledby="navbarDropdown"
                                    >
                                        <div
                                            className="dropdown-item "
                                            onClick={() => this.logOut()}
                                        >
                                            Logout
                                        </div>
                                    </div>
                                </li>
                            ) : (
                                <div className="row">
                                    <li className="nav-item">
                                        <Link
                                            className="nav-link text-white"
                                            to="/login"
                                        >
                                            Login
                                        </Link>
                                    </li>

                                    <li className="nav-item">
                                        <Link
                                            className="nav-link text-white"
                                            to="/register"
                                        >
                                            Register
                                        </Link>
                                    </li>
                                </div>
                            )}

                            {authUser != null && authUser.type === "admin" ? (
                                <ul className="navbar-nav ml-auto">
                                    <li>
                                        <form
                                            className="nav_form_btn"
                                            action="/"
                                            method="GET"
                                        >
                                            <button
                                                type="submit"
                                                className="btn btn-primary"
                                            >
                                                Admin Portal
                                            </button>
                                        </form>
                                    </li>
                                </ul>
                            ) : (
                                <div />
                            )}
                        </ul>
                    </div>
                </div>
                <Snackbar
                    open={openSnackBar}
                    anchorOrigin={snackPosition}
                    onClose={() => this.closeSnackBar()}
                    autoHideDuration={4000}
                >
                    <CustomAlertBar
                        isError={isError}
                        responseMessage={responseMessage}
                    />
                </Snackbar>
            </nav>
        );
    }
}
