window.onload = main;

var arrayPoblacions = new Array;

function main() {
    document.getElementById("cargarPoblacions").addEventListener("click", carregar);
    autocomplete();
}

function carregar() {

    for (let i = arrayPoblacions.length; i > 0; i--) {
        arrayPoblacions.pop();
    }
    carregarPoblacions("03");
    carregarPoblacions("12");
    carregarPoblacions("46");
}

function carregarPoblacions(codiPostal) {
    let xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            //document.getElementById("encuesta").innerHTML = this.responseText;
            poblacions = JSON.parse(this.responseText);
            poblacions.data.forEach(element => {
                arrayPoblacions.push(element.DMUN50);
            });
            console.log(arrayPoblacions);
            document.getElementById("text").innerText = "S'ha carregat " + arrayPoblacions.length + " poblacions";
        }
    }
   
    xmlhttp.open("GET", "https://apiv1.geoapi.es/municipios?CPRO=" + codiPostal + "&type=JSON&key=&sandbox=1", true);
    xmlhttp.send();
  


}
function autocomplete() {
    $("#tags").autocomplete({
        source: arrayPoblacions
    });
}







