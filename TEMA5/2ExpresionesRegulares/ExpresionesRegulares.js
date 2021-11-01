window.onload= iniciar;


function iniciar (){
document.getElementById("enviar").addEventListener("click",enviar);

}

function enviar(e){
    esborrarError();
    if(validarDni() && validarFecha() && validarTel() && validarMatricula() && validarEmail() && validarUrl() && confirm("Confirma si vols enviar el formulari")){
        return true;
    }else{
        e.preventDefault();
        return false;
    }
}
function validarDni(){
    var element= document.getElementById("dni");
    if(!element.checkValidity()){
        if (element.validity.valueMissing) {
            error2(element,"Deus d'introduir un DNI.");
        }
        if (element.validity.patternMismatch) {
            error2(element, "El DNI ha de tindre el format de 9 digits i una lletra.");
        }
        return false;
    }
    return true;

    
}
function validarFecha(){
    var element= document.getElementById("fecha");
    if (!element.checkValidity()) {
        if (element.validity.valueMissing) {
            error2(element,"Deus d'introduir una fecha.");
        }
        if (element.validity.rangerOverflow) {
            error2(element, "La data mínima ha de ser superior al 01/12/1900.");
        }
        if (element.validity.rangerUnderfloe) {
            error2(element, "La data màxima ha de ser inferior al 31/12/2021.");
        }
        if (element.validity.patternMismatch) {
            error2(element, "La fecha ha de tindre el format YYYY/mm/dd");
        }
    }

}
function validarTel(){
    var element = document.getElementById("telefono");
    if(!element.checkValidity()){
        if (element.validity.valueMissing) {
            error2(element,"Deus d'introduir un numero de Telèfon.");
        }
        if (element.validity.patternMismatch) {
            error2(element, "El telèfon ha de trindre el format 999 999 999.");
        }
        return false;
    }
    return true;

}
function validarMatricula(){
    var element = document.getElementById("matricula");
    if (!element.checkValidity()) {
        if (element.validity.valueMissing) {
            error2(element, "Deus de inntoduir un número de Matrícula");
        }
        if (element.validity.patternMismatch) {
            error2(element,"La matrícula ha de tindre el fomat 9999 ZZZ");
        }
        return false;
    }
    return true;
}
function validarEmail(){

}
function validarUrl(){

}

function error2(element, missatge){
    document,getElementById("missatgeError").innerHTML = missatge;
    element.className= "error";
    element.focus();
}

function esborrarError(){
    var formulari = document.forms[0];
    for(var i =0; i<formulari.elements.length;i++){
        formulari.elements[i].className= "";
    }
}