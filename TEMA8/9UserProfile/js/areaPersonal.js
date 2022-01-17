window.onload = main;

function main() {
    comprobarToken();
    compovarAvatar();
    document.getElementById("enviar").addEventListener("click", enviar, false);
    document.getElementById("enviarAvatar").addEventListener("click", enviarAvatar, false);
}

function comprobarToken() {
    if (JSON.parse(localStorage.getItem("Token")) == null) {
        alert("Tens que iniciar sessio");
        window.location.href = ("login.html");
    } else {

        let token;
        if (JSON.parse(localStorage.getItem("Token")) != null) {
            token = JSON.parse(localStorage.getItem("Token"));
        }
        console.log(token);

        fetch("https://userprofile.serverred.es/api/areapersonal", {
            method: "GET",
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'Accept': 'application/json',
                "auth-token": token
            }
        }).then(response => response.json())
            .then(data => {
                console.log(data.data.user)
                mostrarUsuario(data.data.user);
            });

    }
}


function mostrarUsuario(usuari) {
    console.log(usuari.name);
    let name = document.getElementById("nom");
    name.setAttribute("value", usuari.name);
    let contenido = document.createTextNode(usuari.name);

    document.getElementById("user").replaceChildren(contenido);

    document.getElementById("avatar").setAttribute("src","https://userprofile.serverred.es/public/img/"+ usuari.avatar);
    document.getElementById("avatarAP").setAttribute("src","https://userprofile.serverred.es/public/img/"+ usuari.avatar);
}


function enviar(e) {

    e.preventDefault();
    if (validarNom() && validarContrasenyaActual() && validarContrasenyaNova() && validarContrasenyaNovaReptida()) {

        let nom = document.getElementById("nom");
        let password = document.getElementById("passworda");
        let passwordNova = document.getElementById("password");

        let token;
        if (JSON.parse(localStorage.getItem("Token")) != null) {
            token = JSON.parse(localStorage.getItem("Token"));
        }
        usuari = {
            "name": nom.value,
            "password": password.value,
            "newPassword": passwordNova.value
        }

        fetch("https://userprofile.serverred.es/api/areapersonal", {
            method: "PUT",
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                "auth-token": token
            },
            body: JSON.stringify(usuari)
        }).then(response => response.json())
            .then(data => {
                //console.log(data.data.user)
                if (data.error != null) {
                    error2(password, data.error)
                } else {
                    alert("s'ha actualizat correctament");
                    comprobarToken();
                }
                console.log(data);
            });




        return true;
    } else {

        return false;
    }

}

function validarNom() {
    esborrarError();
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


function validarContrasenyaActual() {
    esborrarError();
    let element = document.getElementById("passworda");

    if (!element.checkValidity()) {
        if (element.validity.valueMissing) {
            error2(element, "Password Actual requerid");
        }
        if (element.validity.patternMismatch) {
            error2(element, "Password Actual minimo 6 carcaters");

        }

        return false;
    }
    return true;

}

function validarContrasenyaNova() {
    esborrarError();
    let element = document.getElementById("password");

    if (!element.checkValidity()) {
        if (element.validity.valueMissing) {
            error2(element, "Password Nova requerid");
        }
        if (element.validity.patternMismatch) {
            error2(element, "Password Nova minimo 6 carcaters");

        }

        return false;
    }
    return true;
}


function validarContrasenyaNovaReptida() {

    esborrarError();
    var element = document.getElementById("passwordc");
    var passwd = document.getElementById("password")
    console.log(passwd.value);
    console.log(element.value);
    if (element.value != passwd.value) {
        error2(element, "Error: La repetición de la contraseña tiene que ser igual que la contraseña introducida anteriormente.")
        return false;
    }

    return true;


}


function error2(element, missatge) {
    document.getElementById("missatgeError").innerHTML = missatge;
    element.className = "form-control border-danger";
    element.focus();
}

function esborrarError() {
    var formulari = document.forms[0];
    for (var i = 0; i < formulari.elements.length; i++) {
        formulari.elements[i].className = "form-control";
    }
}


function compovarAvatar() {
    let avatarFile = document.getElementById("avatarFile");
    avatarFile.setAttribute("accept", "image/png,image/jpeg");
}


function enviarAvatar(e) {
    e.preventDefault();
    if (validarTamanyo()) {
        const formData = new FormData();
        const fileField = document.querySelector('input[type="file"]');

        formData.append("avatar", fileField.files[0]);

        let token;
        if (JSON.parse(localStorage.getItem("Token")) != null) {
            token = JSON.parse(localStorage.getItem("Token"));
        }
        fetch(" https://userprofile.serverred.es/api/areapersonal/avatar", {
            method: "PUT",
            headers: {
                "auth-token": token
            },
            body: formData
        })
            .then(response => response.json())
            .then(result => {
                console.log("Success:", result);
                comprobarToken();

            })

            .catch(error => {
                console.log("Error:", error);
                error2(document.getElementById("nom"), error);
            })
    }
}

function validarTamanyo() {
    let avatarfile = document.getElementById("avatarFile");

    console.log(avatarfile.size);

    if (avatarfile.size > 2000000) {
        alert("La imtage supera els 2MB");
        return false;
    }
    return true;
}