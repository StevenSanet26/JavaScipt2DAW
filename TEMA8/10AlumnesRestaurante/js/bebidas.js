window.onload = main;

function main() {

    comprobarToken();
    cargarBebidas();
    document.getElementById("newBebida").addEventListener("click", nuevabebida, false);
    document.getElementById("confirmar").addEventListener("click", confirmar, false);
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
    //console.log(usuari.name);
    let contenido = document.createTextNode(usuari.name);
    document.getElementById("user").replaceChildren(contenido);
    document.getElementById("avatar").setAttribute("src", "https://userprofile.serverred.es/public/img/" + usuari.avatar);
}

function cargarBebidas() {

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
            console.log(data.data.data);
            mostrarBebidas(data.data.data);
        });
}

function mostrarBebidas(mesas) {

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
        let contenido3 = document.createTextNode(element.nombre);
        td3.appendChild(contenido3);

        let td4 = document.createElement("td");
        let contenido4 = document.createTextNode(element.precio);
        td4.appendChild(contenido4);



        tr.appendChild(td1);
        tr.appendChild(td2);
        tr.appendChild(td3);
        tr.appendChild(td4);


        fila.appendChild(tr);
    });

}

function nuevabebida() {
    let formulario = document.getElementById("formulario");
    formulario.setAttribute("class", "");
}


function confirmar(e) {

    e.preventDefault();

    if (validarNombre() && validarPrecio()) {

        let nombre = document.getElementById("nombre").value;
        let precio = document.getElementById("precio").value;

        let idMesa = document.getElementById("_id");
        //console.log(idMesa.value);

        let bebida = {
            "nombre": nombre,
            "precio": precio
        }

        let token;
        if (JSON.parse(localStorage.getItem("Token")) != null) {
            token = JSON.parse(localStorage.getItem("Token"));
        }

        if (idMesa.value == "") {
            console.log("se crea");
            fetch("https://restaurante.serverred.es/api/bebidas", {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                    "auth-token": token
                },
                body: JSON.stringify(bebida)
            }).then(response => response.json())
                .then(data => {
                    console.log(data.ok);
                    if (data.ok == true) {
                        alert("La mesa a sido creada");
                        cargarBebidas();
                    }
                });
        } else {
            console.log("se modifica");
            fetch("https://restaurante.serverred.es/api/mesas/" + idMesa.value, {
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




function validarNombre() {

    let element = document.getElementById("nombre");
    esborrarError(element);

    if (!element.checkValidity()) {
        if (element.validity.valueMissing) {
            error2(element, "Nombre requerido");
        }
        if (element.validity.patternMismatch) {
            error2(element, "Nombre entre 6 y 60 caracteres");
        }

        return false;
    }
    return true;
}

function validarPrecio() {
    let element = document.getElementById("precio");
    esborrarError(element);
    if (!element.checkValidity()) {
        if (element.validity.valueMissing) {
            error2(element, "Precio requerido");
        }
        if (element.validity.rangeUnderflow) {
            error2(element, "Precio minimo 0€");
        }
        return false;
    }
    return true;
}


function error2(element, missatge) {
    document.getElementById("missatgeError").innerHTML = missatge;
    element.className = "form-control error";
    element.focus();
}

function esborrarError(element) {
    //var formulari = document.forms[0];
    element.className = " form-control";
    /*for (var i = 0; i < formulari.elements.length; i++) {
        formulari.elements[i].className = "form-control";
    }*/
}
