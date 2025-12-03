/**
 * @fileoverview Script principal del juego.
 * Controla el flujo de escenas, la inicialización de estado, la lógica del mercado,
 * la gestión del inventario y la orquestación de los combates.
 * @author [Tu Nombre/Alias de Alumno]
 */

import { Mercado } from './modulos/Mercado.js';
import { combate } from './modulos/Batalla.js';
import { distinguirJugador } from './modulos/Ranking.js';
import { Producto } from './recursos/Producto.js';
import { Jugador } from './recursos/Jugador.js';
import { Enemigos } from './recursos/Enemigos.js';
import { Jefes } from './recursos/Jefes.js';
import enemigos from "../datos/enemigos.js";
import jefes from "../datos/jefes.js";
import { tipoProductos, rarezaProductos } from "./recursos/Constants.js";
import { personajesBase } from "../datos/personajes.js";

/** @type {Producto[]} */
let productos = Mercado.productos;
/** @type {Producto[]} */
let inventario = [];
// Constante para el tamaño máximo de la barra rápida (ej. 9 slots)
const MAX_SLOTS = 9;
/** @type {HTMLElement} */
const inventoryContainer = document.getElementById('inventory-container');
/** @type {Object | null} */
let personajeSeleccionado = null;
/** @type {Jugador} */
let jugador = new Jugador('Cacharro', '/imagenes/personaje.png', 0, 100, 10, 5)
/** @type {HTMLElement} */
const miFooter = document.querySelector('footer');
/** @type {string[]} */
const escenasConFooter = ['scene-2', 'scene-3', 'scene-5', 'scene-6'];
/** @type {boolean} */
let batallaFinalizada = false;
/** @type {number} */
const MONEDAS_INICIALES = 9000;
/** @type {number} */
let saldoActual = 0;
/** @type {number} */
let costoTotalCarrito = 0;


////////////////////////////////////////////////////////////////////////////
//Cargamos a los enemigos y jefes , creamos una funcion para solo obtener alguno de ellos
////////////////////////////////////////////////////////////////////////////
/** @type {Enemigos[]} */
const enemigosTotal = enemigos.map(
    ({ nombre, avatar, nivelAtaque, puntosVida, experiencia }) =>
        new Enemigos(nombre, avatar, nivelAtaque, puntosVida, experiencia)
);
/** @type {Jefes[]} */
const jefesTotal = jefes.map(
    ({ nombre, avatar, nivelAtaque, puntosVida, experiencia, multiplicadorDanio }) =>
        new Jefes(nombre, avatar, nivelAtaque, puntosVida, experiencia, multiplicadorDanio)
);

console.log(enemigosTotal);
console.log(jefesTotal);
/**
 * Crea una selección aleatoria y única de enemigos y jefes para una ronda de batalla.
 * @param {Enemigos[]} enemigosArr - Array de todos los enemigos posibles.
 * @param {Jefes[]} jefesArr - Array de todos los jefes posibles.
 * @param {number} [numEnemigos=3] - Número de enemigos comunes a seleccionar.
 * @param {number} [numJefes=1] - Número de jefes a seleccionar.
 * @returns {Array<Enemigos | Jefes>} El equipo de batalla para la ronda.
 */
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
/** @type {Array<Enemigos | Jefes>}*/
let rondaEnemigos = crearEquipoBatalla(enemigosTotal, jefesTotal, 4, 2);
console.log(rondaEnemigos);
////////////////////////////////////////////////////////////////////////////
//escena 0 Eleccion personaje
////////////////////////////////////////////////////////////////////////////
/**
 * Actualiza la vista previa de las estadísticas base del personaje seleccionado.
 * @param {Object} stats - El objeto de estadísticas del personaje.
 * @param {number} stats.vida
 * @param {number} stats.ataque
 * @param {number} stats.defensa
 */
function actualizarPreview(stats) {
    document.getElementById('preview-vida').textContent = `Vida: ${stats.vida}`;
    document.getElementById('preview-ataque').textContent = `Ataque: ${stats.ataque}`;
    document.getElementById('preview-defensa').textContent = `Defensa: ${stats.defensa}`;
    
    // 🆕 Asegura que el mensaje de selección se oculte
    const mensaje = document.getElementById('preview-mensaje');
    if (mensaje) {
        mensaje.style.display = 'none';
    }
}

/**
 * Pinta dinámicamente las tarjetas de personaje en la escena 0 y añade listeners de selección.
 */
function pintarSelectorPersonaje() {
    const selectorContainer = document.getElementById('select-personaje');
    if (!selectorContainer) return;

    selectorContainer.innerHTML = '';

    personajesBase.forEach(p => {
        const div = document.createElement('div');
        div.classList.add('tarjeta-personaje');
        div.dataset.personajeId = p.id;

        const img = document.createElement('img');
        img.src = p.avatar;
        img.alt = p.nombreClase;

        const h3 = document.createElement('h3');
        h3.textContent = p.nombreClase;

        div.appendChild(img);
        div.appendChild(h3);
        selectorContainer.appendChild(div);

        div.addEventListener('click', () => {
            document.querySelectorAll('.tarjeta-personaje').forEach(card => card.classList.remove('selected'));
            div.classList.add('selected');

            personajeSeleccionado = p;
            actualizarPreview(p.stats);
            document.getElementById('btn-scene-0').disabled = false;
        });
    });
    
    // 🆕 Asegura que el mensaje de selección se muestre al inicio
    const mensaje = document.getElementById('preview-mensaje');
    if (mensaje) {
        mensaje.style.display = 'block';
    }
}
////////////////////////////////////////////////////////////////////////////
//escena 1 Resumen jugador
////////////////////////////////////////////////////////////////////////////
/** @type {HTMLElement} */
const escena1JugadorDic = document.getElementById('escena-1-jugador');
/**
 * Pinta la imagen, el nombre y las estadísticas base del jugador en la escena 1.
 * @param {Jugador} jugador - La instancia actual del jugador.
 */
function pintarResumenJugador(jugador) {
    const escena1JugadorDic = document.getElementById('escena-1-jugador');
    if (escena1JugadorDic) {
        escena1JugadorDic.innerHTML = '';
        const imgJugador = document.createElement('img');
        imgJugador.src = jugador.avatar;
        imgJugador.alt = jugador.nombre;
        escena1JugadorDic.appendChild(imgJugador);
        const nombreJugador = document.createElement('h2');
        nombreJugador.textContent = jugador.nombre;
        escena1JugadorDic.appendChild(nombreJugador);
    }

    document.getElementById('stat-vida').textContent = 'Vida: ' + jugador.vida;
    document.getElementById('stat-ataque').textContent = 'Ataque: ' + jugador.ataque;
    document.getElementById('stat-defensa').textContent = 'Defensa: ' + jugador.defensa;
    document.getElementById('stat-puntos').textContent = 'Puntos: ' + jugador.puntos;
}

////////////////////////////////////////////////////////////////////////////
//escena 2 tienda de objetos
////////////////////////////////////////////////////////////////////////////
/** @type {HTMLElement} */
const mercadoContainer = document.getElementById('mercado')
/** @type {string[]} */
const rarezasPosibles = ['comun', 'rara', 'legendaria'];
/** @type {string} */
let rarezaOferta = rarezasPosibles[Math.floor(Math.random() * rarezasPosibles.length)];
/**
 * Pinta dinámicamente los productos en el mercado, aplicando un descuento a la rareza de oferta.
 * @param {Producto[]} [productosFiltrados=productos] - Array de productos a mostrar (usado para la función de filtro).
 */
function pintarMercado(productosFiltrados = productos) {
    if (mercadoContainer) {
        mercadoContainer.innerHTML = '';
        if (productosFiltrados.length === 0) {
            const mensaje = document.createElement('p');
            mensaje.textContent = 'No se encontraron productos con los filtros seleccionados.';
            mercadoContainer.appendChild(mensaje);
            return;
        }
        productosFiltrados.forEach(producto => {
            //descuento por tipo
            let precioFinal = producto.precio;
            let objetoParaCarrito = producto;
            let esOferta = false;
            
            // 🆕 Detección si el producto ya está en el carrito para restaurar el estado
            const estaEnCarrito = carrito.some(p => p.nombre === producto.nombre);
            
            if (producto.rareza === rarezaOferta) {
                esOferta = true;
                precioFinal = Math.floor(producto.precio * 0.85);
                objetoParaCarrito = new Producto(
                    producto.nombre,
                    producto.imagen,
                    precioFinal,
                    producto.rareza,
                    producto.tipo,
                    producto.bonus
                );
            }
            console.log(producto);
            
            //Tarjeta del producto
            const productoDiv = document.createElement('div');
            productoDiv.classList.add('producto-mercado');
            
            // 🆕 Restaurar el estado visual si está en carrito
            if (estaEnCarrito) {
                productoDiv.classList.add('en-carrito');
            }
            
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
            if (esOferta) {
                precioProducto.innerHTML = `Precio: <del>${producto.precio}</del> -> ${precioFinal}`;
                precioProducto.style.color = 'green';
            } else {
                precioProducto.textContent = 'Precio: ' + producto.precio;
            }
            productoDiv.appendChild(precioProducto);

            mercadoContainer.appendChild(productoDiv);

            //boton comprar
            const botonComprar = document.createElement('button');
            
            // 🆕 Restaurar el texto del botón
            botonComprar.textContent = estaEnCarrito ? 'Retirar' : 'Añadir';
            
            // Asegúrate de que se usa la versión con el precio descontado si hay oferta
            const productoFinal = esOferta ? objetoParaCarrito : producto;
            
            botonComprar.addEventListener('click', (e) => {
                manejarCarrito(productoFinal, e.currentTarget); 
            });
            productoDiv.appendChild(botonComprar);
        });
    } else {
        console.error('No se encontró el contenedor del mercado');
    }
}
/**
 * Rellena los elementos <select> del buscador con las opciones de tipo y rareza.
 */
function cargarOpcionesFiltro() {
    const selectTipo = document.getElementById('filtro-tipo');
    const selectRareza = document.getElementById('filtro-rareza');

    if (selectTipo && selectRareza) {
        tipoProductos.forEach(tipo => {
            const option = document.createElement('option');
            option.value = tipo;
            option.textContent = tipo;
            selectTipo.appendChild(option);
        });
        rarezaProductos.forEach(rareza => {
            const option = document.createElement('option');
            option.value = rareza;
            option.textContent = rareza;
            selectRareza.appendChild(option);
        });
    }
}
/** @type {HTMLElement} */
const inputNombre = document.getElementById('filtro-nombre');
/** @type {HTMLElement} */
const selectTipo = document.getElementById('filtro-tipo');
/** @type {HTMLElement} */
const selectRareza = document.getElementById('filtro-rareza');
/** @type {HTMLElement} */
const btnLimpiar = document.getElementById('btn-limpiar-filtros');

/**
 * Aplica los filtros de nombre, tipo y rareza y repinta el mercado.
 */
function aplicarFiltrosMercado() {
    const nombre = inputNombre ? inputNombre.value.toLowerCase() : '';
    const tipo = selectTipo ? selectTipo.value : '';
    const rareza = selectRareza ? selectRareza.value : '';
    let productosFiltrados = productos;
    if (tipo) {
        productosFiltrados = productosFiltrados.filter(p => p.tipo === tipo);
    }

    if (rareza) {
        productosFiltrados = productosFiltrados.filter(p => p.rareza === rareza);
    }

    if (nombre) {
        productosFiltrados = productosFiltrados.filter(p =>
            p.nombre.toLowerCase().includes(nombre)
        );
    }

    pintarMercado(productosFiltrados);
}
if (inputNombre) {
    inputNombre.addEventListener('input', aplicarFiltrosMercado);
}
if (selectTipo) {
    selectTipo.addEventListener('change', aplicarFiltrosMercado);
}
if (selectRareza) {
    selectRareza.addEventListener('change', aplicarFiltrosMercado);
}
if (btnLimpiar) {
    btnLimpiar.addEventListener('click', () => {
        if (inputNombre) inputNombre.value = '';
        if (selectTipo) selectTipo.value = '';
        if (selectRareza) selectRareza.value = '';
        aplicarFiltrosMercado();
    });
}
/**
 * Calcula el costo total de los productos en el carrito usando un bucle for.
 */
function calcularCostoTotal() {
    let acumuladorDeCosto = 0;
    for (const producto of carrito) {
        acumuladorDeCosto += producto.precio;
    }
    costoTotalCarrito = acumuladorDeCosto;
    actualizarUIMercado();
}
/**
 * Actualiza la interfaz de usuario del mercado (saldo disponible y total de la compra).
 */
function actualizarUIMercado() {
    const saldoDispElement = document.getElementById('saldo-disponible');
    const totalCompraElement = document.getElementById('total-compra');
    const btnComprar = document.getElementById('btn-scene-2');

    if (saldoDispElement) saldoDispElement.textContent = saldoActual;
    if (totalCompraElement) totalCompraElement.textContent = costoTotalCarrito;
    if (btnComprar) {
        if (costoTotalCarrito > saldoActual) {
            btnComprar.disabled = true;
            btnComprar.textContent = 'MONEDAS INSUFICIENTES';
        } else if (costoTotalCarrito === 0) {
            btnComprar.disabled = true;
            btnComprar.textContent = 'Comprar (Carrito Vacío)';
        }
        else {
            btnComprar.disabled = false;
            btnComprar.textContent = `Comprar (${costoTotalCarrito})`;
        }
    }
}

/** @type {Producto[]} */
let carrito = [];

// Función para manejar productos del carrito
/**
 * Añade o retira un producto del carrito y actualiza la UI y el costo total.
 * @param {Producto} producto - El producto a manejar.
 * @param {HTMLElement} boton - El botón que se pulsó (para actualizar su texto).
 */
function manejarCarrito(producto, boton) {
    // Busca por nombre para ignorar si la instancia es diferente (por descuento)
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
    calcularCostoTotal();
}

/**
 * Pinta el contenido del inventario en el footer.
 */
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

/** @type {HTMLElement} */
const escena2JugadorDic = document.getElementById('escena-3-jugador');

/**
 * Pinta la imagen y el nombre del jugador en la Escena 3.
 * @param {Jugador} jugador - La instancia actual del jugador.
 */
function pintarResumenJugadorEscena3(jugador) {
    const escena2JugadorDic = document.getElementById('escena-3-jugador');
    if (escena2JugadorDic) {
        escena2JugadorDic.innerHTML = '';
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
}

// El bloque de código estático anterior fue movido a la función pintarResumenJugadorEscena3 y se llama en btnScene2
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

/** @type {HTMLElement} */
const enemigosContainer = document.getElementById('enemigos');
/**
 * Pinta las tarjetas de los enemigos seleccionados en la escena 4.
 */
function pintarEnemigos() {
    const enemigosContainer = document.getElementById('enemigos');
    if (!enemigosContainer) return;
    
    enemigosContainer.innerHTML = ''; // Limpiamos

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
}

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

/** @type {HTMLElement} */
const jugadorComb = document.getElementById("jugadorComb");
/** @type {HTMLElement} */
const enemigoComb = document.getElementById("enemigoComb");
/** @type {HTMLElement} */
const resumenComb = document.getElementById("resumenComb");
/**
 * Ejecuta un turno de combate entre el jugador y el primer enemigo de la ronda.
 * Controla las animaciones, la lógica de daño y la terminación del combate.
 * @returns {{experiencia: number, enemigoDerrotado: boolean}} El resultado del turno.
 */
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
    //restablecemos las animaciones ... no me convence mucho esto cambiar si da tiempo
    jugadorComb.style.transform = 'translateX(-100vw)';
    enemigoComb.style.transform = 'translateX(100vw)';
    jugadorComb.style.animation = 'none';
    enemigoComb.style.animation = 'none';
    jugadorComb.src = jugador.avatar;
    enemigoComb.src = "/imagenes/" + enemigoTurno.avatar;
    void jugadorComb.offsetWidth;
    setTimeout(() => {
        jugadorComb.style.animation = 'slideInLeft 1s ease-out forwards';
        enemigoComb.style.animation = 'slideInRight 1s ease-out 0.2s forwards';
    }, 10);
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

/**
 * Reinicia el estado del juego para comenzar una nueva partida.
 */
function inicializarEstado() {
    jugador = new Jugador('Cacharro', '/imagenes/personaje.png', 0, 100, 10, 5);
    pintarSelectorPersonaje();
    const btnScene0 = document.getElementById('btn-scene-0');
    if (btnScene0) {
        btnScene0.textContent = 'Comenzar Aventura';
        btnScene0.disabled = true;
    }
    inventario = [];
    rarezaOferta = rarezasPosibles[Math.floor(Math.random() * rarezasPosibles.length)];
    pintarMercado();
    cargarOpcionesFiltro();
    saldoActual = MONEDAS_INICIALES;
    costoTotalCarrito = 0;
    actualizarUIMercado();
    rondaEnemigos = crearEquipoBatalla(enemigosTotal, jefesTotal, 4, 2);
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
/**
 * Muestra la escena con el ID especificado y oculta la escena activa.
 * Controla la visibilidad del footer.
 * @param {string} nextSceneId - El ID de la escena a mostrar.
 */
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

//Botón en Escena 0
const btnScene0 = document.getElementById('btn-scene-0');
if (btnScene0) {
    btnScene0.addEventListener('click', () => {
        if (!personajeSeleccionado) return;

        const nombreInput = document.getElementById('input-nombre');
        let nombreJugador;
        const nombreTemporal = nombreInput.value.trim();

        if (nombreTemporal) {
            nombreJugador = nombreTemporal;
        } else {
            nombreJugador = 'Héroe Anónimo';
        }
        jugador = new Jugador(
            nombreJugador,
            personajeSeleccionado.avatar,
            0,
            personajeSeleccionado.stats.vida,
            personajeSeleccionado.stats.ataque,
            personajeSeleccionado.stats.defensa
        );
        pintarResumenJugador(jugador);
        cambiarEscena('scene-1');
    });
}
//Botón en Escena 1
const btnScene1 = document.getElementById('btn-scene-1');
if (btnScene1) {
    btnScene1.addEventListener('click', () => {
        // Aseguramos que el saldo esté al máximo al entrar al mercado
        saldoActual = MONEDAS_INICIALES; 
        costoTotalCarrito = 0;
        
        pintarMercado(); 
        actualizarUIMercado();
        
        cambiarEscena('scene-2');
    });
}

//Botón en Escena 2
//acion de comprar 
const btnComprar = document.getElementById('btn-scene-2');
if (btnComprar) {
    btnComprar.addEventListener('click', () => {
        if (carrito.length === 0) {
            jugador.actualizarEstadisticas();
            console.log('El carrito está vacío. Añade productos para comprar.');
            // 🆕 Llamamos a la función de pintado para la Escena 3 aunque el carrito esté vacío
            pintarResumenJugadorEscena3(jugador);
            cambiarEscena('scene-3');
            return;
        }

        if (costoTotalCarrito > saldoActual) {
            alert("¡No tienes suficientes monedas para esta compra!");
            return;
        }
        
        // 1. Deducir el saldo
        saldoActual -= costoTotalCarrito;

        // 2. Procesar la compra
        carrito.forEach(p => {
            jugador.aniadirObjeto(p);
            inventario.push(p);
            console.log(`Has comprado: ${p.nombre} por ${p.precio}`);
        });
        
        // 3. Resetear carrito y su costo
        carrito = [];
        costoTotalCarrito = 0;
        
        // 4. Actualizar las estadísticas y la UI
        jugador.actualizarEstadisticas();
        document.getElementById('stat-vidat').textContent = 'Vida: ' + jugador.vidaTotal;
        document.getElementById('stat-ataquet').textContent = 'Ataque: ' + jugador.ataqueTotal;
        document.getElementById('stat-defensat').textContent = 'Defensa: ' + jugador.defensaFinal;
        document.getElementById('stat-puntost').textContent = 'Puntos: ' + jugador.puntos;
        
        // 5. Actualizar la UI del mercado (muestra el saldo restante de esta ronda)
        actualizarUIMercado();
        
        // 6. Pintar la Escena 3 con los datos actualizados
        pintarResumenJugadorEscena3(jugador);
        cambiarEscena('scene-3');
    });
}
//Botón en Escena 3
const btnScene3 = document.getElementById('btn-scene-3');
if (btnScene3) {
    btnScene3.addEventListener('click', () => {
        // 🆕 Pinta la lista de enemigos antes de cambiar a la escena 4
        pintarEnemigos(); 
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
const btnScene5 = document.getElementById('btn-scene-5');
if (btnScene5) {
    btnScene5.addEventListener('click', () => {
        //no me convence el metodo de si el enemigo muere en la primera ronda ... cambiar si da tiempo   
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
            lanzarConfetiFinal();
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
        cambiarEscena('scene-0');
    });
}









// Función para disparar ráfagas de confeti continuo
function lanzarConfetiFinal() {
    confetti({
        particleCount: 200, // nº particulas
        spread: 160,        // Dispersión
        startVelocity: 40,  // Velocidad
        origin: { y: 0.1, x: 0.5 }, // Origen
        zIndex: 9999,
        colors: ['#FFD700', '#D4C19A', '#8B0000', '#5C4033'] // Tus colores
    });
}