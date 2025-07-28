// Palabras a usar
const palabras = ["kinal", 
                    "programacion", 
                    "parangaricutirimicuaro", 
                    "elefante", 
                    "mariposa",
                    "guitarra",
                    "leon",
                    "fresa",
                    "cebra",
                    "camion",
                    "globo",
                    "tigre",
                    "castillo",
                    "montaña",
                    "playa",
                    "avion",
                    "espejo",
                    "banana",
                    "limon",
                    "teclado"];

// Selector de palabras aleatorias        
const palabraAleatoria = palabras[Math.floor(Math.random() * palabras.length)];        
// Creador de espacios
let palabraAdivinada = Array(palabraAleatoria.length).fill("_");
let intentosRestantes = 7;
        
// Creación de variables con los elementos del HTML        
const visualizacionPalabra = document.getElementById("visualizacion-palabra");
const intentosRestantesDisplay = document.getElementById("intentos-restantes");
const entradaTecla = document.getElementById("entrada-tecla");
const tecladoContenedor = document.getElementById("teclado");
const recargar = document.getElementById("recargarPagina");
const canvas = document.getElementById("ahorcado");
const letrasUtilizadas = {};
const ganador = document.getElementById("ganador");
const perdedor = document. getElementById("perdedor");
const textoGanador = document.getElementById("textoGanador");
const textoPerdedor = document.getElementById("textoPerdedor");
const palabraNoAdivinada = document.getElementById("palabraNoAdivinada");

// Boton de recargar página oculto (se activa cuando se pierda o se gane el juego)
recargar.style.display = "none";
textoGanador.style.display = "none";
textoPerdedor.style.display = "none";


// Dibujar el palo del ahorcado
canvas.width = 300;
canvas.height = 200;

const ctx =  canvas.getContext('2d');
//Color de la horca
ctx.fillStyle = '#804000';
//Poste
ctx.fillRect(30,0,20,canvas.height);
// Palo superior
ctx.fillRect(20,0,150,20);
// Palos de la base de la horca
ctx.fillRect(30,180,50,20);
ctx.fillRect(0,180,50,20);
// Lazo del ahorcado
ctx.fillStyle = '#808080';
ctx.fillRect(155,20,5,20);
        
// Letras que apareceran en el teclado
const alfabeto = "qwertyuiopasdfghjklñzxcvbnm";

// Creación del tecladoq        
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
        
// Función de actualizar el juego, se elejira una palabra aleatoria nuevamente
function actualizarVisualizacion() {
    visualizacionPalabra.textContent = palabraAdivinada.join(" ");
    intentosRestantesDisplay.textContent = intentosRestantes;
}

function mostrarMensaje(mensaje){
    document.getElementById("modalMessage").textContent = mensaje
    document.getElementById("myModal").style.display = "block"
}

document.getElementById("closeModal").addEventListener("click", () => {
    document.getElementById("myModal").style.display = "none"
})



// Función para manejar teclas del input y ver que el caracter ingresado sea valido
function manejarTecla() {
    const tecla = entradaTecla.value.toLowerCase();
    entradaTecla.value = "";
            
    if (tecla.length !== 1 || !/[qwertyuiopasdfghjklñzxcvbnm]/.test(tecla)) {
        alert("Ingresa una letra comprendida de A-Z.");
        return;
    }
    //Ver si la letra ingfesada ya ha sido utilizada
    if(letrasUtilizadas[tecla]){
        mostrarMensaje("Esa letra ya se ha usado, prueba con otra.");
        return;
    }
    letrasUtilizadas[tecla] = true;
    this.disable = "true";
    // comprobar si la letra ingresada coincide con una letra de la palabra y si no pertenece
    // se restara uN intento
    if (palabraAleatoria.includes(tecla)) {
        for (let i = 0; i < palabraAleatoria.length; i++) {
            if (palabraAleatoria[i] === tecla) {
                palabraAdivinada[i] = tecla;
            }
        }
    } else {
        intentosRestantes--
        // Cabeza
        if(intentosRestantes === 6){
            ctx.fillStyle = '#FFFFFF';
            ctx.fillRect(135,40,40,40);
        }else if(intentosRestantes === 5){
            //Torzo
            ctx.fillStyle = '#FFFFFF';
            ctx.fillRect(150,70,10,60);
        }else if(intentosRestantes === 4){
            //Brazo derecho
            ctx.fillStyle = '#FFFFFF';
            ctx.fillRect(140,90,20,10);
            ctx.fillRect(130,90,10,30);

        }else if(intentosRestantes === 3){
            //Brazo izquierdo
            ctx.fillStyle = '#FFFFFF';
            ctx.fillRect(160,90,20,10);
            ctx.fillRect(170,90,10,30);
        }else if(intentosRestantes === 2){
            //Cintura y pierna derecha
            ctx.fillStyle = '#FFFFFF';
            ctx.fillRect(135,130,40,10);
            ctx.fillRect(135,140,10,40);
        }else if(intentosRestantes === 1){
            //pierna izquierda
            ctx.fillStyle = '#FFFFFF';
            ctx.fillRect(165,140,10,40);
        }
    }
            
    actualizarVisualizacion();

    // Si la palabra es completada, se lenzara este mensaje     
    if (palabraAdivinada.join("") === palabraAleatoria) {
        textoGanador.style.display = "block"
        recargar.style.display = "block";
        tecladoContenedor.style.display = "none";
        entradaTecla.style.display = "none";
        recargar.addEventListener("click", function(){
        location.reload();
    });
    // Si los intentos se acaban, lanzara este mensaje
    } else if (intentosRestantes === 0) {
        ctx.fillStyle = '#000000';
        ctx.fillRect(145,50,5,5);
        ctx.fillRect(160,50,5,5);
        ctx.fillRect(145,65,20,5);
        textoPerdedor.style.display = "block";
        palabraNoAdivinada.textContent = palabraAleatoria;
        recargar.style.display = "block";
        tecladoContenedor.style.display = "none";
        entradaTecla.style.display = "none";
        recargar.addEventListener("click", function(){
        location.reload();
    });
    }}

// Evento keydown que permite que al momento en el que se ingrese una letra, al momento de
// presionar enter, la letra se compruebe si pertenece o no a la palabra.
entradaTecla.addEventListener("keydown", function(event) {
    if (event.key === "Enter") {
        manejarTecla();
    }
})

// Inicialización 
actualizarVisualizacion();