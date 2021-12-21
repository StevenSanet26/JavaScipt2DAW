window.onload = main;

let arrayAutores = new Array();
function main() {

    cargarAutor();
    document.getElementById("btnGravar").addEventListener("click", gravar);
}
function cargarAutor() {

    fetch("https://www.serverred.es/api/autores")
        .then(response => response.json())
        .then(data => {
            arrayAutores=data.resultado;
            cargarLlibre();
        });
    
}

function cargarLlibre() {
    var queryString = window.location.search;
    var urlParams = new URLSearchParams(queryString);
    var id = urlParams.get("id");

    fetch("https://www.serverred.es/api/libros/" + id)
        .then(response => response.json())
        .then(data => {
            mostrarLibros(data);
        })
        .catch((error) => console.log(error));
}

function mostrarLibros(data) {
    let titol = document.getElementById("titol");
    titol.setAttribute("value", data.resultado.titulo)

    let editorial = document.getElementById("editorial");
    editorial.setAttribute("value", data.resultado.editorial);

    let preu = document.getElementById("preu");
    preu.setAttribute("value", data.resultado.precio);

    let autor = document.getElementById("autor");
    let option = document.createElement("option");
    let contenido = document.createTextNode(cargarNom(data.resultado.autor));
    option.appendChild(contenido);
    option.setAttribute("value", data.resultado._id)
    autor.appendChild(option);

    
}


function cargarNom(id){
    let auxId="borrado";
  
    console.log("este "+id);
 
    arrayAutores.forEach(element => {
        console.log(element._id);
        
        if(element._id==id){
      
            auxId= element.nombre;
            
        }
    });
    
    return auxId;
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
        var queryString = window.location.search;
    var urlParams = new URLSearchParams(queryString);
    var id = urlParams.get("id");

        fetch("https://www.serverred.es/api/libros/"+id, {
            method: "PUT",
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

