const palabras = ['kinal',
                'hola',
                'ultimo',
                'graduacion',
                'sandia'];

const numeroPalabra = palabras[Math.floor(Math.random() * palabras.length)];        
// Creador de espacios
let letrasPalabra = Array(palabraAleatoria.length).fill("_");
let intentos = 7;

const visualizacionPalabra = document.getElementById("visualizacion-palabra");
const intentosRestantesDisplay = document.getElementById("intentos-restantes");
const entradaTecla = document.getElementById("entrada-tecla");
const tecladoContenedor = document.getElementById("teclado");
const modal = document.getElementById("miModal");
const mensajeModal = document.getElementById("mensaje-modal");
const recargar = document.getElementById("recargarPagina");
const canvas = document.getElementById("ahorcado");
const letrasUtilizadas = {};
const ganador = document.getElementById("ganador");
const perdedor = document. getElementById("perdedor");
const textoGanador = document.getElementById("textoGanador");
const textoPerdedor = document.getElementById("textoPerdedor");
const palabraNoAdivinada = document.getElementById("palabraNoAdivinada");

// Letras que apareceran en el teclado
const alfabeto = "qwertyuiopasdfghjklñzxcvbnm";

for (const letra of alfabeto) {
    const tecla = document.createElement("div");
    tecla.classList.add("tecla");
    tecla.textContent = letra;
    tecla.addEventListener("click", function() {
        entradaTecla.value = letra;
        manejarTecla();
    });
    tecladoContenedor.appendChild(tecla);
}
        
function actualizarVisualizacion() {
    visualizacionPalabra.textContent = palabraAdivinada.join(" ");
    intentosRestantesDisplay.textContent = intentosRestantes;
}   
function manejarTecla(){
    const tecla = entradaTecla.value.toLowerCase();
    entradaTecla.value = "";
    if(tecla.lengt !== 1 || !/[a-z]/.test(tecla)){
    alert("Ingrese una letra comprendida entre la A y la Z");
    return;        
    }
}

entradaTecla.addEventListener("keydown", function(event) {
    if(event.key === "Enter"){
        manejarTecla();
    }
});
