import React from "react";

export default function Ic10To10AmTable(props) {
    const { ic10To10AMRecord } = props;
    return (
        <table className="table table-striped table-responsive w-100 d-block d-md-table display_none">
            <thead>
                <tr>
                    <th>ICD-10</th>
                    <th>Description</th>
                    <th></th>
                    <th>ICD-10AM</th>
                    <th>Description</th>
                </tr>
            </thead>
            <tbody>
                {ic10To10AMRecord.map((record, index) => {
                    return (
                        <tr key={index}>
                            <td>{record.ic10code}</td>
                            <td>{record.ic10description}</td>
                            <td>
                                <i class="fas fa-arrow-right text-primary"></i>
                            </td>
                            <td>{record.ic10codeam}</td>
                            <td>{record.ic10amdescription}</td>
                        </tr>
                    );
                })}
            </tbody>
        </table>
    );
}
