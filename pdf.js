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

    // Obtener la configuración de red
    const networkConfig = getNetworkConfig(opcion);

    try {
        // Cargar imágenes
        const [logo, portada] = await Promise.all([
            cargarImagen("digilife.png"), // Logo
            cargarImagen(getPortadaPorModeloYDispositivo(modelo, dispositivo)) // Cargar portada según el modelo y dispositivo
        ]);

        // Crear portada según el modelo y dispositivo seleccionado
        doc.addImage(portada, "PNG", 0, 0, 210, 297); // Portada para el modelo y dispositivo seleccionado
    
        function agregarLogo(doc) {
            // Añadir logo en la misma posición (ajusta las coordenadas según necesites)
            doc.addImage(logo, "PNG", 150, 10, 50, 20); // Ajusta tamaño y posición según lo necesites
        }

        // Si el modelo tiene más de un dispositivo, agrega más páginas si es necesario
        if (modelo === "xiaomi" && dispositivo === "telefono") {
            doc.addPage();
            agregarLogo(doc);
            doc.setFont("helvetica", "bold");
            doc.setFontSize(16);
            doc.text("Configuración Avanzada para Xiaomi - Teléfono", 20, 20);
            doc.setFontSize(14);
            doc.text("Detalles sobre configuraciones avanzadas para el teléfono Xiaomi.", 20, 40);
         
        } else if (modelo === "xiaomi" && dispositivo === "computadora") {
            doc.addPage();
            agregarLogo(doc);
            doc.setFontSize(16);
            doc.text("Configuración Avanzada para Xiaomi - computadora", 20, 20);
            doc.setFontSize(14);
            doc.text("Detalles sobre configuraciones avanzadas para el computadora Xiaomi.", 20, 40);
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
        doc.save(`${nombreArchivo}.pdf`); // Guardar el PDF con el modelo y dispositivo como parte del nombre del archivo
    } catch (error) {
        alert("Error al generar el PDF: " + error);
    }
}

// Función para obtener la portada según el modelo y dispositivo seleccionado
function getPortadaPorModeloYDispositivo(modelo, dispositivo) {
    // Define las portadas por modelo y dispositivo
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
