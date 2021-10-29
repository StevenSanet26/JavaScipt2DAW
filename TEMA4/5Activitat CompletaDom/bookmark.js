window.onload = iniciar;

function iniciar() {
    document.getElementById("crearAdresa").addEventListener("click", crear);
    mostrarAdresa();
}

function crear() {

    let nomAdresa = document.getElementById("nomAdresa");
    let urlAdresa = document.getElementById("urlAdresa");
    let novaAdresa = {
        "nom": nomAdresa.value,
        "url": urlAdresa.value
    }

    let arrayAdresa = new Array();

    //OBTINDRE DE LOCALSTORAGE
    if (JSON.parse(localStorage.getItem("Adreses")) != null) {
        arrayAdresa = JSON.parse(localStorage.getItem("Adreses"));
    }

    arrayAdresa.push(novaAdresa);
    localStorage.setItem("Adreses", JSON.stringify(arrayAdresa));

    mostrarUna(novaAdresa, arrayAdresa.length - 1);

}

function mostrarUna(novaAdresa, index) {

    let liParrafo = document.createElement("li");
    let inputParrafo = document.createElement("input");
    let aParrafo = document.createElement("a");

    inputParrafo.setAttribute("type", "checkbox");
    inputParrafo.setAttribute("id", "adr" + index);
    inputParrafo.setAttribute("onclick", "borraAdresa(this)");
    aParrafo.setAttribute("href", novaAdresa.url);

    let nombre = document.createTextNode(novaAdresa.nom);

    aParrafo.appendChild(nombre);

    liParrafo.appendChild(inputParrafo);
    liParrafo.appendChild(aParrafo);

    document.getElementById("llista").appendChild(liParrafo);
}

function mostrarAdresa() {

    let arrayAdresa = new Array();

    //OBTINDRE DE LOCALSTORAGE
    if (JSON.parse(localStorage.getItem("Adreses")) != null) {
        arrayAdresa = JSON.parse(localStorage.getItem("Adreses"));
    }

    arrayAdresa.forEach((elem, index) => {

        let liParrafo = document.createElement("li");
        let inputParrafo = document.createElement("input");
        let aParrafo = document.createElement("a");

        inputParrafo.setAttribute("type", "checkbox");
        inputParrafo.setAttribute("id", "adr" + index);
        inputParrafo.setAttribute("onclick", "borraAdresa(this)");
        aParrafo.setAttribute("href", elem.url);

        let nombre = document.createTextNode(elem.nom);

        aParrafo.appendChild(nombre);

        liParrafo.appendChild(inputParrafo);
        liParrafo.appendChild(aParrafo);

        document.getElementById("llista").appendChild(liParrafo);
    });
}

function borraAdresa(element) {

    let arrayAdresa = new Array();

    //OBTINDRE DE LOCALSTORAGE
    arrayAdresa = JSON.parse(localStorage.getItem("Adreses"));

    let id = element.id;
    console.log(id);

    //canviar estil
    var element = document.getElementById(id);
    let tasca = element.parentNode;
    tasca.remove(element);

    arrayAdresa.splice(id, 1);

    localStorage.setItem("Adreses", JSON.stringify(arrayAdresa));
}