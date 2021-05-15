const borderCss = "2px solid #B68973";
function toggleForm(formtypeclass) {
    var linkclass = document.getElementsByClassName(formtypeclass)[0];
    var linkclassNeg;
    var boxclass;
    var boxclassNeg;
    if (formtypeclass === "sign-up") {
        linkclassNeg = document.getElementsByClassName("login")[0];
        boxclassNeg = document.getElementsByClassName("login-box")[0];
        boxclass = document.getElementsByClassName("signup-box")[0];
    } else {
        linkclassNeg = document.getElementsByClassName("sign-up")[0];
        boxclass = document.getElementsByClassName("login-box")[0];
        boxclassNeg = document.getElementsByClassName("signup-box")[0];
    }
    boxclass.style.display = "block";
    boxclassNeg.style.display = "none";

    unsetBorder(linkclass);
    unsetBorder(linkclassNeg);
    setBorder(linkclassNeg)
}

function unsetBorder(elementName) {
    console.log(elementName);
    elementName.style.borderLeft = "none";
    elementName.style.borderRight = "none";
    elementName.style.borderBottom = "none";
}

function setBorder(elementName) {
    if (elementName.className === "sign-up") {
        elementName.style.borderRight = borderCss;
    } else {
        elementName.style.borderLeft = borderCss;
        elementName.style.borderRight = borderCss;
    }
    elementName.style.borderBottom = borderCss;
}

function displayForm() {
    console.log(document.getElementsByClassName("main-body")[0]);
    document.getElementsByClassName("main-body")[0].style.opacity = "0.3";
    document.getElementById("form-section").style.display = "block";
}

function closeForm() {
    document.getElementsByClassName("main-body")[0].style.opacity = "1";
    document.getElementById("form-section").style.display = "none";
}