window.onload = iniciar;


function iniciar() {
    document.getElementById("enviar").addEventListener("click", enviar, false);

}

function enviar(e) {
    console.log("gol");
    esborrarError();
    if (validarDni() && validarFecha() && validarTel() && validarMatricula() && validarEmail() && validarUrl() && confirm("Confirma si vols enviar el formulari")) {
        return true;
    } else {
        e.preventDefault();
        return false;
    }
}
function validarDni() {
    var patroDni = new RegExp(/^\d{8}[a-zA-Z]$/);
    var element = document.getElementById("dni");

    if (patroDni.test(element.value)) {
        return true;
    } else {
        error2(element, "Error: campo dni incorrecto");
        return false;
    }
}

function validarFecha() {
    var patroFecha = new RegExp(/^\d{4}\/(0?[1-9]|1[012])\/(0?[1-9]|[12][0-9]|3[01])$/);
    var element = document.getElementById("fecha");

    if (patroFecha.test(element.value)) {
        return true;
    } else {
        error2(element, "Error: campo fecha incorrecto");
        return false;
    }

}
function validarTel() {
    var patroTel = new RegExp(/^\d{3}\s\d{3}\s\d{3}$/);
    var element = document.getElementById("telefono");

    if (patroTel.test(element.value)) {
        return true;
    } else {
        error2(element, "Error: campo telefono incorrecto");
        return false;
    }
}


function validarMatricula() {
    var patroMatricula = new RegExp(/^\d{4} [A-Z]{3}$/);
    var element = document.getElementById("matricula");

    if (patroMatricula.test(element.value)) {
        return true;
    } else {
        error2(element, "Error: campo matricula incorrecto");
    }
}
function validarEmail() {
    var patroEmail = new RegExp(/^([\da-z_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/);
    var element = document.getElementById("email");
    if (patroEmail.test(element.value)) {
        return true;
    } else {
        error2(element, "Error: campo email incorrecto");
        return false;
    }
}

function validarUrl() {
    var patroUrl = new RegExp(/^((ftp|http|https):\/\/)?www\.([A-z]+)\.([A-z]{2,})/);
    var element = document.getElementById("url");

    if (patroUrl.test(element.value)) {
        return true;
    } else {
        error2(element, "Error: campo url incorrecto");
        return false;
    }
}

function error2(element, missatge) {
    document.getElementById("missatgeError").innerHTML = missatge;
    element.className = "error";
    element.focus();
}

function esborrarError() {
    var formulari = document.forms[0];
    for (var i = 0; i < formulari.elements.length; i++) {
        formulari.elements[i].className = "";
    }
}