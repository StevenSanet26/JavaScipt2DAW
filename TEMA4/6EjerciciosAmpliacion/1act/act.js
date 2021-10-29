window.onload = iniciar

function iniciar() {
    document.getElementById("inicio").addEventListener("click", inicio)
    document.getElementById("cancelar").addEventListener("click", cancelar);
}
var temps;

function inicio() {


    var n = 30;
    var l = document.createElement("p");




    temps = window.setInterval(function () {

        var a = document.createTextNode(n);

        l.appendChild(a);


        document.getElementById("tiempo").appendChild(l);


        n--;
        l.replaceChildren(a);

        if (n == 0) {
            window.open("https://uniwebsidad.com/");
            clearInterval(temps);
        }

    }, 1000);

}

function cancelar() {

    clearInterval(temps);
    var element = document.querySelector("p");
    var pare = element.parentNode;
    pare.lastChild.remove(element);

}