import React, { Fragment } from "react";
import { Route, Switch } from "react-router-dom";
import AdminHome from "./AdminDashBoard/AdminHome";
import UploadPage from "./AdminDashBoard/UploadPage";
import Login from "./Auth/Login";
import Register from "./Auth/Register";
import HomePage from "./DashBoard/HomePage";
import Mapping from "./DashBoard/Mapping";
import SearchPage from "./DashBoard/SearchPage";
import NavBar from "./NavBar/NavBar";
// import "./App.css";

export default function App() {
    return (
        <Fragment>
            <NavBar />
            <div className="app_layout">
                <Switch>
                    <Route exact path="/" component={HomePage} />
                    <Route path="/search" component={SearchPage} />
                    <Route path="/mapping" component={Mapping} />
                    <Route path="/login" component={Login} />
                    <Route path="/register" component={Register} />
                    <Route exact path="/admin/" component={AdminHome} />
                    <Route path="/admin/upload" component={UploadPage} />
                </Switch>
            </div>
        </Fragment>
    );
}
