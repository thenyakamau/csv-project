const list = document.querySelector("#record-list");
const head = document.querySelector("#table-ic-head");

const ten_list = document.querySelector("#record-ten-list");
const ten_head = document.querySelector("#table-ic10-head");

let records = [];
let record = {};

function getRecords(key, status) {
    fetch(`/getRecords?key=${key}&status=${status}`, {
        method: "GET",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json"
        }
    })
        .then(res => res.json())
        .then(resJson => {
            records = resJson.records.data;
            loadRecords(records, status);
        })
        .catch(error => {
            const errors = {
                responseMessage: error.response.data,
                status: error.response.status
            };
        });
}

function fetchIc9to10Records(key, status) {
    if (key) {
        fetch(`/fetchIc9to10Records?key=${key}&status=${status}`, {
            method: "GET",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json"
            }
        })
            .then(res => res.json())
            .then(resJson => {
                while (list.firstChild) {
                    list.firstChild.remove();
                }
                let response = resJson.records.data;
                createIc9to10Records(response);
            })
            .catch(error => {
                const errors = {
                    responseMessage: error.response.data,
                    status: error.response.status
                };
            });
    } else {
        fetch(`/fetchIc9to10Records`, {
            method: "GET",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json"
            }
        })
            .then(res => res.json())
            .then(resJson => {
                while (list.firstChild) {
                    list.firstChild.remove();
                }
                let response = resJson.records.data;
                createIc9to10Records(response);
            })
            .catch(error => {
                const errors = {
                    responseMessage: error.response.data,
                    status: error.response.status
                };
            });
    }
}

function fetchIc10AMRecords(key, status) {
    if (key) {
        fetch(`/getRecordsTen?key=${key}&status=${status}`, {
            method: "GET",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json"
            }
        })
            .then(res => res.json())
            .then(resJson => {
                let response = resJson.records.data;
                createIC10Records(status, response);
            })
            .catch(error => {
                const errors = {
                    responseMessage: error.response.data,
                    status: error.response.status
                };
            });
    } else {
        fetch(`/getRecordsTen`, {
            method: "GET",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json"
            }
        })
            .then(res => res.json())
            .then(resJson => {
                let response = resJson.records.data;
                createIC10Records(status, response);
            })
            .catch(error => {
                const errors = {
                    responseMessage: error.response.data,
                    status: error.response.status
                };
            });
    }
}

function createIC10Records(status, input) {
    while (ten_list.firstChild) {
        ten_list.firstChild.remove();
    }
    while (ten_head.firstChild) {
        ten_head.firstChild.remove();
    }
    if (status === "ICD-10 code") {
        const row = document.createElement("tr");
        row.innerHTML = `   <th>ICD-10</th>
        <th>Description</th>
        <th></th>
        <th>ICD-10AM</th>
        <th>Description</th>`;
        ten_head.appendChild(row);
        input.forEach(record => {
            displayICD10Record(record);
        });
    } else {
        const row = document.createElement("tr");
        row.innerHTML = `   <th>ICD-10AM</th>
        <th>Description</th>
        <th></th>
        <th>ICD-10</th>
        <th>Description</th>`;
        ten_head.appendChild(row);
        input.forEach(record => {
            displayICD10AMRecord(record);
        });
    }
}

function createIc9to10Records(response) {
    response.forEach(record => {
        displayIc9to10Record(record);
    });
}

function displayIc9to10Record(record) {
    const row = document.createElement("tr");
    row.innerHTML = `<td>${record.ICD9_Code}</td>
     <td>${record.ICD9_Description}</td> 
     <td><i class="fas fa-arrow-right text-primary"></i></td> 
     <td>${record.ICD10_Code}</td>
     <td>${record.ICD10_Descriptiom}</td> `;

    list.appendChild(row);
}

function displayICD10Record(record) {
    const row = document.createElement("tr");
    row.innerHTML = `
    <td>${record.ic10code}</td>
    <td>${record.ic10description}</td> 
     <td><i class="fas fa-arrow-right text-primary"></i></td> 
     <td>${record.ic10codeam}</td>
     <td>${record.ic10amdescription}</td> `;

    ten_list.appendChild(row);
}

function displayICD10AMRecord(record) {
    const row = document.createElement("tr");
    row.innerHTML = `
    <td>${record.ic10codeam}</td>
    <td>${record.ic10amdescription}</td> 
     <td><i class="fas fa-arrow-right text-primary"></i></td> 
     <td>${record.ic10code}</td>
     <td>${record.ic10description}</td> `;

    ten_list.appendChild(row);
}

function loadRecords(input, status) {
    document.querySelector("#record-table").style.display = "block";
    document.querySelector("#record-ten-table").style.display = "none";
    while (list.firstChild) {
        list.firstChild.remove();
    }
    while (head.firstChild) {
        head.firstChild.remove();
    }
    if (status === "ICD-10-AM 1st edition code map 1") {
        const row = document.createElement("tr");
        row.innerHTML = `   <th>ICD-10AM</th>
        <th>Description</th>
        <th></th>
        <th>ICD-9</th>
        <th>Description</th>`;
        head.appendChild(row);
        input.forEach(record => {
            displayIC10Record(record);
        });
    } else if (status === "ICD-10 code" || status === "ICD-10-AM Map") {
        document.querySelector("#record-table").style.display = "none";
        document.querySelector("#record-ten-table").style.display = "block";

        fetchIc10AMRecords(null, status);
    } else if (status === "ICD9_Code") {
        const row = document.createElement("tr");
        row.innerHTML = `   <th>ICD-9</th>
            <th>Description</th>
            <th></th>
            <th>ICD-10</th>
            <th>Description</th>`;
        head.appendChild(row);
        fetchIc9to10Records(null, status);
    } else {
        const row = document.createElement("tr");
        row.innerHTML = `   <th>ICD-9</th>
        <th>Description</th>
        <th></th>
        <th>ICD-10AM</th>
        <th>Description</th>`;
        head.appendChild(row);
        input.forEach(record => {
            displayRecord(record);
        });
    }
}

function displayRecord(record) {
    const row = document.createElement("tr");
    row.innerHTML = `<td>${record.ic9code}</td>
     <td>${record.ic9description}</td> 
     <td><i class="fas fa-arrow-right text-primary"></i></td> 
     <td>${record.ic10code}</td>
     <td>${record.ic10description}</td> `;

    list.appendChild(row);
}

function displayIC10Record(record) {
    const row = document.createElement("tr");
    row.innerHTML = `
    <td>${record.ic10code}</td>
    <td>${record.ic10description}</td> 
     <td><i class="fas fa-arrow-right text-primary"></i></td> 
     <td>${record.ic9code}</td>
     <td>${record.ic9description}</td> `;

    list.appendChild(row);
}

document.addEventListener("DOMContentLoaded", () => {
    function getRecords() {
        const status = document.querySelector("#category-selector").value;

        fetch("/getRecords", {
            method: "GET",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json"
            }
        })
            .then(res => res.json())
            .then(resJson => {
                records = resJson.records.data;
                loadRecords(records, status);
            })
            .catch(error => {
                const errors = {
                    responseMessage: error.response.data,
                    status: error.response.status
                };
            });
    }

    getRecords();
});

document.querySelector("#search_button").addEventListener("click", () => {
    const key = document.querySelector("#search-bar").value;
    const status = document.querySelector("#category-selector").value;
    if (status === "ICD-10 code" || status === "ICD-10-AM Map") {
        fetchIc10AMRecords(key, status);
    } else if ("ICD9_Code") {
        fetchIc9to10Records(key, status);
    } else {
        getRecords(key, status);
    }
});

document.querySelector("#category-selector").onchange = e => {
    loadRecords(records, e.target.value);
};
