import Axios from "axios";
import React, { Component } from "react";
import { getAuthenticatedUser } from "../util/FetchAuthenticateduser";
import MultiTokenConfig from "../util/MultiTokenConfig";
import SimpleBackdrop from "../widgets/SimpleBackDrop";
import Snackbar from "@material-ui/core/Snackbar";
import Alert from "@material-ui/lab/Alert";
import { Redirect } from "react-router-dom";

export default class UploadPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            redirect: false,
            file_ic9: null,
            file: null,
            file_ic10: null,
            isError: null,
            responseMessage: null,
            loading: false,
            openSnackBar: false,
            snackPosition: { vertical: "bottom", horizontal: "center" }
        };
        this.fileSelectorHandler = this.fileSelectorHandler.bind(this);
        this.submitFiles = this.submitFiles.bind(this);
        this.setResponse = this.setResponse.bind(this);
        this.closeSnackBar = this.closeSnackBar.bind(this);
    }

    componentDidMount() {
        const auth_user = getAuthenticatedUser();
        if (auth_user.name == null || auth_user.type != "admin") {
            this.setState({ redirect: true });
        }
    }

    fileSelectorHandler(e) {
        let file = e.target.files[0];

        if (!file) {
            return;
        }

        this.setState({ [e.target.name]: file });
    }

    submitFiles() {
        const config = MultiTokenConfig();
        const { file, file_ic9, file_ic10 } = this.state;
        if (file && file_ic9 && file_ic10) {
            let formData = new FormData();
            formData.append("file", file);
            formData.append("file_ic9", file_ic9);
            formData.append("file_ic10", file_ic10);
            this.setState({ loading: true });
            Axios.post("/admin/import", formData, config)
                .then(res => {
                    this.setState({ loading: false });
                    this.setState({
                        isError: false,
                        responseMessage: "Files have been uploaded"
                    });
                    this.setState({ redirect: true });
                })
                .catch(error => {
                    this.setState({ loading: false });
                    const errors = {
                        responseMessage: error.response.data,
                        status: error.response.status,
                        isError: true
                    };

                    this.setResponse(errors);
                });
        }
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

    closeSnackBar() {
        this.setState({ openSnackBar: false });
    }

    render() {
        const {
            redirect,
            loading,
            snackPosition,
            openSnackBar,
            isError,
            responseMessage
        } = this.state;

        if (redirect) {
            return <Redirect to="/" />;
        }

        return (
            <div className="container-sm">
                <SimpleBackdrop open={loading} />
                <div className="card">
                    <div className="card-header">
                        <h4>Upload the csv file</h4>
                    </div>
                    <div className="card-body card_display">
                        <h1 className="display-4 text-center">
                            <i className="fas fa-cloud-upload-alt text-primary"></i>
                            <span className="text-primary">Upload File</span>
                        </h1>
                        <div>
                            <label className="text-primary">
                                Upload Ic9 to Ic10 csv files
                            </label>
                            <input
                                name="file_ic9"
                                type="file"
                                className="form-group"
                                id="file_input"
                                onChange={e => this.fileSelectorHandler(e)}
                            />
                            <label className="text-primary">
                                Upload Ic9 to Ic10AM csv files
                            </label>
                            <input
                                name="file"
                                type="file"
                                className="form-group"
                                id="file_input"
                                onChange={e => this.fileSelectorHandler(e)}
                            />
                            <label className="text-primary">
                                Upload Ic10 to Ic10AM csv files
                            </label>
                            <input
                                name="file_ic10"
                                type="file"
                                className="form-group"
                                id="file_input"
                                onChange={e => this.fileSelectorHandler(e)}
                            />
                            <center>
                                <button
                                    onClick={() => this.submitFiles()}
                                    className="btn btn-lg btn-primary upload_button"
                                >
                                    Upload Files
                                </button>
                            </center>
                        </div>
                    </div>
                </div>
                <Snackbar
                    open={openSnackBar}
                    anchorOrigin={snackPosition}
                    onClose={() => this.closeSnackBar()}
                    autoHideDuration={4000}
                >
                    {isError === true ? (
                        <Alert
                            onClose={() => this.closeSnackBar()}
                            severity="error"
                        >
                            {responseMessage}
                        </Alert>
                    ) : (
                        <Alert
                            onClose={() => this.closeSnackBar()}
                            severity="success"
                        >
                            {responseMessage}
                        </Alert>
                    )}
                </Snackbar>
            </div>
        );
    }
}
