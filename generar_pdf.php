<?php
require('fpdf.php');


$nombre = $_GET['nombre'];
$ip = $_GET['ip'];
$opcion = $_GET['opcion'];
$modelo = $_GET['modelo'];
$dispositivo = $_GET['dispositivo'];

$nombreArchivo = preg_replace('/[^a-zA-Z0-9_-]/', '_', $nombre); 

$dns1 = '8.8.8.8';
$dns2 = '1.1.1.1';

// Definir los valores según la opción seleccionada
if ($opcion == 'rangom1') {
    $mascara_subred = '255.255.248.0';
    $gateway = '172.17.200.1';
    $dns1 = '8.8.8.8';
    $dns2 = '1.1.1.1';

} elseif ($opcion == 'rangom2') {
    $mascara_subred = '255.255.255.0';
    $gateway = '172.19.100.1';
    $dns1 = '8.8.8.8';
    $dns2 = '1.1.1.1';

} elseif ($opcion == 'rangoma1') {
    $mascara_subred = '255.255.240.0';
    $gateway = '172.20.192.1';
    $dns1 = '8.8.8.8';
    $dns2 = '1.1.1.1';

    } elseif ($opcion == 'rangoma2') {
    $mascara_subred = '255.255.255.0';
    $gateway = '172.20.100.1';
    $dns1 = '8.8.8.8';
    $dns2 = '1.1.1.1';

 } elseif ($opcion == 'rangomar1') {
    $mascara_subred = '255.255.248.0';
    $gateway = '172.17.208.1';
    $dns1 = '8.8.8.8';
    $dns2 = '1.1.1.1';

}  elseif ($opcion == 'rangomar2') {
    $mascara_subred = '255.255.248.0';
    $gateway = '172.19.';
    $dns1 = '8.8.8.8';
    $dns2 = '1.1.1.1';

} elseif ($opcion == 'marsella4') {
    // Configuración para San Miguel
    $mascara_subred = '255.255.248.0';
    $gateway = '10.176.8.1';
    $dns1 = '8.8.8.8';
    $dns2 = '1.1.1.1';
} elseif ($opcion == 'mediterraneo') {
    // Configuración para La Riviera
    $mascara_subred = '255.255.248.0';
    $gateway = '10.120.130.1';
    $dns1 = '8.8.8.8';
    $dns2 = '1.1.1.1';
} elseif ($opcion == 'cairo') {
    $mascara_subred = '255.255.252.0';  
    $gateway = '172.19.32.1';  
    $dns1 = '8.8.8.8';  
    $dns2 = '1.1.1.1';  
} elseif ($opcion == 'ecoterra1') {
    $mascara_subred = '255.255.248.0';  
    $gateway = '172.19.16.1';  
    $dns1 = '8.8.8.8';  
    $dns2 = '1.1.1.1';  
} elseif ($opcion == 'ecoterra2') {
    $mascara_subred = '255.255.248.0';  
    $gateway = '192.168.1.1';  
    $dns1 = '8.8.8.8';  
    $dns2 = '1.1.1.1';  
} elseif ($opcion == 'acropolis') {
    $mascara_subred = '255.255.248.0';  
    $gateway = '172.17.96.1';  
    $dns1 = '8.8.8.8';  
    $dns2 = '1.1.1.1';  
}  elseif ($opcion == 'panamericana') {
    $mascara_subred = '255.255.252.0';  
    $gateway = '172.20.100.1';  
    $dns1 = '8.8.8.8';  
    $dns2 = '1.1.1.1';  
}  elseif ($opcion == 'nueva') {
    $mascara_subred = '255.255.252.0';  
    $gateway = '172.19.100.1';  
    $dns1 = '8.8.8.8';  
    $dns2 = '1.1.1.1';  
}  elseif ($opcion == 'costa') {
    $mascara_subred = '255.255.252.0';  
    $gateway = '100.64.4.1';  
    $dns1 = '8.8.8.8';  
    $dns2 = '1.1.1.1';  
}  elseif ($opcion == 'megapolis') {
    $mascara_subred = '255.255.252.0';  
    $gateway = '172.19.100.1';  
    $dns1 = '8.8.8.8';  
    $dns2 = '1.1.1.1';  
} elseif ($opcion == 'portal') {
    $mascara_subred = '255.255.252.0';  
    $gateway = '100.64.0.1';  
    $dns1 = '8.8.8.8';  
    $dns2 = '1.1.1.1';  

} elseif ($opcion == 'pinares') {
    $mascara_subred = '255.255.255.0';  
    $gateway = '10.1.0.1';  
    $dns1 = '8.8.8.8';  
    $dns2 = '1.1.1.1';  

} elseif ($opcion == 'rangor1') {
    $mascara_subred = '255.255.255.192';
    $gateway = '172.16.1.1';
    $dns1 = '8.8.8.8';
    $dns2 = '1.1.1.1';
} elseif ($opcion == 'rangor2') {
    $mascara_subred = '255.255.255.192';
    $gateway = '172.16.1.1';
    $dns1 = '8.8.8.8';
    $dns2 = '1.1.1.1';

} elseif ($opcion == 'rangor3') {
    $mascara_subred = '255.255.255.192';
    $gateway = '172.16.1.1';
    $dns1 = '8.8.8.8';
    $dns2 = '1.1.1.1';

} elseif ($opcion == 'rangor4') {
    $mascara_subred = '255.255.255.192';
    $gateway = '172.16.1.1';
    $dns1 = '8.8.8.8';
    $dns2 = '1.1.1.1';

 } elseif ($opcion == 'rangor5') {
    $mascara_subred = '255.255.255.192';
    $gateway = '172.16.1.1';
    $dns1 = '8.8.8.8';
    $dns2 = '1.1.1.1';

} elseif ($opcion == 'rangor6') {
    $mascara_subred = '255.255.255.192';
    $gateway = '172.16.1.1';
    $dns1 = '8.8.8.8';
    $dns2 = '1.1.1.1';

 } elseif ($opcion == 'rangor7') {
    $mascara_subred = '255.255.255.192';
    $gateway = '172.16.1.1';
    $dns1 = '8.8.8.8';
    $dns2 = '1.1.1.1';

}  else {
    $mascara_subred = '';
    $gateway = '';
    $dns1 = '';
    $dns2 = '';
}
class PDF extends FPDF
{

// Pie de página
function Footer()
{
    // Posición: a 1,5 cm del final
    $this->SetY(-15);
    // Arial italic 8
    $this->SetFont('Arial','I',12);
    // Número de página
    $this->Cell(0,10,'Pagina '.$this->PageNo(),0,0,'C');
}


function Header()
{
  $digilife = "digilife.png";

    $this->Image($digilife, 180, 5, 30, 15);


}
}

$pdf = new PDF();
$pdf->AddPage();



if ($modelo == 'xiaomi') {
        if ($dispositivo == 'telefono') {

        $pdf->SetFillColor(102, 175, 212); 
        $pdf->Rect(0, 0, 210, 297, 'F'); // Fondo azul claro

     
        $pdf->Image('digilife.png', 180, 5, 30, 15, 'PNG');
        $pdf->Image('imagenes/router-xiaomi.png', -74, 40, 350, 200); // Imagen del router

        
        $pdf->SetFont('Arial', 'B', 16);
        $pdf->Cell(0, 5, 'Configuracion de Router: ' . ucfirst($nombre), 0, 1, 'C');

        
        $pdf->Ln(5);

        $modelo = 'Xiaomi AC1200';

        
        $pdf->SetFont('Arial', '', 20);
        $pdf->Cell(0, 10, 'Modelo: ' . ucfirst($modelo), 0, 1, 'C');


        $yPos = $pdf->getY(); 
        $maxY = $pdf->getPageHeight() - 50; 

        if ($yPos < $maxY) {
            $pdf->SetY($maxY); 

            // Cambiar el color del texto solo para esta celda
            $pdf->SetTextColor(137, 137, 0); // Rojo (RGB: 255, 0, 0)
            
            // Establecer la fuente
            $pdf->SetFont('Arial', '', 20); 
            
            // Colocar el texto en color rojo
            $pdf->Cell(0, 10, '* Configuracion a realizar desde un Telefono *', 0, 1, 'C');
            
            // Si deseas restaurar el color de texto a negro (o cualquier otro), usa SetTextColor() nuevamente:
            $pdf->SetTextColor(0, 0, 0); // Color negro (RGB: 0, 0, 0)
        }


        $pdf->AddPage(); //pagina 2 xiaomi telefono

             $pdf->SetFont('Arial', '', 13);
            $pdf->Cell(60, 37, 'Estimado cliente, por este medio se brinda los pasos para configurar el router '. ucfirst($modelo), 0, 0, 'L');

                $pdf->Ln(10);

            $pdf->SetFont('Arial', 'B', 13); 
            $pdf->Cell(20, 40, 'Paso 1:', 0, 0);

            $pdf->SetFont('Arial', '', 13);
            $pdf ->Cell(50, 40,'Localice la red wifi llamada Xiaomi-router puede conectarse sea la normal o a la 5G,');
            $pdf->Ln(3);

            $pdf ->Cell(172, 50,utf8_decode('la red wifi no tiene contraseña, si aparece una advertencia dar en conectar.'),0,0,'R');

            $pdf->Image('imagenes/xiaomi-tel/x1.png', 30, 55, 0, 100);
            $pdf->Image('imagenes/xiaomi-tel/x2.png', 120, 55, 0, 100);
            $pdf->Ln(140);

            $pdf->SetFont('Arial', 'B', 13); 
            $pdf->Cell(60, 0, 'Paso 2:', 0, 0);

            $pdf->SetFont('Arial', '', 13);
            $pdf ->Cell(113, 0,utf8_decode('Cargara una pantalla que dice MI wifi, Continuaremos con el idioma Ingles'),0,0,'R');     
            $pdf->Image('imagenes/xiaomi-tel/x3.png', 37, 170, 55, 110);
            $pdf->Image('imagenes/xiaomi-tel/x3-1.png', 128, 170, 55, 110);

        $pdf->AddPage(); //pagina 3
       
            $pdf->SetFont('Arial', '', 13);
            $pdf->Cell(60, 20, '*Paso opcional*, si no aparece la ventana anterior ingresar al navegador preferido ');
            $pdf->Ln(6);
            $pdf->Cell(60, 20, 'ingresamos "192.168.31.1" y cargara la pagina del paso anterior y continuamos al paso 3 ');

            $pdf->Image('imagenes/xiaomi-tel/op1.png', 30, 32, 0, 115);
            $pdf->Image('imagenes/xiaomi-tel/op2.png', 120, 32, 0, 115);
            $pdf->Ln(140);

            $pdf->SetFont('Arial', 'B', 13); 
            $pdf->Cell(57, 0, 'Paso 3:', 0, 0);

            $pdf->SetFont('Arial', '', 13);
            $pdf ->Cell(120, 0,utf8_decode('Seleccionamos donde indica en "click to select" y aparece una lista de paises'),0,0,'R');  

            $pdf->Image('imagenes/xiaomi-tel/x4.png', 30, 165, 0, 115);
            $pdf->Image('imagenes/xiaomi-tel/x5.png', 120, 165, 0, 115);


        $pdf->AddPage();// pagina 4
        
            $pdf->SetFont('Arial', 'B', 13); 
            $pdf->Cell(20, 30, 'Paso 4:', 0, 0);

            $pdf->SetFont('Arial', '', 13);
            $pdf ->Cell(50, 30,'Seleccionamos el pais "Mexico" y en Next, Selecionar las casillas y en Try it Now');
            $pdf->Ln(1);

            $pdf->Image('imagenes/xiaomi-tel/x6.png', 30, 32, 0, 115);
            $pdf->Image('imagenes/xiaomi-tel/x7.png', 120, 32, 0, 115);
            $pdf ->Ln(130);

            $pdf->SetFont('Arial', 'B', 13); 
            $pdf->Cell(20, 26, 'Paso 5:', 0, 0);

            $pdf->SetFont('Arial', '', 13);
            $pdf ->Cell(50, 26,'Esperemos una segundo mientre finaliza la prueba, aparecera un diagrama de error,');
            $pdf->Ln(1);
            $pdf ->Cell(134, 36,'seleccionamos en la parte de abajo en "continue setup',0,0,'R');

            $pdf->Image('imagenes/xiaomi-tel/x8.png', 30, 165, 0, 115);
            $pdf->Image('imagenes/xiaomi-tel/x9.png', 120, 165, 0, 115);



        $pdf->AddPage();// pagina 5
       

        $pdf->AddPage();// pagina 6

    }
     elseif ($modelo == 'xiaomi') {
       if ($dispositivo == 'computadora') {


        // Color de fondo y rectángulo
        $pdf->SetFillColor(0, 153, 133); 
        $pdf->Rect(0, 0, 210, 297, 'F'); // color

        // Imágenes
       $pdf->Image('digilife.png', 180, 5, 30, 15);
        $pdf->Image('imagenes/Router-xiaomi2.png', -74, 40, 350, 200); // Imagen del router

        // Título en negrita
        $pdf->SetFont('Arial', 'B', 16);
        $pdf->Cell(0, 5, 'Configuracion de Router: ' . ucfirst($nombre), 0, 1, 'C');

        // Salto de línea
        $pdf->Ln(5);

        // Texto del modelo en tamaño más grande
        $pdf->SetFont('Arial', '', 20);
        $pdf->Cell(0, 10, 'Modelo: ' . ucfirst($modelo), 0, 1, 'C');


        $yPos = $pdf->getY(); 
        $maxY = $pdf->getPageHeight() - 50; 

        if ($yPos < $maxY) {
            $pdf->SetY($maxY); 

            // Cambiar el color del texto solo para esta celda
            $pdf->SetTextColor(137, 137, 0); // Rojo (RGB: 255, 0, 0)
            
            // Establecer la fuente
            $pdf->SetFont('Arial', '', 20); 
            
            // Colocar el texto en color rojo
            $pdf->Cell(0, 10, '* Configuracion a realizar desde una computadora *', 0, 1, 'C');
            
            // Si deseas restaurar el color de texto a negro (o cualquier otro), usa SetTextColor() nuevamente:
            $pdf->SetTextColor(0, 0, 0); // Color negro (RGB: 0, 0, 0)
           

            $pdf->AddPage();// pagina 2
        
       } 
   }

         elseif ($modelo == 'sincronet') {
       if ($dispositivo == 'telefono') {


    
           
       } }

         elseif ($modelo == 'sincronet') {
       if ($dispositivo == 'computadora') {


        
           
       } }

    }
     }
    




// Enviar el PDF al navegador para visualizarlo (sin forzar la descarga)
$pdf->Output('I', $nombreArchivo . '.pdf'); // 'I' es para que el PDF se muestre en el navegador
?>
