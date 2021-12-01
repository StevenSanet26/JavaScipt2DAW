window.onload = iniciar;

function iniciar() {
    carregarCoches();
    document.getElementById("ir").addEventListener("click", ir);
    //document.getElementById("marcaModelo").addEventListener("keyup", ir);
}

function carregarCoches() {

    let lista = document.getElementById("listado");


    data.cars.forEach((element, index) => {


        lista.innerHTML += " <div id='coche" + index + "' class='card mb-4'>" +

            "<a href='#!'><img class='card-img-top' src='img/" + element.img + "' alt='...' /></a>" +
            "<div class='card-body'>" +
            "<h2 class='card-title'>" + element.marca + " " + element.modelo + "</h2>" +

            "<div class='row justify-content-end'>" +
            "<div class='p-2 mb-1  col-md-3 offset-md-3 bg-warning rounded text-center'>" +
            "<h2 class='font-weight-bold'>" + element.precio + "€</h2>" +
            "</div>" +
            "</div>" +

            "<div class='row'>" +
            "<div class='col p-3 text-center border-bottom border-dark'>Año</div>" +
            "<div class='col p-3 text-center border-bottom border-dark'>Kilometros</div>" +
            "<div class='col p-3 text-center border-bottom border-dark'>Cambio</div>" +
            "<div class='col p-3 text-center border-bottom border-dark'>Combustible</div>" +
            "<div class='w-100'></div>" +
            "<div class='col p-3 text-center'><strong>" + element.anyo + "</strong></div>" +
            "<div class='col p-3 text-center'><strong>" + element.km + "km.</strong></div>" +
            "<div class='col p-3 text-center'><strong>" + element.cambio + "</strong></div>" +
            "<div class='col p-3 text-center'><strong>" + element.combustible + "</strong></div>" +
            "</div>" +
            "<a class='btn btn-primary m-3' href='#!' id='" + index + "' onclick='reserva(this)' >Reservar</a>" +
            "</div>" +
            "</div> ";
    });
}


function ir() {

    let palabra = document.getElementById("marcaModelo").value;

    data.cars.forEach((element, index) => {
        let div = document.getElementById("coche" + index);
        if (palabra.toUpperCase() != element.marca.toUpperCase()) {
          
            div.style = "display:none";
        } else {
            div.style = "display:block";
        }


        /*
        else if (element.modelo.toUpperCase().includes(palabra.toUpperCase())) {
            console.log("SI");
        }*/

    });
}


function reserva(elem) {

    arrayReserva = new Array();

    let id = elem.id;

    let reserva = {
        "coche": [],
        "cliente": []

    }

    console.log(data.cars[id].marca);

    let coche = {

        "marca": data.cars[id].marca,
        "model": data.cars[id].modelo,
        "precio": data.cars[id].precio,
        "anyo": data.cars[id].anyo,
        "km": data.cars[id].km,
        "cambio": data.cars[id].cambio,
        "combustible": data.cars[id].combustible,
        "img": data.cars[id].img
    }

    reserva.coche.push(coche);

    arrayReserva.push(reserva);

    localStorage.setItem("Reserva", JSON.stringify(arrayReserva));
    window.location.href = "reserva.html";
}
