window.onload = main;

let arrayAutores= new Array();
function main() {
    cargarAutor();
    
    
    
    
    
}

function cargarLlibre() {

    fetch("https://www.serverred.es/api/libros")
        .then(response => response.json())
        .then(data => {
            mostrarLibros(data);
        });
    //.catch((error)=>console.log(error));    
}


function cargarAutor() {

    fetch("https://www.serverred.es/api/autores")
        .then(response => response.json())
        .then(data => {
            arrayAutores=data.resultado;
            console.log(arrayAutores);
            cargarLlibre();
        });
    //.catch((error)=>console.log(error));    
}


function mostrarLibros(libros) {
    // console.log(autores.resultado[0]);

    libros.resultado.forEach((element, index) => {
        let tr = document.createElement("tr");

        let td1 = document.createElement("td");
        let esborrar = document.createElement("button");
        esborrar.setAttribute("class", "btn btn-primary btn-lg my-3");
        esborrar.setAttribute("id", "eliminar" + index);
        esborrar.setAttribute("onclick", "esborrarLlibre(this)");
        let contenido1 = document.createTextNode("Esborrar");
        esborrar.appendChild(contenido1);
        td1.appendChild(esborrar);


        let td2 = document.createElement("td");
        let modificar = document.createElement("button");
        modificar.setAttribute("class", "btn btn-primary btn-lg my-3");
        modificar.setAttribute("id", "modificar" + index);
        modificar.setAttribute("onclick", "modificarLlibre(this)");
        let contenido2 = document.createTextNode("Modificar");
        modificar.appendChild(contenido2);
        td2.appendChild(modificar);

        let td3 = document.createElement("td");
        let contenido3 = document.createTextNode(element.titulo);
        td3.appendChild(contenido3);

        let td4 = document.createElement("td");
        let contenido4 = document.createTextNode(element.editorial);
        td4.appendChild(contenido4);

        let td5 = document.createElement("td");
        let contenido5 = document.createTextNode(element.precio);
        td5.appendChild(contenido5);

        let td6 = document.createElement("td");
        let contenido6 = document.createTextNode(obtenerAutor(element.autor));
        
        td6.appendChild(contenido6);



        tr.appendChild(td1);
        tr.appendChild(td2);
        tr.appendChild(td3);
        tr.appendChild(td4);
        tr.appendChild(td5);
        tr.appendChild(td6);

        document.getElementById("taula").appendChild(tr);


    });

}

function esborrarLlibre(element) {
    console.log(element.id);

}

function modificarLlibre(element) {
    console.log(element.id);

    window.location.href = "modificarLlibres.html?id=" + element.id;
}

function obtenerAutor(id){
    let auxId="borrado";
    arrayAutores.forEach(element => {
        if(element._id==id){
        
            
            auxId= element.nombre;
        }
    });
    return auxId;

}