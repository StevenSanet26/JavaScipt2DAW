$(document).ready(inici);
var number = 0;
var acerts = 0;
var nPreguntes = 0;
var reset= true;


function inici() {



    $("#iniciar").click(reload);


    function reload() {
        if (reset== true) {
            $("#panel").show("slow");
            carrgerPreguntes();
            reset= false;
        }else{
            reset= true;
            $("#panel").hide(1500);

            $("#pregunta").empty();
            $("#respostes").empty();

            number=0;
            acerts= 0;
            $("#acerts").html(acerts);
            nPreguntes=0;
            $("#total").html(nPreguntes);

            $("#panel").show("slow");
            reload();
        }
    }

  






   

}

function carrgerPreguntes() {


    if (nPreguntes < 5) {
        console.log(number);
        $("#pregunta").html(test[number].pregunta);
        test[number].respostes.forEach((element, index) => {
            $("#respostes").append("<p id=" + index + " class='res'>" + element + "</p>");
        });


        $(".res").click(function () {

            let idResposta = event.target.id;

            nPreguntes = nPreguntes + 1;

            $("#total").html(nPreguntes);
            if (idResposta == test[number].acert) {
                acerts = acerts + 1;
                $("#acerts").html(acerts);

            }




            $("#panel").hide(1500, function () {
                $("#pregunta").empty();
                $(".res").empty();


            });

            number = number + 1;
            $("#panel").show("slow", function () {

                carrgerPreguntes();
            });
        });


    } else {
        let total = (acerts / 5) * 10;
        $("#panel").html("Total: " + total + "/10");



    }


}
