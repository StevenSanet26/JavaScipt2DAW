window.onload = iniciar;



var precioSumado = 0;

function iniciar() {



    if (JSON.parse(localStorage.getItem("Contador")) != null) {
        number = JSON.parse(localStorage.getItem("Contador"));

    }
    if (number > 4) {
        window.location.href = "FDConfirmar.html";
        console.log("entra");
    }

    let arrayPedido = new Array();

    //OBTINDRE DE LOCALSTORAGE
    if (JSON.parse(localStorage.getItem("Pedido")) != null) {
        arrayPedido = JSON.parse(localStorage.getItem("Pedido"));
    }
    precioTotal = arrayPedido[0].total;

    console.log(precioTotal);



    let total = document.getElementById("total");
    total.innerHTML = precioTotal + "€";

    mostrarNombre();
    mostrarPedidos();

    document.getElementById("talla").addEventListener("change", SeleccioTalla);
    document.getElementById("siguiente").addEventListener("click", seguent);


}

function mostrarNombre() {
    let arrayPedido = new Array();

    //OBTINDRE DE LOCALSTORAGE
    if (JSON.parse(localStorage.getItem("Pedido")) != null) {
        arrayPedido = JSON.parse(localStorage.getItem("Pedido"));
    }

    let nomApellido = document.getElementById("nombreApellidos");

    let contenido = document.createTextNode(arrayPedido[0].nom);
    console.log(arrayPedido[0].nom);

    nomApellido.appendChild(contenido);
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

    let imagen = document.getElementById("imagen");
    imagen.setAttribute("src", "img/" + pedido[number].imagen);


}

function SeleccioTalla() {

    let talla = document.getElementById("talla");
    console.log(talla.value);

    let total = document.getElementById("total");


    if (talla.value != "Talla") {
        precioSumado = pedido[number].precioArticulo;
        total.innerHTML = (precioSumado + precioTotal) + "€";

    } else {
        total.innerHTML = precioTotal + "€";
    }

}



function seguent() {
   
    let talla = document.getElementById("talla");

    arrayPedido = new Array();
    if (JSON.parse(localStorage.getItem("Pedido")) != null) {
        arrayPedido = JSON.parse(localStorage.getItem("Pedido"));

    }

    if (talla.value != "Talla") {
        let producto = {
            "prenda": pedido[number].nombreArticulo,
            "precio": pedido[number].precioArticulo,
            "talla": talla.value

        }

        arrayPedido[0].producte.push(producto);

        precioTotal = precioTotal + precioSumado;
        arrayPedido[0].total = precioTotal;

        localStorage.setItem("Pedido", JSON.stringify(arrayPedido));

    }
    if (number == 4) {
        window.location.href = "FDConfirmar.html";
    }

    number++;
    localStorage.setItem("Contador", JSON.stringify(number));

  
}