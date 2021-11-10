// inici
window.onload = inici;
function inici() {
    document.getElementById("Enviar").addEventListener("click", validar, false);
    document.getElementById("alc").addEventListener("change", mostrarEstacio, false);
    document.getElementById("vlc").addEventListener("change", mostrarEstacio, false);
    document.getElementById("ctl").addEventListener("change", mostrarEstacio, false);
}

function validar(e) {
    //esborrarError();
    if (validarProvincia() && validarNomApellido() && validarTelefon() && validarEmail() && confirm("Confirma si vols enviar el formulari")) {
        return true;
    } else {
        e.preventDefault();
        return false;
    }
}

//Mostrar Estacio
function mostrarEstacio() {
    let provincia = document.getElementsByName("provincia");

    for (let i = 0; i < estacions.length; i++) {

        if (provincia[i].checked) {

            borrarProvincies();
            estacions[i].estacio.forEach((element, index) => {
                var parrafo = document.createElement("option");

                parrafo.setAttribute("value", index);
                var conteido = document.createTextNode(element);
                parrafo.appendChild(conteido)
                document.getElementById("estacio").appendChild(parrafo);
            });
        }
    }
}
//Borrar les estacions
function borrarProvincies() {

    let select = document.getElementById("estacio");

    for (let i = select.options.length; i >= 0; i--) {
        select.remove(i);
    }
}

function validarProvincia() {
    let provincia = document.getElementsByName("provincia");
    for (let i = 0; i < estacions.length; i++) {

        if (provincia[i].checked) {
            return true;
        }
    }
    error2(provincia, "Tria una provincia")
    return false;

}

function validarNomApellido() {
    let element = document.getElementById("nom");
    if (!element.checkValidity()) {
        if (element.validity.valueMissing) {
            error2(element, "Nombre y apellido requerido.");
        }
        if (element.validity.patternMismatch) {
            error2(element, "El nom sols acepta caracters alfabetics.");
        }

        return false;
    }
    return true;


}

function validarTelefon() {
    let element = document.getElementById("telefon");
    if (!element.checkValidity()) {
        if (element.validity.valueMissing) {
            error2(element, "Telefono requerido");
        }
        if (element.validity.patternMismatch) {
            error2(element, "El telefono no tiene ele formato correcto.");
        }

        return false;
    }
    return true;
}

function validarEmail() {
    let element = document.getElementById("email");
    if (!element.checkValidity()) {
        if (element.validity.valueMissing) {
            error2(element, "Email requerido.");
        }
        if (element.validity.patternMismatch) {
            error2(element, "El email no tiene el formato correcto.");
        }

        return false;
    }
    return true;


}

function error2(element, missatge) {
    document.getElementById("missatgeError").innerHTML = missatge;
    document.location.href = "#miModal";
    /*  element.className = "error";
      element.focus();*/
}
