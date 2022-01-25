window.onload = main;

var arrayBebidas = new Array();
var arrayMesas = new Array();
var arrayCamareros = new Array();
var arrayBebidasApi = new Array();

function main() {

    cargarBebidasApi();
    cargararMesas();
    document.getElementById("confirmar").addEventListener("click",confirmar,false);
}

function cargararMesas() {

    let token;
    if (JSON.parse(localStorage.getItem("Token")) != null) {
        token = JSON.parse(localStorage.getItem("Token"));
    }
    fetch("https://restaurante.serverred.es/api/mesas", {
        method: "GET",
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',

            "auth-token": token
        }
    }).then(response => response.json())
        .then(data => {
            //console.log(data);
            data.data.data.forEach(element => {
                arrayMesas.push(element);
            });

            cargarCamareros();

        });
}

function cargarCamareros() {

    let token;
    if (JSON.parse(localStorage.getItem("Token")) != null) {
        token = JSON.parse(localStorage.getItem("Token"));
    }
    fetch("https://restaurante.serverred.es/api/camareros", {
        method: "GET",
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',

            "auth-token": token
        }
    }).then(response => response.json())
        .then(data => {
            // console.log(data);
            data.data.data.forEach(element => {
                arrayCamareros.push(element);
            });
            cargarComandas();

        });
}

function cargarComandas() {
    if (JSON.parse(localStorage.getItem("Comandas")) != null) {
        arrayBebidas = JSON.parse(localStorage.getItem("Comandas"));
    }
    console.log(arrayBebidas);
    mostrarBebidas();
    mostrarDatos();
}
function mostrarDatos() {
    let nombre = document.getElementById("nombre");
    let contenido1 = document.createTextNode(arrayBebidas.nombre);
    nombre.appendChild(contenido1);

    let comensales = document.getElementById("comensales");
    let contenido2 = document.createTextNode(arrayBebidas.comensales);
    comensales.appendChild(contenido2);

    let mesa = document.getElementById("mesa");
    let contenido3 = document.createTextNode(mostrarMesa(arrayBebidas.mesa));
    mesa.appendChild(contenido3);

    let camarero = document.getElementById("camarero");
    let contenido4 = document.createTextNode(mostrarCamarero(arrayBebidas.user));
    camarero.appendChild(contenido4);

    let hEntrada = document.getElementById("fechaEntrada");
    let contenido5 = document.createTextNode(arrayBebidas.fechaEntrada);
    hEntrada.appendChild(contenido5);
}

function mostrarBebidas() {

    let comBebidas = document.getElementById("comBebidas");
    comBebidas.replaceChildren("");

    arrayBebidas.bebidas.forEach(element => {

        let tr = document.createElement("tr");

        let td1 = document.createElement("td");
        let borrar = document.createElement("button");
        borrar.setAttribute("class", "btn btn-primary btn-lg my-3");
        borrar.setAttribute("id", element._id);
        borrar.setAttribute("onclick", "borrarBebida(this)");
        borrar.setAttribute("type","button");
        let contenido11 = document.createTextNode("Borrar");
        borrar.appendChild(contenido11);
        td1.appendChild(borrar);

        let td3 = document.createElement("td");
        let contenido3 = document.createTextNode(element.nombre);
        td3.appendChild(contenido3);

        let td4 = document.createElement("td");
        let contenido4 = document.createTextNode(element.cantidad);
        td4.appendChild(contenido4);

        tr.appendChild(td1);

        tr.appendChild(td3);
        tr.appendChild(td4);

        comBebidas.appendChild(tr);
    });


}

function mostrarCamarero(user_id) {
    //console.log(user_id);
    //console.log(arrayCamareros);
    for (let element of arrayCamareros) {
        if (user_id == element._id) {
            //console.log(element.name);
            return element.name;
        }

    }
    return "Sin camarero";
}

function mostrarMesa(mesa_id) {
    for (let element of arrayMesas) {
        if (mesa_id == element._id) {
            //console.log(element.name);
            return element.numero;
        }

    }
    return "Sin mesa";
}


function cargarBebidasApi() {
    let token;
    if (JSON.parse(localStorage.getItem("Token")) != null) {
        token = JSON.parse(localStorage.getItem("Token"));
    }

    fetch("https://restaurante.serverred.es/api/bebidas", {
        method: "GET",
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Accept': 'application/json',
            "auth-token": token
        }
    }).then(response => response.json())
        .then(data => {
            //console.log(data.data.data);
            data.data.data.forEach(element => {
                arrayBebidasApi.push(element);
            });
            mostrarBebidasApi();
        });
}

function mostrarBebidasApi(bebidasApi) {

    let bebidas = document.getElementById("bebidas");
    let div = document.createElement("div");
    div.setAttribute("class", "row");
    arrayBebidasApi.forEach(element => {
        
        let input = document.createElement("input");

        input.setAttribute("type", "button");
        input.setAttribute("id", element._id);
        input.setAttribute("class", "mt-2 btn btn-info p-3");
        input.setAttribute("value", element.nombre);
        input.setAttribute("onclick", "sumarBebidas(this)");
        div.appendChild(input);

        
    });
    bebidas.appendChild(div);
}


function borrarBebida(elem) {
    let id = elem.id;
    console.log(id);
    
    arrayBebidas.bebidas.forEach((element,index) => {
        if (id == element._id) {
            if (element.estado=="Servido") {
                
              alert("No se puede borrar, esta servida");
            }else if(element.estado=="Pendiente"){
                arrayBebidas.bebidas.splice(index,1);
                mostrarBebidas();
            }
        } 
    });
   
    
}

function sumarBebidas(elem) {
    let id = elem.id;
    var validator = false;

    arrayBebidas.bebidas.forEach(element => {
        if (id == element._id) {
            let cantidadSumada = element.cantidad + 1;
            element.cantidad = cantidadSumada;
            validator = true;
            mostrarBebidas();
        } 
    });

    if (validator==false) {
        arrayBebidasApi.forEach(element => {
            if (id == element._id) {
                let bebida = {
                    "_id": element._id,
                    "cantidad": 1,
                    "estado": "Pendiente",
                    "nombre": element.nombre,
                    "precio": element.precio
                }
                arrayBebidas.bebidas.push(bebida);
                mostrarBebidas();
            }
        });
    }
}


function confirmar(e){
    e.preventDefault();
    console.log(notas.value);
    console.log(arrayBebidas.bebidas);
    let token;
    if (JSON.parse(localStorage.getItem("Token")) != null) {
        token = JSON.parse(localStorage.getItem("Token"));
    }
    let bebidas = {

        "bebidas":arrayBebidas.bebidas,
        "notas":notas.value
    }

    fetch("https://restaurante.serverred.es/api/comandas/bebidas/"+arrayBebidas._id, {
        method: "PUT",
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            "auth-token": token
        },
        body: JSON.stringify(bebidas)
    }).then(response => response.json())

        .then(data => {
            console.log(data);
            alert("Se ha actaulizado las bebidas")
            window.location.href="comandas.html";
        });
}