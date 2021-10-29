window.onload=iniciar;

function iniciar(){
    document.getElementById("parrafo1").addEventListener("click",parrafo1);
    document.getElementById("parrafo2").addEventListener("click",parrafo2);

}



function parrafo1(){
    var texto1= document.getElementById("texto1");
    if(texto1.style.visibility=="visible"){
        texto1.style.visibility="hidden";
    }else if(texto1.style.visibility=="hidden"){
        texto1.style.visibility="visible";
    }


}
function parrafo2(){
    var texto2= document.getElementById("texto2");
    if(texto2.style.visibility=="visible"){
        texto2.style.visibility="hidden";
    }else if(texto2.style.visibility=="hidden"){
        texto2.style.visibility="visible";
    }
}

