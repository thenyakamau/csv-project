let redirect = "";

function switchAdminTables(status) {
    if (status === "ICD-10am-mode") {
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

document.querySelector("#suggestion-selector").onchange = (e) => {
    switchAdminTables(e.target.value);
};

// document.querySelector("#btn_edit_ic9").addEventListener("click", (e) => {
//     const label = document.querySelector("#_modal_text");
//     const textContainer = document.createElement("div");
//     while (label.firstChild) {
//         label.firstChild.remove();
//     }
//     document.querySelector("#_simpleModal").style.display = "block";
//     textContainer.innerHTML = `Are you sure you want to update this ic9 -> icd 10Am records?`;
//     label.appendChild(textContainer);
//     redirect = "ICD-9-mode";
//     let targetId = e.target.parentElement.previousElementSibling.textContent;
// });

// document.querySelector("#btn_edit_ic10").addEventListener("click", () => {
//     document.querySelector("#_simpleModal").style.display = "block";
//     const label = document.querySelector("#_modal_text");
//     const textContainer = document.createElement("div");
//     textContainer.innerHTML = `Are you sure you want to update this ic9 -> icd 10 records?`;
//     label.appendChild(textContainer);
//     redirect = "ICD-10-mode";
// });

document.querySelector("#_closeModalBtn").addEventListener("click", () => {
    document.querySelector("#_simpleModal").style.display = "none";
});
