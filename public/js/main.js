const list = document.querySelector("#record-list");
const head = document.querySelector("#table-ic-head");
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

function loadRecords(input, status) {
    while (list.firstChild) {
        list.firstChild.remove();
    }
    while (head.firstChild) {
        head.firstChild.remove();
    }
    if (status === "ICD-10-AM 1st edition code map 1") {
        const row = document.createElement("tr");
        row.innerHTML = `   <th>ICD-10</th>
        <th>Description</th>
        <th></th>
        <th>ICD-9</th>
        <th>Description</th>
        <th>Id</th>
        <th>Actions</th>`;
        head.appendChild(row);
        input.forEach(record => {
            displayIC10Record(record);
        });
    } else {
        const row = document.createElement("tr");
        row.innerHTML = `   <th>ICD-9</th>
        <th>Description</th>
        <th></th>
        <th>ICD-10</th>
        <th>Description</th>
        <th>Id</th>
        <th>Actions</th>`;
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
     <td>${record.ic9description}</td> 
     <td>${record.id}</td> 
     <td><a href="#" class = "btn btn-success btn-sm m-1 edit" ><i class="fas fa-pen edit"></i></a></td>`;

    list.appendChild(row);
}

function displayRecord(record) {
    const row = document.createElement("tr");
    row.innerHTML = `<td>${record.ic9code}</td>
     <td>${record.ic9description}</td> 
     <td><i class="fas fa-arrow-right text-primary"></i></td> 
     <td>${record.ic10code}</td>
     <td>${record.ic10description}</td> 
     <td>${record.id}</td> 
     <td><a href="#" class = "btn btn-success btn-sm m-1 edit" ><i class="fas fa-pen edit"></i></a></td>`;

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

    function getRecords() {
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

    getRecords();
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

document.getElementById("closeBtn").addEventListener("click", () => {
    closeEditModal();
});

window.addEventListener("click", e => {
    const modal = document.getElementById("simpleModal");
    if (e.target === modal) {
        closeEditModal();
    }
});
