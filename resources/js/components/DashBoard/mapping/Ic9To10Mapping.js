import React, { useState, useEffect } from "react";

export default function Ic9To10Mapping(props) {
    const { record, sendIc9To10suggestion, setResponse } = props;

    const [ic9codeinput, setic9codeinput] = useState("");
    const [ic10codeinput, setIc10codeinput] = useState("");
    const [ic9descriptionsuggest, setIc9descriptionsuggest] = useState("");
    const [ic10descriptionsuggest, setIc10descriptionsuggest] = useState("");
    const [reason, setReason] = useState("");

    useEffect(() => {
        setic9codeinput(record.ICD9_Code);
        setIc10codeinput(record.ICD10_Code);
        setIc9descriptionsuggest(record.ICD9_Description);
        setIc10descriptionsuggest(record.ICD10_Descriptiom);
        setReason("");
    }, [record]);

    function submit() {
        if (
            ic9codeinput &&
            ic10codeinput &&
            ic9descriptionsuggest &&
            ic10descriptionsuggest &&
            reason
        ) {
            let ic9code = record.ICD9_Code;
            let ic10code = record.ICD10_Code;
            let ic9description = record.ICD9_Description;
            let ic10description = record.ICD10_Descriptiom;
            let id = record.id;

            sendIc9To10suggestion({
                ic9code,
                ic9codeinput,
                ic10code,
                ic10codeinput,
                ic9description,
                ic9descriptionsuggest,
                ic10description,
                ic10descriptionsuggest,
                id,
                reason
            });
        } else if (!reason) {
            let responseMessage = {
                message: "Please input reason"
            };
            let isError = true;
            setResponse({ responseMessage, isError });
        } else {
            let responseMessage = {
                message: "Please input all parameters"
            };
            let isError = true;
            setResponse({ responseMessage, isError });
        }
    }

    return (
        <div className="card ">
            <div className="card-header">Edit Mapping</div>
            <div className="card-body">
                <div className="row justify-content-around">
                    <div className="form-group col-lg-6">
                        <label>Ic9 code</label>
                        <input
                            type="text"
                            name="ic9codeinput"
                            className="form-control"
                            value={ic9codeinput}
                            disabled
                        />
                    </div>

                    <div className="form-group col-lg-6">
                        <label>Ic10 code</label>

                        <input
                            type="text"
                            name="ic10codeinput"
                            className="form-control"
                            value={ic10codeinput}
                            onChange={e => setIc10codeinput(e.target.value)}
                        />
                    </div>
                </div>
                <div className="row justify-content-around">
                    <div className="form-group col-lg-6">
                        <label>Ic9 description</label>

                        <input
                            type="text"
                            name="ic9descriptionsuggest"
                            className="form-control"
                            value={ic9descriptionsuggest}
                            disabled
                        />
                    </div>

                    <div className="form-group col-lg-6">
                        <label>Ic10 description</label>

                        <input
                            type="text"
                            name="ic10descriptionsuggest"
                            className="form-control"
                            value={ic10descriptionsuggest}
                            onChange={e =>
                                setIc10descriptionsuggest(e.target.value)
                            }
                        />
                    </div>
                </div>
                <div className="form-group">
                    <label>Reason</label>
                    <textarea
                        name="reason"
                        rows="5"
                        className="form-control"
                        placeholder="Please input reason for change"
                        value={reason}
                        onChange={e => setReason(e.target.value)}
                    ></textarea>
                </div>
                <center>
                    <button
                        className="btn btn-primary btn-lg"
                        onClick={() => submit()}
                    >
                        Submit Suggestion
                    </button>
                </center>
            </div>
        </div>
    );
}
