window.onload = main;

function main() {

    cargarDatos();
    cargarData();

    cargarDataDevolucio();
    document.getElementById("dataPrestec").addEventListener("change", cargarDataDevolucio);
    document.getElementById("btnReservar").addEventListener("click", validarReserva,false);

}

function cargarDatos() {
    let arrayUsuariReserva = new Array();
    if (JSON.parse(localStorage.getItem("Usuari Reserva")) != null) {
        arrayUsuariReserva = JSON.parse(localStorage.getItem("Usuari Reserva"));
    }
    console.log(arrayUsuariReserva[0].usuari_id);



    let usuari = arrayUsuariReserva[0].nom;

    let llibre = arrayUsuariReserva[1].titulo;

    let inputUsuari = document.getElementById("usuari");
    inputUsuari.setAttribute("value", usuari);

    let inputLlibre = document.getElementById("llibre");
    inputLlibre.setAttribute("value", llibre);

}

function cargarData() {

    let dataPrestec = document.getElementById("dataPrestec");



    var today = new Date();
    var dd = today.getDate();
    var mm = today.getMonth() + 1; //January is 0!
    var yyyy = today.getFullYear();



    if (dd < 10) {
        dd = '0' + dd;
    }

    if (mm < 10) {
        mm = '0' + mm;
    }

    today = yyyy + '-' + mm + '-' + dd;
    dataPrestec.setAttribute("value", today);
    dataPrestec.setAttribute("max", today);



}

function cargarDataDevolucio() {
    let dataDevolucio = document.getElementById("dataDevolucio");
    let dataPrestec = document.getElementById("dataPrestec");

    let fechaDevolucio = new Date(dataPrestec.value);

    fechaDevolucio.setDate(fechaDevolucio.getDate() + 20);

    var dd = fechaDevolucio.getDate();

    var mm = fechaDevolucio.getMonth() + 1; //January is 0!
    var yyyy = fechaDevolucio.getFullYear();

    if (dd < 10) {
        dd = '0' + dd;
    }

    if (mm < 10) {
        mm = '0' + mm;
    }

    let contenido = document.createTextNode(dd + "/" + mm + "/" + yyyy);
    dataDevolucio.replaceChildren(contenido);

}

function validarReserva(e) {
    esborrarError()
    e.preventDefault();
    if (validarDataPrestec()) {

        var arrayUsuariReserva = new Array();
        if (JSON.parse(localStorage.getItem("Usuari Reserva")) != null) {
            arrayUsuariReserva = JSON.parse(localStorage.getItem("Usuari Reserva"));
        }

        var dataPrestec = document.getElementById("dataPrestec").value;
        var fechaDevolucio = new Date(dataPrestec);


        fechaDevolucio.setDate(fechaDevolucio.getDate() + 20);
        var dd = fechaDevolucio.getDate();

        var mm = fechaDevolucio.getMonth() + 1; //January is 0!
        var yyyy = fechaDevolucio.getFullYear();

        if (dd < 10) {
            dd = '0' + dd;
        }

        if (mm < 10) {
            mm = '0' + mm;
        }

        let reserva = {
            "usuario": arrayUsuariReserva[0].usuari_id,
            "libro": arrayUsuariReserva[1].libro_id,
            "fecha": dataPrestec,
            "fechaDevolucion": yyyy + "-" + mm + "-" + dd,
            "__v": 0
        }

        fetch("https://serverred.es/api/reservas", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(reserva)
        }).then(response => response.json());

        setTimeout(function () {
            window.location.href = "llistatReserves.html";
        }, 50);


    } else {
        
        return false;
    }
}


function validarDataPrestec() {
    let element = document.getElementById("dataPrestec");

    if (!element.checkValidity()) {
        if (element.validity.valueMissing) {
            error2(element, "Data requerida");
        }
        if (element.validity.rangeOverflow) {
            error2(element, "Data no pot superar la de hui");
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