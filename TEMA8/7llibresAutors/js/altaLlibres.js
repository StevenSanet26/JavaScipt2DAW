window.onload = main;

function main() {
    document.getElementById("btnGravar").addEventListener("click", gravar);
    cargarAutores();
}


function cargarAutores(){
    fetch("https://www.serverred.es/api/autores")
    .then(response=>response.json())
    .then(data=>{
        mostrarAutores(data);
    });
}

function mostrarAutores(autores){
    console.log(autores.resultado[0]);
    
    autores.resultado.forEach((element,index) => {
        let tr = document.createElement("tr");
        let td1= document.createElement("td");
        let esborrar = document.createElement("button");
        esborrar.setAttribute("class", "btn btn-primary btn-lg my-3");
        let contenido1= document.createTextNode("Esborrar");
        esborrar.appendChild(contenido1);
        td1.appendChild(esborrar);


        let td2= document.createElement("td");
        let modificar = document.createElement("button");
        modificar.setAttribute("class", "btn btn-primary btn-lg my-3");
        let contenido2= document.createTextNode("Modificar");
        modificar.appendChild(contenido2);
        td2.appendChild(modificar);

        let td3= document.createElement("td");
        let contenido3= document.createTextNode(element.nombre);
        td3.appendChild(contenido3);

        let td4= document.createElement("td");
        let contenido4= document.createTextNode(element.año_nacimiento);
        td4.appendChild(contenido4);
        

        tr.appendChild(td1);
        tr.appendChild(td2);
        tr.appendChild(td3);
        tr.appendChild(td4);

        document.getElementById("taula").appendChild(tr);
        
        
    });
    
}


function gravar(e) {
    esborrarError();
    if (validarTitol() && validarEditorial() && validarPreu() && validarAutor() && confirm("alta llibre")) {


    } else {
        e.preventDefault();
        return false;
    }
}


function validarTitol() {
    let element = document.getElementById("titol");
    if (!element.checkValidity()) {
        if (element.validity.valueMissing) {
            error2(element, "Titol requerit");
        }
        if (element.validity.patternMismatch) {
            error2(element, "Titol minim 3 caracters");
        }
        return false;
    }

    return true;
}

function validarEditorial() {
    let element = document.getElementById("editorial");
    if (!element.checkValidity()) {
        if (element.validity.valueMissing) {
            error2(element, "Editorial requerit");
        }
        return false;
    }

    return true;

}

function validarPreu() {
    let element = document.getElementById("preu");
    if (!element.checkValidity()) {
        if (element.validity.valueMissing) {
            error2(element, "Preu requerit");
        }
        if (element.validity.rangeUnderflow) {
            error2(element, "Preu minim 0 euros");
        }
        return false;
    }

    return true;

}

function validarAutor() {
    let element = document.getElementById("autor");
    if (!element.checkValidity()) {
        if (element.validity.valueMissing) {
            error2(element, "Autor requerit");
        }
        return false;
    }

    return true;

}

function error2(element, missatge) {
    document.getElementById("missatgeError").innerHTML = missatge;
    element.className = "error";
    element.focus();
}

function esborrarError() {
    var formulari = document.forms[0];
    for (var i = 0; i < formulari.elements.length; i++) {
        formulari.elements[i].className = "";
    }
}