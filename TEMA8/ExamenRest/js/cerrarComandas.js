window.onload = main();

var arrayCamareros = new Array();
var arrayComandas = new Array();
var arrayMesas = new Array()
function main() {

    comprobarToken();

    cargarMesa();
    
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
            mostrarComandas();
        });

}


function mostrarComandas() {



    let fila = document.getElementById("files");
    fila.replaceChildren("");

    //console.log(arrayComandas[0].bebidas[0].estado);


    arrayComandas.forEach(element => {

        //console.log(elem);

        let tr = document.createElement("tr");



        if (element.estado == "Servido") {

            tr.setAttribute("class", "table-info");
        } else if (element.estado == "Pendiente") {

            tr.setAttribute("class", "table-success");
        }



        let td1 = document.createElement("td");


        let cerrar = document.createElement("button");
        cerrar.setAttribute("class", "btn btn-info btn-lg p-2");
        cerrar.setAttribute("id", element._id);
        cerrar.setAttribute("onclick", "cerrar(this)");
        let contenido1 = document.createTextNode("Cerrar");
        cerrar.appendChild(contenido1);
        td1.appendChild(cerrar);


        let ticket = document.createElement("button");
        ticket.setAttribute("class", "btn btn-warning btn-lg p-2");
        ticket.setAttribute("id", element._id);
        ticket.setAttribute("onclick", "ticket(this)");

        ticket.setAttribute("id", element._id);

        let contenido11 = document.createTextNode("Ticket");

        ticket.appendChild(contenido11);
        td1.appendChild(ticket);









        let td2 = document.createElement("td");
        let contenido2 = document.createTextNode(element.nombre);

        td2.appendChild(contenido2);






        let td3 = document.createElement("td");
        let contenido3 = document.createTextNode(mostrarMesa(element.mesa));
        td3.appendChild(contenido3);

        let td4 = document.createElement("td");
        let contenido4 = document.createTextNode(element.comensales);
        td4.appendChild(contenido4);

        let td5 = document.createElement("td");
        //console.log(element.user);

        let contenido5 = document.createTextNode(element.estado);
        //console.log(mostrarCamarero(element.user));
        td5.appendChild(contenido5);

        let td6 = document.createElement("td");
        let contenido6 = document.createTextNode(mostrarCamarero(element.user));
        td6.appendChild(contenido6);

        let td7 = document.createElement("td");

        var hora = obtenerHora(element.fechaEntrada);
        let contenido7 = document.createTextNode(hora);
        td7.appendChild(contenido7);



        tr.appendChild(td1);
        tr.appendChild(td2);
        tr.appendChild(td3);
        tr.appendChild(td4);
        tr.appendChild(td5);
        tr.appendChild(td6);
        tr.appendChild(td7);


        fila.appendChild(tr);


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


function obtenerHora(fecha) {
    var date = new Date(fecha);
    var horas = date.getHours();
    var minutos = date.getMinutes();
    if (horas < 10) {
        horas = "0" + horas;
    }
    if (minutos < 10) {
        minutos = "0" + minutos;
    }
    var hora = horas + ":" + minutos;
    return hora;
}

var ex;
function cerrar(elem) {
    

    let id = elem.id;
    console.log(id);
    arrayComandas.forEach(element => {
        if (element._id == id) {
            if (element.estado == "Servido") {
                alert("Esta comanda no se pude cerrar, esta SERVIDA")
            }else{
               
                $('#myModal').modal('show');

                let nombre = document.getElementById("nombre");
                let mesa = document.getElementById("mesa");
                let comensales = document.getElementById("comensales");
                let camarero = document.getElementById("camarero");

                let contenido1 = document.createTextNode("Nombre: "+element.nombre);
                let contenido2 = document.createTextNode("Mesa: "+mostrarMesa(element.mesa));
                let contenido3 = document.createTextNode("Comensales: "+element.comensales);
                let contenido4 = document.createTextNode("Camarero: "+mostrarCamarero(element.user));
                ex=element._id;
                nombre.replaceChildren(contenido1);
                mesa.replaceChildren(contenido2);
                comensales.replaceChildren(contenido3);
                camarero.replaceChildren(contenido4);
                document.getElementById("confirmar").addEventListener("click", ()=>confirmar(element),false);
                document.getElementById("anular").addEventListener("click",anular,false);
            }
        }

    });

}



function ticket(elem) {
    let id = elem.id;
    console.log(id);
    arrayComandas.forEach(element => {
        if (element._id == id) {
            if (element.estado == "Pendiente") {
                alert("Esta comanda no se pude imprimir, esta Pendiente")
            }else{
                
                var printwin = window.open("");
                printwin.document.write(document.getElementById("bodyPrint").innerHTML);
                printwin.print();

                
            }
        }

    });
}



function confirmar(ele){
console.log(ele.nombre);
   
console.log(ele);

   

    let arCom = ele;
    
    


    let token;
    if (JSON.parse(localStorage.getItem("Token")) != null) {
        token = JSON.parse(localStorage.getItem("Token"));
    }
    fetch(" https://restaurante.serverred.es/api/comandas/"+ele._id, {
        method: "PUT",
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Accept': 'application/json',
            "auth-token": token
        },
        body: JSON.stringify(arCom)
    }).then(response => response.json())
        .then(data => {
            console.log(data);
           
            
        });


}

function anular(){
    $('#myModal').modal('hide')
}