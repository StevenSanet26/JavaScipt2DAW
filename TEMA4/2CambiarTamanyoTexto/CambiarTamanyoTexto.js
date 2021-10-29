window.onload=iniciar;

function iniciar(){
    document.getElementById("agrandar").addEventListener("click",agrandar);
    document.getElementById("reducir").addEventListener("click",reducir);
    document.getElementById("original").addEventListener("click",original);
}
var tamaño=1;

function agrandar(){
    var frase = document.querySelector("p");
    if(frase.style.fontSize==1.50+"em"){
        console.log("El tamaño esta al maxima");
    }else {
    tamaño+=0.05;
    frase.style.fontSize=tamaño+"em";
    }

}

function reducir(){
    var frase = document.querySelector("p");
    if(frase.style.fontSize==0.50+"em"){
        console.log("el texto esta al minimo");
    }else{
    tamaño-=0.05;
    frase.style.fontSize=tamaño+"em";
    }
}

function original(){
    console.log("el texto esta al tamaño original");
    var frase = document.querySelector("p");
    frase.style.fontSize="1em";
}


