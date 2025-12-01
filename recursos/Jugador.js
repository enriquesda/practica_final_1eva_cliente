import { vidaInicial } from "./constants.js";
/**
 * La clase principal para manejar al jugador.
 * Guarda las stats, el inventario y la puntuacion del juego.
 * @class
 */
export class Jugador {
    /** @type {Array}*/
    inventario = [];
    /** @type {number}*/
    ataque = 0;
    /** @type {number}*/
    ataqueTotal = 0;
    /** @type {number}*/
    defensa = 0;
    /** @type {number}*/
    defensaFinal = 0;
    /** @type {number}*/
    vidaTotal = 0;
    /** @type {number}*/
    puntuacion = 0;

    /**
     * Crea una nueva instancia del Jugador.
     * @constructor
     * @param {string} nombre - El nombre que elijio el jugador.
     * @param {string} avatar - La ruta de la imajen del personaje.
     * @param {number} [puntos=0] - Puntuación al inicio, normalmente cero.
     * @param {number} vidaBase - La vida base que tiene el personaje.
     * @param {number} ataqueBase - El ataque base del personaje al empezar.
     * @param {number} defensaBase - La defensa base del personaje al empezar.
     */
    constructor(nombre, avatar, puntos = 0, vidaBase, ataqueBase, defensaBase) {
        this.nombre = nombre;
        this.avatar = avatar;
        this.puntos = puntos;
        this.vida = vidaBase; 
        this.ataque = ataqueBase;
        this.defensa = defensaBase;
        
        this.actualizarEstadisticas();
    }

    /**
     * Añade un Producto al inventario y llama a actualizarEstadisticas.
     * Se usa clonar para que el objeto no se modifique de la tienda.
     * @param {Producto} objeto - El objeto comprado.
     */
    aniadirObjeto(objeto) {
        const auxObjeto = objeto.clonar();
        this.inventario.push(auxObjeto);
        this.actualizarEstadisticas();
    }

    /**
     * Calcula la vida maxima sumando el bonus de los consumibles del inventario a la vida base.
     */
    obtenerVidaTotal() {
        this.vidaTotal = this.vida; 
        this.inventario.forEach(producto => {
            if (producto.tipo == "consumible") this.vidaTotal += producto.obtenerBonus();
        });
    }

    /**
     * Calcula el ataque total sumando el bonus de las armas del inventario al ataque base.
     */
    obtenerAtaqueTotal() {
        this.ataqueTotal = this.ataque;
        this.inventario.forEach(producto => {
            if (producto.tipo == "arma") this.ataqueTotal += producto.obtenerBonus();
        });
    }

    /**
     * Calcula la defensa total sumando el bonus de las armaduras del inventario a la defensa base.
     */
    obtenerDefensaTotal() {
        this.defensaFinal = this.defensa;
        this.inventario.forEach(producto => {
            if (producto.tipo == "armadura") this.defensaFinal += producto.obtenerBonus();
        });
    }

    /**
     * Llama a las 3 funciones de cálculo para actualizar todas las estadísticas a la vez.
     */
    actualizarEstadisticas() {
        this.obtenerVidaTotal();
        this.obtenerDefensaTotal();
        this.obtenerAtaqueTotal();
    }

    /**
     * Añade puntos al total de la puntuacion del jugador.
     * @param {number} puntos - Cantidad de puntos que tiene que sumar.
     */
    sumarPuntos(puntos) {
        this.puntos += puntos
    }
}