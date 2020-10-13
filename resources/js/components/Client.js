import React from "react";
import ReactDOM from "react-dom";
import { HashRouter } from "react-router-dom";
import App from "./App";
import ResetScroll from "./ResetScroll";

function Client() {
    return (
        <React.StrictMode>
            <HashRouter>
                <ResetScroll />
                <App />
            </HashRouter>
        </React.StrictMode>
    );
}

export default Client;

if (document.getElementById("client")) {
    ReactDOM.render(<Client />, document.getElementById("client"));
}
