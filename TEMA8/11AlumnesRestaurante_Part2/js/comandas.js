window.onload = main;

let arrayMesas = new Array();
let arrayCamareros = new Array();

function main() {
    cargarComandas();
}

function cargarComandas() {
    let token;
    if (JSON.parse(localStorage.getItem("Token")) != null) {
        token = JSON.parse(localStorage.getItem("Token"));
    }

    fetch("https://restaurante.serverred.es/api/comandas", {
        method: "GET",
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Accept': 'application/json',
            "auth-token": token
        }
    }).then(response => response.json())
        .then(data => {
            //console.log(data);
            cargararMesas();
           
            mostrarComandas(data.data.data);
        });
}


function cargararMesas() {

    let token;
    if (JSON.parse(localStorage.getItem("Token")) != null) {
        token = JSON.parse(localStorage.getItem("Token"));
    }
    fetch("https://restaurante.serverred.es/api/mesas", {
        method: "GET",
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Accept': 'application/json',
            "auth-token": token
        }
    }).then(response => response.json())
        .then(data => {
            //console.log(data);
            arrayMesas.push(data);

        });
}


function mostrarComandas(comandas) {
   
    let fila = document.getElementById("files");
    fila.replaceChildren("");

    comandas.forEach(element => {

        let tr = document.createElement("tr");

        let td1 = document.createElement("td");
        let borrar = document.createElement("button");
        borrar.setAttribute("class", "btn btn-info btn-lg p-2");
        let i1 = document.createElement("i");
        i1.setAttribute("class", "fas fa-plus");
        /*
                borrar.setAttribute("id", element._id);
                borrar.setAttribute("onclick", "borrarBebida(this)");*/
        let contenido1 = document.createTextNode("Bebidas");
        borrar.appendChild(i1);
        borrar.appendChild(contenido1);
        td1.appendChild(borrar);

        let td2 = document.createElement("td");

        let modificar = document.createElement("button");
        modificar.setAttribute("class", "btn btn-warning btn-lg p-2");
        let i2 = document.createElement("i");
        i2.setAttribute("class", "fas fa-plus");
        /*
        modificar.setAttribute("id", element._id);
        modificar.setAttribute("onclick", "modificarBebida(this)");
        */
        let contenido2 = document.createTextNode("Platos");
        modificar.appendChild(i2);
        modificar.appendChild(contenido2);
        td1.appendChild(modificar);

        let td3 = document.createElement("td");
        let contenido3 = document.createTextNode(element.nombre);
        td3.appendChild(contenido3);

     
        
       
        
      
        let td4 = document.createElement("td");
        let contenido4 = document.createTextNode("");
        td4.appendChild(contenido4);

        let td5 = document.createElement("td");
        let contenido5 = document.createTextNode(element.comensales);
        td5.appendChild(contenido5);

        let td6 = document.createElement("td");
        console.log(element.user);
        
        let contenido6 = document.createTextNode(mostrarCamarero(element.user));
        console.log(mostrarCamarero(element.user));
        td6.appendChild(contenido6);

        let td7 = document.createElement("td");
        let contenido7 = document.createTextNode(element.fechaEntrada);
        td7.appendChild(contenido7);



        tr.appendChild(td1);
        //tr.appendChild(td2);
        tr.appendChild(td3);
        tr.appendChild(td4);
        tr.appendChild(td5);

        tr.appendChild(td6);

        tr.appendChild(td7);



        fila.appendChild(tr);
    });

}

function mostrarCamarero(user_id){
    //console.log(user_id);
    
    let token;
    if (JSON.parse(localStorage.getItem("Token")) != null) {
        token = JSON.parse(localStorage.getItem("Token"));
    }
    fetch("https://restaurante.serverred.es/api/camareros", {
        method: "GET",
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Accept': 'application/json',
            "auth-token": token
        }
    }).then(response => response.json())
        .then(data => {
            //console.log(data);

          for (const element  of data.data.data) {
              
          
                
                if(user_id==element._id){
                    console.log(element.name);
                    
                    return element.name;
                    
                }
          }
            //arrayCamareros.push(data);
            //console.log(arrayCamareros[0].data.data);
            
            
            
        });
    
}