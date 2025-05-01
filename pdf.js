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
      
        const [logo, portada, x1,x2,x3,x4,x5,x6,x7,x8,x9,x10,x11,x12,x13,x14,x15,x16,x17,op1,op2] = await Promise.all([
            cargarImagen("digilife.png"), // Logo
            cargarImagen(getPortadaPorModeloYDispositivo(modelo, dispositivo)), // Cargar 
            cargarImagen("imagenes/xiaomi-tel/x1.webp"),//imagen 1
            cargarImagen("imagenes/xiaomi-tel/x2.webp"),//imagen 2
            cargarImagen("imagenes/xiaomi-tel/x3.webp"),//imagen 3
            cargarImagen("imagenes/xiaomi-tel/x4.webp"),//imagen 4
            cargarImagen("imagenes/xiaomi-tel/x5.webp"),//imagen 5
            cargarImagen("imagenes/xiaomi-tel/x6.webp"),//imagen 6
            cargarImagen("imagenes/xiaomi-tel/x7.webp"),//imagen 7
            cargarImagen("imagenes/xiaomi-tel/x8.webp"),//imagen 8
            cargarImagen("imagenes/xiaomi-tel/x9.webp"),//imagen 9
            cargarImagen("imagenes/xiaomi-tel/x10.webp"),//imagen 10
            cargarImagen("imagenes/xiaomi-tel/x11.webp"),//imagen 11
            cargarImagen("imagenes/xiaomi-tel/x12.webp"),//imagen 12
            cargarImagen("imagenes/xiaomi-tel/x13.webp"),//imagen 13
            cargarImagen("imagenes/xiaomi-tel/x14.webp"),//imagen 14
            cargarImagen("imagenes/xiaomi-tel/x15.webp"),//imagen 15
            cargarImagen("imagenes/xiaomi-tel/x16.webp"),//imagen 16
            cargarImagen("imagenes/xiaomi-tel/x17.webp"),//imagen 17
            cargarImagen("imagenes/xiaomi-tel/op1.webp"),//imagen op1
            cargarImagen("imagenes/xiaomi-tel/op2.webp"),//imagen op2

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
            doc.addImage(x1, "WEBP", 30, 33, 60, 105); 
            doc.addImage(x2, "WEBP", 110 ,33, 60, 105); 

            doc.text("De manera automatica cargara la pantalla para configurar el router.", 11, 150);
            doc.text("En caso que no aparezca ingresar al 192.168.31.1 en el navegador del telefono.", 11, 157);
            doc.addImage(x3, "WEBP", 30, 163, 60, 115); 
            doc.addImage(op1, "WEBP", 110 ,163, 60, 115); 


            doc.addPage();//2
            agregarLogo(doc);
            agregarBorde(doc);
            
            doc.setFont("helvetica");
            doc.setFontSize(14);
            doc.text("De nuevo enla pantalla de configuracion del router  ", 11, 20);
            doc.text("Seleccionamos donde dice 'Select your country' y cargara una lista de paises", 11, 27);
            doc.addImage(x4, "WEBP", 30, 33, 60, 115); 
            doc.addImage(x5, "WEBP", 110 ,33, 60, 115); 

            doc.text("Seleccionamos uno de latinoamerica, en este ejemplo Mexico ", 11, 157);
            doc.text("Verificamos que esten las 2 casillas habilitadas, y en 'Try it now' ", 11, 165);
            doc.addImage(x6, "WEBP", 30, 169, 60, 115); 
            doc.addImage(x7, "WEBP", 110 ,169, 60, 115); 

            doc.addPage();//3
            agregarLogo(doc);
            agregarBorde(doc);
            
            doc.setFont("helvetica");
            doc.setFontSize(14);
            doc.text("Aparece una pantalla que esta probando la red", 11, 20);
            doc.text("Aparecera un error, seleccionamos en la parte de abajo 'Continue setup'", 11, 27);
            doc.addImage(x8, "WEBP", 30, 33, 60, 115); 
            doc.addImage(x9, "WEBP", 110 ,33, 60, 115); 

            doc.text("Cargara una opcion de 'select setup type' y selecciona *Static Ip*", 11, 157);
            doc.text("Aparecera varias opciones que debemos ingresar, a continuacion se brindan los datos", 11, 165);
            doc.addImage(x10, "WEBP", 30, 169, 60, 115); 
            doc.addImage(x11, "WEBP", 110 ,169, 60, 115); 

            doc.addPage();//4
            agregarLogo(doc);
            agregarBorde(doc);
            
            doc.setFont("helvetica");
            doc.setFontSize(14);
            doc.text("En esta caso ingresamos los mismos datos que la primera imagen ", 11, 20);
            doc.text("Despues de dar en Next, se aplicara los cambios que se ha ingresado", 11, 27);
          

            doc.addImage(x12, "WEBP", 30, 33, 60, 115); 
            doc.addImage(x13, "WEBP", 110 ,33, 60, 115); 

            doc.setFontSize(7);
            doc.setTextColor(255, 255, 255); // Color blanco
            doc.text(`${ip}`, 33, 64);
            doc.text(`${networkConfig.mascara_subred}`, 33, 75);
            doc.text(`${networkConfig.gateway}`, 33, 86);
            doc.text(`${networkConfig.dns1}`, 33, 97);
            doc.text(`${networkConfig.dns2}`, 33, 108);
            doc.setTextColor(0, 0, 0);

            doc.setFontSize(14);
            doc.text("En la primera imagen cargara las opciones de nombre y contraseña del WI-FI", 11, 157);
            doc.text("Ingresa el nombre y la contraseña, activa las dos casillas y haz clic en Next", 11, 165);
            doc.addImage(x14, "WEBP", 30, 169, 60, 115); 
            doc.addImage(x15, "WEBP", 110 ,169, 60, 115); 



            doc.addPage();//5
            agregarLogo(doc);
            agregarBorde(doc);
            
            doc.setFont("helvetica");
            doc.setFontSize(14);
            doc.text("Cargar una pagina que indica que ya se guardo los datos ingresado ", 11, 20);
            doc.text("Se desconectara del WI-FI, debera conectarse a la red creada con el nombre y contraseña", 11, 27);
            doc.addImage(x16, "WEBP", 30, 33, 60, 115); 
            doc.addImage(x17, "WEBP", 110 ,33, 60, 115); 

            doc.text("De manera automatica parace", 11, 157);
            doc.text("Selecciona conectar, para comenzar a configurar.", 11, 165);
            doc.addImage(op2, "WEBP", 30, 169, 60, 115); 
            doc.addImage(x1, "WEBP", 110 ,169, 60, 115); 
 

        

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

           let nombreArchivo = nombre.replace(/[^a-zA-Z0-9_ -]/g, "") || "Cliente";
            const pdfUrl = doc.output("bloburl");
            window.open(pdfUrl, "_blank");
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

