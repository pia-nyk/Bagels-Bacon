
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
    getCartData();
}

function closeOrderSummaryBox() {
    document.getElementById("main-body").style.opacity = "1";
    document.getElementById("order-summary-overlay").style.display = "none";
}

function showSuccessPaymentBox() {
    document.getElementById("main-body").style.opacity = "0.3";
    document.getElementById("order-summary-overlay").style.display = "none";
    document.getElementById("success-overlay").style.display = "block";
}

function closeSuccessBox() {
    if(document.getElementById("success-overlay").style.display === "block") {
        document.getElementById("success-overlay").style.display = "none";
        document.getElementById("main-body").style.opacity = "1";
    }
}
function getCartData() {
    var list = document.getElementById('order-list');
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            var response = JSON.parse(this.responseText);
            console.log(response['menu']);
            var start = 0;
            if (list.childElementCount > 0 && list.childElementCount <= response['menu'].length) {
                start = list.childElementCount + 1;
            }
            for (var i = start; i < response['menu'].length; i++) {
                var item = response['menu'][i];
                addCartDataToDiv(item, list);
            }
            document.getElementById("grand-total").textContent = '$' + response['total'].toFixed(2);
        }
    };
    xhttp.open("GET", "http://localhost:3000/orders/cart", true);
    xhttp.setRequestHeader("Content-type", "application/json");
    xhttp.send();

}

function addCartDataToDiv(item, list) {
    var listItem = document.createElement("li");
    list.appendChild(listItem);
    listItem.className = "order-items";
    var divItem = document.createElement("div");
    divItem.className = "order-item";
    listItem.appendChild(divItem);
    var pItem = document.createElement("p");
    pItem.textContent = item['menuitem'] + ' X ' + item['quantity'];
    var h4Item = document.createElement("h4");
    h4Item.textContent = '$' + (item['quantity'] * item['price']);
    divItem.appendChild(pItem);
    divItem.appendChild(h4Item);
}