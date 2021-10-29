window.onload = iniciar;

function iniciar() {
    document.getElementById("añadir").addEventListener("click", añadir);
    document.getElementById("eliminar").addEventListener("click", eliminar);

}

function añadir() {

    if(parrafo!=null){
    //var llista = document.getElementById("ol");

    //Escriure algo
    var texto = prompt("añade algo: ");

    //Creem un element li
    var parrafo = document.createElement("li");

    //Creem lo que hi ha dibs del TextNode
    var contenido = document.createTextNode(texto);

    //Unim els dos creats
    parrafo.appendChild(contenido);

    //Vinculem amb la pagina
    document.getElementById("ol").appendChild(parrafo);
    }
}

function eliminar() {
    var element = document.querySelector("li");

    var pare = element.parentNode
    pare.lastChild.remove(element);

}