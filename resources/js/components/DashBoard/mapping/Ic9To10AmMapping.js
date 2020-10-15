import React, { useState, useEffect } from "react";

export default function Ic9To10AmMapping(props) {
    const { record, sendIc9To10Amsuggestion, setResponse } = props;

    const [ic9codeinput, setic9codeinput] = useState("");
    const [ic10codeinput, setIc10codeinput] = useState("");
    const [ic9descriptionsuggest, setIc9descriptionsuggest] = useState("");
    const [ic10descriptionsuggest, setIc10descriptionsuggest] = useState("");
    const [reason, setReason] = useState("");

    useEffect(() => {
        setic9codeinput(record.ic9code);
        setIc10codeinput(record.ic10code);
        setIc9descriptionsuggest(record.ic9description);
        setIc10descriptionsuggest(record.ic10description);
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
            const {
                ic9code,
                ic10code,
                ic9description,
                ic10description,
                id
            } = record;
            sendIc9To10Amsuggestion({
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
                        <label>Ic10am code</label>

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
                        <label>Ic10am description</label>

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
