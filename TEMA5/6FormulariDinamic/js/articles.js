window.onload = iniciar;

function iniciar() {

    mostrarNombre();
    document.getElementById("siguiente").addEventListener("click", seguent);
    //mostrarPedidos();

}


function mostrarNombre() {
    let arrayPedido = new Array();


    //OBTINDRE DE LOCALSTORAGE
    if (JSON.parse(localStorage.getItem("Pedido")) != null) {
        arrayPedido = JSON.parse(localStorage.getItem("Pedido"));



    }
    let nomApellido = document.getElementById("nombreApellidos");

    let parrafo = document.createElement("a");

    console.log(arrayPedido[0].nom);

    let contenido = document.createTextNode(arrayPedido[0].nom);




    parrafo.appendChild(contenido);
    nomApellido.appendChild(parrafo);


}

function mostrarPedidos() {

    let prenda = document.getElementById("nombreArticulo");
    prenda.setAttribute("value", pedido[number].nombreArticulo);

    let precio = document.getElementById("precioArticulo");
    precio.setAttribute("value", pedido[number].precioArticulo);

    let talla = document.getElementById("talla");

    pedido[number].tallas.forEach(element => {
        let parrafo = document.createElement("option");
        let contenido = document.createTextNode(element);

        parrafo.appendChild(contenido);
        talla.appendChild(parrafo);
    });



}
var number = 0;
function seguent() {
    number++;
    console.log(number);

    mostrarPedidos();
}