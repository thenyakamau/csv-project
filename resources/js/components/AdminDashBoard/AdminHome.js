import Axios from "axios";
import React, { Component } from "react";
import { Link, Redirect } from "react-router-dom";
import { getAuthenticatedUser } from "../util/FetchAuthenticateduser";
import TokenConfig from "../util/TokenConfig";
import SimpleBackdrop from "../widgets/SimpleBackDrop";
import "./Admin.css";
import SuggestionTable from "./tables/SuggestionTable";
import SuggestionTenTable from "./tables/SuggestionTenTable";
import SuggestNineTable from "./tables/SuggestNineTable";

export default class AdminHome extends Component {
    constructor(props) {
        super(props);
        this.state = {
            redirect: false,
            currentTable: "ICD-9-mode",
            suggestions: [],
            suggestionNine: [],
            suggestionTen: [],
            page: "",
            last_page: 1,
            loading: false
        };
        this.getSuggestions = this.getSuggestions.bind(this);
        this.getNineSuggestions = this.getNineSuggestions.bind(this);
        this.getTenSuggestions = this.getTenSuggestions.bind(this);
        this.deleteSuggestion = this.deleteSuggestion.bind(this);
        this.setResponse = this.setResponse.bind(this);
        this.updateSuggestion = this.updateSuggestion.bind(this);
        this.deleteNineSuggestion = this.deleteNineSuggestion.bind(this);
        this.updateNineSuggestion = this.updateNineSuggestion.bind(this);
        this.selectCurrentTable = this.selectCurrentTable.bind(this);
        this.deleteTenSuggestion = this.deleteTenSuggestion.bind(this);
        this.updateTenSuggestion = this.updateTenSuggestion.bind(this);
    }

    selectCurrentTable(e) {
        let currentTable = e.target.value;
        this.setState({ currentTable: currentTable });
        if (currentTable === "ICD-9-mode") {
            this.getSuggestions(1);
        } else if (currentTable === "ICD-10-mode") {
            this.getNineSuggestions(1);
        } else {
            this.getTenSuggestions(1);
        }
    }

    componentDidMount() {
        const auth_user = getAuthenticatedUser();
        if (auth_user.name == null || auth_user.type != "admin") {
            this.setState({ redirect: true });
        }
        this.getSuggestions(1);
    }

    getSuggestions(page, sort, order, criteria) {
        let config = TokenConfig();
        this.setState({ loading: true });
        Axios.get(`admin/suggestion?page=${page}&sort=`, config)
            .then(res => {
                this.setState({
                    suggestions: res.data.suggestion.data,
                    last_page: res.data.suggestion.last_page,
                    loading: false
                });
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

    getNineSuggestions(page) {
        let config = TokenConfig();
        this.setState({ loading: true });
        Axios.get(`admin/suggestion_nine?page=${page}`, config)
            .then(res => {
                this.setState({
                    suggestionNine: res.data.suggestion.data,
                    last_page: res.data.suggestion.last_page,
                    loading: false
                });
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

    getTenSuggestions(page) {
        let config = TokenConfig();
        this.setState({ loading: true });
        Axios.get(`admin/suggestion_ten?page=${page}`, config)
            .then(res => {
                this.setState({
                    suggestionTen: res.data.suggestion.data,
                    last_page: res.data.suggestion.last_page,
                    loading: false
                });
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

    deleteSuggestion(suggestion) {
        let id = suggestion.id;
        let config = TokenConfig();
        this.setState({ loading: true });
        Axios.post("admin/delete_suggestion", { id }, config)
            .then(res => {
                let responseMessage = {
                    message: "Suggestion has been deleted"
                };
                let isError = false;
                this.setResponse({ responseMessage, isError });
                this.getSuggestions(1);
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

    updateSuggestion(suggestion) {
        let config = TokenConfig();
        this.setState({ loading: true });
        Axios.post("admin/updateRecord", suggestion, config)
            .then(res => {
                let responseMessage = {
                    message: "Suggestion has been updated"
                };
                let isError = false;
                this.setResponse({ responseMessage, isError });
                this.getSuggestions(1);
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

    deleteNineSuggestion(suggestion) {
        let id = suggestion.id;
        let config = TokenConfig();
        this.setState({ loading: true });
        Axios.post("admin/delete_suggestion_nine", { id }, config)
            .then(res => {
                let responseMessage = {
                    message: "Suggestion has been deleted"
                };
                let isError = false;
                this.setResponse({ responseMessage, isError });
                this.getNineSuggestions(1);
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

    updateNineSuggestion(suggestion) {
        let config = TokenConfig();
        this.setState({ loading: true });
        Axios.post("admin/updateRecordNine", suggestion, config)
            .then(res => {
                let responseMessage = {
                    message: "Suggestion has been updated"
                };
                let isError = false;
                this.setResponse({ responseMessage, isError });
                this.getNineSuggestions(1);
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

    deleteTenSuggestion(suggestion) {
        let id = suggestion.id;
        let config = TokenConfig();
        this.setState({ loading: true });
        Axios.post("admin/delete_suggestion_ten", { id }, config)
            .then(res => {
                let responseMessage = {
                    message: "Suggestion has been deleted"
                };
                let isError = false;
                this.setResponse({ responseMessage, isError });
                this.getTenSuggestions(1);
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

    updateTenSuggestion(suggestion) {
        let config = TokenConfig();
        this.setState({ loading: true });
        Axios.post("admin/updateRecordTen", suggestion, config)
            .then(res => {
                let responseMessage = {
                    message: "Suggestion has been updated"
                };
                let isError = false;
                this.setResponse({ responseMessage, isError });
                this.getTenSuggestions(1);
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
            redirect,
            currentTable,
            loading,
            suggestions,
            last_page,
            suggestionNine,
            suggestionTen
        } = this.state;

        if (redirect) {
            return <Redirect to="/" />;
        }

        return (
            <div className="container-fluid row justify-content-center">
                <SimpleBackdrop open={loading} />
                <div className="col-lg-10 col-md-10">
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
                <div className="col-lg-10 col-md-10">
                    <div class="card mt-4 ">
                        <div class="card-header records_header">
                            <h4>Suggestions</h4>
                            <div class="admin_suggest_widgets">
                                <select
                                    class="form-control drop_down_items"
                                    onChange={e => this.selectCurrentTable(e)}
                                >
                                    <option value="ICD-9-mode">ICD-9</option>
                                    <option value="ICD-10-mode">ICD-10</option>
                                    <option value="ICD-10am-mode">
                                        ICD-10AM
                                    </option>
                                </select>
                                {currentTable == "ICD-9-mode" ? (
                                    <a
                                        href="/admin/getSuggestionsExport"
                                        class="btn btn-primary"
                                    >
                                        DownLoad
                                    </a>
                                ) : currentTable == "ICD-10-mode" ? (
                                    <a
                                        href="/admin/getSuggestionsNineExport"
                                        class="btn btn-primary am_download"
                                    >
                                        DownLoad
                                    </a>
                                ) : (
                                    <a
                                        href="/admin/getSuggestionsTenExport"
                                        class="btn btn-primary am_download"
                                        id="ic-am-link"
                                    >
                                        DownLoad
                                    </a>
                                )}
                            </div>
                        </div>

                        <div className="card-body">
                            {currentTable == "ICD-9-mode" ? (
                                <SuggestionTable
                                    suggestions={suggestions}
                                    getSuggestions={this.getSuggestions}
                                    last_page={last_page}
                                    deleteSuggestion={this.deleteSuggestion}
                                    updateSuggestion={this.updateSuggestion}
                                />
                            ) : currentTable == "ICD-10-mode" ? (
                                <SuggestNineTable
                                    suggestions={suggestionNine}
                                    getSuggestions={this.getNineSuggestions}
                                    last_page={last_page}
                                    deleteSuggestion={this.deleteNineSuggestion}
                                    updateSuggestion={this.updateNineSuggestion}
                                />
                            ) : currentTable == "ICD-10am-mode" ? (
                                <SuggestionTenTable
                                    suggestions={suggestionTen}
                                    getSuggestions={this.getTenSuggestions}
                                    last_page={last_page}
                                    deleteSuggestion={this.deleteTenSuggestion}
                                    updateSuggestion={this.updateTenSuggestion}
                                />
                            ) : (
                                <div />
                            )}
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
