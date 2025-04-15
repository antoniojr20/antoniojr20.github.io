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
      
        const [logo, portada, x1,x2,x3,x4,x5,x6,x7,x8,x9] = await Promise.all([
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
          

        ]);

      
        doc.addImage(portada, "PNG", 0, 0, 210, 297); 
    
        function agregarLogo(doc) {
            doc.addImage(logo, "PNG", 150, 10, 50, 20); 
        }


        if (modelo === "xiaomi" && dispositivo === "telefono") {
            doc.addPage();
            agregarLogo(doc);
            doc.setFont("helvetica", "bold");
            doc.setFontSize(16);
            doc.text("Configuración Avanzada para Xiaomi - Teléfono", 20, 20);
            doc.setFontSize(14);
            doc.text("Detalles sobre configuraciones avanzadas para el teléfono Xiaomi.", 20, 40);
            
            // pagina 2
            doc.addPage();
            agregarLogo(doc);

            doc.setFont("helvetica", "bold");
            doc.setFontSize(22);
            doc.text("Datos del Cliente", 20, 20);
            doc.addImage(x1, "WEBP", 0, 0, 50, 97); 
            doc.addImage(x2, "WEBP", 50 ,25, 100, 100); 

            doc.addPage();
            doc.addImage(x3, "WEBP", 0, 0, 50, 97); 
            doc.addImage(x4, "WEBP", 50 ,25, 100, 100); 
            // Datos del usuario
            doc.setFont("helvetica", "normal");
            doc.setFontSize(14);
            doc.text(`Nombre: ${nombre}`, 20, 40);
            doc.text(`Dirección IP: ${ip}`, 20, 50);
            doc.text(`Modelo del Router: ${modelo}`, 20, 60);




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

        // Guardar el archivo con el nombre del cliente y el modelo
        let nombreArchivo = nombre.replace(/[^a-zA-Z0-9_ -]/g, "") || "Cliente";
        doc.save(`${nombreArchivo}.pdf`); 
    } catch (error) {
        alert("Error al generar el PDF: " + error);
    }
}


function getPortadaPorModeloYDispositivo(modelo, dispositivo) {
    if (modelo === "xiaomi") {
        if (dispositivo === "telefono") {
            return "imagenes/xiaomi.png";
        } else if (dispositivo === "computadora") {
            return "imagenes/Router-xiaomi2.png";
        }
    } else if (modelo === "zc") {
        if (dispositivo === "telefono") {
            return "imagenes/zc_telefono_portada.png";
        } else if (dispositivo === "computadora") {
            return "imagenes/zc_computadora_portada.png";
        }
    }
    return "default.png"; // Portada por defecto
}
