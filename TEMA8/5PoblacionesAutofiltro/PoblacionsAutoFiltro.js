window.onload = main;

let arrayAlacant = new Array;

function main() {
    /*
    fetch("https://apiv1.geoapi.es/municipios?CPRO=03&type=JSON&key=&sandbox=1")
    .then(response=>response.json())
    .then(data=> {
    arrayAlacant = data.
    })
    */

    xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            //document.getElementById("encuesta").innerHTML = this.responseText;
            //console.log(this.responseText);
            arrayAlacant = this.responseText;
            console.log(arrayAlacant);
        }
    }
    xmlhttp.open("GET", "https://apiv1.geoapi.es/municipios?CPRO=03&type=JSON&key=&sandbox=1", true);
    xmlhttp.send();

    

}