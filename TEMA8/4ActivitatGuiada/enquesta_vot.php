<?php
//obrir el fitxer on es guarden les dades
$fichero="resultat.txt";
$contenido= file($fichero);

$rea =$array[0];
$bar =$array[1];
$atl =$array[2]; 
$val =$array[3];

// extraure el bot dels participants
$voto = $_GET['voto'];

//actualitzem els vors afegit

switch ($voto) { 
    case 0: 
        ++$rea;  
        break; 
    case 1: 
        ++$bar; 
        break; 
    case 2: 
        ++$atl; 
        break; 
    case 3: 
        ++$val; 
        break;  
} 

// se calcula el %  
$denominador= (int)$rea + (int)$bar + (int)$atl +(int)$val; 
$tantoRea= 100* round($rea/$denominador,2); 
$tantoBar= 100* round($bar/$denominador,2); 
$tantoAtl= 100* round($atl/$denominador,2); 
$tantoVal= 100* round($val/$denominador,2); 
?> 

<!DOCTYPE html>
<html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <meta http-equiv="X-UA-Compatible" content="ie=edge">
        <title>Document</title>
    </head>
    <body>
        <h2> Resultado:</h2> 
        <table> 
            <tr> 
                <td>Real Madrid:</td> 
                <td><img src="barrita.png" width='<?=$tantoRea; ?>' height='20'> <?=$tantoRea; ?>%</td>  
            </tr> 
            <tr> 
                <td>Barcelona:</td> 
                <td><img src="barrita.png" width='<?=$tantoBar; ?>' height='20'> <?=$tantoBar; ?>% </td>  
            </tr> 
            <tr> 
                <td>Atlético de Madrid:</td> 
                <td><img src="barrita.png" width='<?=$tantoAtl; ?>' height='20'> <?=$tantoAtl; ?>%</td>  
            </tr> 
            <tr> 
                <td>València:</td> 
                <td><img src="barrita.png" width='<?=$tantoVal; ?>' height='20'> <?=$tantoVal; ?>%</td>  
            </tr> 
        </table>    
    </body>
</html>



