window.onload=main;



function main(){
    cargarAutors();

}

function cargarAutors(){

    fetch("https://www.serverred.es/api/autores")
    .then(response=>response.json())
    .then(data=>{
        mostrarAutores(data);
    });
  //.catch((error)=>console.log(error));    
}


function mostrarAutores(autores){
    console.log(autores.resultado[0]);
    
    autores.resultado.forEach((element,index) => {
        let tr = document.createElement("tr");
        let td1= document.createElement("td");
        let esborrar = document.createElement("button");
        esborrar.setAttribute("class", "btn btn-primary btn-lg my-3");
        let contenido1= document.createTextNode("Esborrar");
        esborrar.appendChild(contenido1);
        td1.appendChild(esborrar);


        let td2= document.createElement("td");
        let modificar = document.createElement("button");
        modificar.setAttribute("class", "btn btn-primary btn-lg my-3");
        let contenido2= document.createTextNode("Modificar");
        modificar.appendChild(contenido2);
        td2.appendChild(modificar);

        let td3= document.createElement("td");
        let contenido3= document.createTextNode(element.nombre);
        td3.appendChild(contenido3);

        let td4= document.createElement("td");
        let contenido4= document.createTextNode(element.año_nacimiento);
        td4.appendChild(contenido4);
        

        tr.appendChild(td1);
        tr.appendChild(td2);
        tr.appendChild(td3);
        tr.appendChild(td4);

        document.getElementById("taula").appendChild(tr);
        
        
    });
    
}
