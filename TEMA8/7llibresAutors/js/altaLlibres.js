window.onload = main;



function main() {
    document.getElementById("btnGravar").addEventListener("click", gravar);
    cargarAutores();

   



}


function cargarAutores() {
    fetch("https://www.serverred.es/api/autores")
        .then(response => response.json())
        .then(data => {
            mostrarAutores(data);
        });
}


function mostrarAutores(autores) {


    autores.resultado.forEach((element, index) => {
        let option = document.createElement("option");


        let contenido = document.createTextNode(element.nombre);
        option.appendChild(contenido);
        option.setAttribute("value",element._id);


        document.getElementById("autor").appendChild(option);



    });

}



function gravar(e) {
    esborrarError();
    if (validarTitol() && validarEditorial() && validarPreu() && validarAutor() && confirm("alta llibre")) {
        let titol = document.getElementById("titol").value;
        let editorial = document.getElementById("editorial").value;
        let preu = document.getElementById("preu").value;
        let autor = document.getElementById("autor").value;

      
        let llibre = {
            "titulo": titol,
            "editorial": editorial,
            "precio": preu,
            "autor": autor
        }

        fetch("https://www.serverred.es/api/libros", {
            method: "POST",
            headers: {
                "Content-type": "application/json"
            },
            body: JSON.stringify(llibre)
        }).then(response => response.json())
            .then(data => {

            });
        return true;


    } else {
        e.preventDefault();
        return false;
    }
}


function validarTitol() {
    let element = document.getElementById("titol");
    if (!element.checkValidity()) {
        if (element.validity.valueMissing) {
            error2(element, "Titol requerit");
        }
        if (element.validity.patternMismatch) {
            error2(element, "Titol minim 3 caracters");
        }
        return false;
    }

    return true;
}

function validarEditorial() {
    let element = document.getElementById("editorial");
    if (!element.checkValidity()) {
        if (element.validity.valueMissing) {
            error2(element, "Editorial requerit");
        }
        return false;
    }

    return true;

}

function validarPreu() {
    let element = document.getElementById("preu");
    if (!element.checkValidity()) {
        if (element.validity.valueMissing) {
            error2(element, "Preu requerit");
        }
        if (element.validity.rangeUnderflow) {
            error2(element, "Preu minim 0 euros");
        }
        return false;
    }

    return true;

}

function validarAutor() {
    let element = document.getElementById("autor");
    if (!element.checkValidity()) {
        if (element.validity.valueMissing) {
            error2(element, "Autor requerit");
        }
        return false;
    }

    return true;

}

function error2(element, missatge) {
    document.getElementById("missatgeError").innerHTML = missatge;
    element.className = "error";
    element.focus();
}

function esborrarError() {
    var formulari = document.forms[0];
    for (var i = 0; i < formulari.elements.length; i++) {
        formulari.elements[i].className = "";
    }
}