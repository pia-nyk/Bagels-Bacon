
function showAddButton(imageid, linkid) {
    document.getElementById(imageid).style.opacity = "0.4";
    document.getElementById(linkid).style.display = "block";
}

function hideAddButton(imageid, linkid) {
    document.getElementById(imageid).style.opacity = "1";
    document.getElementById(linkid).style.display = "none";
}

function showOrderSummaryBox() {
    document.getElementById("main-body").style.opacity = "0.3";
    document.getElementById("order-summary-overlay").style.display = "block";
}

function closeOrderSummaryBox() {
    document.getElementById("main-body").style.opacity = "1";
    document.getElementById("order-summary-overlay").style.display = "none";
}

function showSuccessPaymentBox() {
    document.getElementById("order-summary-overlay").style.display = "none";
    document.getElementById("success-overlay").style.display = "block";
}

function closeSuccessBox() {
    if(document.getElementById("success-overlay").style.display === "block") {
        document.getElementById("success-overlay").style.display = "none";
        document.getElementById("main-body").style.opacity = "1";
    }
}