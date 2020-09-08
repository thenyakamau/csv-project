function switchAdminTables(status) {
    console.log(status);
    if (status === "ICD-10-mode") {
        document.querySelector("#suggest-table").style.display = "none";
        document.querySelector("#suggest-ten-table").style.display = "block";

        document.querySelector("#ic-link").style.display = "none";
        document.querySelector("#ic-am-link").style.display = "block";
    } else {
        document.querySelector("#suggest-table").style.display = "block";
        document.querySelector("#suggest-ten-table").style.display = "none";

        document.querySelector("#ic-link").style.display = "block";
        document.querySelector("#ic-am-link").style.display = "none";
    }
}

document.querySelector("#suggestion-selector").onchange = e => {
    switchAdminTables(e.target.value);
};
