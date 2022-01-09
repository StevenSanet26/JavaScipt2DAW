window.onload = main;

let arrayAutores = new Array();
let arrayLibros = new Array();

function main() {

    cargarUsuariReserva();
    cargarAutor();
}

function cargarUsuariReserva() {
    let arrayUsuariReserva = new Array();
    if (JSON.parse(localStorage.getItem("Usuari Reserva")) != null) {
        arrayUsuariReserva = JSON.parse(localStorage.getItem("Usuari Reserva"));
    }

    console.log(arrayUsuariReserva);

    let usuari = document.getElementById("usuari");
    let contenido = document.createTextNode(arrayUsuariReserva[0].nom + " - " + arrayUsuariReserva[0].email);
    usuari.appendChild(contenido);
}


function cargarAutor() {

    fetch("https://www.serverred.es/api/autores")
        .then(response => response.json())
        .then(data => {
            arrayAutores = data.resultado;
            cargarLibros();
        });
}

function cargarLibros() {
    fetch("https://www.serverred.es/api/libros")
        .then(response => response.json())
        .then(data => {
            arrayLibros = data.resultado;
            mostrarLibros(data.resultado);
        });
}

function mostrarLibros(libros) {

    let fila = document.getElementById("files");

    libros.forEach((element, index) => {
        let tr = document.createElement("tr");

        let td0 = document.createElement("td");
        let checkbox = document.createElement("input");
        checkbox.setAttribute("type", "checkbox");
        checkbox.setAttribute("id", index);
        checkbox.setAttribute("onclick", "reservarLlibre(this)");
        td0.appendChild(checkbox);

        let td1 = document.createElement("td");
        let contenido1 = document.createTextNode(element.titulo);
        td1.appendChild(contenido1);


        let td2 = document.createElement("td");
        let contenido2 = document.createTextNode(element.editorial);
        td2.appendChild(contenido2);


        let td3 = document.createElement("td");
        let contenido3 = document.createTextNode(element.precio);
        td3.appendChild(contenido3);

        let td4 = document.createElement("td");
        let contenido4 = document.createTextNode(obtenerAutor(element.autor));
        td4.appendChild(contenido4);

        tr.appendChild(td0);
        tr.appendChild(td1);
        tr.appendChild(td2);
        tr.appendChild(td3);
        tr.appendChild(td4);

        fila.appendChild(tr);
    });
}

function obtenerAutor(id) {
    let auxId = "borrado";

    arrayAutores.forEach(element => {
        if (element._id == id) {
            auxId = element.nombre;
        }
    });
    return auxId;
}

function reservarLlibre(elem) {
    let id = elem.id;
   
    let arrayUsuariReserva = new Array();
    if (JSON.parse(localStorage.getItem("Usuari Reserva")) != null) {
        arrayUsuariReserva = JSON.parse(localStorage.getItem("Usuari Reserva"));
    }


    let libro=  {
        "libro_id":arrayLibros[id]._id,
        "titulo":arrayLibros[id].titulo,
        "editorial":arrayLibros[id].editorial,
        "precio":arrayLibros[id].precio,
        "autor":arrayLibros[id].autor
    }

    
    arrayUsuariReserva.push(libro);

    localStorage.setItem("Usuari Reserva", JSON.stringify(arrayUsuariReserva));

    window.location.href = "reservarConfirmar.html";
}