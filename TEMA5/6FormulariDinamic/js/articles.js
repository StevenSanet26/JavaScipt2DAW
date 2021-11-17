window.onload = iniciar;

var precioTotal = 0;
var number = 0;
var precioSumado = 0;

function iniciar() {

    if (JSON.parse(localStorage.getItem("Contador")) != null) {
        number = JSON.parse(localStorage.getItem("Contador"));

    }
    if (number > 4) {
        window.location.href = "FDConfirmar.html";
        console.log("entra");

    }
    if (JSON.parse(localStorage.getItem("Total")) != null) {
        precioTotal = JSON.parse(localStorage.getItem("Total"));

    }
    let total = document.getElementById("total");
    total.innerHTML = precioTotal + "€";

    console.log(number);
    mostrarNombre();
    document.getElementById("siguiente").addEventListener("click", seguent);
    document.getElementById("talla").addEventListener("change", SeleccioTalla);

    mostrarPedidos();

}

function mostrarNombre() {
    let arrayPedido = new Array();

    //OBTINDRE DE LOCALSTORAGE
    if (JSON.parse(localStorage.getItem("Pedido")) != null) {
        arrayPedido = JSON.parse(localStorage.getItem("Pedido"));
    }

    let nomApellido = document.getElementById("nombreApellidos");

    let contenido = document.createTextNode(arrayPedido[0].nom);

    nomApellido.appendChild(contenido);
}

function mostrarPedidos() {
    let arrayPedido = new Array();

    //OBTINDRE DE LOCALSTORAGE
    if (JSON.parse(localStorage.getItem("Pedido")) != null) {
        arrayPedido = JSON.parse(localStorage.getItem("Pedido"));
        console.log(arrayPedido[arrayPedido.length - 1].contador);
        number = arrayPedido[arrayPedido.length - 1].contador;

    }


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
        total.innerHTML = (pedido[number].precioArticulo + precioTotal) + "€";

    } else {
        total.innerHTML = precioTotal + "€";
    }

}



function seguent() {


    arrayProducto = new Array();
    arrayPedido = new Array();
    if (JSON.parse(localStorage.getItem("Pedido")) != null) {
        arrayPedido = JSON.parse(localStorage.getItem("Pedido"));

    }

    if (JSON.parse(localStorage.getItem("Producto")) != null) {
        arrayProducto = JSON.parse(localStorage.getItem("Producto"));

    }
    if (talla.value != "Talla") {


        let producto = {
            "prenda": pedido[number].nombreArticulo,
            "precio": pedido[number].precioArticulo,
            "talla": talla.value
        }

        precioTotal = precioTotal + precioSumado;
        let totalPrice = {
            "precioTotal": precioTotal
        }

        arrayPedido.push(producto);
        arrayPedido.push(totalPrice);
        arrayProducto.push(producto);

        localStorage.setItem("Producto", JSON.stringify(arrayProducto));

        localStorage.setItem("Total", JSON.stringify(precioTotal));
        localStorage.setItem("Pedido", JSON.stringify(arrayPedido));

    }

    number++;
    let contador = {
        "contador": number
    }
    arrayPedido.push(contador);
    localStorage.setItem("Pedido", JSON.stringify(arrayPedido));





    if (number > 4) {
        window.location.href = "FDConfirmar.html";
    }
}