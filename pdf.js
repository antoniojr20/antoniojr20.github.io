document.addEventListener("DOMContentLoaded", function () {
    document.getElementById("btnGenerar").addEventListener("click", generarPDF);
});

// Función para validar el formulario antes de generar el PDF
function validarFormulario() {
    let nombre = document.getElementById("nombre").value.trim();
    let ip = document.getElementById("ip").value.trim();
    let modelo = document.getElementById("modelo").value;
    let opcion = document.getElementById("opcion").value;
    let dispositivo = document.querySelector('input[name="dispositivo"]:checked');

    if (!nombre || !ip || modelo === "selecciona" || opcion === "ingresar" || !dispositivo) {
        alert("Por favor, complete todos los campos antes de generar el PDF.");
        return false;
    }

    // Validar dirección IP con una expresión regular
    let ipRegex = /^(25[0-5]|2[0-4][0-9]|1?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|1?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|1?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|1?[0-9][0-9]?)$/;
    if (!ipRegex.test(ip)) {
        alert("Ingrese una dirección IP válida.");
        return false;
    }

    return true;
}

// Función para cargar imágenes de manera asíncrona
function cargarImagen(src) {
    return new Promise((resolve, reject) => {
        let img = new Image();
        img.src = src;
        img.onload = () => resolve(img);
        img.onerror = () => reject(`No se pudo cargar la imagen: ${src}`);
    });
}

// Función para obtener la configuración de la red basada en la opción seleccionada
function getNetworkConfig(opcion) {
    let config = {
        mascara_subred: '',
        gateway: '',
        dns1: '8.8.8.8',  // Valor predeterminado para DNS1
        dns2: '1.1.1.1'   // Valor predeterminado para DNS2
    };

    switch (opcion) {
        case 'rangom1':
            config.mascara_subred = '255.255.248.0';
            config.gateway = '172.17.200.1';
            break;
        case 'rangom2':
            config.mascara_subred = '255.255.255.0';
            config.gateway = '172.19.100.1';
            break;
        case 'rangoma1':
            config.mascara_subred = '255.255.240.0';
            config.gateway = '172.20.192.1';
            break;
        case 'rangoma2':
            config.mascara_subred = '255.255.255.0';
            config.gateway = '172.20.100.1';
            break;
        case 'rangomar1':
            config.mascara_subred = '255.255.248.0';
            config.gateway = '172.17.208.1';
            break;
        case 'rangomar2':
            config.mascara_subred = '255.255.248.0';
            config.gateway = '172.19.0.1';
            break;
        case 'marsella4':
            config.mascara_subred = '255.255.248.0';
            config.gateway = '10.176.8.1';
            break;
        case 'mediterraneo':
            config.mascara_subred = '255.255.248.0';
            config.gateway = '10.120.130.1';
            break;
        case 'cairo':
            config.mascara_subred = '255.255.252.0';
            config.gateway = '172.19.32.1';
            break;
        case 'ecoterra1':
            config.mascara_subred = '255.255.248.0';
            config.gateway = '172.19.16.1';
            break;
        case 'ecoterra2':
            config.mascara_subred = '255.255.248.0';
            config.gateway = '192.168.1.1';
            break;
        case 'acropolis':
            config.mascara_subred = '255.255.248.0';
            config.gateway = '172.17.96.1';
            break;
        case 'panamericana':
            config.mascara_subred = '255.255.252.0';
            config.gateway = '172.20.100.1';
            break;
        case 'nueva':
            config.mascara_subred = '255.255.252.0';
            config.gateway = '172.19.100.1';
            break;
        case 'costa':
            config.mascara_subred = '255.255.252.0';
            config.gateway = '100.64.4.1';
            break;
        case 'megapolis':
            config.mascara_subred = '255.255.252.0';
            config.gateway = '172.19.100.1';
            break;
        case 'portal':
            config.mascara_subred = '255.255.252.0';
            config.gateway = '100.64.0.1';
            break;
        case 'pinares':
            config.mascara_subred = '255.255.255.0';
            config.gateway = '10.1.0.1';
            break;
        case 'rangor1':
            config.mascara_subred = '255.255.252.0';
            config.gateway = '172.17.208.1';
            break;
        case 'rangor2':
            config.mascara_subred = '255.255.252.0';
            config.gateway = '172.17.212.1';
            break;
        case 'rangor3':
            config.mascara_subred = '255.255.254.0';
            config.gateway = '172.17.216.1';
            break;
        case 'rangor4':
            config.mascara_subred = '255.255.254.0';
            config.gateway = '172.17.218.1';
            break;
        case 'rangor5':
            config.mascara_subred = '255.255.254.0';
            config.gateway = '172.17.220.1';
            break;
        case 'rangor6':
            config.mascara_subred = '255.255.255.252';
            config.gateway = '172.17.222.1';
            break;
        case 'rangor7':
            config.mascara_subred = '255.255.254.0';
            config.gateway = '172.17.224.1';
            break;
        default:
            // Valores por defecto si la opción no está en los casos anteriores
            config.mascara_subred = '255.255.255.0';
            config.gateway = '192.168.1.1';
            break;
    }

    return config; // Return the configuration
}

// Función principal para generar el PDF
async function generarPDF() {
    if (!validarFormulario()) return;

    const { jsPDF } = window.jspdf;
    const doc = new jsPDF({
        orientation: "portrait",
        unit: "mm",
        format: "a4"
    });

    // Obtener valores del formulario
    let nombre = document.getElementById("nombre").value.trim();
    let ip = document.getElementById("ip").value.trim();
    let modelo = document.getElementById("modelo").value;
    let opcion = document.getElementById("opcion").value;
    let dispositivo = document.querySelector('input[name="dispositivo"]:checked').value;

   
    const networkConfig = getNetworkConfig(opcion);

    try {
      
        const [logo, portada, x1,x2,x1_1,x3,x4,x5,x6,x7,x8,x9,x10,x11,x12,x13,x14,x15,x16,x17,op,op1,x18,x19,x20,x21,x22,x23] = await Promise.all([
            cargarImagen("digilife.png"), // Logo
            cargarImagen(getPortadaPorModeloYDispositivo(modelo, dispositivo)), // Cargar 
            cargarImagen("imagenes/xiaomi-tel/x1.webp"),//
            cargarImagen("imagenes/xiaomi-tel/x2.webp"),//
            cargarImagen("imagenes/xiaomi-tel/x1-1.webp"),
            cargarImagen("imagenes/xiaomi-tel/x3.webp"),
            cargarImagen("imagenes/xiaomi-tel/x4.webp"), 
            cargarImagen("imagenes/xiaomi-tel/x5.webp"),
            cargarImagen("imagenes/xiaomi-tel/x6.webp"),
            cargarImagen("imagenes/xiaomi-tel/x7.webp"),
            cargarImagen("imagenes/xiaomi-tel/x8.webp"),
            cargarImagen("imagenes/xiaomi-tel/x9.webp"),
            cargarImagen("imagenes/xiaomi-tel/x10.webp"),
            cargarImagen("imagenes/xiaomi-tel/x11.webp"),
            cargarImagen("imagenes/xiaomi-tel/x12.webp"),
            cargarImagen("imagenes/xiaomi-tel/x13.webp"),
            cargarImagen("imagenes/xiaomi-tel/x14.webp"),
            cargarImagen("imagenes/xiaomi-tel/x15.webp"),
            cargarImagen("imagenes/xiaomi-tel/x16.webp"),
            cargarImagen("imagenes/xiaomi-tel/x17.webp"),
            cargarImagen("imagenes/xiaomi-tel/op.webp"),
            cargarImagen("imagenes/xiaomi-tel/op1.webp"),
            cargarImagen("imagenes/xiaomi-tel/x18.webp"),//
            cargarImagen("imagenes/xiaomi-tel/x19.webp"),//
            cargarImagen("imagenes/xiaomi-tel/x20.webp"),//
            cargarImagen("imagenes/xiaomi-tel/x21.webp"),//
            cargarImagen("imagenes/xiaomi-tel/x22.webp"),//
            cargarImagen("imagenes/xiaomi-tel/x23.webp")
        ]);

      
        doc.addImage(portada, "WEBP", 0, 0, 210, 297); 
    
        function agregarLogo(doc) {
            doc.addImage(logo, "PNG", 176, 7, 31, 13); 
        }

        function agregarBorde(doc) {
            const pageWidth = doc.internal.pageSize.getWidth();
            const pageHeight = doc.internal.pageSize.getHeight();
            doc.setLineWidth(0.5);
            doc.rect(5, 5, pageWidth - 10, pageHeight - 15);
        }
        

        if (modelo === "xiaomi" && dispositivo === "telefono") {
            doc.addPage();//1
            agregarLogo(doc);
            agregarBorde(doc);
            
            doc.setFont("helvetica");
            doc.setFontSize(14);
            doc.text("Para configurar el equipo debe aparece una red llamada xiaomi-router-xxxx", 11, 20);
            doc.text("Selecciona conectar, para comenzar a configurar.", 11, 27);
            doc.addImage(x1, "WEBP",  30, 33, 60, 115); 
            doc.addImage(x1_1, "WEBP", 110 ,33, 60, 115); 

            doc.text("De manera automatica cargara la pantalla para configurar el router.", 11, 157);
            doc.text("En caso que no aparezca ingresar al 192.168.31.1 en el navegador del telefono.", 11, 165);
            doc.addImage(x2, "WEBP", 30, 169, 60, 115); 
            doc.addImage(op, "WEBP", 110 ,169, 60, 115); 


            doc.addPage();//2
            agregarLogo(doc);
            agregarBorde(doc);
            
            doc.setFont("helvetica");
            doc.setFontSize(14);
            doc.text("Nuevamente en la pagina de configuracion ingresamos en Click to select ", 11, 20);
            doc.text("Seleccionamos donde dice 'Select your country' y cargara una lista de paises", 11, 27);
            doc.addImage(x2, "WEBP", 30, 33, 60, 115); 
            doc.addImage(x3, "WEBP", 110 ,33, 60, 115); 

            doc.text("Seleccione uno de latinoamerica, en este ejemplo Mexico seleccionamos en *Next* ", 11, 157);
            doc.text("Verificamos que esten las 2 casillas habilitadas, y damos en 'Try it now' ", 11, 165);
            doc.addImage(x4, "WEBP", 30, 169, 60, 115); 
            doc.addImage(x5, "WEBP", 110 ,169, 60, 115); 

            doc.addPage();//3
            agregarLogo(doc);
            agregarBorde(doc);
            
            doc.setFont("helvetica");
            doc.setFontSize(14);
            doc.text("Aparece una pantalla que esta probando el entorno de la red", 11, 20);
            doc.text("En ocaciones aparece un cuadro, para ingresar una cuenta ", 11, 27);
            doc.addImage(op1, "WEBP", 30, 33, 60, 115); 
            doc.addImage(x8, "WEBP", 110 ,33, 60, 115); 

            doc.text("Por jemplo ingresamos el usuario: admin y la contraseña: admin y en Next ", 11, 157);
            doc.text("Aparecera un error de usuario, se selecciona en *continue setup*", 11, 165);
            doc.addImage(x9, "WEBP", 30, 169, 60, 115); 
            doc.addImage(x10, "WEBP", 110 ,169, 60, 115); 

            doc.addPage();//4
            agregarLogo(doc);
            agregarBorde(doc);
            
            doc.setFont("helvetica");
            doc.setFontSize(14);
            doc.text("Nos aparecera varias opciones de configurar la ip del equipo", 11, 20);
            doc.text("Se selecciona donde aparece *Static IP*  y damos en Next (omitir ISP)", 11, 27);
          

            doc.addImage(x6, "WEBP", 30, 33, 60, 115); 
            doc.addImage(x7, "WEBP", 110 ,33, 60, 115); 


            doc.setFontSize(14);
            doc.text("En este apartado colocamos el nombre y contraseña del WI-FI que deseamos ", 11, 157);
            doc.text("Dejamos las casillas habilitadas damos en Next y aparecera que esta cargando", 11, 165);
            doc.addImage(x11, "WEBP", 30, 169, 60, 115); 
            doc.addImage(x12, "WEBP", 110 ,169, 60, 115); 



            doc.addPage();//5
            agregarLogo(doc);
            agregarBorde(doc);
            
            doc.setFont("helvetica");
            doc.setFontSize(14);
            doc.text("Cargara una pagina con la informacion del Wifi y tomamos una captura", 11, 20);
            doc.text("Se desconectara del WI-FI, debera conectarse nuevamente a la red creada", 11, 27);
            doc.addImage(x13, "WEBP", 30, 33, 60, 115); 
            doc.addImage(x14, "WEBP", 110 ,33, 60, 115); 

            doc.text("Ingresaremos al 192.168.31.1 para finalizar la configuracion", 11, 157);
            doc.text("Cuando aparezca esta opcion ingresamos la contraseña de la red WI-FI creada", 11, 165);
            doc.addImage(op, "WEBP", 30, 169, 60, 115); 
            doc.addImage(x15, "WEBP", 110 ,169, 60, 115); 

             doc.addPage();//6
            agregarLogo(doc);
            agregarBorde(doc);
            
            doc.setFont("helvetica");
            doc.setFontSize(14);
            doc.text("Ya ingresada la contraseña seleccionamos la fecha hacia la derecha", 11, 20);
            doc.text("Nos aparecera la configuracion del router y seleccionamos donde dice Settings", 11, 27);
            doc.addImage(x16, "WEBP", 30, 33, 60, 115); 
            doc.addImage(x17, "WEBP", 110 ,33, 60, 115); 

            doc.text("Aparecera otro menu y se selecciona la opcion de Network settings", 11, 157);
            doc.text("En este apartado aparecera varias opciones que podemos configurar", 11, 165);
            doc.addImage(x18, "WEBP", 30, 169, 60, 115); 
            doc.addImage(x19, "WEBP", 110 ,169, 60, 115); 

         doc.addPage();//7
            agregarLogo(doc);
            agregarBorde(doc);
            
            doc.setFont("helvetica");
            doc.setFontSize(14);
            doc.text("Nos centramos en el apartado de Network settings y desplegamos las opciones", 11, 20);
            doc.text("Seleccionamos la que aparece como *Static IP address* y apareceran nuevos campos", 11, 27);
            doc.addImage(x20, "WEBP", 30, 33, 60, 115); 
            doc.addImage(x21, "WEBP", 110 ,33, 60, 115); 

            
         
            doc.setFontSize(14);
            doc.text("Se brinda la configuracion que debe colocar en este apartado igual como aparece", 11, 157);
            doc.text("Despues de dar en Apply tendriamos conexion a internet, solo verificamos la velocidad.", 11, 165);
            doc.addImage(x22, "WEBP", 30, 169, 60, 115); 
            doc.addImage(x23, "WEBP", 110 ,169, 60, 115); 
            
            
            doc.setFontSize(4);
            doc.text(`${ip}`, 44.5, 210.5);
            doc.text(`${networkConfig.mascara_subred}`, 44.5, 214);
            doc.text(`${networkConfig.gateway}`, 44.5, 218);
            doc.text(`${networkConfig.dns1}`, 44.5, 221.5);
            doc.text(`${networkConfig.dns2}`, 44.5, 225.5);

        } else if (modelo === "xiaomi" && dispositivo === "computadora") {
            doc.addPage();
            agregarLogo(doc);
            doc.setFontSize(16);
            doc.text("Configuración Avanzada para Xiaomi - computadora", 20, 20);
       
            doc.setFont("helvetica", "bold");
            doc.setFontSize(22);
            doc.text("Datos del Cliente", 20, 20);
    
          
    
       
        }

        if (modelo === "zc" && dispositivo === "computadora") {
            doc.addPage();
            doc.setFont("helvetica", "bold");
            doc.setFontSize(16);
            doc.text("Configuración Avanzada para ZC Computadora", 20, 20);
            doc.setFontSize(14);
            doc.text("Detalles sobre configuraciones avanzadas para la computadora ZC.", 20, 40);
        }

////////////////// piede de pagina///////////////
        const totalPaginas = doc.internal.getNumberOfPages();

for (let i = 1; i <= totalPaginas; i++) {
    doc.setPage(i);

    if (i > 1) { // Solo desde la segunda página (visual)
        const pageNumber = i - 1; // Mostrar 1 en la página 2 del PDF
        const pageWidth = doc.internal.pageSize.getWidth();
        const pageHeight = doc.internal.pageSize.getHeight();

        doc.setFont("helvetica", "normal");
        doc.setFontSize(10);
        doc.setTextColor(100); // Gris suave

        doc.text(`Página ${pageNumber}`, pageWidth / 2, pageHeight - 5, {
            align: 'center',
        });
    }
}

         // Guardar el archivo con el nombre del cliente y el modelo
        let nombreArchivo = nombre.replace(/[^a-zA-Z0-9_ -]/g, "") || "Cliente";
        doc.save(`${nombreArchivo}.pdf`); 
    } catch (error) {
        alert("Error al generar el PDF: " + error);
    }
}


const portadas = {
    xiaomi: {
        telefono: "imagenes/xiaomi-tel/xiaomi.webp",
        computadora: "imagenes/xiaomi-comp/Router-xiaomi2.webp"
    },
    zc: {
        telefono: "imagenes/zc_telefono_portada.png",
        computadora: "imagenes/zc_computadora_portada.png"
    }
};

function getPortadaPorModeloYDispositivo(modelo, dispositivo) {
    return (portadas[modelo]?.[dispositivo]) || "imagenes/default.webp";
}

