window.onload = main;
var arrayUsuaris = new Array()

function main() {
    cargarUsuaris();

}


function cargarUsuaris() {

    fetch("https://serverred.es/api/usuarios")
        .then(response => response.json())
        .then(data => {
            arrayUsuaris = data.resultado;
            mostrarUsuaris(data.resultado);
        });
}


function mostrarUsuaris(usuarios) {
    console.log(usuarios);
    let fila = document.getElementById("files");

    usuarios.forEach((element, index) => {
        let tr = document.createElement("tr");

        let td0 = document.createElement("td");
        let checkbox = document.createElement("input");
        checkbox.setAttribute("type", "checkbox");
        checkbox.setAttribute("id", index);
        checkbox.setAttribute("onclick", "reservarUsuari(this)");
        td0.appendChild(checkbox);

        let td1 = document.createElement("td");
        let contenido1 = document.createTextNode(element.nombre);
        td1.appendChild(contenido1);


        let td2 = document.createElement("td");
        let contenido2 = document.createTextNode(element.telefono);
        td2.appendChild(contenido2);


        let td3 = document.createElement("td");
        let contenido3 = document.createTextNode(element.email);
        td3.appendChild(contenido3);

        let td4 = document.createElement("td");
        let contenido4 = document.createTextNode(element.direccion);
        td4.appendChild(contenido4);

        tr.appendChild(td0);
        tr.appendChild(td1);
        tr.appendChild(td2);
        tr.appendChild(td3);
        tr.appendChild(td4);

        fila.appendChild(tr);
    });
}


function reservarUsuari(elem) {
    let id = elem.id;

    let arrayUsuariReserva = new Array();

    let usuari = {
        "usuari_id":arrayUsuaris[id]._id,
        "nom": arrayUsuaris[id].nombre,
        "telefono": arrayUsuaris[id].telefono,
        "email": arrayUsuaris[id].email,
        "adreca": arrayUsuaris[id].direccion
    }

    arrayUsuariReserva.push(usuari);
    localStorage.setItem("Usuari Reserva", JSON.stringify(arrayUsuariReserva));

    window.location.href="reservarLlibre.html";
}