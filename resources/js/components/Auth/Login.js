import Axios from "axios";
import React, { Component } from "react";
import CustomAlertBar from "../widgets/CustomAlertBar";
import SimpleBackdrop from "../widgets/SimpleBackDrop";
import "./Auth.css";
import { Link } from "react-router-dom";

export default class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: "",
            password: "",
            loading: false,
            openSnackBar: false,
            openDialog: false,
            remember_me: true,
            isError: null,
            responseMessage: ""
        };
        this.onChange = this.onChange.bind(this);
        this.setResponse = this.setResponse.bind(this);
        this.login = this.login.bind(this);
    }

    onChange(e) {
        this.setState({ [e.target.name]: e.target.value });
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

    login() {
        const { username, password } = this.state;
        this.setState({ isError: null, responseMessage: "" });
        let config = {
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json"
            }
        };
        if (username && password) {
            this.setState({ loading: true });
            Axios.post("", { username, password }, config)
                .then(res => {})
                .catch(error => {
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
        } else if (!username) {
            this.setState({
                isError: true,
                responseMessage: "Please input your email"
            });
        } else if (!password) {
            this.setState({
                isError: true,
                responseMessage: "Please input your password"
            });
        }
    }

    render() {
        const {
            loading,
            responseMessage,
            isError,
            username,
            password
        } = this.state;
        return (
            <div className="login_layout">
                <SimpleBackdrop open={loading} />
                <div className="login_body">
                    <div className="login_image">
                        <img src="../assets/images/logo_main.png" alt="" />
                    </div>
                    <div className="login_container">
                        <div className="input_container">
                            <h2>Log In</h2>
                            <br />
                            <CustomAlertBar
                                isError={isError}
                                responseMessage={responseMessage}
                            />
                            <div className="login_input-div one">
                                <div className="i">
                                    <i className="fas fa-user"></i>
                                </div>
                                <div className="div">
                                    <input
                                        id="username"
                                        placeholder="Email Address"
                                        type="text"
                                        className="input @error('username') is-invalid @enderror"
                                        name="username"
                                        value={username}
                                        onChange={this.onChange}
                                        required
                                        autoComplete="name"
                                        autoFocus
                                    />
                                </div>
                            </div>

                            <div className="login_input-div pass">
                                <div className="i">
                                    <i className="fas fa-lock"></i>
                                </div>
                                <div className="div">
                                    <input
                                        id="password"
                                        placeholder="Password"
                                        type="password"
                                        className="input @error('password') is-invalid @enderror"
                                        value={password}
                                        name="password"
                                        onChange={this.onChange}
                                        required
                                        autoComplete="new-password"
                                    />
                                </div>
                            </div>
                            <br />

                            <input
                                type="submit"
                                className="btn_login"
                                value="login"
                                onClick={this.login}
                            />
                            <br />
                            <div className="forgot_container">
                                <Link to="/register">
                                    Dont have an account?
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}