import React, { useState, useEffect } from "react";

export default function Ic10To10AmMapping(props) {
    const { record, sendIc10To10Amsuggestion, setResponse } = props;

    const [ic10codeinput, setic10codeinput] = useState("");
    const [ic10amcodeinput, setIc10amcodeinput] = useState("");
    const [ic10descriptionsuggest, setIc10descriptionsuggest] = useState("");
    const [ic10amdescriptionsuggest, setIc10amdescriptionsuggest] = useState(
        ""
    );
    const [reason, setReason] = useState("");
    useEffect(() => {
        setic10codeinput(record.ic10code);
        setIc10amcodeinput(record.ic10codeam);
        setIc10descriptionsuggest(record.ic10description);
        setIc10amdescriptionsuggest(record.ic10amdescription);
        setReason("");
    }, [record]);

    function submit() {
        if (
            ic10codeinput &&
            ic10amcodeinput &&
            ic10descriptionsuggest &&
            ic10amdescriptionsuggest &&
            reason
        ) {
            let ic10code = record.ic10code;
            let ic10amcode = record.ic10codeam;
            let ic10description = record.ic10description;
            let ic10amdescription = record.ic10amdescription;
            let id = record.id;

            sendIc10To10Amsuggestion({
                ic10amcode,
                ic10amcodeinput,
                ic10code,
                ic10codeinput,
                ic10amdescriptionsuggest,
                ic10amdescription,
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
        <div className="card display_none" id="form-mapping">
            <div className="card-header">Edit Mapping</div>
            <div className="card-body">
                <div className="row justify-content-around">
                    <div className="form-group col-lg-6">
                        <label>Ic10 code</label>

                        <input
                            type="text"
                            name="ic10codeinput"
                            className="form-control"
                            value={ic10codeinput}
                            disabled
                        />
                    </div>

                    <div className="form-group col-lg-6">
                        <label>Ic10am code</label>
                        <input
                            type="text"
                            name="ic10amcodeinput"
                            className="form-control"
                            value={ic10amcodeinput}
                            onChange={e => setIc10amcodeinput(e.target.value)}
                        />
                    </div>
                </div>
                <div className="row justify-content-around">
                    <div className="form-group col-lg-6">
                        <label>Ic10 description</label>

                        <input
                            type="text"
                            name="ic10descriptionsuggest"
                            className="form-control"
                            value={ic10descriptionsuggest}
                            disabled
                        />
                    </div>
                    <div className="form-group col-lg-6">
                        <label>Ic10am description</label>

                        <input
                            type="text"
                            name="ic10amdescriptionsuggest"
                            className="form-control"
                            value={ic10amdescriptionsuggest}
                            onChange={e =>
                                setIc10amdescriptionsuggest(e.target.value)
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
