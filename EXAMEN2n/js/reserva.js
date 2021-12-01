window.onload = inici;

function inici() {
    document.getElementById("enviar").addEventListener("click", siguiente);
    document.getElementById("listado").addEventListener("click", unCoche);
    unCoche();

}

function siguiente(e) {
    esborrarError();


    if (validarNom() && validarEmail() && validarTelefon() && validarNota() && validarCondiciones() && confirm("Estas segur de enviar")) {

        let arrayReserva = new Array();

        if (JSON.parse(localStorage.getItem("Reserva")) != null) {
            arrayReserva = JSON.parse(localStorage.getItem("Reserva"));

        }

        let nombreApellidos = document.getElementById("nombreApellidos").value;
        let email = document.getElementById("email").value;
        let telefono = document.getElementById("telefono").value;
        let nota = document.getElementById("nota").value;

        let hombre = {
            "nombreApellidos": nombreApellidos,
            "email": email,
            "telefono": telefono,
            "nota": nota
        }



        arrayReserva[0].cliente.push(hombre);


        localStorage.setItem("Reserva", JSON.stringify(arrayReserva));
        window.location.href = "index.html";


    } else {
        e.preventDefault();
        return false;
    }
}

function validarNom() {
    let element = document.getElementById("nombreApellidos");
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


function validarNota() {
    let element = document.getElementById("nota");
    if (!element.checkValidity()) {
        if (element.validity.valueMissing) {
            error2(element, "Nota requerit");
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

function validarCondiciones() {
    var proteccioDades = document.querySelector("input[id='aceptar']:checked");

    if (!proteccioDades) {
        error2(proteccioDades, "Debes acpetar las condiciones");
        return false;

    }

    return true;


}


function error2(element, missatge) {
    document.getElementById("errores").innerHTML = missatge;
    element.className = "error";
    element.focus();
}

function esborrarError() {
    var formulari = document.forms[0];
    for (var i = 0; i < formulari.elements.length; i++) {
        formulari.elements[i].className = "";
    }
}


function unCoche() {
    let arrayReserva = new Array();

    if (JSON.parse(localStorage.getItem("Reserva")) != null) {
        arrayReserva = JSON.parse(localStorage.getItem("Reserva"));

    }
    let lista = document.getElementById("listado");
    arrayReserva[0].coche.forEach(element => {
        console.log(element);
        lista.innerHTML = "<div class='card mb-4'>" +
            "<a href='#!'><img class='card-img-top' src='img/" + element.img + "' alt='...' /></a>" +
            "<div class='card-body'>" +
            "<h2 class='card-title'> </h2>" +

            "<div class='row justify-c0ontent-end'>" +

            "<div class='p-2 mb-1  col-md-3 offset-md-3 bg-warning rounded text-center'>" +
            "<h2 class='font-weight-bold'></h2>" +
            "</div>" +

            "</div>" +

            "<div class='row'>" +
            "<div class='col p-3 text-center border-bottom border-dark'>Año</div>" +
            "<div class='col p-3 text-center border-bottom border-dark'>Kilometros</div>" +
            "<div class='col p-3 text-center border-bottom border-dark' > Cambio</div > " +
            "<div class='col p-3 text-center border-bottom border-dark' > Combustible</div > " +
            "<div class='w-100'></div>" +
            "<div class='col p-3 text-center'><strong>" + element.anyo + "</strong></div>" +
            "<div class='col p-3 text-center'><strong>" + element.km + "</strong></div>" +
            "<div class='col p-3 text-center'><strong>" + element.cambio + "</strong></div>" +
            "<div class='col p-3 text-center'><strong>" + element.combustible + "</strong></div>" +
            "</div>" +

            "</div>" +
            "</div>";


    });

}

