window.onload = main;

function main() {
    document.getElementById("btnGravar").addEventListener("click", gravar);
    let nom= document.getElementById("nom");
    
    
}



function gravar(e) {
    esborrarError();
    if (validarNom() && validarAnyNaixement() && confirm("confirma si vols donar de alt a este Autor")) {
        
        let nom= document.getElementById("nom").value;

        var anynaix = document.getElementById("anynaix").value;       

        let autor = {
            "nombre": nom,
            "año_nacimiento": anynaix
        }

        fetch("https://www.serverred.es/api/autores",{
            method:"POST",
            headers: {
                "Content-Type": "application/json"
            },
            body:JSON.stringify(autor)
        }).then(response => response.json())
        .then(data => {
            mostrarLibros(data);
        });

        return true;
    }
    e.preventDefault();
    return false;
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