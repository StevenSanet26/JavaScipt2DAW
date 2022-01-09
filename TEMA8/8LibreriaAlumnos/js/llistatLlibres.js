window.onload=main;

function main(){

    cargarReserva();
}


function cargarReserva(){
    fetch("https://serverred.es/api/reservas")
        .then(response => response.json())
        .then(data => {
            
            mostrarReservas(data.resultado);
            console.log(data.resultado);
        });
}


function mostrarReservas(reservas){
    let fila = document.getElementById("files");
    reservas.forEach((element, index) => {
        let tr = document.createElement("tr");

        let td1 = document.createElement("td");
        let contenido1 = document.createTextNode(element.usuario);
        td1.appendChild(contenido1);


        let td2 = document.createElement("td");
        let contenido2 = document.createTextNode(element.libro);
        td2.appendChild(contenido2);


        let td3 = document.createElement("td");
        let contenido3 = document.createTextNode(element.fecha);
        td3.appendChild(contenido3);

        let td4 = document.createElement("td");
        let contenido4 = document.createTextNode(element.fechaDevolucion);
        td4.appendChild(contenido4);

      
        tr.appendChild(td1);
        tr.appendChild(td2);
        tr.appendChild(td3);
        tr.appendChild(td4);

        fila.appendChild(tr);
    });
}