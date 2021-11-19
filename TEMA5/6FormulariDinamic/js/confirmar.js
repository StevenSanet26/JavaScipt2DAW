window.onload.iniciar;

function iniciar() {
    cargarProductos()


}


function cargarProductos() {

    let arrayPedido = new Array();

    //OBTINDRE DE LOCALSTORAGE
    if (JSON.parse(localStorage.getItem("Pedido")) != null) {
        arrayPedido = JSON.parse(localStorage.getItem("Pedido"));
    }

    array.forEach(element => {
        let div1 = document.createElement("div");
        div1.setAttribute("",)


    });

}