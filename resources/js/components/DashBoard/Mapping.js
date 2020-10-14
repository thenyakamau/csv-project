import React, { Component } from "react";

export default class Mapping extends Component {
    onChange(e) {
        this.setState({ [e.target.name]: e.target.value });
    }

    selectCurrentTable(e) {
        this.setState({ currentTable: e.target.value });
    }

    closeSnackBar() {
        this.setState({ openSnackBar: false });
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
        return (
            <div class="container mt-4">
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
                <div class="card display_none" id="form-mapping">
                    <div class="card-header">Edit Mapping</div>
                    <div class="card-body">
                        <div>
                            <input
                                type="hidden"
                                id="mapping-id"
                                name="id"
                                class="form-control"
                            />
                            <div class="row justify-content-around">
                                <div class="form-group col-lg-6">
                                    <label>Ic9 code</label>
                                    <input
                                        type="hidden"
                                        id="mapping-ic9-code"
                                        name="ic9code"
                                        class="form-control"
                                    />
                                    <input
                                        type="text"
                                        id="mapping-ic9-code-input"
                                        name="ic9codeinput"
                                        class="form-control"
                                        disabled
                                    />
                                </div>

                                <div class="form-group col-lg-6">
                                    <label>Ic10am code</label>
                                    <input
                                        type="hidden"
                                        id="mapping-ic10am-code"
                                        name="ic10code"
                                        class="form-control"
                                    />
                                    <input
                                        type="text"
                                        id="mapping-ic10am-code-input"
                                        name="ic10codeinput"
                                        class="form-control"
                                        disabled
                                    />
                                </div>
                            </div>
                            <div class="row justify-content-around">
                                <div class="form-group col-lg-6">
                                    <label>Ic9 description</label>
                                    <input
                                        type="hidden"
                                        id="mapping-ic9-description"
                                        name="ic9description"
                                        class="form-control"
                                    />
                                    <input
                                        type="text"
                                        id="mapping-ic9-description-input"
                                        name="ic9descriptionsuggest"
                                        class="form-control"
                                    />
                                </div>

                                <div class="form-group col-lg-6">
                                    <label>Ic10am description</label>
                                    <input
                                        type="hidden"
                                        id="mapping-ic10am-description"
                                        name="ic10description"
                                        class="form-control"
                                    />
                                    <input
                                        type="text"
                                        id="mapping-ic10am-description-input"
                                        name="ic10descriptionsuggest"
                                        class="form-control"
                                    />
                                </div>
                            </div>
                            <div class="form-group">
                                <label>Reason</label>
                                <textarea
                                    name="reason"
                                    id=""
                                    rows="5"
                                    class="form-control"
                                    placeholder="Please input reason for change"
                                    id="mapping-reason"
                                ></textarea>
                            </div>
                            <center>
                                <input
                                    type="submit"
                                    value="Submit Suggestion"
                                    class="btn btn-primary btn-lg"
                                    id=""
                                />
                            </center>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
