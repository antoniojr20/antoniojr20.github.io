// Función para generar el PDF
function generarPDF() {
    // Obtener los valores del formulario
    const nombre = document.getElementById('nombre').value;
    const apellido = document.getElementById('apellido').value;
    const email = document.getElementById('email').value;

    // Crear un nuevo documento PDF
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();

    // Agregar contenido al PDF
    doc.text('Formulario de Datos', 10, 10);
    doc.text(`Nombre: ${nombre}`, 10, 20);
    doc.text(`Apellido: ${apellido}`, 10, 30);
    doc.text(`Correo Electrónico: ${email}`, 10, 40);

    // Guardar el PDF
    doc.save('formulario.pdf');
}

// Asociar la función `generarPDF` al botón de generar PDF
document.getElementById('btnGenerarPDF').addEventListener('click', generarPDF);
