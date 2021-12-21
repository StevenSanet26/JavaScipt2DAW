



function modificarLlibre(element) {
    console.log(element.id);
    id=element.id;
    window.location.href = "modificarLlibres.html?id=" + element.id;

    carregarLlibre();
}

window.onload=main;

function carregarLlibre(){
    let id = document.URL
    console.log(id);
    
    fetch("https://www.serverred.es/api/libros")
        .then(response => response.json())
        .then(data => {
            
            console.log(data);
            
        });
}


