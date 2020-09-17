let ic9form = document.querySelector("#form-mapping");
let ic10form = document.querySelector("#form-mapping2");

function fetchIc10AMRecord(key, status) {
    fetch(`/getRecordsTen?key=${key}&status=${status}`, {
        method: "GET",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json"
        }
    })
        .then(res => res.json())
        .then(resJson => {
            let response = resJson.records.data[0];
            console.log(response);
        })
        .catch(error => {
            const errors = {
                responseMessage: error.response.data,
                status: error.response.status
            };
        });
}

function getRecord(key, status) {
    fetch(`/getRecords?key=${key}&status=${status}`, {
        method: "GET",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json"
        }
    })
        .then(res => res.json())
        .then(resJson => {
            let record = resJson.records.data[0];
            loadIcd9Record(record);
        })
        .catch(error => {
            const errors = {
                responseMessage: error.response.data,
                status: error.response.status
            };
        });
}

function loadIcd9Record(record) {
    console.log(record);
    ic9form.style.display = "block";
    ic10form.style.display = "none";

    document.querySelector("#mapping-id").value = record.id;
    document.querySelector("#mapping-ic9-code").value = record.ic9code;
    document.querySelector("#mapping-ic9-description").value =
        record.ic10description;
    document.querySelector("#mapping-ic10am-code").value = record.ic9code;
    document.querySelector("#mapping-ic10am-description").value =
        record.ic10description;
}

function loadIcd10Record(record) {}

document.querySelector("#search_button_map").addEventListener("click", () => {
    const key = document.querySelector("#search-bar-map").value;
    const status = document.querySelector("#category-selector-mapping").value;

    if (key) {
        if (status === "ICD-10 code") {
            fetchIc10AMRecord(key, status);
        } else {
            getRecord(key, status);
        }
    } else {
        ic9form.style.display = "none";
        ic10form.style.display = "none";
    }
});
