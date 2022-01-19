window.onload = main;

function main() {
    document.getElementById("enviar").addEventListener("click", accedir, "false");

}

function accedir(e) {
    e.preventDefault();

    if (validarCorreo() && validarContrasenya()) {
        let email = document.getElementById("email");
        let password = document.getElementById("password");

        let usuario = {
            "email": email.value,
            "password": password.value
        }

        fetch("https://userprofile.serverred.es/api/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(usuario)
        }).then(response => response.json())
            .then(data => {
                console.log(data)
                if (data.error == null) {
                    console.log(data.data.token);
                    localStorage.setItem("Token", JSON.stringify(data.data.token));
                    window.location.href = "areaPersonal.html";

                } else {
                    error2(email, data.error);
                }
            });

        return true;
    } else {
        return false;
    }

}
function validarCorreo() {
    let element = document.getElementById("email");


    if (!element.checkValidity()) {
        if (element.validity.valueMissing) {
            error2(element, "Email requerid");
        }
        if (element.validity.patternMismatch) {
            error2(element, "Format email no correcte");

        }
        return false;
    }
    return true;

}


function validarContrasenya() {
    let element = document.getElementById("password");


    if (!element.checkValidity()) {
        if (element.validity.valueMissing) {
            error2(element, "Contrasenya requerida");
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