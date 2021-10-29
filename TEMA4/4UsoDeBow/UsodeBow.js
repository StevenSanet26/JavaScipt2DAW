window.onload = iniciar;

let ventana;
function iniciar() {
    navegador();
    tamaño();
    document.getElementById("abrir").addEventListener("click", ventana1);
    document.getElementById("modificar").addEventListener("click", ventana2);
}

function navegador() {

    var navegador = navigator.appCodeName;
    var parrafo = document.createElement("h2");
    var contenido = document.createTextNode("El navegador utilitzat es " + navegador);
    parrafo.appendChild(contenido);
    document.getElementById("div").appendChild(parrafo);

}

function tamaño() {
    var alto = window.innerHeight;
    var ancho = window.innerWidth;
    var parrafo2 = document.createElement("p");
    var contenido2 = document.createTextNode("Dimensiones: " + ancho + " ancho y " + alto + " alto");
    parrafo2.appendChild(contenido2);
    document.getElementById("div").appendChild(parrafo2);


}


function ventana1() {

    if (ventana != null) {
        ventana.close();

    }
    ventana = window.open("reloj.html", "ventanasecundaria", "width=200,height=200,scrollbars=NO");


}

function ventana2() {

    let width = prompt("altura de la ventana: ");
    let height = prompt("anchura de la ventanta: ");
    if (ventana != null) {
        ventana.close();


    }

    window.open("reloj.html", "ventanasecundaria", "width=" + height + ",height=" + width + ",scrollbars=NO");



}