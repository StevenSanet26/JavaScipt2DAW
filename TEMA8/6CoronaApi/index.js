window.onload=main;

var arrayCovid = new Array();

function main(){
    carregarApi();
  //  mostrarApi();
}


function carregarApi(){
    let hoy= new Date();
    let year=hoy.getFullYear();
    let month = hoy.getMonth()+1;
    let day= hoy.getDate();
    let fecha=year+"-"+month+"-"+day;
   

   // console.log(year+"-"+month+"-"+day);

    let xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
         
            covid = JSON.parse(this.responseText);
            

          // console.log(covid.dates[fecha].countries.Spain.regions[6].sub_regions);
          
            covid.dates[fecha].countries.Spain.regions[6].sub_regions.forEach((element,index) => {
           
               document.getElementById("TI"+index).innerHTML=element.today_confirmed;
               document.getElementById("TD"+index).innerHTML=element.today_deaths;
               document.getElementById("NI"+index).innerHTML=element.today_new_confirmed;
               document.getElementById("ND"+index).innerHTML=element.today_new_deaths;
               document.getElementById("FC"+index).innerHTML="Última actualización " +element.date;
            
            });
            
        }
    }
   
    xmlhttp.open("GET", "https://api.covid19tracking.narrativa.com/api/"+fecha+"/country/spain", true);
    xmlhttp.send();
}