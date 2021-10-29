let array1 = new Array();
let array2 = new Array();
let fs = require('fs');

var plantilla="Plantilla.txt";

function obtener(plantilla) {
    return fs.readFileSync(plantilla,"utf-8");
}

var aux = obtener(plantilla);




fs.mkdir('./resultat/', function (err) {
    if (err) { console.log(err);}
    });

// Altre exemple sincron i linia a linia 
require('fs').readFileSync('basedades.csv', 'utf-8').split(/\r?\n/).forEach(function (line, index) {

    if (index == 0) {
        array1 = line.split(";");
    } else if (index == 1) {
        array2 = line.split("; ");
    }

});

for (let i = 0; i <array1.length; i++) {
    aux=aux.replace(array1[i],array2[i]);
}
var rand=Math.floor(Math.random()*1000);

fs.appendFile("./resultat/"+array2[0]+" "+array2[1]+" "+rand+".txt",aux+"\n",function(error){
    if (error) {
        console.log("error");
    }
});
/*
console.log(array1);
console.log(array2);*/
/*
var plantilla = "Plantilla.txt";
var basedades = "basedades.csv";

const fs = require("fs")

fs.mkdir("./resultat/",function (err){
    if (err) {
        console.log(err);
    }
});

function obtener(plantilla) {
    return fs.readFileSync(plantilla,"utf-8");
}
var aux = obtener(plantilla);

fs.readFileSync(plantilla,"utf8").split(/\r?\n/).forEach(function(line){
    //console.log("Linia: ", line)

});*/