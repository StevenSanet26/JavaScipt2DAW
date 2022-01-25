window.onload = main;


function main() {
    comprobarToken();
    cargarPlatos();
    document.getElementById("newPlato").addEventListener("click", nuevoPlato, false);
    document.getElementById("confirmar").addEventListener("click", confirmar, false);
    document.getElementById("orden").addEventListener("change", validarOrden, false);

}

function comprobarToken() {
    if (JSON.parse(localStorage.getItem("Token")) == null) {
        alert("Tens que iniciar sessio per a entrar Bebidas");
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

function cargarPlatos() {


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
            console.log(data.data.data);
            mostrarPlatos(data.data.data);
        });
}

function mostrarPlatos(platos) {

    let fila = document.getElementById("files");
    fila.replaceChildren("");
    platos.forEach((element, index) => {

        let tr = document.createElement("tr");

        let td1 = document.createElement("td");
        let borrar = document.createElement("button");
        borrar.setAttribute("class", "btn btn-primary btn-lg my-3");
        borrar.setAttribute("id", element._id);
        borrar.setAttribute("onclick", "borrarPlatos(this)");
        let contenido1 = document.createTextNode("Borrar");
        borrar.appendChild(contenido1);
        td1.appendChild(borrar);

        let td2 = document.createElement("td");
        let modificar = document.createElement("button");
        modificar.setAttribute("class", "btn btn-primary btn-lg my-3");
        modificar.setAttribute("id", element._id);
        modificar.setAttribute("onclick", "modificarPlatos(this)");
        let contenido2 = document.createTextNode("Modificar");
        modificar.appendChild(contenido2);
        td2.appendChild(modificar);

        let td3 = document.createElement("td");
        let contenido3 = document.createTextNode(element.nombre);
        td3.appendChild(contenido3);

        let td4 = document.createElement("td");
        let contenido4 = document.createTextNode(element.orden);
        td4.appendChild(contenido4);

        let td5 = document.createElement("td");
        let contenido5 = document.createTextNode(element.precio);
        td5.appendChild(contenido5);



        tr.appendChild(td1);
        tr.appendChild(td2);
        tr.appendChild(td3);
        tr.appendChild(td4);
        tr.appendChild(td5);

        fila.appendChild(tr);
    });

}

function nuevoPlato() {

    let formulario = document.getElementById("formulario");
    formulario.setAttribute("class", "");
}

function confirmar(e) {

    e.preventDefault();

    if (validarNombre() && validarOrden() && validarPrecio()) {

        let nombre = document.getElementById("nombre").value;
        let orden = document.getElementById("orden").value;
        let precio = document.getElementById("precio").value;

        let idPlato = document.getElementById("_id");
        //console.log(idMesa.value);

        let plato = {
            "nombre": nombre,
            "orden": orden,
            "precio": precio
        }

        let token;
        if (JSON.parse(localStorage.getItem("Token")) != null) {
            token = JSON.parse(localStorage.getItem("Token"));
        }

        if (idPlato.value == "") {
            console.log("se crea");
            fetch("https://restaurante.serverred.es/api/platos", {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                    "auth-token": token
                },
                body: JSON.stringify(plato)
            }).then(response => response.json())
                .then(data => {
                    console.log(data);
                    if (data.ok == true) {
                        alert("El plato a sido creada");
                        cargarPlatos();
                    }
                });
        } else {
            console.log("se modifica");
            fetch("https://restaurante.serverred.es/api/platos/" + idPlato.value, {
                method: "PUT",
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                    "auth-token": token
                },
                body: JSON.stringify(plato)
            }).then(response => response.json())
                .then(data => {
                    console.log(data);
                    if (data.ok == true) {
                        alert("El plato a sido modificada");
                        cargarPlatos();
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
            error2(element, "Nombre entre 4 y 60 caracteres");
        }

        return false;
    }
    return true;
}

function validarOrden() {

    let element = document.getElementById("orden");
    console.log(element.value);

    esborrarError(element);

    if (element.value == "Selecciona Orden") {
        error2(element, "Orden requerido");
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
    element.className = "form-control";
    document.getElementById("missatgeError").innerHTML = "";
    /*for (var i = 0; i < formulari.elements.length; i++) {
        formulari.elements[i].className = "form-control";
    }*/
}


function modificarPlatos(element) {
    formulario.setAttribute("class", "");
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
            console.log(data.data);
            let id = element.id;
            mostrarPlato(data.data.data, id);
        });
}
function mostrarPlato(plato, id) {

    plato.forEach(element => {
        if (element._id == id) {
            console.log(element.orden);
            let nombre = document.getElementById("nombre");
            let idPlato = document.getElementById("_id");
            let precio = document.getElementById("precio");
            let orden = document.getElementById("orden");
            console.log(orden.value);
            orden.replaceChildren("");
            if (element.orden == "Primero") {
                console.log("entra al primer");
                let option1 = document.createElement("option");
                let contenido1 = document.createTextNode("Selecciona Orden");

                option1.setAttribute("disabled", "");
                option1.appendChild(contenido1);

                let option2 = document.createElement("option");
                let contenido2 = document.createTextNode("Primero");
                option2.setAttribute("selected", "");
                option2.appendChild(contenido2);

                let option3 = document.createElement("option");
                let contenido3 = document.createTextNode("Segundo");
                option3.appendChild(contenido3);

                let option4 = document.createElement("option");
                let contenido4 = document.createTextNode("Postre");
                option4.appendChild(contenido4);

                orden.appendChild(option1);
                orden.appendChild(option2);
                orden.appendChild(option3);
                orden.appendChild(option4);

                

            } else if (element.orden == "Segundo") {

                console.log("entra al segon");
                let option1 = document.createElement("option");
                let contenido1 = document.createTextNode("Selecciona Orden");

                option1.setAttribute("disabled", "");
                option1.appendChild(contenido1);

                let option2 = document.createElement("option");
                let contenido2 = document.createTextNode("Primero");
                option2.appendChild(contenido2);

                let option3 = document.createElement("option");
                option3.setAttribute("selected", "");
                let contenido3 = document.createTextNode("Segundo");
                option3.appendChild(contenido3);

                let option4 = document.createElement("option");
                let contenido4 = document.createTextNode("Postre");
                option4.appendChild(contenido4);

                orden.appendChild(option1);
                orden.appendChild(option2);
                orden.appendChild(option3);
                orden.appendChild(option4);

                

            } else if (element.orden == "Postre") {
                console.log("entra al postre");
                
                let option1 = document.createElement("option");
                let contenido1 = document.createTextNode("Selecciona Orden");

                option1.setAttribute("disabled", "");
                option1.appendChild(contenido1);

                let option2 = document.createElement("option");
                let contenido2 = document.createTextNode("Primero");
                option2.appendChild(contenido2);

                let option3 = document.createElement("option");
                
                let contenido3 = document.createTextNode("Segundo");
                option3.appendChild(contenido3);

                let option4 = document.createElement("option");
                option4.setAttribute("selected", "");
                let contenido4 = document.createTextNode("Postre");
                option4.appendChild(contenido4);

                orden.appendChild(option1);
                orden.appendChild(option2);
                orden.appendChild(option3);
                orden.appendChild(option4);
            }

            nombre.setAttribute("value", element.nombre);
            precio.setAttribute("value", element.precio);
          

            idPlato.setAttribute("value", id)
        }
    });
}


function borrarPlatos(element) {
    let id = element.id;
    let token;
    if (JSON.parse(localStorage.getItem("Token")) != null) {
        token = JSON.parse(localStorage.getItem("Token"));
    }

    fetch("https://restaurante.serverred.es/api/platos/" + id, {
        method: "DELETE",
        headers: {
            "auth-token": token
        }
    }).then(response => response.json())
        .then(data => {
            console.log(data);
            if (data.ok == true) {
            console.log(data);
            alert("S'ha borrat correctament el plato");
            cargarPlatos();
            }
        });
}