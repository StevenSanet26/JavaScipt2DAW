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
    esborrarError();
    var element = document.getElementById("nombre");
    if (!element.checkValidity()) {
        if (element.validity.valueMissing) {
            error2(element, "Nombre requrido.");
        }

        if (element.validity.patternMismatch) {
            error2(element, "El nombre no compleix el numero de caracters (2,20).");
        }
        //return false;
    }
    return true;
}

function validarApellidos() {
    esborrarError();
    var element = document.getElementById("apellidos");
    if (!element.checkValidity()) {
        if (element.validity.valueMissing) {
            error2(element, "Apellidos requrido.");
        }
        if (element.validity.patternMismatch) {
            error2(element, "El apellido no compleix el numero de caracters (2,30).");
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
        if (element.validity.patternMismatch) {
            error2(element, "El NIF o NIE ha de seguir el format 99999999Z.");
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
    var correo = document.getElementById("correoElectronico");
    if (!element.checkValidity()) {
        if (element.validity.valueMissing) {
            error2(element, "Correo requerido.");
        }
        if (element.validity.patternMismatch) {
            error2(element, "El correo ha de tener un formato correcto.");
        }
        if (element != correo) {
            error2(element, "El correo no es igual.");
        }
        return false;
    }
    return true;

}

function validarNickname() {

    var element = document.getElementById("nickname");
    if (!element.checkValidity()) {
        if (element.validity.valueMissing) {
            error2(element, "Nickname requerido.");
        }
        if (element.validity.patternMismatch) {
            error2(element, "El Nickname no compleix el numero de caracters (2,8).");
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
        if (element.validity.patternMismatch) {
            error2(element, "La contraseña no tiene el formato correcto.");
        }
        return false;
    }
  
    return true;
}

function validarRepeticionContraseña() {
   
    var element = document.getElementById("repeticionContraseña");
    var contraseña = document.getElementById("contraseña");
    if (!element.checkValidity()) {
        if (element.validity.valueMissing) {
            error2(element, "Contraseña requerida.");
        }
        if (element.validity.patternMismatch) {
            error2(element, "La contraseña no tiene el formato correcto.");
        }
        if (element != contraseña) {
            error2(element, "La contraseña no es igual.");
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
let numero1;
let numero2;
let suma="+";
let resta 

function captcha(){



}
