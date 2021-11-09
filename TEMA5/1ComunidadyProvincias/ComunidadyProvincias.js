
window.onload = iniciar;

function iniciar() {
    mostrarComunitats();

}
var comunitats = [{
    "comunitat": "Andalucía",
    "provincies": ["Almería", "Cádiz", "Córdoba", "Granada", "Jaén", "Huelva", "Málaga", "Sevilla"]
},
{
    "comunitat": "Aragón",
    "provincies": ["Huesca", "Teruel", "Zaragoza"]
},
{
    "comunitat": "Canarias",
    "provincies": ["Las Palmas", "Santa Cruz de Tenerife"]
},
{
    "comunitat": "Cantabria",
    "provincies": ["Cantabria"]
},
{
    "comunitat": "Castilla y León",
    "provincies": ["Ávila", "Burgos", "León", "Palencia", "Salamanca", "Segovia", "Soria", "Toledo", "Zamora"]
},

{
    "comunitat": "Castilla-La Mancha",
    "provincies": ["Albacete", "Ciudad Real", "Cuenca", "Guadalajara", "Valladolid",]
},
{
    "comunitat": "Cataluña",
    "provincies": ["Barcelona", "Girona", "Lleida", "Tarragona"]
},
{
    "comunitat": "Ceuta",
    "provincies": ["Ceuta"]
},
{
    "comunitat": "Comunidad Valenciana",
    "provincies": ["Alicante", "Castellón", "Valencia"]
},
{
    "comunitat": "Comunidad de Madrid",
    "provincies": ["Madrid"]
},
{
    "comunitat": "Extremadura",
    "provincies": ["Badajoz", "Cáceres"]
},
{
    "comunitat": "Galicia",
    "provincies": ["La Coruña", "Lugo", "Orense", "Pontevedra"]
},
{
    "comunitat": "Islas Baleares",
    "provincies": ["Islas Baleares"]
},
{
    "comunitat": "La Rioja",
    "provincies": ["La Rioja"]
},
{
    "comunitat": "País Vasco",
    "provincies": ["Álava", "Guipúzcoa", "Vizcaya"]
},
{
    "comunitat": "Navarra",
    "provincies": ["Navarra"]
},
{
    "comunitat": "Melilla",
    "provincies": ["Melilla"]
},
{
    "comunitat": "Principado de Asturias",
    "provincies": ["Asturias"]
},
{
    "comunitat": "Región de Murcia",
    "provincies": ["Murcia"]
},
];

function mostrarComunitats() {
    comunitats.forEach((element, index) => {

        var parrafo = document.createElement("option");
        parrafo.setAttribute("value", index);
        var conteido = document.createTextNode(element.comunitat);
        parrafo.appendChild(conteido)
        document.getElementById("comunitat").appendChild(parrafo);
    });
    mostrarProvincia();
}

function mostrarProvincia() {
    document.getElementById("comunitat").addEventListener("change", mostrar);
}

function mostrar() {
    let nProvincia = document.getElementById("comunitat").value;
    borrarProvincies();

    comunitats[nProvincia].provincies.forEach((element, index) => {
        var parrafo = document.createElement("option");
        parrafo.setAttribute("value", index);
        var conteido = document.createTextNode(element);
        parrafo.appendChild(conteido)
        document.getElementById("provincia").appendChild(parrafo);
    });
}

function borrarProvincies() {
    let select = document.getElementById("provincia");
    console.log(select.options);
    for (let i = select.options.length; i >= 0; i--) {
        select.remove(i);
    }
}