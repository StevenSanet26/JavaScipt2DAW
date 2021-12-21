window.onload= main;


function main(){
cargarLlibre();
}

function cargarLlibre() {
    var queryString=window.location.search;
    var urlParams = new URLSearchParams(queryString);
    var id= urlParams.get("id");

    fetch("https://www.serverred.es/api/libros/"+id)
        .then(response => response.json())
        .then(data => {
            mostrarLibros(data);
        })
    .catch((error)=>console.log(error));    
}

function mostrarLibros(data){
    let titol=document.getElementById("titol");
    titol.setAttribute("value",data.resultado.titulo)
    
    let editorial = document.getElementById("editorial");
    editorial.setAttribute("value",data.resultado.editorial);
    
    let preu = document.getElementById("preu");
    preu.setAttribute("value",data.resultado.precio);

    let autor=document.getElementById("autor");
    let option =document.createElement("option");
    let contenido =document.createTextNode(data.resultado.autor); 
    option.appendChild(contenido);
    option.setAttribute("value",data.resultado._id)
    autor.appendChild(option);
}



