// Variables para manejar el tiempo
let time = new Date();
let deltaTime = 0;

// Inicializa el juego cuando el documento está listo
if (document.readyState === "complete" || document.readyState === "interactive") {
    setTimeout(Init, 1); // Llama a Init() con un pequeño retraso si el documento ya está cargado
} else {
    document.addEventListener("DOMContentLoaded", Init); // Llama a Init() cuando el DOM esté completamente cargado
}

// Función para inicializar el juego
function Init() {
    time = new Date(); // Actualiza la variable 'time'
    Start(); // Llama a la función Start() para configurar el juego
    Loop(); // Comienza el bucle de actualización del juego
}

// Bucle de actualización del juego
function Loop() {
    deltaTime = (new Date() - time) / 1000; // Calcula el tiempo transcurrido desde la última actualización en segundos
    time = new Date(); // Actualiza la variable 'time'
    Update(); // Llama a la función Update() para actualizar el estado del juego
    requestAnimationFrame(Loop); // Solicita el próximo frame de animación
}

//****** LÓGICA DEL JUEGO ********//

// Variables para manejar la física y la lógica del juego
let sueloY = 22;
let velY = 0;
let impulso = 900;
let gravedad = 2500;

let dinoPosX = 42;
let dinoPosY = sueloY;

let sueloX = 0;
let velEscenario = 1280 / 3;
let gameVel = 1;
let score = 0;

let parado = false;
let saltando = false;

let tiempoHastaObstaculo = 2;
let tiempoObstaculoMin = 0.7;
let tiempoObstaculoMax = 1.8;
let obstaculoPosY = 16;
let obstaculos = [];

let tiempoHastaNube = 0.5;
let tiempoNubeMin = 0.7;
let tiempoNubeMax = 2.7;
let maxNubeY = 270;
let minNubeY = 100;
let nubes = [];
let velNube = 0.5;

// Variables para los elementos del DOM
let contenedor;
let dino;
let textoScore;
let suelo;
let gameOver;

// Función para iniciar el juego
function Start() {
    gameOver = document.querySelector(".game-over");
    suelo = document.querySelector(".suelo");
    contenedor = document.querySelector(".contenedor");
    textoScore = document.querySelector(".score");
    dino = document.querySelector(".dino");
    document.addEventListener("keydown", HandleKeyDown); // Escucha eventos de teclado
}

// Función para actualizar el estado del juego
function Update() {
    if (parado) return; // Si el juego está parado, no actualiza el estado
    
    MoverDinosaurio(); // Mueve el dinosaurio
    MoverSuelo(); // Mueve el suelo
    DecidirCrearObstaculos(); // Decide si se deben crear nuevos obstáculos
    DecidirCrearNubes(); // Decide si se deben crear nuevas nubes
    MoverObstaculos(); // Mueve los obstáculos
    MoverNubes(); // Mueve las nubes
    DetectarColision(); // Detecta colisiones entre el dinosaurio y los obstáculos

    velY -= gravedad * deltaTime; // Aplica la gravedad al dinosaurio
}

// Maneja eventos de teclado
function HandleKeyDown(ev) {
    if (ev.keyCode === 32) { // Si se presiona la barra espaciadora
        Saltar(); // Llama a la función Saltar()
    }
}

// Función para hacer saltar al dinosaurio
function Saltar() {
    if (dinoPosY === sueloY) { // Si el dinosaurio está en el suelo
        saltando = true; // Marca el estado como saltando
        velY = impulso; // Aplica un impulso hacia arriba
        dino.classList.remove("dino-corriendo"); // Cambia la animación del dinosaurio
    }
}

// Mueve el dinosaurio según la velocidad vertical
function MoverDinosaurio() {
    dinoPosY += velY * deltaTime; // Actualiza la posición vertical del dinosaurio
    if (dinoPosY < sueloY) {
        TocarSuelo(); // Si el dinosaurio cae por debajo del suelo, toca el suelo
    }
    dino.style.bottom = dinoPosY + "px"; // Actualiza la posición en el DOM
}

// Ajusta la posición del dinosaurio cuando toca el suelo
function TocarSuelo() {
    dinoPosY = sueloY; // Ajusta la posición vertical al nivel del suelo
    velY = 0; // Detiene la velocidad vertical
    if (saltando) {
        dino.classList.add("dino-corriendo"); // Cambia la animación del dinosaurio
    }
    saltando = false; // Marca el estado como no saltando
}

// Mueve el suelo según la velocidad del escenario
function MoverSuelo() {
    sueloX += CalcularDesplazamiento(); // Actualiza la posición horizontal del suelo
    suelo.style.left = -(sueloX % contenedor.clientWidth) + "px"; // Actualiza la posición en el DOM
}

// Calcula el desplazamiento del suelo
function CalcularDesplazamiento() {
    return velEscenario * deltaTime * gameVel; // Calcula el desplazamiento en función de la velocidad y el tiempo
}

// Maneja el estado de choque del dinosaurio
function Estrellarse() {
    dino.classList.remove("dino-corriendo"); // Cambia la animación del dinosaurio
    dino.classList.add("dino-estrellado"); // Añade una clase de choque
    parado = true; // Marca el estado como parado
}

// Decide si se deben crear nuevos obstáculos
function DecidirCrearObstaculos() {
    tiempoHastaObstaculo -= deltaTime; // Reduce el tiempo hasta el próximo obstáculo
    if (tiempoHastaObstaculo <= 0) {
        CrearObstaculo(); // Crea un nuevo obstáculo si el tiempo ha llegado a 0
    }
}

// Decide si se deben crear nuevas nubes
function DecidirCrearNubes() {
    tiempoHastaNube -= deltaTime; // Reduce el tiempo hasta la próxima nube
    if (tiempoHastaNube <= 0) {
        CrearNube(); // Crea una nueva nube si el tiempo ha llegado a 0
    }
}

// Crea un nuevo obstáculo
function CrearObstaculo() {
    let obstaculo = document.createElement("div"); // Crea un nuevo elemento div
    contenedor.appendChild(obstaculo); // Añade el obstáculo al contenedor
    obstaculo.classList.add("cactus"); // Añade la clase 'cactus' al obstáculo
    if (Math.random() > 0.5) obstaculo.classList.add("cactus2"); // Añade una clase extra aleatoriamente
    obstaculo.posX = contenedor.clientWidth; // Establece la posición inicial del obstáculo
    obstaculo.style.left = contenedor.clientWidth + "px"; // Actualiza la posición en el DOM

    obstaculos.push(obstaculo); // Añade el obstáculo a la lista de obstáculos
    tiempoHastaObstaculo = tiempoObstaculoMin + Math.random() * (tiempoObstaculoMax - tiempoObstaculoMin) / gameVel; // Calcula el tiempo hasta el próximo obstáculo
}

// Crea una nueva nube
function CrearNube() {
    let nube = document.createElement("div"); // Crea un nuevo elemento div
    contenedor.appendChild(nube); // Añade la nube al contenedor
    nube.classList.add("nube"); // Añade la clase 'nube' a la nube
    nube.posX = contenedor.clientWidth; // Establece la posición inicial de la nube
    nube.style.left = contenedor.clientWidth + "px"; // Actualiza la posición en el DOM
    nube.style.bottom = minNubeY + Math.random() * (maxNubeY - minNubeY) + "px"; // Establece una altura aleatoria para la nube
    
    nubes.push(nube); // Añade la nube a la lista de nubes
    tiempoHastaNube = tiempoNubeMin + Math.random() * (tiempoNubeMax - tiempoNubeMin) / gameVel; // Calcula el tiempo hasta la próxima nube
}

// Mueve los obstáculos y elimina los que han salido de la pantalla
function MoverObstaculos() {
    for (let i = obstaculos.length - 1; i >= 0; i--) {
        if (obstaculos[i].posX < -obstaculos[i].clientWidth) {
            obstaculos[i].parentNode.removeChild(obstaculos[i]); // Elimina el obstáculo del DOM
            obstaculos.splice(i, 1); // Elimina el obstáculo de la lista
            GanarPuntos(); // Incrementa el puntaje
        } else {
            obstaculos[i].posX -= CalcularDesplazamiento(); // Actualiza la posición horizontal del obstáculo
            obstaculos[i].style.left = obstaculos[i].posX + "px"; // Actualiza la posición en el DOM
        }
    }
}

// Mueve las nubes y elimina las que han salido de la pantalla
function MoverNubes() {
    for (let i = nubes.length - 1; i >= 0; i--) {
        if (nubes[i].posX < -nubes[i].clientWidth) {
            nubes[i].parentNode.removeChild(nubes[i]); // Elimina la nube del DOM
            nubes.splice(i, 1); // Elimina la nube de la lista
        } else {
            nubes[i].posX -= CalcularDesplazamiento() * velNube; // Actualiza la posición horizontal de la nube
            nubes[i].style.left = nubes[i].posX + "px"; // Actualiza la posición en el DOM
        }
    }
}

// Incrementa el puntaje y ajusta la dificultad del juego
function GanarPuntos() {
    score++; // Incrementa el puntaje
    textoScore.innerText = score; // Actualiza el texto del puntaje en el DOM
    if (score === 5) {
        gameVel = 1.5; // Aumenta la velocidad del juego
        contenedor.classList.add("mediodia"); // Cambia la clase del contenedor
    } else if (score === 10) {
        gameVel = 2; // Aumenta la velocidad del juego
        contenedor.classList.add("tarde"); // Cambia la clase del contenedor
    } else if (score === 20) {
        gameVel = 3; // Aumenta la velocidad del juego
        contenedor.classList.add("noche"); // Cambia la clase del contenedor
    }
    suelo.style.animationDuration = (3 / gameVel) + "s"; // Ajusta la duración de la animación del suelo
}

// Maneja el estado de juego terminado
function GameOver() {
    Estrellarse(); // Llama a la función Estrellarse()
    gameOver.style.display = "block"; // Muestra el mensaje de game over
}

// Detecta colisiones entre el dinosaurio y los obstáculos
function DetectarColision() {
    for (let i = 0; i < obstaculos.length; i++) {
        if (obstaculos[i].posX > dinoPosX + dino.clientWidth) {
            // Si el obstáculo está a la derecha del dinosaurio, puede evadirlo
            break; // Al estar en orden, no puede chocar con más
        } else {
            if (IsCollision(dino, obstaculos[i], 10, 30, 15, 20)) {
                GameOver(); // Si hay colisión, termina el juego
            }
        }
    }
}

// Verifica si hay una colisión entre dos elementos
function IsCollision(a, b, paddingTop, paddingRight, paddingBottom, paddingLeft) {
    let aRect = a.getBoundingClientRect(); // Obtiene el rectángulo del primer elemento
    let bRect = b.getBoundingClientRect(); // Obtiene el rectángulo del segundo elemento

    return !(
        ((aRect.top + aRect.height - paddingBottom) < (bRect.top)) ||
        (aRect.top + paddingTop > (bRect.top + bRect.height)) ||
        ((aRect.left + aRect.width - paddingRight) < bRect.left) ||
        (aRect.left + paddingLeft > (bRect.left + bRect.width))
    ); // Verifica si los rectángulos no se superponen
}
