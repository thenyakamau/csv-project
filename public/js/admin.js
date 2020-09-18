function switchAdminTables(status) {
    if (status === "ICD-10-mode") {
        document.querySelector("#suggest-table").style.display = "none";
        document.querySelector("#suggest-nine-table").style.display = "none";
        document.querySelector("#suggest-ten-table").style.display = "block";

        document.querySelector("#ic-link").style.display = "none";
        document.querySelector("#ic-nine-link").style.display = "none";
        document.querySelector("#ic-am-link").style.display = "block";
    } else if (status === "ICD-10-mode") {
        document.querySelector("#suggest-table").style.display = "none";
        document.querySelector("#suggest-nine-table").style.display = "block";
        document.querySelector("#suggest-ten-table").style.display = "none";

        document.querySelector("#ic-link").style.display = "none";
        document.querySelector("#ic-nine-link").style.display = "block";
        document.querySelector("#ic-am-link").style.display = "none";
    } else {
        document.querySelector("#suggest-table").style.display = "block";
        document.querySelector("#suggest-nine-table").style.display = "none";
        document.querySelector("#suggest-ten-table").style.display = "none";

        document.querySelector("#ic-link").style.display = "block";
        document.querySelector("#ic-nine-link").style.display = "none";
        document.querySelector("#ic-am-link").style.display = "none";
    }
}

document.querySelector("#suggestion-selector").onchange = e => {
    switchAdminTables(e.target.value);
};
