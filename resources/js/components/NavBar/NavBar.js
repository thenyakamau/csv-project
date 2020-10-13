import React, { Component } from "react";
import { Link } from "react-router-dom";
import { getAuthenticatedUser } from "../util/FetchAuthenticateduser";
import "./NavBar.css";

export default class NavBar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            authUser: {}
        };
    }

    componentDidMount() {
        const authUser = getAuthenticatedUser();

        this.setState({ authUser: authUser });
    }

    render() {
        const { authUser } = this.state;
        return (
            <nav className="navbar navbar-expand-md navbar-light shadow-sm nav_layout">
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

                            {authUser != null ? (
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

                        {authUser != null ? (
                            <ul className="navbar-nav ml-auto">
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
                                        <a
                                            className="dropdown-item "
                                            href="/"
                                            onClick="event.preventDefault();
                                                     document.getElementById('logout-form').submit();"
                                        >
                                            Logout
                                        </a>

                                        <form
                                            id="logout-form"
                                            action="/"
                                            method="POST"
                                            className="d-none"
                                        ></form>
                                    </div>
                                </li>
                            </ul>
                        ) : (
                            <ul className="navbar-nav ml-auto">
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
                            </ul>
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
                    </div>
                </div>
            </nav>
        );
    }
}
