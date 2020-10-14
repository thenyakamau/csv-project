import React, { Component } from "react";
import { Link, Redirect } from "react-router-dom";
import { getAuthenticatedUser } from "../util/FetchAuthenticateduser";

export default class AdminHome extends Component {
    constructor(props) {
        super(props);
        this.state = {
            redirect: false
        };
    }

    componentDidMount() {
        const auth_user = getAuthenticatedUser();
        if (auth_user.name == null || auth_user.type != "admin") {
            this.setState({ redirect: true });
        }
    }

    render() {
        const { redirect } = this.state;

        if (redirect) {
            return <Redirect to="/" />;
        }

        return (
            <div className="container-fluid row justify-content-center">
                <div className="col-lg-9 col-md-9">
                    <div className="card">
                        <div className="card-header records_header">
                            <h4>Admin Panel</h4>

                            <Link
                                to="/admin/upload"
                                className="btn btn-outline-primary"
                            >
                                Upload File
                            </Link>
                        </div>
                        <div className="card-body">
                            Welcome to the admin panel where you can view
                            suggestion sent over by users and decide whether to
                            approve or deny them as per your desire. Please take
                            detailed notice into the content uploaded for the
                            safety of others.
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
