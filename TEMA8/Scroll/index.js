
let arrPoke = new Array;

window.onload = main;
let ele = 0;

function main() {

  //console.log("Conttol Scrool", document.body.scrollHeight - window.innerHeight, window.scrollY);
  document.addEventListener("scroll", () => {







    console.log("Conttol Scrool", document.body.scrollHeight - window.innerHeight, window.scrollY);
    let top = (document.body.scrollHeight - window.innerHeight)-100;
    console.log("top", top);
    console.log("scroll", window.scrollY);
    let Altura = window.scrollY


    if (Altura == top) {
      cargarLista()
    }

  })


  // cridar al api 
  fetch('https://pokeapi.co/api/v2/pokemon?limit=1100&offset=0')
    .then(response => response.json())
    .then(data => {
      //console.log ( data.results);
      arrPoke = data.results;
      //console.log(arrPoke);
      cargarLista();

    });
  //console.log(document.getElementById("listado"));

}

function cargarLista() {
  // recorrer Array

  for (i = 0; i < 10; i++) {
    cargarPagina(arrPoke[i + ele], i);
  };
  ele = 10 + ele;
}

function cargarPagina(element, ind) {

  fetch(element.url)
    .then(response => response.json())
    .then(data => {
      //console.log(data);
      // Afegir dades
      document.getElementById("listado").innerHTML += '<div class="card mb-4">' +
        '<a href="#!"><img class="card-img-top" src="' + data.sprites.front_default + '" alt="..." /></a>' +
        '<div class="card-body">' +
        '<h2 class="card-title">' + data.name + '</h2>' +
        '<div class="row">' +
        '<div class="col p-3 text-center"><strong>Peso: ' + data.weight + ' </strong></div>' +
        '<div class="col p-3 text-center"><strong>Altura: ' + data.height + ' </strong></div>' +
        '</div>' +
        '</div>' +
        '</div>';
    });
};

