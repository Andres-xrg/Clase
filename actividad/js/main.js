var contador = 1;       // esta Variable hace el seguimiento del número de la imagen
var temporizador;       // esta Variable guarda la referencia al temporizador de las imagenes

// Función que comienza el pase automático de imágenes
function iniciar() {
    //se Configura un temporizador que ejecuta con la funcion que se puso y pasan cada 3000 milisegundos (3 segundos)
    temporizador = setInterval(rotarImagenes, 3000);
}

//Esta función hace que detenga automaticamente las imágenes
function detener() {
    // Detiene el temporizador que está cambiando las imágenes
    clearInterval(temporizador);
}

// Función que actualiza la imagen mostrada
function rotarImagenes() {
    // Si el número de la imagen alcanza o supera 10, reinicia el contador a 1
    if (contador >= 10) {
        contador = 1; // Se reinicia a 1 para comenzar desde la primera imagen
    }

    // Obtiene el elemento de la imagen usando su ID 'imgSlide'
    var img = document.getElementById('imgSlide');
    
    // Actualiza la fuente de la imagen 
    img.src = './images/img' + contador + '.jpg';
    
    // Incrementa el contador para la próxima imagen
    contador++;
}
