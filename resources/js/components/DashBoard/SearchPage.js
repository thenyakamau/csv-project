import Snackbar from "@material-ui/core/Snackbar";
import Alert from "@material-ui/lab/Alert";
import Axios from "axios";
import React, { Component } from "react";
import TokenConfig from "../util/TokenConfig";
import SimpleBackdrop from "../widgets/SimpleBackDrop";
import "./DashBoard.css";
import Ic10AmTo10 from "./search/Ic10AmTo10";
import Ic10AmTo9Table from "./search/Ic10AmTo9Table";
import Ic10To10AmTable from "./search/Ic10To10AmTable";
import Ic10To9Table from "./search/Ic10To9Table";
import Ic9To10AmTable from "./search/Ic9To10AmTable";
import Ic9To10Table from "./search/Ic9To10Table";

export default class SearchPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            ic9To10AmRecord: [],
            ic9To10Records: [],
            ic10To10AMRecord: [],
            currentTable: "ICD-9-BPA code",
            isError: null,
            responseMessage: null,
            loading: false,
            searchInput: "",
            openSnackBar: false,
            snackPosition: { vertical: "top", horizontal: "center" }
        };
        this.getIc9To10AmRecords = this.getIc9To10AmRecords.bind(this);
        this.setResponse = this.setResponse.bind(this);
        this.closeSnackBar = this.closeSnackBar.bind(this);
        this.selectCurrentTable = this.selectCurrentTable.bind(this);
        this.onChange = this.onChange.bind(this);
        this.onSearchPress = this.onSearchPress.bind(this);
        this.searchItems = this.searchItems.bind(this);
        this.fetchIc9to10Records = this.fetchIc9to10Records.bind(this);
        this.fetchIc10AMRecords = this.fetchIc10AMRecords.bind(this);
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

    getIc9To10AmRecords(key, status) {
        const config = TokenConfig();
        this.setState({ loading: true });
        Axios.get(`/getRecords?key=${key}&status=${status}`, config)
            .then(res => {
                this.setState({ loading: false });
                let ic9To10Records = res.data.records.data;

                if (ic9To10Records.length > 0) {
                    this.setState({ ic9To10AmRecord: ic9To10Records });
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

    fetchIc9to10Records(key, status) {
        const config = TokenConfig();
        this.setState({ loading: true });
        Axios.get(`/fetchIc9to10Records?key=${key}&status=${status}`, config)
            .then(res => {
                this.setState({ loading: false });
                let ic9To10Records = res.data.records.data;
                if (ic9To10Records.length > 0) {
                    this.setState({ ic9To10Records: ic9To10Records });
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

    fetchIc10AMRecords(key, status) {
        const config = TokenConfig();
        this.setState({ loading: true });

        Axios.get(`/getRecordsTen?key=${key}&status=${status}`, config)
            .then(res => {
                this.setState({ loading: false });
                let ic10To10AmRecords = res.data.records.data;
                if (ic10To10AmRecords.length > 0) {
                    this.setState({ ic10To10AMRecord: ic10To10AmRecords });
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
        if (
            currentTable === "ICD-9-BPA code" ||
            currentTable === "ICD-10-AM 1st edition code map 1"
        ) {
            this.getIc9To10AmRecords(searchInput, currentTable);
        } else if (
            currentTable === "ICD9_Code" ||
            currentTable === "ICD10_Code"
        ) {
            this.fetchIc9to10Records(searchInput, currentTable);
        } else {
            this.fetchIc10AMRecords(searchInput, currentTable);
        }
    }

    render() {
        const {
            currentTable,
            ic9To10AmRecord,
            ic9To10Records,
            ic10To10AMRecord,
            searchInput,
            isError,
            snackPosition,
            responseMessage,
            openSnackBar,
            loading
        } = this.state;
        console.log(responseMessage);
        return (
            <div className="container mt-2">
                <SimpleBackdrop open={loading} />
                <div className="row justify-content-between search_header">
                    <div>
                        <h4>Search Codes</h4>
                    </div>

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
                            <option value="ICD-10 code">
                                ICD-10 -- ICD-10AM
                            </option>
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
                </div>

                <div className="card">
                    <div className="card-header">
                        <label className="align-items-center">
                            Search Tips
                        </label>
                    </div>
                    <div className="card-body">
                        Use the switch on the the search box to toggle between
                        ICD-9 and ICD-10 codes. You may type the entire code or
                        a fraction of the code into the search box for results.
                        The initial data is to give a concept of how the data
                        should seem plus dummy searches.
                    </div>
                </div>

                <div className="card mt-4">
                    <div className="card-header records_header">
                        <h4>Records</h4>

                        {currentTable === "ICD-9-BPA code" ||
                        currentTable === "ICD-10-AM 1st edition code map 1" ? (
                            <a
                                href="/exportRecords"
                                class="btn btn-primary"
                                id="record_link_download"
                            >
                                Download
                            </a>
                        ) : currentTable === "ICD9_Code" ||
                          currentTable === "ICD10_Code" ? (
                            <a
                                href="/exportRecordsNine"
                                class="btn btn-primary display_none"
                                id="record_nine_link_download"
                            >
                                Download
                            </a>
                        ) : (
                            <a
                                href="/exportRecordsTen"
                                class="btn btn-primary display_none"
                                id="record_ten_link_download"
                            >
                                Download
                            </a>
                        )}
                    </div>
                    <div className="card-body">
                        <div id="record-table">
                            {currentTable == "ICD-9-BPA code" ? (
                                <Ic9To10AmTable
                                    ic9To10AmRecord={ic9To10AmRecord}
                                />
                            ) : currentTable ==
                              "ICD-10-AM 1st edition code map 1" ? (
                                <Ic10AmTo9Table
                                    ic9To10AmRecord={ic9To10AmRecord}
                                />
                            ) : currentTable == "ICD9_Code" ? (
                                <Ic9To10Table ic9To10Records={ic9To10Records} />
                            ) : currentTable == "ICD10_Code" ? (
                                <Ic10To9Table ic9To10Records={ic9To10Records} />
                            ) : currentTable == "ICD-10 code" ? (
                                <Ic10To10AmTable
                                    ic10To10AMRecord={ic10To10AMRecord}
                                />
                            ) : (
                                <Ic10AmTo10
                                    ic10To10AMRecord={ic10To10AMRecord}
                                />
                            )}
                        </div>

                        <div id="record-ten-table">
                            <table className="table table-striped table-responsive record_ten_table w-100 d-block d-md-table">
                                <thead id="table-ic10-head"></thead>
                                <tbody id="record-ten-list"></tbody>
                            </table>
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
