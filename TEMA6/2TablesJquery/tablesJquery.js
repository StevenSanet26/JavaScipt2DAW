
$(document).ready(inici);

function inici() {

    $tabla = $("#table");
   
    for (let j = 1; j <=10; j++) {
        
        //$tabla.append("Taula del "+j);
    for (let i = 1; i <=10; i++) {
            let result=j*i;
        $tabla.append("<tr><td>"+j+"</td><td>"+i+"</td><td>"+result+"</td></tr>");
    }
    $tabla.append("<br>");
}

$("tr").filter(":even").css("background-color", "red");



}