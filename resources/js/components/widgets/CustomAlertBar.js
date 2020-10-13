import React from "react";

export default function CustomAlertBar(props) {
    const { isError, responseMessage } = props;

    let myAlertDialog;
    if (isError === false) {
        myAlertDialog = (
            <div data-form-alert="true">
                <div
                    data-form-alert-success="true"
                    className="alert alert-form alert-success text-xs-center"
                >
                    {responseMessage}
                </div>
            </div>
        );
    } else if (isError === true) {
        myAlertDialog = (
            <div data-form-alert="true">
                <div
                    data-form-alert-success="true"
                    className="alert alert-form alert-danger text-xs-center"
                >
                    {responseMessage}
                </div>
            </div>
        );
    } else if (isError === "warning") {
        myAlertDialog = (
            <div data-form-alert="true">
                <div
                    data-form-alert-success="true"
                    className="alert alert-form alert-warning text-xs-center"
                >
                    {responseMessage}
                </div>
            </div>
        );
    } else {
        myAlertDialog = <div></div>;
    }

    return <div>{myAlertDialog}</div>;
}
