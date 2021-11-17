window.onload = inici;



function inici() {
    document.getElementById("siguiente").addEventListener("click", siguiente);
}

function siguiente(e) {
    esborrarError();
    if (validarNom() && validarEmail() && validarTelefon() && confirm("Confirma si vols enviar el formulari")) {
        let nombre = document.getElementById("nombre");
        let email = document.getElementById("email");
        let telefono = document.getElementById("telefono");

        let usuari = {
            "nom": nombre.value,
            "correo": email.value,
            "telefono": telefono.value
        }
        let arrayPedido = new Array();



        arrayPedido.push(usuari);
        localStorage.setItem("Pedido", JSON.stringify(arrayPedido));


        return true;
    } else {
        e.preventDefault();
        return false;
    }
}


function validarNom() {
    let element = document.getElementById("nombre");
    if (!element.checkValidity()) {
        if (element.validity.valueMissing) {
            error2(element, "Nom i Apellido requerit");
            return false;
        }
        if (element.validity.patternMismatch) {
            error2(element, "Nom i apellido formato incorrecto");
            return false;
        }
    }
    return true;

}

function validarEmail() {
    let element = document.getElementById("email");
    if (!element.checkValidity()) {
        if (element.validity.valueMissing) {
            error2(element, "Email requerit");
            return false;
        }
        if (element.validity.patternMismatch) {
            error2(element, "Email format incorrect");
            return false;
        }
    }
    return true;


}

function validarTelefon() {
    let element = document.getElementById("telefono");
    if (!element.checkValidity()) {
        if (element.validity.valueMissing) {
            error2(element, "Telefon requerit");
            return false;
        }
        if (element.validity.patternMismatch) {
            error2(element, "Telefon format incorrect");
            return false;
        }

    }
    return true;

}

function error2(element, missatge) {
    document.getElementById("mensajeError").innerHTML = missatge;
    element.className = "error";
    element.focus();
}

function esborrarError() {
    var formulari = document.forms[0];
    for (var i = 0; i < formulari.elements.length; i++) {
        formulari.elements[i].className = "";
    }
}