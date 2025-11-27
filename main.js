import { Mercado } from './modulos/Mercado.js';

import { Producto } from './recursos/Producto.js';
import { Jugador } from './datos/Jugador.js';

let productos = Mercado.productos;
let inventario = []; 
// Constante para el tamaño máximo de la barra rápida (ej. 9 slots)
const MAX_SLOTS = 9; 
const inventoryContainer = document.getElementById('inventory-container');
const jugador = new Jugador('Cacharro', '/imagenes/personaje.png')
const miFooter = document.querySelector('footer');
const escenasConFooter = ['scene-2','scene-3'];


//escena 1
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



//escena 2-Mercado
const mercadoContainer = document.getElementById('mercado')
if(mercadoContainer){
    productos.forEach(producto =>{
        console.log(producto);
        //Tarjeta del producto
        const productoDiv = document.createElement('div');
        productoDiv.classList.add('producto-mercado');
        //Imagen del producto
        const imgProducto = document.createElement('img');
        imgProducto.src = '/imagenes/'+producto.imagen;
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
}else{
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





//escena 3 resumen jugador
//escena 1
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

//añadimos las estadisticas
document.getElementById('stat-vidat').textContent = 'Vida: ' + jugador.vidaTotal;
document.getElementById('stat-ataquet').textContent = 'Ataque: ' + jugador.ataqueTotal;
document.getElementById('stat-defensat').textContent = 'Defensa: ' + jugador.defensaFinal;
document.getElementById('stat-puntost').textContent = 'Puntos: ' + jugador.puntos;









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
//Botón en Escena 1 (para volver a Escena 2)
const btnScene1 = document.getElementById('btn-scene-1');
if (btnScene1) {
    btnScene1.addEventListener('click', () => {
        cambiarEscena('scene-2');
    });
}

// 2. Botón en Escena 2 (para volver a Escena 1)
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
            console.log('El carrito está vacío. Añade productos para comprar.');
        }
        
        cambiarEscena('scene-3'); 
    });
}


