const list = document.querySelector("#record-list");
const head = document.querySelector("#table-ic-head");

const ten_list = document.querySelector("#record-ten-list");
const ten_head = document.querySelector("#table-ic10-head");

let records = [];
let record = {};

function fetchRecord(id) {
    if (id) {
        fetch(`/getRecord?id=${id}`, {
            method: "GET",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json"
            }
        })
            .then(res => res.json())
            .then(resJson => {
                record = resJson.record[0];
                openEditModel(record);
            })
            .catch(error => {
                const errors = {
                    responseMessage: error.response.data,
                    status: error.response.status
                };
            });
    }
}

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

function fetchIc10AMRecord(id) {
    if (id) {
        fetch(`/getRecordTen?id=${id}`, {
            method: "GET",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json"
            }
        })
            .then(res => res.json())
            .then(resJson => {
                record = resJson.record[0];
                openEdit10AMModel(record);
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

function displayRecord(record) {
    const row = document.createElement("tr");
    row.innerHTML = `<td>${record.ic9code}</td>
     <td>${record.ic9description}</td> 
     <td><i class="fas fa-arrow-right text-primary"></i></td> 
     <td>${record.ic10code}</td>
     <td>${record.ic10description}</td> `;

    list.appendChild(row);
}

function openEditModel(record) {
    const modal = document.getElementById("simpleModal");
    document.getElementById("modal-id").value = record.id;
    document.getElementById("modal-ic9-code").value = record.ic9code;
    document.getElementById("modal-ic9-description").value =
        record.ic9description;
    document.getElementById("modal-ic10-code").value = record.ic10code;
    document.getElementById("modal-ic10-description").value =
        record.ic10description;

    modal.style.display = "block";
}

function closeEditModal() {
    const modal = document.getElementById("simpleModal");
    modal.style.display = "none";
}

function openEdit10AMModel(record) {
    const modal = document.getElementById("ic10_simpleModal");
    document.getElementById("modal-id-ic").value = record.id;
    document.getElementById("modal-ic10-code-ic").value = record.ic10code;
    document.getElementById("modal-ic10-description-ic").value =
        record.ic10description;
    document.getElementById("modal-ic10am-code").value = record.ic10codeam;
    document.getElementById("modal-ic10am-description").value =
        record.ic10amdescription;

    modal.style.display = "block";
}

function closeEdit10AMModal() {
    const modal = document.getElementById("ic10_simpleModal");
    modal.style.display = "none";
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
    } else {
        getRecords(key, status);
    }
});

document.querySelector("#category-selector").onchange = e => {
    loadRecords(records, e.target.value);
};

document.querySelector("#record-list").addEventListener("click", e => {
    function getItemId() {
        if (e.target.classList.contains("edit")) {
            try {
                const id =
                    e.target.parentElement.previousElementSibling.textContent;
                fetchRecord(id);
            } catch (error) {
                console.log(error);
            }
        }
    }

    getItemId();
});

document.querySelector("#record-ten-list").addEventListener("click", e => {
    function getItemId() {
        if (e.target.classList.contains("edit")) {
            try {
                const id =
                    e.target.parentElement.previousElementSibling.textContent;
                fetchIc10AMRecord(id);
            } catch (error) {
                console.log(error);
            }
        }
    }

    getItemId();
});

document.getElementById("closeBtn").addEventListener("click", () => {
    closeEditModal();
});

document.getElementById("closeBtn-ic").addEventListener("click", () => {
    closeEdit10AMModal();
});

window.addEventListener("click", e => {
    const modal = document.getElementById("simpleModal");
    const ic_modal = document.getElementById("ic10_simpleModal");
    if (e.target === modal) {
        closeEditModal();
    } else if (e.target === ic_modal) {
        closeEdit10AMModal();
    }
});
