let ic9form = document.querySelector("#form-mapping");
let ic10formam = document.querySelector("#form-mapping2");
let ic10form = document.querySelector("#form-mapping3");

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
            loadIcd10Record(response);
        })
        .catch(error => {
            ic9form.style.display = "none";
            ic10form.style.display = "none";
            ic10formam.style.display = "none";
            window.alert("Record not found");
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
            ic9form.style.display = "none";
            ic10form.style.display = "none";
            ic10formam.style.display = "none";
            window.alert("Record not found");
        });
}

function getIc9to10Records(key, status) {
    fetch(`/fetchIc9to10Records?key=${key}&status=${status}`, {
        method: "GET",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json"
        }
    })
        .then(res => res.json())
        .then(resJson => {
            let response = resJson.records.data[0];
            inputIc9to10Records(response);
        })
        .catch(error => {
            ic9form.style.display = "none";
            ic10form.style.display = "none";
            ic10formam.style.display = "none";
            window.alert("Record not found");
        });
}

function loadIcd9Record(record) {
    if (record.id) {
        ic9form.style.display = "block";
        ic10form.style.display = "none";
        ic10formam.style.display = "none";

        document.querySelector("#mapping-id").value = record.id;
        document.querySelector("#mapping-ic9-code").value = record.ic9code;
        document.querySelector("#mapping-ic9-code-input").value =
            record.ic9code;
        document.querySelector("#mapping-ic9-description").value =
            record.ic9description;
        document.querySelector("#mapping-ic9-description-input").value =
            record.ic9description;
        document.querySelector("#mapping-ic10am-code").value = record.ic10code;
        document.querySelector("#mapping-ic10am-code-input").value =
            record.ic10code;
        document.querySelector("#mapping-ic10am-description").value =
            record.ic10description;
        document.querySelector("#mapping-ic10am-description-input").value =
            record.ic10description;
    } else {
        ic9form.style.display = "none";
        ic10form.style.display = "none";
        ic10formam.style.display = "none";
        window.alert("Record not found");
    }
}

function loadIcd10Record(record) {
    if (record.id) {
        ic9form.style.display = "none";
        ic10form.style.display = "none";
        ic10formam.style.display = "block";

        document.querySelector("#mapping-id2").value = record.id;
        document.querySelector("#mapping-ic10-code").value = record.ic10code;
        document.querySelector("#mapping-ic10-code-input").value =
            record.ic10code;
        document.querySelector("#mapping-ic10-description").value =
            record.ic10description;
        document.querySelector("#mapping-ic10-description-input").value =
            record.ic10description;
        document.querySelector("#mapping-ic10am-code2").value =
            record.ic10codeam;
        document.querySelector("#mapping-ic10am-code2-input").value =
            record.ic10codeam;
        document.querySelector("#mapping-ic10am-description2").value =
            record.ic10amdescription;
        document.querySelector("#mapping-ic10am-description2-input").value =
            record.ic10amdescription;
    } else {
        ic9form.style.display = "none";
        ic10form.style.display = "none";
        ic10formam.style.display = "none";
        window.alert("Record not found");
    }
}

function inputIc9to10Records(record) {
    if (record.id) {
        console.log(record);
        ic9form.style.display = "none";
        ic10form.style.display = "block";
        ic10formam.style.display = "none";

        document.querySelector("#mapping-id3").value = record.id;
        document.querySelector("#mapping-ic9-code2").value = record.ICD9_Code;
        document.querySelector("#mapping-ic9-code-input2").value =
            record.ICD9_Code;
        document.querySelector("#mapping-ic9-description2").value =
            record.ICD9_Description;
        document.querySelector("#mapping-ic9-description-input2").value =
            record.ICD9_Description;
        document.querySelector("#mapping-ic10-code2").value = record.ICD10_Code;
        document.querySelector("#mapping-ic10-code-input2").value =
            record.ICD10_Code;
        document.querySelector("#mapping-ic10-description2").value =
            record.ICD10_Descriptiom;
        document.querySelector("#mapping-ic10-description-input2").value =
            record.ICD10_Descriptiom;
    } else {
        ic9form.style.display = "none";
        ic10form.style.display = "none";
        ic10formam.style.display = "none";
        window.alert("Record not found");
    }
}

document.querySelector("#search_button_map").addEventListener("click", () => {
    const key = document.querySelector("#search-bar-map").value;
    const status = document.querySelector("#category-selector-mapping").value;

    if (key) {
        if (status === "ICD-10 code") {
            fetchIc10AMRecord(key, status);
        } else if (status === "ICD9_Code") {
            getIc9to10Records(key, status);
        } else {
            getRecord(key, status);
        }
    } else {
        ic9form.style.display = "none";
        ic10form.style.display = "none";
        window.alert("Please input a Search criteria");
    }
});
