// inici
window.onload = inici;
function inici() {

    document.getElementById("Enviar").addEventListener("click", validar, false);
    document.getElementById("alc").addEventListener("change", mostrarEstacio, false);
    document.getElementById("vlc").addEventListener("change", mostrarEstacio, false);
    document.getElementById("ctl").addEventListener("change", mostrarEstacio, false);
    mostrarHoras();

}

function validar(e) {
    //esborrarError();
    if (validarProvincia() && validarMatricula() && validarCombustible() && validarData() && validarHora() && validarNomApellido() && validarTelefon() && validarEmail() && validarCondicion() && confirm("Confirma si vols enviar el formulari")) {
        return true;
    } else {
        e.preventDefault();
        return false;
    }
}

//Mostrar Estacio
function mostrarEstacio() {
    mostrarHoras();
    let provincia = document.getElementsByName("provincia");

    for (let i = 0; i < estacions.length; i++) {
        if (provincia[i].checked) {
            borrarEstacio();
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
function borrarEstacio() {

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

function validarMatricula() {
    let element = document.getElementById("matricula");
    if (!element.checkValidity()) {
        if (element.validity.valueMissing) {
            error2(element, "Matricula requerida");
            return false;
        }
        if (element.validity.patternMismatch) {
            error2(element, "La matricula no tiene el formato requerido");
            return false;
        }
    }
    return true;
}

function validarCombustible() {
    let combustible = document.getElementById("conbustible");

    for (let index = 1; index < combustible.length; index++) {
        console.log(combustible[index]);
        if (combustible[index].selected) {
            return true;
        }
    }
    error2(combustible, "Tria un tipus de combustible")
    return false;


}

function validarData() {
    var today = new Date();
    var dias = 30;
    let fechaMax = new Date();


    fechaMax.setDate(fechaMax.getDate() + dias);

    var element = document.getElementById("date");

    if (!element.checkValidity()) {
        console.log(element.value);
        if (element.validity.valueMissing) {
            error2(element, "Error: La fecha es requerida.");
        }
        return false;
    }

    let fechaEnviada = new Date(element.value);

    if (fechaEnviada < today) {
        error2(element, "Error: La fecha es anterior a la de hoy.");
        return false;
    }
    if (fechaEnviada > fechaMax) {
        error2(element, "Error: La fecha es posterior a la permitida.");
        return false;
    }
    if (fechaEnviada.getDay() == 0) {
        error2(element, "Error: Los domingos no se trabaja.");
        return false;
    }
    return true;
}
function validarHora() {
    let hora = document.getElementById("hora");

    for (let i = 1; i < hora.length; i++) {
        if (hora[i].selected) {
            return true
        }
    }
    error2(hora, "Selecciona una hora");
    return false;

}

function mostrarHoras() {
    let hora = document.getElementById("hora");
    for (let i = 8; i < 20; i++) {

        for (let j = 0; j < 60; j += 15) {
            var parrafo = document.createElement("option");
            if (i <= 9) {
                parrafo.setAttribute("value", "0" + i + ":" + j);
                if (j == 0) {
                    var conteido = document.createTextNode("0" + i + ":0" + j);
                } else {
                    var conteido = document.createTextNode("0" + i + ":" + j);
                }

                parrafo.appendChild(conteido)
                hora.appendChild(parrafo);
            } else {
                parrafo.setAttribute("value", i + ":" + j);
                if (j == 0) {
                    var conteido = document.createTextNode(i + ":0" + j);
                } else {
                    var conteido = document.createTextNode(i + ":" + j);
                }

                parrafo.appendChild(conteido)
                hora.appendChild(parrafo);

            }

        }

    }

}




function validarNomApellido() {
    let element = document.getElementById("nom");

    if (!element.checkValidity()) {
        if (element.validity.valueMissing) {
            error2(element, "Nombre y apellido requerido.");
            return false;
        }
        if (element.validity.patternMismatch) {
            error2(element, "El nom sols acepta caracters alfabetics.");
            return false;
        }


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

function validarCondicion(){
    var proteccioDades = document.querySelector("input[id='protecioDades']:checked");
    
    
    if(!proteccioDades){
        error2(proteccioDades,"Debes acpetar las condiciones");
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
