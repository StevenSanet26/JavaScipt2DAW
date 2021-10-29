window.onload=iniciar;

var i=0;
function iniciar(){



    if (JSON.parse(localStorage.getItem("Contador")) != null) {
        contador = JSON.parse(localStorage.getItem("Contador"));
      
        console.log(contador);
        i=contador;
        
    }

    i++;
    let numero=i;
    
    localStorage.setItem("Contador", JSON.stringify(numero));

    parrafo = document.createElement("p");
    var contenido = document.createTextNode("Has visitado esta pàgina "+numero+" veces");
    parrafo.appendChild(contenido);
    document.body.appendChild(parrafo);

}