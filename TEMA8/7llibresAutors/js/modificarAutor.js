window.onload=main;

function main(){
   
    cargarAutor();

    document.getElementById("btnGravar").addEventListener("click",gravar);
}

function cargarAutor(){

    var queryString=window.location.search;
    var urlParams = new URLSearchParams(queryString);
    var id= urlParams.get("id");


    fetch("https://serverred.es/api/autores/"+id)
    .then(response=>response.json())
    .then(data=>{
        mostrarAutor(data);
       // document.getElementById("btnGravar").addEventListener("click",gravar);
    })
    .catch((error) =>console.error( error));
}

function mostrarAutor(data){
    console.log(data);
    let nom= document.getElementById("nom");
    nom.setAttribute("value",data.resultado.nombre);

    let anynaix = document.getElementById("anynaix");
    anynaix.setAttribute("value",data.resultado.año_nacimiento);

}


function gravar(e){
   
    esborrarError();
    
    if (validarNom() && validarAnyNaixement() && confirm("confirma si vols modficar este Autor")) {
        debugger;
        var anynaix = document.getElementById("anynaix").value;    
        let nom = document.getElementById("nom").value;  
        console.log(anynaix);
        console.log(nom);

        let autor = {
            "nombre": nom,
            "año_nacimiento": anynaix
        }
        var queryString=window.location.search;
        var urlParams = new URLSearchParams(queryString);
        var id= urlParams.get("id");

        fetch("https://serverred.es/api/autores/"+id,{
            method:"PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body:JSON.stringify(autor)
        })
        .then(response => response.json())
        .then(data => {
            console.log('Success:', data);
        })
        .catch((error) =>{
            console.error('Error:', error);

        });
        window.location.href = "llistatAutors.html";
        
        
    }else{
    e.preventDefault();
    return false;
    }

}

function validarNom() {
    let element = document.getElementById("nom");

    if (!element.checkValidity()) {
        if (element.validity.valueMissing) {
            error2(element, "Nom requerit");
            return false;
        }

        if (element.validity.patternMismatch) {
            error2(element, "Nom minim 3 caracters");
            return false;
        }

    }
    return true;
}

function validarAnyNaixement() {

    var element = document.getElementById("anynaix");
    if (!element.checkValidity()) {
        if (element.validity.valueMissing) {
            error2(element, "Any de naixement requeirt");

        }
        console.log(element.validity.rangeOverflow);

        if (element.validity.rangeOverflow) {

            error2(element, "L'any de naixement ha de ser inferior a 2000");

        }
        if (element.validity.rangeUnderflow) {
            error2(element, "L'any de naixement ha de ser superior a 0");


        }
        return false;
    }
    return true;

}

function esborrarError() {
    var formulari = document.forms[0];
    for (var i = 0; i < formulari.elements.length; i++) {
        formulari.elements[i].className = "";
    }
    document.getElementById("missatgeError").innerHTML = "";
}

function error2(element, missatge) {
    document.getElementById("missatgeError").innerHTML = missatge;
    element.className = "error";
    element.focus();
}



