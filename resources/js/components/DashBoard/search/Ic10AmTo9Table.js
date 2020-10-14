import React from "react";

export default function Ic10AmTo9Table(props) {
    const { ic9To10AmRecord } = props;
    return (
        <table className="table table-striped table-responsive w-100 d-block d-md-table display_none">
            <thead>
                <tr>
                    <th>ICD-10AM</th>
                    <th>Description</th>
                    <th></th>
                    <th>ICD-9</th>
                    <th>Description</th>
                </tr>
            </thead>
            <tbody>
                {ic9To10AmRecord.map((record, index) => {
                    return (
                        <tr key={index}>
                            <td>{record.ic10code}</td>
                            <td>{record.ic10description}</td>
                            <td>
                                <i class="fas fa-arrow-right text-primary"></i>
                            </td>
                            <td>{record.ic9code}</td>
                            <td>{record.ic9description}</td>
                        </tr>
                    );
                })}
            </tbody>
        </table>
    );
}
