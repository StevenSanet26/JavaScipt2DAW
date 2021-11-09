// inici
window.onload = inici;
function inici() {
    document.getElementById("alc").addEventListener("change", carregarEstacioA, false);
    document.getElementById("vlc").addEventListener("change", carregarEstacioV, false);
    document.getElementById("ctl").addEventListener("change", carregarEstacioC, false);
}




function carregarEstacioA() {
    let provincia = document.getElementById("alc").value;

    borrarProvincies();
    estacions[0].estacio.forEach((element, index) => {
        var parrafo = document.createElement("option");

        parrafo.setAttribute("value", index);
        var conteido = document.createTextNode(element);
        parrafo.appendChild(conteido)
        document.getElementById("estacio").appendChild(parrafo);
    });

}

function carregarEstacioV() {
    let provincia = document.getElementById("vlc").value;
    borrarProvincies();
    estacions[1].estacio.forEach((element, index) => {
        var parrafo = document.createElement("option");
        parrafo.setAttribute("value", index);
        var conteido = document.createTextNode(element);
        parrafo.appendChild(conteido)
        document.getElementById("estacio").appendChild(parrafo);
    });

}

function carregarEstacioC() {
    let provincia = document.getElementById("ctl").value;
    borrarProvincies();
    estacions[2].estacio.forEach((element, index) => {
        var parrafo = document.createElement("option");
        parrafo.setAttribute("value", index);
        var conteido = document.createTextNode(element);
        parrafo.appendChild(conteido)
        document.getElementById("estacio").appendChild(parrafo);
    });
}


function borrarProvincies() {
    let select = document.getElementById("estacio");

    for (let i = select.options.length; i >= 0; i--) {
        select.remove(i);
    }
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