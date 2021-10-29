//ACTIVITAT MERCADONA
function gravar() {
    descripcio = document.getElementById("descripcio");
    preu = document.getElementById("preu");
    quantitat = document.getElementById("quantitat");

    let producte = {
        "descripcio": descripcio.value,
        "preu": preu.value,
        "quantitat": quantitat.value
    }

    let arrayProductes = new Array();

    //OBTINDRE DE LOCALSTORAGE
    if (JSON.parse(localStorage.getItem("Productes")) != null) {
        arrayProductes = JSON.parse(localStorage.getItem("Productes"));
    }
    arrayProductes.push(producte);
    localStorage.setItem("Productes", JSON.stringify(arrayProductes));

}


function añadir() {

    let arrayProductes = new Array();
    let arrayCesta = new Array();
    

    //OBTINDRE DE LOCALSTORAGE
    if (JSON.parse(localStorage.getItem("Productes")) != null) {
        arrayProductes = JSON.parse(localStorage.getItem("Productes"));
    }

    let tabla = document.getElementById("taula");


    let aux = "<tr><th></th><th>Producte</th><th>Preu</th><th>Quantitat</th></tr>";

    arrayProductes.forEach((element, index) => {
        aux += "<tr align=\"center\"><td><button id=\"" + index + "\"  onclick=\"add(this)\" >add</button></td><td>" + element.descripcio + "</td><td>" + element.preu + "€</td><td>" + element.quantitat + "</td></tr>";


    });

    tabla.innerHTML = aux;



    //OBTINDRE DE LOCALSTORAGE
    if (JSON.parse(localStorage.getItem("Cesta")) != null) {
        arrayCesta = JSON.parse(localStorage.getItem("Cesta"));
    }

    let tabla2 = document.getElementById("taula2");


    let aux2 = "<tr><th>Producte</th><th>Preu</th><th>Quantitat</th></tr>";
    arrayCesta.forEach(element => {
        aux2 += "<tr><th>" + element.descripcio + "</th><th>" + element.preu + "</th><th>" + element.quantitat + "</th></tr>";
        //preuTotal += element.preu;
    });


    tabla2.innerHTML = aux2;







    /*
        for (var i = 0; i < array_productes.length; i++) {
            var prod = JSON.parse(localStorage.getItem("Productes"));
            if (prod != null) {
                tabla.innerHTML += "<tr align='center'><td><button onclick=' add(this) ' onclcik='resta(this)' id=" + i + "  >add</button></td><td>" + array_productes[i].Descripcio + "</td><td>" + prod[i].Preu + "€</td><td>" + prod[i].Quantitat + "</td></tr>";
    
            }
        }
    
    
    
        var tabla2 = document.getElementById("taula2");
        for (var i = 0; i < localStorage.length; i++) {
            var prod2 = JSON.parse(localStorage.getItem("cesta nº" + i));
            if (prod2 != null) {
                tabla2.innerHTML += "<tr align='center'><td>" + prod2.proDescripcio + "</td><td>" + prod2.proPreu + "€</td><td>" + prod2.proQuantitat + "</td></tr>";
                var a = parseInt(prod2.proPreu);
                total = a + total;
                document.getElementById("total").innerHTML = "<b>" + total + "€</b>"
                numeroCesta = i + 1;
            }
        }*/
}
var preuTotal=0;

function add(elem) {

    let arrayProductes = new Array();
    let arrayCesta = new Array();
    


    //OBTINDRE DE LOCALSTORAGE
    arrayProductes = JSON.parse(localStorage.getItem("Productes"));

    let id = elem.id;
    console.log(id);

    //OBTINDRE DE LOCALSTORAGE
    if (JSON.parse(localStorage.getItem("Cesta")) != null) {
        arrayCesta = JSON.parse(localStorage.getItem("Cesta"));
    }

    arrayCesta.push(arrayProductes[id]);

    localStorage.setItem("Cesta", JSON.stringify(arrayCesta));

    //MOSTRAR EN LA TAULA CESTA
    let taula2 = document.getElementById("taula2");
    let aux = "<tr><th>Producte</th><th>Preu</th><th>Quantitat</th></tr>";

    aux = "<tr><th>" + arrayCesta[id].descripcio + "</th><th>" + arrayCesta[id].preu + "</th><th>" + arrayCesta[id].quantitat + "</th></tr>";

    taula2.innerHTML += aux;



    //RESTAR A LA QUANTITAT
    arrayProductes[id].quantitat = 0;
    localStorage.setItem("Productes", JSON.stringify(arrayProductes));

    let a = parseint(arrayCesta[id].preu);
    preuTotal = a + preuTotal;

    document.getElementById("total").innerHTML = preuTotal;

}



/*
function verPagina() {
    window.open("tenda_Camp.html");
}


function borrar() {
    localStorage.clear;
}

var total = 0;
var numeroCesta = -1;

function add(element) {


    numeroCesta++;
    console.log(element.id)
    let id = element.id;

    var tabla2 = document.getElementById("taula2");
    var prod = JSON.parse(localStorage.getItem("producte nº" + id));

    tabla2.innerHTML += "<tr align='center'><td>" + prod.proDescripcio + "</td><td>" + prod.proPreu + "€</td><td>" + prod.proQuantitat + "</td></tr>";
    var a = parseInt(prod.proPreu);
    total = a + total;


    document.getElementById("total").innerHTML = "<b>" + total + "€</b>"
    localStorage.setItem("cesta nº" + numeroCesta, JSON.stringify(prod));

}

function resta() {



}



var totalTime = 1200;
function updateClock() {

    document.getElementById("temps").innerHTML = totalTime;
    if (totalTime == 0) {
        alert("final");
    } else {
        totalTime -= 1;
        setTimeout("updateClock()", 1000);
    }







}

*/


