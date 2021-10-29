window.onload = iniciar;

function iniciar() {
    document.getElementById("buscar").addEventListener("click", buscar);

}

function buscar() {
    
    var palabra = document.getElementById("palabra");
    cooredenadas = palabra.getBoundingClientRect();
    console.log(cooredenadas.top, cooredenadas.bottom,cooredenadas.right,cooredenadas.left);




    //  var texto = document.getElementById("texto").innerText;



    // console.log(texto);


    //  var coordenada = texto.search(palabra);


    // console.log(coordenada);
    //  window.scroll(0,coordenada);
}