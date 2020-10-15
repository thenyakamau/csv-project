import React, { Component } from "react";
import Ic9To10AmMapping from "./mapping/Ic9To10AmMapping";
import Snackbar from "@material-ui/core/Snackbar";
import Alert from "@material-ui/lab/Alert";
import Axios from "axios";
import TokenConfig from "../util/TokenConfig";
import SimpleBackdrop from "../widgets/SimpleBackDrop";
import "./DashBoard.css";
import Ic10AmTo9Mapping from "./mapping/Ic10AmTo9Mapping";
import Ic9To10Mapping from "./mapping/Ic9To10Mapping";
import Ic10To9Mapping from "./mapping/Ic10To9Mapping";
import Ic10To10AmMapping from "./mapping/Ic10To10AmMapping";
import Ic10amTo10Mapping from "./mapping/Ic10amTo10Mapping";

export default class Mapping extends Component {
    constructor(props) {
        super(props);
        this.state = {
            searchInput: "",
            ic9To10AmRecord: null,
            ic9To10Record: null,
            ic10To10AMRecord: null,
            currentTable: "ICD-9-BPA code",
            searchInput: "",
            openSnackBar: false,
            snackPosition: { vertical: "top", horizontal: "center" },
            isError: null,
            responseMessage: null,
            loading: false
        };
        this.onChange = this.onChange.bind(this);
        this.selectCurrentTable = this.selectCurrentTable.bind(this);
        this.closeSnackBar = this.closeSnackBar.bind(this);
        this.onSearchPress = this.onSearchPress.bind(this);
        this.searchItems = this.searchItems.bind(this);
        this.getIc9To10AmRecord = this.getIc9To10AmRecord.bind(this);
        this.fetchIc9to10Record = this.fetchIc9to10Record.bind(this);
        this.fetchIc10AMRecord = this.fetchIc10AMRecord.bind(this);
        this.setResponse = this.setResponse.bind(this);
        this.sendIc9To10Amsuggestion = this.sendIc9To10Amsuggestion.bind(this);
        this.sendIc9To10suggestion = this.sendIc9To10suggestion.bind(this);
        this.sendIc10To10Amsuggestion = this.sendIc10To10Amsuggestion.bind(
            this
        );
    }

    onChange(e) {
        this.setState({ [e.target.name]: e.target.value });
    }

    selectCurrentTable(e) {
        this.setState({ currentTable: e.target.value });
    }

    closeSnackBar() {
        this.setState({ openSnackBar: false });
    }

    getIc9To10AmRecord(key, status) {
        const config = TokenConfig();
        this.setState({ loading: true });
        Axios.get(`/getRecords?key=${key}&status=${status}`, config)
            .then(res => {
                this.setState({ loading: false });
                let ic9To10Records = res.data.records.data;

                if (ic9To10Records.length > 0) {
                    this.setState({ ic9To10AmRecord: ic9To10Records[0] });
                } else {
                    let responseMessage = {
                        message: "Record could not be found"
                    };
                    let isError = true;
                    this.setResponse({ responseMessage, isError });
                }
            })
            .catch(error => {
                const errors = {
                    responseMessage: {
                        message: "Something went wrong"
                    },
                    isError: true
                };
                this.setState({ loading: false });
                this.setResponse(errors);
            });
    }

    fetchIc9to10Record(key, status) {
        const config = TokenConfig();
        this.setState({ loading: true });
        Axios.get(`/fetchIc9to10Records?key=${key}&status=${status}`, config)
            .then(res => {
                this.setState({ loading: false });
                let ic9To10Records = res.data.records.data;
                if (ic9To10Records.length > 0) {
                    this.setState({ ic9To10Record: ic9To10Records[0] });
                } else {
                    let responseMessage = {
                        message: "Record could not be found"
                    };
                    let isError = true;
                    this.setResponse({ responseMessage, isError });
                }
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

    fetchIc10AMRecord(key, status) {
        const config = TokenConfig();
        this.setState({ loading: true });

        Axios.get(`/getRecordsTen?key=${key}&status=${status}`, config)
            .then(res => {
                this.setState({ loading: false });
                let ic10To10AmRecords = res.data.records.data;
                if (ic10To10AmRecords.length > 0) {
                    this.setState({ ic10To10AMRecord: ic10To10AmRecords[0] });
                } else {
                    let responseMessage = {
                        message: "Record could not be found"
                    };
                    let isError = true;
                    this.setResponse({ responseMessage, isError });
                }
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

    onSearchPress(e) {
        if (e.key === "Enter") {
            this.searchItems();
        }
    }

    searchItems() {
        const { currentTable, searchInput } = this.state;
        if (searchInput) {
            if (
                currentTable === "ICD-9-BPA code" ||
                currentTable === "ICD-10-AM 1st edition code map 1"
            ) {
                this.getIc9To10AmRecord(searchInput, currentTable);
            } else if (
                currentTable === "ICD9_Code" ||
                currentTable === "ICD10_Code"
            ) {
                this.fetchIc9to10Record(searchInput, currentTable);
            } else {
                this.fetchIc10AMRecord(searchInput, currentTable);
            }
        } else {
            let responseMessage = {
                message: "Please input search parameters"
            };
            let isError = true;
            this.setResponse({ responseMessage, isError });
        }
    }

    sendIc9To10Amsuggestion(body) {
        const config = TokenConfig();
        this.setState({ loading: true });
        Axios.post("/api/postSuggestions", body, config)
            .then(res => {
                this.setState({ loading: false });
                console.log(res.data);
                let responseMessage = {
                    message: "Suggestion submitted"
                };
                let isError = false;
                this.setResponse({ responseMessage, isError });
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

    sendIc9To10suggestion(body) {
        const config = TokenConfig();
        this.setState({ loading: true });
        Axios.post("/api/post10Suggestion", body, config)
            .then(res => {
                this.setState({ loading: false });
                console.log(res.data);
                let responseMessage = {
                    message: "Suggestion submitted"
                };
                let isError = false;
                this.setResponse({ responseMessage, isError });
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

    sendIc10To10Amsuggestion(body) {
        const config = TokenConfig();
        this.setState({ loading: true });
        Axios.post("/api/postAmSuggestions", body, config)
            .then(res => {
                this.setState({ loading: false });
                console.log(res.data);
                let responseMessage = {
                    message: "Suggestion submitted"
                };
                let isError = false;
                this.setResponse({ responseMessage, isError });
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

    render() {
        const {
            searchInput,
            currentTable,
            ic9To10AmRecord,
            ic9To10Record,
            ic10To10AMRecord,
            openSnackBar,
            snackPosition,
            isError,
            responseMessage,
            loading
        } = this.state;
        return (
            <div className="container mt-4">
                <SimpleBackdrop open={loading} />
                <div className="search_bar">
                    <select
                        className="form-control drop_down_items"
                        onChange={e => this.selectCurrentTable(e)}
                    >
                        <option value="ICD-9-BPA code">
                            ICD-9 -- ICD-10AM
                        </option>
                        <option value="ICD-10-AM 1st edition code map 1">
                            ICD-10AM -- ICD-9
                        </option>
                        <option value="ICD9_Code">ICD-9 -- ICD-10</option>
                        <option value="ICD10_Code">ICD-10 -- ICD-9</option>
                        <option value="ICD-10 code">ICD-10 -- ICD-10AM</option>
                        <option value="ICD-10-AM Map">
                            ICD-10AM -- ICD-10
                        </option>
                    </select>

                    <input
                        type="text"
                        className="form-group"
                        id="search-bar"
                        placeholder="Input code and press search...."
                        onChange={e => this.onChange(e)}
                        value={searchInput}
                        name="searchInput"
                        onKeyDown={e => this.onSearchPress(e)}
                    />
                    <div
                        className="card searh_button"
                        onClick={() => this.searchItems()}
                    >
                        <div className="search_button_items">
                            <i className="fas fa-search"></i>
                            <label>Search</label>
                        </div>
                    </div>
                </div>

                {currentTable == "ICD-9-BPA code" && ic9To10AmRecord != null ? (
                    <Ic9To10AmMapping
                        record={ic9To10AmRecord}
                        setResponse={this.setResponse}
                        sendIc9To10Amsuggestion={this.sendIc9To10Amsuggestion}
                    />
                ) : currentTable == "ICD-10-AM 1st edition code map 1" &&
                  ic9To10AmRecord != null ? (
                    <Ic10AmTo9Mapping
                        record={ic9To10AmRecord}
                        setResponse={this.setResponse}
                        sendIc9To10Amsuggestion={this.sendIc9To10Amsuggestion}
                    />
                ) : currentTable == "ICD9_Code" && ic9To10Record != null ? (
                    <Ic9To10Mapping
                        record={ic9To10Record}
                        setResponse={this.setResponse}
                        sendIc9To10suggestion={this.sendIc9To10suggestion}
                    />
                ) : currentTable == "ICD10_Code" && ic9To10Record != null ? (
                    <Ic10To9Mapping
                        record={ic9To10Record}
                        setResponse={this.setResponse}
                        sendIc9To10suggestion={this.sendIc9To10suggestion}
                    />
                ) : currentTable == "ICD-10 code" &&
                  ic10To10AMRecord != null ? (
                    <Ic10To10AmMapping
                        record={ic10To10AMRecord}
                        setResponse={this.setResponse}
                        sendIc10To10Amsuggestion={this.sendIc10To10Amsuggestion}
                    />
                ) : currentTable == "ICD-10-AM Map" &&
                  ic10To10AMRecord != null ? (
                    <Ic10amTo10Mapping
                        record={ic10To10AMRecord}
                        setResponse={this.setResponse}
                        sendIc10To10Amsuggestion={this.sendIc10To10Amsuggestion}
                    />
                ) : (
                    <div />
                )}
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
