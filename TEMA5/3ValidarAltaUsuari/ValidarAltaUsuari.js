window.onload = iniciar;

function iniciar() {
    document.getElementById("enviar").addEventListener("click", validar, false);
}

function validar(e) {
    esborrarError();
    if (validarNombre() && validarApellidos() && validarNIF_NIE() && validarCorreo() && validarRepeticionCorreo() && validarNickname() && validarContraseña() && validarRepeticionContraseña() && confirm("Confirma si vols enviar el formulari")) {
        return true;
    } else {
        e.preventDefault();
        return false;
    }
}

function validarNombre() {
    var element = document.getElementById("nombre");
    if (!element.checkValidity()) {
        if (element.validity.valueMissing) {
            error2(element, "Nombre requrido.");
        }
    
        if(element.validity.patternMismatch){
            error2(element, "El nombre ha de tener menys de 20 caracteres.");
        }
        return false;
    }
    return true;
}

function validarApellidos() {
    var element = document.getElementById("apellidos");
    if (!element.checkValidity()) {
        if (element.validity.valueMissing) {
            error2(element, "Apellidos requrido.");
        }

        return false;
    }
    return true;
}

function validarNIF_NIE() {
    var element = document.getElementById("NIF_NIE");
    if (!element.checkValidity()) {
        if (element.validity.valueMissing) {
            error2(element, "NIF o NIE requerido.");
        }
        return false;
    }
    return true;
}

function validarCorreo() {
    var element = document.getElementById("correoElectronico");
    if (!element.checkValidity()) {
        if (element.validity.valueMissing) {
            error2(element, "Correo requerido.");
        }
        if (element.validity.patternMismatch) {
            error2(element, "El correo ha de tener un formato correcto.");
        }
        return false;
    }
    return true;
}

function validarRepeticionCorreo() {
    var element = document.getElementById("repeticionCorreoElectronico");
}

function validarNickname() {
    var element = document.getElementById("nickname");
    if (!element.checkValidity()) {
        if (element.validity.valueMissing) {
            error2(element, "Nickname requerido.");
        }
        return false;
    }
    return true;
}

function validarContraseña() {
    var element = document.getElementById("contraseña");
    if (!element.checkValidity()) {
        if (element.validity.valueMissing) {
            error2(element, "Contraseña requerida.");
        }
        return false;
    }
    return true;
}

function validarRepeticionCorreo() {
    var element = document.getElementById("repeticionContraseña");
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