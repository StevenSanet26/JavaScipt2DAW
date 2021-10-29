window.onload = iniciar;

function iniciar() {
    pintarTablero();
    cargarPartida();
    document.getElementById("disparar").addEventListener("click", dispararTauler);
}


let p0 = {
    B1: [11, 12],
    B2: [25, 35, 45],
    B3: [51, 61, 71, 81],
    B4: [88, 87, 86, 85, 84]
}
let p1 = {
    B1: [98, 99],
    B2: [47, 48, 49],
    B3: [51, 61, 71, 81],
    B4: [15, 16, 17, 18, 19]
}

let Partides = [p0, p1];


function pintarTablero() {
    let campo = document.getElementById("campo");
    let aux;
    aux = "<tr><th></th><th>A</th><th>B</th><th>C</th><th>D</th><th>E</th><th>F</th><th>G</th><th>H</th><th>I</th><th>J</></tr>"
    for (i = 0; i < 10; i++) {
        aux += "<tr><th>" + (i + 1) + "</th>"
        for (j = 0; j < 10; j++) {
            aux += "<td id=" + (i + 1) + (j + 1) + ">X</td>";
        }
        aux += "</tr>";
    }
    console.log(aux);
    campo.innerHTML = aux

}

function dispararTauler() {
    let x = document.getElementById("letra")
    let y = document.getElementById("numero");
    console.log(x.value, y.value);
    document.getElementById(y.value + x.value).innerHTML = "<td> </td>";


}


function cargarPartida() {

    let partidaActual = (Math.floor(Math.random() * Partides.length));
    console.log(partidaActual);
    console.log(Partides[partidaActual]);

    for (barco in Partides[partidaActual]) {
        console.log(barco, Partides[partidaActual][barco]);
    }


    for (element in partidaActual) {
        partidaActual[element].foreach(coordenades => {
            console.log(coordenades);
            if (coordenades == (x.value + y.value)) {
                document.getElementById(y.value + x.value).innerHTML = element;
                console.log(x.value, y.value);

            }
        });
    }
}

