import { Mercado } from './modulos/Mercado.js';
import { combate } from './modulos/Batalla.js';
import { distinguirJugador } from './modulos/Ranking.js';
import { Producto } from './recursos/Producto.js';
import { Jugador } from './recursos/Jugador.js';
import { Enemigos } from './recursos/Enemigos.js';
import { Jefes } from './recursos/Jefes.js';
import enemigos from "../datos/enemigos.js";
import jefes from "../datos/jefes.js";

let productos = Mercado.productos;
let inventario = [];
// Constante para el tamaño máximo de la barra rápida (ej. 9 slots)
const MAX_SLOTS = 9;
const inventoryContainer = document.getElementById('inventory-container');
let jugador = new Jugador('Cacharro', '/imagenes/personaje.png')
const miFooter = document.querySelector('footer');
const escenasConFooter = ['scene-2', 'scene-3', 'scene-5', 'scene-6'];
let batallaFinalizada = false;


////////////////////////////////////////////////////////////////////////////
//Cargamos a los enemigos y jefes , creamos una funcion para solo obtener alguno de ellos
////////////////////////////////////////////////////////////////////////////
const enemigosTotal = enemigos.map(
    ({ nombre, avatar, nivelAtaque, puntosVida, experiencia }) =>
        new Enemigos(nombre, avatar, nivelAtaque, puntosVida, experiencia)
);
const jefesTotal = jefes.map(
    ({ nombre, avatar, nivelAtaque, puntosVida, experiencia, multiplicadorDanio }) =>
        new Jefes(nombre, avatar, nivelAtaque, puntosVida, experiencia, multiplicadorDanio)
);

console.log(enemigosTotal);
console.log(jefesTotal);
function crearEquipoBatalla(enemigosArr, jefesArr, numEnemigos = 3, numJefes = 1) {

    // Función auxiliar para seleccionar N elementos únicos
    function seleccionarUnicos(arr, n) {
        if (n <= 0) return [];
        const candidatos = [...arr];
        const seleccionados = [];
        for (let i = 0; i < n; i++) {
            const indiceAleatorio = Math.floor(Math.random() * candidatos.length);
            const elementoSeleccionado = candidatos.splice(indiceAleatorio, 1)[0];
            seleccionados.push(elementoSeleccionado);
        }
        return seleccionados;
    }
    const enemigosSeleccionados = seleccionarUnicos(enemigosArr, numEnemigos);
    const jefesSeleccionados = seleccionarUnicos(jefesArr, numJefes);

    return enemigosSeleccionados.concat(jefesSeleccionados);
}
let rondaEnemigos = crearEquipoBatalla(enemigosTotal, jefesTotal, 4, 2);
console.log(rondaEnemigos);


////////////////////////////////////////////////////////////////////////////
//escena 1 Resumen jugador
////////////////////////////////////////////////////////////////////////////
const escena1JugadorDic = document.getElementById('escena-1-jugador');

//añadimos la imagen y nombre del jugador
if (escena1JugadorDic) {
    //imagen
    const imgJugador = document.createElement('img');
    imgJugador.src = jugador.avatar;
    imgJugador.alt = jugador.nombre;
    escena1JugadorDic.appendChild(imgJugador);
    //nombre
    const nombreJugador = document.createElement('h2');
    nombreJugador.textContent = jugador.nombre;
    escena1JugadorDic.appendChild(nombreJugador);
}

//añadimos las estadisticas
document.getElementById('stat-vida').textContent = 'Vida: ' + jugador.vida;
document.getElementById('stat-ataque').textContent = 'Ataque: ' + jugador.ataque;
document.getElementById('stat-defensa').textContent = 'Defensa: ' + jugador.defensa;
document.getElementById('stat-puntos').textContent = 'Puntos: ' + jugador.puntos;

////////////////////////////////////////////////////////////////////////////
//escena 2 tienda de objetos
////////////////////////////////////////////////////////////////////////////
const mercadoContainer = document.getElementById('mercado')
if (mercadoContainer) {
    productos.forEach(producto => {
        console.log(producto);
        //Tarjeta del producto
        const productoDiv = document.createElement('div');
        productoDiv.classList.add('producto-mercado');
        //Imagen del producto
        const imgProducto = document.createElement('img');
        imgProducto.src = '/imagenes/' + producto.imagen;
        imgProducto.alt = producto.nombre;
        productoDiv.appendChild(imgProducto);
        //nombre del producto
        const nombreProducto = document.createElement('h2');
        nombreProducto.textContent = producto.nombre;
        productoDiv.appendChild(nombreProducto);
        //stats del producto
        const divStats = document.createElement('div');
        divStats.classList.add('producto-stats');
        const rarezaProducto = document.createElement('p');
        rarezaProducto.textContent = 'Rareza: ' + producto.rareza;
        const tipoProducto = document.createElement('p');
        tipoProducto.textContent = 'Tipo: ' + producto.tipo;
        const bonusProducto = document.createElement('p');
        bonusProducto.textContent = 'Bonus: ' + producto.bonus;

        divStats.appendChild(tipoProducto);
        divStats.appendChild(rarezaProducto);
        divStats.appendChild(bonusProducto);

        productoDiv.appendChild(divStats);
        //Precio del producto
        const precioProducto = document.createElement('h3');
        precioProducto.textContent = 'Precio: ' + producto.precio + ' monedas';
        productoDiv.appendChild(precioProducto);

        mercadoContainer.appendChild(productoDiv);

        //boton comprar
        const botonComprar = document.createElement('button');
        botonComprar.textContent = 'Añadir';
        botonComprar.addEventListener('click', (e) => {
            manejarCarrito(producto, e.currentTarget);
        });
        productoDiv.appendChild(botonComprar);
    });
} else {
    console.error('No se encontró el contenedor del mercado');
}


let carrito = [];

// Función para manejar productos del carrito

function manejarCarrito(producto, boton) {
    const indexEnCarrito = carrito.findIndex(p => p.nombre === producto.nombre);
    const productoDiv = boton.closest('.producto-mercado');

    if (indexEnCarrito === -1) {
        // Añadir
        carrito.push(producto);
        boton.textContent = 'Retirar';
        productoDiv.classList.add('en-carrito');
    } else {
        // Retirar
        carrito.splice(indexEnCarrito, 1);
        boton.textContent = 'Añadir';
        productoDiv.classList.remove('en-carrito');
    }
}

function pintarFooter() {
    inventoryContainer.innerHTML = '';

    inventario.forEach((producto, index) => {
        const slotDiv = document.createElement('div');
        slotDiv.classList.add('inventory-slot');
        slotDiv.classList.add('con-item');

        // Crear la imagen
        const itemImg = document.createElement('img');
        itemImg.src = '/imagenes/' + producto.imagen;
        itemImg.alt = producto.nombre;

        slotDiv.appendChild(itemImg);

        inventoryContainer.appendChild(slotDiv);
    });

    //Rellenamos las ranuras vacías hasta MAX_SLOTS
    const slotsRestantes = MAX_SLOTS - inventario.length;
    for (let i = 0; i < slotsRestantes; i++) {
        const slotVacio = document.createElement('div');
        slotVacio.classList.add('inventory-slot');
        slotVacio.classList.add('vacio');
        inventoryContainer.appendChild(slotVacio);

        // OPCIONAL: Si quieres que las ranuras vacías no hagan nada al clic:
        slotVacio.addEventListener('click', () => {
            console.log('Ranura vacía.');
        });
    }
}

////////////////////////////////////////////////////////////////////////////
//escena 3 resumen jugador actualizado
////////////////////////////////////////////////////////////////////////////

const escena2JugadorDic = document.getElementById('escena-3-jugador');

//añadimos la imagen y nombre del jugador

if (escena2JugadorDic) {
    //imagen
    const imgJugador = document.createElement('img');
    imgJugador.src = jugador.avatar;
    imgJugador.alt = jugador.nombre;
    escena2JugadorDic.appendChild(imgJugador);
    //nombre
    const nombreJugador = document.createElement('h2');
    nombreJugador.textContent = jugador.nombre;
    escena2JugadorDic.appendChild(nombreJugador);
}

////////////////////////////////////////////////////////////////////////////
//escena 4 enemigos
////////////////////////////////////////////////////////////////////////////

const enemigosContainer = document.getElementById('enemigos');
if (mercadoContainer) {
    rondaEnemigos.forEach(ene => {
        console.log(ene);
        //Tarjeta del producto
        const enemigoDiv = document.createElement('div');
        enemigoDiv.classList.add('tarjeta-enemigo');
        //Imagen del producto
        const imgEnemigo = document.createElement('img');
        imgEnemigo.src = '/imagenes/' + ene.avatar;
        imgEnemigo.alt = ene.nombre;
        enemigoDiv.appendChild(imgEnemigo);
        //nombre del producto
        const nombreEnemigo = document.createElement('h2');
        nombreEnemigo.textContent = ene.nombre;
        enemigoDiv.appendChild(nombreEnemigo);
        //stats del producto
        const atEnemigo = document.createElement('p');
        atEnemigo.textContent = ene.nivelAtaque + " puntos de ataque"
        enemigoDiv.appendChild(atEnemigo);
        enemigosContainer.appendChild(enemigoDiv);

    });
} else {
    console.error('No se encontró el contenedor del mercado');
}
////////////////////////////////////////////////////////////////////////////
//escena 5 enemigos
////////////////////////////////////////////////////////////////////////////

const jugadorComb = document.getElementById("jugadorComb");
const enemigoComb = document.getElementById("enemigoComb");
const resumenComb = document.getElementById("resumenComb");
const turnoCombate = () => {
    if (rondaEnemigos.length > 0 && rondaEnemigos[0].puntosVida <= 0) {
        rondaEnemigos.shift();
    }
    if (rondaEnemigos.length === 0) {
        return { experiencia: 0, enemigoDerrotado: true };
    }
    const enemigoTurno = rondaEnemigos[0];
    resumenComb.innerHTML = "";
    console.log("vida antes del combate : " + jugador.vidaTotal)
    const resultado = combate(jugador, enemigoTurno);
    jugadorComb.src = jugador.avatar;
    enemigoComb.src = "/imagenes/" + enemigoTurno.avatar;
    
    const nombreGanador = resultado.experiencia > 0 ? jugador.nombre : enemigoTurno.nombre;
    const ganadorCom = document.createElement('h2');
    ganadorCom.textContent = "Ganador : " + nombreGanador;
    resumenComb.appendChild(ganadorCom);

    const ptBatalla = document.createElement('h4');
    ptBatalla.textContent = "Puntos total ganados : " + resultado.experiencia;
    resumenComb.appendChild(ptBatalla);
    
    const logsdiv = document.createElement('div');
    resultado.log.forEach(linea => {
        const pElemento = document.createElement('p');
        pElemento.textContent = linea;
        logsdiv.appendChild(pElemento);
    });
    resumenComb.appendChild(logsdiv);
    jugador.puntuacion += resultado.experiencia;
    
    if (enemigoTurno.puntosVida <= 0) {
        rondaEnemigos.shift();
    }
    
    return { experiencia: resultado.experiencia, enemigoDerrotado: enemigoTurno.puntosVida <= 0 };
}
////////////////////////////////////////////////////////////////////////////
//escena 6
//resumen de la partida y volver a jugar
////////////////////////////////////////////////////////////////////////////

function inicializarEstado() {
    jugador = new Jugador('Cacharro', '/imagenes/personaje.png');
    inventario = []; 
    rondaEnemigos = crearEquipoBatalla(enemigosTotal, jefesTotal, 3, 1);
    batallaFinalizada = false;  
    carrito = [];
    const productoDivs = document.querySelectorAll('.producto-mercado');
    productoDivs.forEach(div => {
        div.classList.remove('en-carrito');
        const boton = div.querySelector('button');
        if (boton) {
            boton.textContent = 'Añadir';
        }
    });
    document.getElementById('stat-vida').textContent = 'Vida: ' + jugador.vida;
    document.getElementById('stat-ataque').textContent = 'Ataque: ' + jugador.ataque;
    document.getElementById('stat-defensa').textContent = 'Defensa: ' + jugador.defensa;
    document.getElementById('stat-puntos').textContent = 'Puntos: ' + jugador.puntos;
    const btnScene5 = document.getElementById('btn-scene-5');
    if (btnScene5) {
        btnScene5.textContent = 'Siguiente Enemigo';
    }
}

inicializarEstado();

//CAMBIO DE ESCENAS
function cambiarEscena(nextSceneId) {
    pintarFooter();
    const escenaActiva = document.querySelector('.scene.active');
    if (escenaActiva) {
        escenaActiva.classList.remove('active');
    }
    const proximaEscena = document.getElementById(nextSceneId);
    if (proximaEscena) {
        proximaEscena.classList.add('active');
        if (miFooter) {
            if (escenasConFooter.includes(nextSceneId)) {
                miFooter.classList.add('visible');
            } else {
                miFooter.classList.remove('visible');
            }
        }

    } else {
        console.error(`Error: La escena con ID "${nextSceneId}" no existe.`);
    }
}

//Botón en Escena 1
const btnScene1 = document.getElementById('btn-scene-1');
if (btnScene1) {
    btnScene1.addEventListener('click', () => {
        cambiarEscena('scene-2');
    });
}

//Botón en Escena 2
//acion de comprar 
const btnComprar = document.getElementById('btn-scene-2');
if (btnComprar) {
    btnComprar.addEventListener('click', () => {
        if (carrito.length > 0) {
            carrito.forEach(p => {
                jugador.aniadirObjeto(p);
                inventario.push(p);
                console.log(`Has comprado: ${p.nombre}`);
            });

        } else {
            jugador.actualizarEstadisticas();
            console.log('El carrito está vacío. Añade productos para comprar.');
        }

        //añadimos las estadisticas, importante actualizarlo aqui debido a que si no se precargaran con toda la pagina y no se actualizaran 
        document.getElementById('stat-vidat').textContent = 'Vida: ' + jugador.vidaTotal;
        document.getElementById('stat-ataquet').textContent = 'Ataque: ' + jugador.ataqueTotal;
        document.getElementById('stat-defensat').textContent = 'Defensa: ' + jugador.defensaFinal;
        document.getElementById('stat-puntost').textContent = 'Puntos: ' + jugador.puntos;

        cambiarEscena('scene-3');
    });
}
//Botón en Escena 3
const btnScene3 = document.getElementById('btn-scene-3');
if (btnScene3) {
    btnScene3.addEventListener('click', () => {
        cambiarEscena('scene-4');
    });
}

//Botón en Escena 4
const btnScene4 = document.getElementById('btn-scene-4');
if (btnScene4) {
    btnScene4.addEventListener('click', () => {
        cambiarEscena('scene-5');
        turnoCombate();
    });
}


//Botón en Escena 5 combates
//acion de los combates
//Botón en Escena 5 combates
const btnScene5 = document.getElementById('btn-scene-5');
if (btnScene5) {
    btnScene5.addEventListener('click', () => {
        
        if (batallaFinalizada) {
            const finalBatallaElement = document.getElementById("finalBatalla");
            if (finalBatallaElement) {
                finalBatallaElement.textContent = "El jugador ha logrado ser un: " + distinguirJugador(jugador.puntuacion, 200);
            }
            const puntoTotalElement = document.getElementById("puntoTotal");
            if (puntoTotalElement) {
                puntoTotalElement.textContent = "Puntos totales ganados: " + jugador.puntuacion;
            }
            cambiarEscena('scene-6');
            return;
        }
        const resultadoCombate = turnoCombate();
        const combateTerminado = (resultadoCombate.experiencia === 0) || (rondaEnemigos.length === 0);
        
        if (combateTerminado) {
            if (resultadoCombate.experiencia === 0) {
                btnScene5.textContent = 'Fin del Juego (Derrota)';
            } else {
                btnScene5.textContent = 'Finalizar Batalla (Victoria)';
            }
            batallaFinalizada = true; 
        } else {
            btnScene5.textContent = 'Siguiente Enemigo';
        }
    });
}

//Botón en Escena 6 
//acion de los reiniciar y volver a comenzar
const btnScene6 = document.getElementById('btn-scene-6');
if (btnScene6) {
    btnScene6.addEventListener('click', () => {
        inicializarEstado(); 
        cambiarEscena('scene-1'); 
    });
}