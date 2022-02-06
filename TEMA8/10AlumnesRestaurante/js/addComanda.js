window.onload = main;


function main(){


    cargarBebidasApi();
    cargarPlatosApi();
}

let arrayBebidasApi = new Array();
let arrayPlatosApi = new Array();

let arrayNewComandaPlatos = new Array();
let arrayNewComandaBebidas = new Array();

function cargarBebidasApi(){

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

function mostrarBebidasApi(){

    let bebidas = document.getElementById("bebidas");
 
    arrayBebidasApi.forEach(element => {
        let div = document.createElement("div");
        div.setAttribute("class", "row");
        let input = document.createElement("input");

        input.setAttribute("type", "button");
        input.setAttribute("id", element._id);
        input.setAttribute("class", "mt-2 btn btn-info p-3");
        input.setAttribute("value", element.nombre);
        input.setAttribute("onclick", "sumarBebidas(this)");
        div.appendChild(input);
        bebidas.appendChild(div);
        
    });
}


function cargarPlatosApi(){
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


function mostrarPlatosApi(){

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


function sumarBebidas(){


}