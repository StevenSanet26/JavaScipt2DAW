//EXAMEN TASQUES
function gravar(elem) {
    
    let novaTasca = {
        "nom": elem.value,
        "estat": false
    }

    let arraTasca = new Array();

    //OBTINDRE DE LOCALSTORAGE
    if (JSON.parse(localStorage.getItem("Tasques")) != null) {
        arraTasca = JSON.parse(localStorage.getItem("Tasques"));
    }

    arraTasca.push(novaTasca);
    localStorage.setItem("Tasques", JSON.stringify(arraTasca));
    
}


function carregarTasques() {

    let arraTasca = new Array();

    //OBTINDRE DE LOCALSTORAGE
    if (JSON.parse(localStorage.getItem("Tasques")) != null) {
        arraTasca = JSON.parse(localStorage.getItem("Tasques"));
    }

    let llista = document.getElementById("llista");

    llista.innerHTML = "";

    let aux = "";

    arraTasca.forEach((elem, index) => {
        console.log(index);

        aux = "<li> <input type=\"checkbox\" id=\"tasca" + index + "\" onclick=\"donarBaixa(this);\" name=\"tasca" + index + "\">" + elem.nom + "</li>";
        llista.innerHTML += aux;

        if (elem.estat) {
            let llista = document.getElementsByTagName("li");
            llista[index].style.textDecoration = "line-through";
        }
    });
    //llista.innerHTML = aux;
}


function donarBaixa(elem) {
    let arraTasca = new Array();

    //OBTINDRE DE LOCALSTORAGE
    arraTasca = JSON.parse(localStorage.getItem("Tasques"));

    let id = elem.id.substring(5);
    console.log(id);

    //modificar estat de tasca
    arraTasca[id].estat = true;
    localStorage.setItem("Tasques", JSON.stringify(arraTasca));

    //canviar estil
    let llista = document.getElementsByTagName("li");
    llista[id].style.textDecoration = "line-through";
}