window.onload=iniciar;

function iniciar(){
    mostrarcoches();
    document.getElementById("ordenar").addEventListener("click", ordenar);

}


var arrayCoches= [
    "Toyota","Mercedes","BMW","Honda","Hyundai","Tesla","Ford","Audi","Volkswagen",
    "Porche", "Nissan" ,"Ferrai","Kia","Land Rover", "Mini"
];

function mostrarcoches(){
    arrayCoches.forEach(element => {
        var p=document.createElement("li");
        var a= document.createTextNode(element);
        p.appendChild(a);
        document.getElementById("llista").appendChild(p);
    });
}






function ordenar(){
    arrayCoches.forEach(element => {
        var borrar = document.querySelector("li");
        var pare = borrar.parentNode;
        pare.lastChild.remove(borrar);
    });


    arrayCoches.sort();
    
  
    arrayCoches.forEach(element => {
        var p=document.createElement("li");
        var a= document.createTextNode(element);
        p.appendChild(a);
        document.getElementById("llista").appendChild(p);
    });

}f