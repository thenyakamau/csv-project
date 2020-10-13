import React, { Fragment } from "react";
import { Route, Switch } from "react-router-dom";
import Login from "./Auth/Login";
import Register from "./Auth/Register";
import HomePage from "./DashBoard/HomePage";
import NavBar from "./NavBar/NavBar";

export default function App() {
    return (
        <Fragment>
            <NavBar />
            <div className="app_layout">
                <Switch>
                    <Route exact path="/" component={HomePage} />
                    <Route path="/search" component={HomePage} />
                    <Route path="/login" component={Login} />
                    <Route path="/register" component={Register} />
                </Switch>
            </div>
        </Fragment>
    );
}
