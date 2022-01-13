window.onload = main;

function main() {
    document.getElementById("enviar").addEventListener("click", validarRegistre, false);

}

function validarRegistre(e) {

    e.preventDefault();

    if (validarNom() && validarCorreo() && validarContrasenya() && validarContrasenyaRepetida() && confirm("S'ha registrat correctament")) {

        let nom = document.getElementById("nom");
        let email = document.getElementById("email");
        let password = document.getElementById("password");




        let usuario = {
            "name": nom.value,
            "email": email.value,
            "password": password.value
        }

        fetch("https://userprofile.serverred.es/api/register", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(usuario)
        }).then(response => response.json())
            .then(data => { console.log(data) 
                if(data.error==null){
                    alert("Usuario creado");
                    window.location.href="login.html"
                }else{
                    error2(email,data.error);
                }
            });

        return true;
    } else {

        return false;
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

        if (element.validity.patternMismatch) {
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
        if (element.validity.patternMismatch) {
            error2(element, "Password minimo 6 carcaters");

        }

        return false;
    }
    return true;
}

function validarContrasenyaRepetida() {
    let element = document.getElementById("passwordc");
    let password = document.getElementById("password");
    if (!element.checkValidity()) {
        if (element.validity.valueMissing) {
            error2(element, "Passowrd repetida requerida");
        }
        if (element != password) {
            error2(element, "La contrasenya no coincide");
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