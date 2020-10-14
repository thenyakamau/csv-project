import React from "react";

export default function Ic9To10Table(props) {
    const { ic9To10Records } = props;
    return (
        <table className="table table-striped table-responsive w-100 d-block d-md-table display_none">
            <thead>
                <tr>
                    <th>ICD-9</th>
                    <th>Description</th>
                    <th></th>
                    <th>ICD-10</th>
                    <th>Description</th>
                </tr>
            </thead>
            <tbody>
                {ic9To10Records.map((record, index) => {
                    return (
                        <tr key={index}>
                            <td>{record.ICD9_Code}</td>
                            <td>{record.ICD9_Description}</td>
                            <td>
                                <i class="fas fa-arrow-right text-primary"></i>
                            </td>
                            <td>{record.ICD10_Code}</td>
                            <td>{record.ICD10_Descriptiom}</td>
                        </tr>
                    );
                })}
            </tbody>
        </table>
    );
}
