window.onload = main;

function main() {

    cargarPlatosApi();
    cargararMesas();
    document.getElementById("confirmar").addEventListener("click",confirmar,false);
}

var arrayPlatosComanda = new Array();
var arrayMesas = new Array();
var arrayCamareros = new Array();
var arrayPlatosApi = new Array();


function cargarPlatosApi() {

    let token;
    if (JSON.parse(localStorage.getItem("Token")) != null) {
        token = JSON.parse(localStorage.getItem("Token"));
    }

    fetch("https://restaurante.serverred.es/api/platos", {
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
                arrayPlatosApi.push(element);
            });
            //console.log(arrayPlatosApi);

            mostrarPlatosApi();
        });
}

function mostrarPlatosApi() {
    let primero = document.getElementById("platosPrimero");
    let segundo = document.getElementById("platosSegundo");
    let postre = document.getElementById("platosPostre");

    arrayPlatosApi.forEach(element => {
        let div = document.createElement("div");
        div.setAttribute("class", "col");

        let input = document.createElement("input");
        input.setAttribute("type", "button");
        input.setAttribute("id", element._id);
        input.setAttribute("value", element.nombre);
        input.setAttribute("onclick","sumarPlato(this)");
        div.appendChild(input);

        if (element.orden == "Primero") {
            input.setAttribute("class","mt-2 btn btn-info p-3");
            primero.appendChild(div);

        } else if (element.orden == "Segundo") {
            input.setAttribute("class","mt-2 btn btn-success p-3");
            segundo.appendChild(div);

        } else if (element.orden == "Postre") {
            input.setAttribute("class","mt-2 btn btn-warning p-3");
            postre.appendChild(div);
        }
    });
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
        arrayPlatosComanda = JSON.parse(localStorage.getItem("Comandas"));
    }
    console.log(arrayPlatosComanda);
    mostrarPlatosComanda();
    mostrarDatos();
}


function mostrarDatos() {

    let nombre = document.getElementById("nombre");
    let contenido1 = document.createTextNode(arrayPlatosComanda.nombre);
    nombre.appendChild(contenido1);

    let comensales = document.getElementById("comensales");
    let contenido2 = document.createTextNode(arrayPlatosComanda.comensales);
    comensales.appendChild(contenido2);

    let mesa = document.getElementById("mesa");
    let contenido3 = document.createTextNode(mostrarMesa(arrayPlatosComanda.mesa));
    mesa.appendChild(contenido3);

    let camarero = document.getElementById("camarero");
    let contenido4 = document.createTextNode(mostrarCamarero(arrayPlatosComanda.user));
    camarero.appendChild(contenido4);

    let hEntrada = document.getElementById("fechaEntrada");
    let contenido5 = document.createTextNode(arrayPlatosComanda.fechaEntrada);
    hEntrada.appendChild(contenido5);
}

function mostrarPlatosComanda() {

    let comBebidas = document.getElementById("comPlatos");
    comBebidas.replaceChildren("");

    arrayPlatosComanda.platos.forEach(element => {

        let tr = document.createElement("tr");

        let td1 = document.createElement("td");
        let borrar = document.createElement("button");
        borrar.setAttribute("class", "btn btn-primary btn-lg my-3");
        borrar.setAttribute("id", element._id);
        borrar.setAttribute("onclick", "borrarPlato(this)");
        borrar.setAttribute("type", "button");
        let contenido11 = document.createTextNode("Borrar");
        borrar.appendChild(contenido11);
        td1.appendChild(borrar);

        let td3 = document.createElement("td");
        let contenido3 = document.createTextNode(element.nombre);
        td3.appendChild(contenido3);

        let td4 = document.createElement("td");
        let contenido4 = document.createTextNode(mostrarOrden(element._id));
        td4.appendChild(contenido4);

        let td5 = document.createElement("td");
        let contenido5 = document.createTextNode(element.cantidad);
        td5.appendChild(contenido5);

        tr.appendChild(td1);

        tr.appendChild(td3);
        tr.appendChild(td4);
        tr.appendChild(td5);
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

function mostrarOrden(idPlato) {
    //console.log(idPlato);

    for (let element of arrayPlatosApi) {
        if (idPlato == element._id) {
            //console.log(element.name);
            return element.orden;
        }

    }
    return "No existe el plato";
}

function borrarPlato(elem){
    let id = elem.id;

    arrayPlatosComanda.platos.forEach((element,index)=>{
        if (id == element._id) {
            if (element.estado=="Servido") {

                alert("No se puede borrar el plato, esta servido");
            }else if(element.estado=="Pendiente"){
                arrayPlatosComanda.platos.splice(index,1);
                mostrarPlatosComanda();
            }
        }
    });

}
function  sumarPlato(elem){
    let id = elem.id;
    var validator = false;

    arrayPlatosComanda.platos.forEach(element => {
        if (id == element._id) {
            let cantidadSumada = element.cantidad + 1;
            element.cantidad = cantidadSumada;
            validator = true;
            mostrarPlatosComanda();
        } 
    });

    if (validator==false) {
        arrayPlatosApi.forEach(element => {
            if (id == element._id) {
                let bebida = {
                    "_id": element._id,
                    "cantidad": 1,
                    "estado": "Pendiente",
                    "nombre": element.nombre,
                    "precio": element.precio
                }
                arrayPlatosApi.platos.push(bebida);
                mostrarPlatosComanda();
            }
        });
    }

}


function confirmar(e){
    e.preventDefault();
    console.log(notas.value);

    let token;
    if (JSON.parse(localStorage.getItem("Token")) != null) {
        token = JSON.parse(localStorage.getItem("Token"));
    }


    let platos = {

        "platos":arrayPlatosComanda.platos,
        "notas":notas.value
    }

    fetch("https://restaurante.serverred.es/api/comandas/platos/"+arrayPlatosComanda._id, {
        method: "PUT",
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            "auth-token": token
        },
        body: JSON.stringify(platos)
    }).then(response => response.json())

        .then(data => {
            console.log(data);
           alert("Se ha actaulizado los Platos")
            window.location.href="comandas.html";
        });
}


