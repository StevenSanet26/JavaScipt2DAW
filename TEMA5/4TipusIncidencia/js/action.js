window.onload = iniciar;
function iniciar() {
    document.getElementById("enviar").addEventListener("click", validar);
    document.getElementById("tipo").addEventListener("change", canviarFoto);
    document.getElementById("mostrarDescripcio").addEventListener("click", descripcio);
    document.getElementById("descripcio").addEventListener("keyup", contador);
}

function validar(e) {
    esborrarError();
    if (validarSerie() && validarDescripcio() && confirm("Confirma si vols enviar el formulari")) {
        return true;
    } else {
        e.preventDefault();
        return false;
    }
}

// la imatge de la esquerra ha de canviar quna canvia el desplegable. 
function canviarFoto() {
    var llista = document.getElementById("tipo").value;
    console.log(llista);
    let parrafo = document.getElementById("imagen");
    parrafo.setAttribute("src", "img/" + llista + ".jpg");
}

//s'hha de validar el número de serie per a que el numero cumplisca
// les seguent regles : 3 numeros inicials, 4 lletres en majúscules
// i acabar amb el níumero 1 o 2 , o amb la lletra A

function validarSerie() {
    let patro = RegExp(/^(\d{3})([A-Z]{4})([1-2]||[A]{1})$/);
    let element = document.getElementById("serie");

    if (patro.test(element.value)) {
        return true;
    } else {
        error2(element, "Error: campo Numero de serie incorrecto o vacio");
        return false;
    }
}

//  Al clickar en mostrar Descripció apareixà el text area per poder excriure les dades.
// cada vegada que s'escriga una paraula al text area s'ha de contar el númerode paraules.
function descripcio() {
    let descripcio = document.getElementById("fDescripcio");
    descripcio.style.display = "contents";
}

function contador() {
    let textoArea = document.getElementById("descripcio").value;

    textoArea = textoArea.replace(/\r?n/g, " ");
    textoArea = textoArea.replace(/[ ]+/g, " ");
    textoArea = textoArea.replace(/^ /, "");
    textoArea = textoArea.replace(/ $/, "");

    let textoDividido = textoArea.split(" ");
    var descripcio = document.getElementById("Ldescripcio");
    let contenido = document.createTextNode("Descripcio Paraules " + textoDividido.length);
    descripcio.removeChild(descripcio.lastChild);
    descripcio.appendChild(contenido);
}

function validarDescripcio() {
    let element = document.getElementById("descripcio");
    let patro = RegExp(/^[A-z0-9_-]$/);

    if (patro.test(element.value)) {
        return true;
    } else {
        error2(element, "Error: campo Descripcio incorrecto o vacio");
        return false;
    }
}

function error2(element, missatge) {
    document.getElementById("capaError").innerHTML = missatge;
    element.className = "error";
    element.focus();
}

function esborrarError() {
    var formulari = document.forms[0];
    for (var i = 0; i < formulari.elements.length; i++) {
        formulari.elements[i].className = "";
    }
}