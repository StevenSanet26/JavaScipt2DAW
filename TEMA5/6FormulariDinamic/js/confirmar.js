window.onload = iniciar;

function iniciar() {
    cargarProductos();
    cargarTotal();
    document.querySelector("a").addEventListener("click",borrar);
  
}
function borrar(){
    let a=document.querySelector("a");
    console.log(a);
}




function cargarProductos() {

    let arrayPedido = new Array();

    //OBTINDRE DE LOCALSTORAGE
    if (JSON.parse(localStorage.getItem("Pedido")) != null) {
        arrayPedido = JSON.parse(localStorage.getItem("Pedido"));
    }
    let nombreApellido = document.getElementById("nombreApellidos");
    let contenido = document.createTextNode(arrayPedido[0].nom);
    nombreApellido.appendChild(contenido);

    let articulos = document.getElementById("articulos");

    arrayPedido[0].producte.forEach(element => {
        
        for (let i = 0; i < pedido.length; i++) {
            var x= i;
            if (element.prenda == pedido[x].nombreArticulo) {
                
                let div1 = document.createElement("div");
                div1.setAttribute("class", "card mt-2");
                div1.setAttribute("style", "width: 25rem;");

                let h5 = document.createElement("h5");
                h5.setAttribute("class", "card-header");
                let prenda = document.createTextNode(element.prenda);
                h5.appendChild(prenda);

                let div2 = document.createElement("div");
                div2.setAttribute("class", "card-body");

                let div3 = document.createElement("div");
                div3.setAttribute("class", "row");



                let div4 = document.createElement("div");
                div4.setAttribute("class", "col");

                let h3 = document.createElement("h3");
                h3.setAttribute("class", "card-title");
                let precio = document.createTextNode(element.precio);
                h3.appendChild(precio);

                let p = document.createElement("p");
                p.setAttribute("class", "card-text");
                let talla = document.createTextNode("Talla " + element.talla);
                p.appendChild(talla);

                let a = document.createElement("a");
                a.setAttribute("href","#");
                a.setAttribute("class", "btn btn-primary text-end");
                let i = document.createElement("i");
                i.setAttribute("class", "fa fa-trash-o");
                i.setAttribute("aria-hidden", "true");
                a.appendChild(i);

                div4.appendChild(h3);
                div4.appendChild(p);
                div4.appendChild(a);




                let div5 = document.createElement("div");
                div5.setAttribute("class", "col");

                let img = document.createElement("img");
                let foto = pedido[x].imagen;
                console.log(foto);
                img.setAttribute("src", "./img/" + foto);
                img.setAttribute("class", "img-fluid img-thumbnail");
                div5.appendChild(img);


                div3.appendChild(div4);
                div3.appendChild(div5);

                div2.appendChild(div3);

                div1.appendChild(h5);
                div1.appendChild(div2);

                articulos.appendChild(div1);
            }
        }

    });

}
function cargarTotal(){
    let arrayPedido = new Array();

    //OBTINDRE DE LOCALSTORAGE
    if (JSON.parse(localStorage.getItem("Pedido")) != null) {
        arrayPedido = JSON.parse(localStorage.getItem("Pedido"));
    }

    let sumando=0;
    arrayPedido[0].producte.forEach(element => {
        sumando+=element.precio;

    });

    let contenido=document.createTextNode(sumando+"€");
    let total=document.getElementById("total");
    total.appendChild(contenido);
}