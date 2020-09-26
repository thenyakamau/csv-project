const list = document.querySelector("#record-list");
const head = document.querySelector("#table-ic-head");

const ten_list = document.querySelector("#record-ten-list");
const ten_head = document.querySelector("#table-ic10-head");

let record = {};

//! Start of IC9 to IC10 AM !//
function getIc9To10AmRecords(key, status) {
    fetch(`/getRecords?key=${key}&status=${status}`, {
        method: "GET",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json"
        }
    })
        .then(res => res.json())
        .then(resJson => {
            let records = resJson.records.data;
            if (status === "ICD-9-BPA code") {
                displayIC9To10AmRecord(records);
            } else {
                displayIC10AMTo9Record(records);
            }
        })
        .catch(error => {
            const errors = {
                responseMessage: error.response.data,
                status: error.response.status
            };
        });
}

function displayIC9To10AmRecord(records) {
    document.querySelector("#record-table").style.display = "block";
    document.querySelector("#record-ten-table").style.display = "none";
    while (list.firstChild) {
        list.firstChild.remove();
    }
    while (head.firstChild) {
        head.firstChild.remove();
    }
    const row = document.createElement("tr");
    row.innerHTML = `   <th>ICD-9</th>
        <th>Description</th>
        <th></th>
        <th>ICD-10AM</th>
        <th>Description</th>`;
    head.appendChild(row);
    records.forEach(record => {
        const row = document.createElement("tr");
        row.innerHTML = `<td>${record.ic9code}</td>
     <td>${record.ic9description}</td> 
     <td><i class="fas fa-arrow-right text-primary"></i></td> 
     <td>${record.ic10code}</td>
     <td>${record.ic10description}</td> `;

        list.appendChild(row);
    });
}

function displayIC10AMTo9Record(records) {
    document.querySelector("#record-table").style.display = "block";
    document.querySelector("#record-ten-table").style.display = "none";
    while (list.firstChild) {
        list.firstChild.remove();
    }
    while (head.firstChild) {
        head.firstChild.remove();
    }
    const row = document.createElement("tr");
    row.innerHTML = `   <th>ICD-10AM</th>
        <th>Description</th>
        <th></th>
        <th>ICD-9</th>
        <th>Description</th>`;
    head.appendChild(row);
    records.forEach(record => {
        const row = document.createElement("tr");
        row.innerHTML = `
        <td>${record.ic10code}</td>
        <td>${record.ic10description}</td> 
     <td><i class="fas fa-arrow-right text-primary"></i></td> 
     <td>${record.ic9code}</td>
     <td>${record.ic9description}</td> `;

        list.appendChild(row);
    });
}
//! End of IC9 to IC10 AM !//

//! Start of IC9 to IC10 !//
function fetchIc9to10Records(key, status) {
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
            let records = resJson.records.data;
            if (status === "ICD9_Code") {
                displayIc9to10Record(records);
            } else {
                displayIC10ToIC9Record(records);
            }
        })
        .catch(error => {
            const errors = {
                responseMessage: error.response.data,
                status: error.response.status
            };
        });
}

function displayIc9to10Record(records) {
    document.querySelector("#record-table").style.display = "block";
    document.querySelector("#record-ten-table").style.display = "none";
    while (list.firstChild) {
        list.firstChild.remove();
    }
    while (head.firstChild) {
        head.firstChild.remove();
    }
    const row = document.createElement("tr");
    row.innerHTML = `   <th>ICD-9</th>
        <th>Description</th>
        <th></th>
        <th>ICD-10</th>
        <th>Description</th>`;
    head.appendChild(row);
    records.forEach(record => {
        const row = document.createElement("tr");
        row.innerHTML = `<td>${record.ICD9_Code}</td>
         <td>${record.ICD9_Description}</td> 
         <td><i class="fas fa-arrow-right text-primary"></i></td> 
         <td>${record.ICD10_Code}</td>
         <td>${record.ICD10_Descriptiom}</td> `;

        list.appendChild(row);
    });
}

function displayIC10ToIC9Record(records) {
    document.querySelector("#record-table").style.display = "block";
    document.querySelector("#record-ten-table").style.display = "none";
    while (list.firstChild) {
        list.firstChild.remove();
    }
    while (head.firstChild) {
        head.firstChild.remove();
    }
    const row = document.createElement("tr");
    row.innerHTML = `   <th>ICD-10</th>
        <th>Description</th>
        <th></th>
        <th>ICD-9</th>
        <th>Description</th>`;
    head.appendChild(row);
    records.forEach(record => {
        const row = document.createElement("tr");
        row.innerHTML = `
        <td>${record.ICD10_Code}</td>
         <td>${record.ICD10_Descriptiom}</td> 
         <td><i class="fas fa-arrow-right text-primary"></i></td> 
         <td>${record.ICD9_Code}</td>
         <td>${record.ICD9_Description}</td> `;

        list.appendChild(row);
    });
}
//! End of IC9 to IC10  !//

//! Start of IC10 to IC10 AM !//
function fetchIc10AMRecords(key, status) {
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
}

function createIC10Records(status, input) {
    document.querySelector("#record-table").style.display = "none";
    document.querySelector("#record-ten-table").style.display = "block";
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
//! End of IC10 to IC10 AM !//

document.querySelector("#search_button").addEventListener("click", () => {
    const key = document.querySelector("#search-bar").value;
    const status = document.querySelector("#category-selector").value;
    if (status === "ICD-10 code" || status === "ICD-10-AM Map") {
        fetchIc10AMRecords(key, status);
    } else if (status === "ICD9_Code" || status === "ICD10_Code") {
        fetchIc9to10Records(key, status);
    } else if (
        status === "ICD-9-BPA code" ||
        status === "ICD-10-AM 1st edition code map 1"
    ) {
        getIc9To10AmRecords(key, status);
    }
});

document.querySelector("#category-selector").onchange = e => {
    document.querySelector("#record-table").style.display = "none";
    document.querySelector("#record-ten-table").style.display = "none";
};
