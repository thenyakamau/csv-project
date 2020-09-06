const list = document.querySelector("#record-list");

function displayRecord(record) {
    const row = document.createElement("tr");
    row.innerHTML = `<td>${record.ic9code}</td>
     <td>${record.ic9description}</td> 
     <td><i class="fas fa-arrow-right text-primary"></i></td> 
     <td>${record.ic10code}</td>
     <td>${record.ic10description}</td> `;

    list.appendChild(row);
}

document.addEventListener("DOMContentLoaded", () => {
    function getRecords() {
        fetch("/getRecords", {
            method: "GET",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
            },
        })
            .then((res) => res.json())
            .then((resJson) => {
                // console.log(resJson);
                resJson.records.data.forEach((record) => {
                    displayRecord(record);
                });
            })
            .catch((error) => {
                const errors = {
                    responseMessage: error.response.data,
                    status: error.response.status,
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
                "Content-Type": "application/json",
            },
        })
            .then((res) => res.json())
            .then((resJson) => {
                while (list.firstChild) {
                    list.firstChild.remove();
                }
                resJson.records.data.forEach((record) => {
                    displayRecord(record);
                });
            })
            .catch((error) => {
                const errors = {
                    responseMessage: error.response.data,
                    status: error.response.status,
                };
            });
    }

    getRecords();
});
