$(document).ready(inici);
var number = 0;
var acerts = 0;
var nPreguntes = 0;


function inici() {



    $("#iniciar").click(function () {




        $("#panel").show("slow");
    });





    carrgerPreguntes();


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
