window.onload = main;
var arrayCamareros = new Array();
var arrayComandas = new Array();
var arrayMesas = new Array()

function main() {

    comprobarToken();

    cargarMesa();
    //contador();

}

var totalTime = 10;

function updateClock() {

    document.getElementById('countdown').innerHTML = totalTime;
    if (totalTime == 0) {
        alert('Final');
    } else {

        totalTime -= 1;
        setTimeout("updateClock()", 1000);
    }
}

function comprobarToken() {
    if (JSON.parse(localStorage.getItem("Token")) == null) {

    } else {

        let token;
        if (JSON.parse(localStorage.getItem("Token")) != null) {
            token = JSON.parse(localStorage.getItem("Token"));
        }
        //console.log(token);

        fetch("https://userprofile.serverred.es/api/areapersonal", {
            method: "GET",
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'Accept': 'application/json',
                "auth-token": token
            }
        }).then(response => response.json())
            .then(data => {
                //console.log(data.data.user)
                mostrarUsuario(data.data.user);
            });

    }
}


function mostrarUsuario(usuari) {
    //cocnsole.log(usuari.name);
    let contenido = document.createTextNode(usuari.name);
    document.getElementById("user").replaceChildren(contenido);
    document.getElementById("avatar").setAttribute("src", "https://userprofile.serverred.es/public/img/" + usuari.avatar);
}




function cargarMesa() {
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
            cargarBebidasComanda();

        });
}


function cargarBebidasComanda() {

    let token;
    if (JSON.parse(localStorage.getItem("Token")) != null) {
        token = JSON.parse(localStorage.getItem("Token"));
    }

    fetch("https://restaurante.serverred.es/api/comandas", {
        method: "GET",
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Accept': 'application/json',
            "auth-token": token
        }
    }).then(response => response.json())
        .then(data => {
            console.log(data.data.data);
            data.data.data.forEach(element => {
                arrayComandas.push(element);
            });
            mostrarBebidasComanda();
        });

}


function mostrarBebidasComanda() {

    let fila = document.getElementById("files");
    fila.replaceChildren("");

    //console.log(arrayComandas[0].bebidas[0].estado);


    arrayComandas.forEach(element => {
        element.bebidas.forEach(elem => {
            //console.log(elem);
            if (elem.estado == "Pendiente") {
                let tr = document.createElement("tr");
                if (mostrarMesa(element.mesa) == 1) {

                    tr.setAttribute("class", "table-primary");
                } else if (mostrarMesa(element.mesa) == 2) {

                    tr.setAttribute("class", "table-secondary");
                } else if (mostrarMesa(element.mesa) == 3) {

                    tr.setAttribute("class", "table-info");
                } else if (mostrarMesa(element.mesa) == 4) {

                    tr.setAttribute("class", "table-dark");
                }
                else if (mostrarMesa(element.mesa) == 5) {

                    tr.setAttribute("class", "table-warning");
                } else if (mostrarMesa(element.mesa) == 6) {

                    tr.setAttribute("class", "table-success");
                }




                let td2 = document.createElement("td");
                let modificar = document.createElement("button");
                modificar.setAttribute("class", "btn btn-warning btn-lg p-2");
                modificar.setAttribute("id", elem._id);
                modificar.setAttribute("onclick", "servir(this)");

                let contenido2 = document.createTextNode("Servir");
                modificar.appendChild(contenido2);
                td2.appendChild(modificar);





                let td3 = document.createElement("td");
                let contenido3 = document.createTextNode(mostrarMesa(element.mesa));
                td3.appendChild(contenido3);






                let td4 = document.createElement("td");
                let contenido4 = document.createTextNode(elem.nombre);
                td4.appendChild(contenido4);

                let td5 = document.createElement("td");
                let contenido5 = document.createTextNode(elem.cantidad);
                td5.appendChild(contenido5);

                let td6 = document.createElement("td");
                //console.log(element.user);

                let contenido6 = document.createTextNode(mostrarCamarero(element.user));
                //console.log(mostrarCamarero(element.user));
                td6.appendChild(contenido6);

                let td7 = document.createElement("td");
                let contenido7 = document.createTextNode("en espera");
                td7.appendChild(contenido7);




                tr.appendChild(td2);
                tr.appendChild(td3);
                tr.appendChild(td4);
                tr.appendChild(td5);
                tr.appendChild(td6);
                tr.appendChild(td7);


                fila.appendChild(tr);
            }
        });
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


function servir(elemente) {

    var idComanda;
    var id = elemente.id;
    console.log(id);
   
    arrayComandas.forEach(element => {
        element.bebidas.forEach(elem => {
            //console.log(elem);
            if (elem.estado == "Pendiente") {
                if (elem._id == id) {
                    idComanda = element._id
                }
            }
        });
    });
    console.log(idComanda);
    

    let token;
    if (JSON.parse(localStorage.getItem("Token")) != null) {
        token = JSON.parse(localStorage.getItem("Token"));
    }

    let bebida = {

        "bebida":id
    }

    fetch("https://restaurante.serverred.es/api/comandas/estadobebidas/"+idComanda, {
        method: "PUT",
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            "auth-token": token
        },
        body: JSON.stringify(bebida)
    }).then(response => response.json())

        .then(data => {
            console.log(data);
          
           
        });
}