//se agrega una Función para cambiar el color del semáforo
function cambiarColor(color) {
    // Cambia el color de la luz roja dependiendo del argumento 
    document.getElementById('rojo').style.backgroundColor = color === 'rojo' ? 'red' : 'grey';
    // Cambia el color de la luz amarilla dependiendo del argumento 
    document.getElementById('amarillo').style.backgroundColor = color === 'amarillo' ? 'yellow' : 'grey';
    // Cambia el color de la luz verde dependiendo del argumento 
    document.getElementById('verde').style.backgroundColor = color === 'verde' ? 'green' : 'grey';
}

//se agrega una  Función para iniciar el ciclo del semáforo
function iniciarSemaforo() {
    // Cambia a la luz roja al inicio
    setTimeout(() => cambiarColor('rojo'), 0); 
    // Cambia a la luz amarilla después de 3 segundos
    setTimeout(() => cambiarColor('amarillo'), 3000); 
    // Cambia a la luz verde después de 6 segundos
    setTimeout(() => cambiarColor('verde'), 6000);
    // Vuelve a iniciar el ciclo del semáforo después de 9 segundos
    setTimeout(iniciarSemaforo, 9000); 
}
// hace que se ejecute la funcion de iniciar semaforo
window.onload = iniciarSemaforo;
