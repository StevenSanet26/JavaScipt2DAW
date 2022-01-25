window.onload = main;

function main() {
    comprobarToken();
    cargarMesas();
    document.getElementById("newMesa").addEventListener("click", nuevaMesa, false);
    document.getElementById("confirmar").addEventListener("click", confirmar, false);
}

function comprobarToken() {
    if (JSON.parse(localStorage.getItem("Token")) == null) {
        alert("Tens que iniciar sessio per a entrar Mesas");
        window.location.href = ("login.html");
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
    //console.log(usuari.name);
    let contenido = document.createTextNode(usuari.name);
    document.getElementById("user").replaceChildren(contenido);
    document.getElementById("avatar").setAttribute("src", "https://userprofile.serverred.es/public/img/" + usuari.avatar);
}

function cargarMesas() {

    let token;
    if (JSON.parse(localStorage.getItem("Token")) != null) {
        token = JSON.parse(localStorage.getItem("Token"));
    }

    fetch("https://restaurante.serverred.es/api/mesas", {
        method: "GET",
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Accept': 'application/json',
            "auth-token": token
        }
    }).then(response => response.json())
        .then(data => {
            //console.log(data.data.data);
            mostrarMesas(data.data.data);
        });
}

function mostrarMesas(mesas) {

    let fila = document.getElementById("files");
    fila.replaceChildren("");
    mesas.forEach((element, index) => {
        
        let tr = document.createElement("tr");
        
        let td1 = document.createElement("td");
        let borrar = document.createElement("button");
        borrar.setAttribute("class", "btn btn-primary btn-lg my-3");
        borrar.setAttribute("id", element._id);
        borrar.setAttribute("onclick", "borrarMesa(this)");
        let contenido1 = document.createTextNode("Borrar");
        borrar.appendChild(contenido1);
        td1.appendChild(borrar);

        let td2 = document.createElement("td");
        let modificar = document.createElement("button");
        modificar.setAttribute("class", "btn btn-primary btn-lg my-3");
        modificar.setAttribute("id", element._id);
        modificar.setAttribute("onclick", "modificarMesa(this)");
        let contenido2 = document.createTextNode("Modificar");
        modificar.appendChild(contenido2);
        td2.appendChild(modificar);

        let td3 = document.createElement("td");
        let contenido3 = document.createTextNode(element.numero);
        td3.appendChild(contenido3);

        let td4 = document.createElement("td");
        let contenido4 = document.createTextNode(element.comensales);
        td4.appendChild(contenido4);

        let td5 = document.createElement("td");
        let contenido5 = document.createTextNode(element.descripcion);
        td5.appendChild(contenido5);

        tr.appendChild(td1);
        tr.appendChild(td2);
        tr.appendChild(td3);
        tr.appendChild(td4);
        tr.appendChild(td5);

        fila.appendChild(tr);
    });

}


function nuevaMesa() {
    let formulario = document.getElementById("formulario");
    formulario.setAttribute("class", "");
}


function confirmar(e) {

    e.preventDefault();

    if (validarNumero() && validarComensales()) {
        
        let numero = document.getElementById("numero").value;
        let comensales = document.getElementById("comensales").value;
        let descripcion = document.getElementById("descripcion").value;
        let idMesa = document.getElementById("_id");
        //console.log(idMesa.value);
        
        let mesa = {
            "numero": numero,
            "comensales": comensales,
            "descripcion": descripcion
        }

        let token;
        if (JSON.parse(localStorage.getItem("Token")) != null) {
            token = JSON.parse(localStorage.getItem("Token"));
        }

        if(idMesa.value==""){
            console.log("se crea");
            fetch("https://restaurante.serverred.es/api/mesas", {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                    "auth-token": token
                },
                body: JSON.stringify(mesa)
            }).then(response => response.json())
                .then(data => {
                    console.log(data.ok);
                    if (data.ok == true) {
                        alert("La mesa a sido creada");
                        cargarMesas();
                    }
                });
        }else{
            console.log("se modifica");
            fetch("https://restaurante.serverred.es/api/mesas/"+idMesa.value, {
            method: "PUT",
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                "auth-token": token
            },
            body: JSON.stringify(mesa)
        }).then(response => response.json())
            .then(data => {
                console.log(data);
                if (data.ok == true) {
                    alert("La mesa a sido modificada");
                    cargarMesas();
                }
            });
        }
        
        return true;
    } else {
        return false;
    }
}


function validarNumero() {

    let element = document.getElementById("numero");
    esborrarError(element);

    if (!element.checkValidity()) {
        if (element.validity.valueMissing) {
            error2(element, "Numero querido");
        }
        if (element.validity.rangeUnderflow) {
            error2(element, "Mínimo numero 1");
        }
        if (element.validity.rangeOverflow) {
            error2(element, "Máximo numero 100");
        }
        return false;
    }
    return true;
}

function validarComensales() {
    let element = document.getElementById("comensales");
    esborrarError(element);
    if (!element.checkValidity()) {
        if (element.validity.valueMissing) {
            error2(element, "Nº Comensales requeridos");
        }
        if (element.validity.rangeUnderflow) {
            error2(element, "Mínimo comensales 1");
        }
        if (element.validity.rangeOverflow) {
            error2(element, "Máximo comensales 50");
        }
        return false;
    }
    return true;
}

function validarDescripcion() {
    let element = document.getElementById("descripcion");
}

function error2(element, missatge) {
    document.getElementById("missatgeError").innerHTML = missatge;
    element.className = "form-control error";
    element.focus();
}

function esborrarError(element) {
    //var formulari = document.forms[0];
    element.className = " form-control";
    document.getElementById("missatgeError").innerHTML="";
    /*for (var i = 0; i < formulari.elements.length; i++) {
        formulari.elements[i].className = "form-control";
    }*/
}

function borrarMesa(element) {
    let id = element.id;
    let token;
    if (JSON.parse(localStorage.getItem("Token")) != null) {
        token = JSON.parse(localStorage.getItem("Token"));
    }

    fetch("https://restaurante.serverred.es/api/mesas/" + id, {
        method: "DELETE",
        headers: {
            "auth-token": token
        }
    }).then(response => response.json())
        .then(data => {
            console.log(data);
            if (data.ok == true) {
            console.log(data);
            alert("S'ha borrat correctament la taule");
            cargarMesas();
            }
        });
}

function modificarMesa(element) {
    
    formulario.setAttribute("class", "");
    let token;

    if (JSON.parse(localStorage.getItem("Token")) != null) {
        token = JSON.parse(localStorage.getItem("Token"));
    }

    fetch("https://restaurante.serverred.es/api/mesas", {
        method: "GET",
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Accept': 'application/json',
            "auth-token": token
        }
    }).then(response => response.json())
        .then(data => {
            //console.log(data.data);
            let id = element.id;
            mostrarMesa(data.data.data, id);
        });

}
function mostrarMesa(mesa, id) {

    mesa.forEach(element => {
        if (element._id == id) {
            console.log(id);
            let numero = document.getElementById("numero");
            let idMesa = document.getElementById("_id");

            let comensales = document.getElementById("comensales");
            let descripcion = document.getElementById("descripcion");
            numero.setAttribute("value", element.numero);
            comensales.setAttribute("value", element.comensales);
            descripcion.setAttribute("value", element.descripcion);
            idMesa.setAttribute("value", id)
        }
    });
}