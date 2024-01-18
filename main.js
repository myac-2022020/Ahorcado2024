const palabras = ['kinal',
                'hola',
                'ultimo',
                'graduacion',
                'sandia'];

const numeroPalabra = Math.floor(Math.random = palabras.length);
let letrasPalabra = Array(numeroPalabra.length).fill("_");
let intentos = 7;

visualizacion_palabra = document.getElementById('palabraAdivinar');
letraIngresada = document.getElementById('letraIngresada');
personaje = document.getElementById('personajeAhorcado');
intentosRestantes = document.getElementById('oportunidades');
teclado = document.getElementById('teclado');
entradaTecla = document.getElementById('entradaTecla');

const alfabeto = [a-z];

for(const letra of alfabeto){
    const tecla = document.createElement('div');
    tecla.classList.add("tecla");
    tecla.textContent = letra;
    tecla.addEventListener("click", function() {
        entradaTecla.value = letra;
        manejarTecla();
    });
    teclacoContenedor.appendChild(tecla);
}
function actualizarVisualizacion(){
    visualizacion_palabra.textContent = letrasPalabra.join(" ");
    intentosRestantes.textContent = intentos;
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
