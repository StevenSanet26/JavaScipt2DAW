window.onload=main;

function main(){
    document.getElementById("btnGravar").addEventListener("click",gravar);
}



function gravar(e){
    esborrarError();
    if(validarNom() && validarAnyNaixement() && confirm("confirma si vols donar de alt a este Autor")){
        return true;
    }
    e.preventDefault();
        return false;
}




function validarNom(){
    let element= document.getElementById("nom");


}

function validarAnyNaixement(){

let element = document.getElementById("anyNaix");

}

function esborrarError() {
    var formulari = document.forms[0];
    for (var i = 0; i < formulari.elements.length; i++) {
        formulari.elements[i].className = "";
    }
}

function error2(element, missatge) {
    document.getElementById("missatgeError").innerHTML = missatge;
    element.className = "error";
    element.focus();
}