import Axios from "axios";
import React, { Component } from "react";
import { Link, Redirect } from "react-router-dom";
import { saveAuthUser, getAuthToken } from "../util/FetchAuthenticateduser";
import TokenConfig from "../util/TokenConfig";
import CustomAlertBar from "../widgets/CustomAlertBar";
import SimpleBackdrop from "../widgets/SimpleBackDrop";
import "./Auth.css";

export default class Register extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: "",
            email: "",
            password: "",
            password_confirmation: "",
            loading: false,
            openSnackBar: false,
            openDialog: false,
            remember_me: true,
            isError: null,
            responseMessage: "",
            auth_token: null
        };
        this.onChange = this.onChange.bind(this);
        this.setResponse = this.setResponse.bind(this);
        this.register = this.register.bind(this);
    }

    componentDidMount() {
        const auth_token = getAuthToken();
        this.setState({ auth_token: auth_token });
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

    register() {
        const { name, email, password, password_confirmation } = this.state;
        this.setState({ isError: null, responseMessage: "" });
        let config = TokenConfig();
        if (name && email && password && password_confirmation) {
            this.setState({ loading: true });
            Axios.post(
                "api/register",
                { name, email, password, password_confirmation },
                config
            )
                .then(res => {
                    this.setState({ loading: false });
                    saveAuthUser(res.data.user, res.data.token);
                    window.location.reload();
                })
                .catch(error => {
                    this.setState({ loading: false });
                    const errors = {
                        responseMessage: error.response.data,
                        status: error.response.status,
                        isError: true
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
            email,
            password,
            name,
            password_confirmation,
            isError,
            responseMessage,
            auth_token
        } = this.state;

        if (auth_token != null) {
            return <Redirect to="/" />;
        }
        return (
            <div className="login_layout">
                <SimpleBackdrop open={loading} />
                <div className="login_body">
                    <div className="login_image">
                        <img src="../assets/images/logo_main.png" alt="" />
                    </div>
                    <div className="login_container">
                        <div className="input_container">
                            <h2>Sign Up</h2>
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
                                        id="name"
                                        placeholder="Enter full name"
                                        type="text"
                                        className="input @error('username') is-invalid @enderror"
                                        name="name"
                                        value={name}
                                        onChange={e => this.onChange(e)}
                                        required
                                        autoComplete="name"
                                        autoFocus
                                    />
                                </div>
                            </div>

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
                                        name="email"
                                        value={email}
                                        onChange={e => this.onChange(e)}
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
                                        onChange={e => this.onChange(e)}
                                        required
                                        autoComplete="new-password"
                                    />
                                </div>
                            </div>

                            <div className="login_input-div pass">
                                <div className="i">
                                    <i className="fas fa-lock"></i>
                                </div>
                                <div className="div">
                                    <input
                                        id="c_password"
                                        placeholder="Confirm Password"
                                        type="password"
                                        className="input @error('password') is-invalid @enderror"
                                        value={password_confirmation}
                                        name="password_confirmation"
                                        onChange={e => this.onChange(e)}
                                        required
                                        autoComplete="new-password"
                                    />
                                </div>
                            </div>
                            <br />

                            <input
                                type="submit"
                                className="btn_login"
                                value="register"
                                onClick={() => this.register()}
                            />
                            <br />
                            <div className="forgot_container">
                                <Link to="/login">
                                    Already have an account?
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
