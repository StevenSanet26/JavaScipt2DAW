window.onload = main;

function main() {
    document.getElementById("enviar").addEventListener("click", validarRegistre, false);

}

function validarRegistre() {

    if (validarNom() && validarCorreo() && validarContrasenya() && validarContrasenyaRepetida() && confirm("S'ha registrat correctament")) {

    }
}

function validarNom() {
    let element = document.getElementById("nom");

    if (!element.checkValidity()) {
        if (element.validity.valueMissing) {
            error2(element, "Nom requerid");
        }
        if (element.validity.patternMismatch) {
            error2(element, "Nom minim 3 caracters");
            
        }
        return false;
    }
    return true;

}

function validarCorreo() {
    let element = document.getElementById("email");

    if (!element.checkValidity()) {
        if (element.validity.valueMissing) {
            error2(element, "Correu requerid");
        }

        if(element.validity.patternMismatch){
            error2(element, "Format correo no valid");

        }

        return false;
    }
    return true;
}

function validarContrasenya() {
    let element = document.getElementById("password");

    if (!element.checkValidity()) {
        if (element.validity.valueMissing) {
            error2(element, "Password requerid");
        }

        return false;
    }
    return true;
}

function validarContrasenyaRepetida() {
    let element = document.getElementById("passwordc");
    if (!element.checkValidity()) {
        if (element.validity.valueMissing) {
            error2(element, "Passowrd repetida requerida");
        }

        return false;
    }
    return true;


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