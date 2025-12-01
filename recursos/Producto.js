import { rarezaProductos, tipoProductos } from "./constants.js";
/**
 * Clase para crear todos los objetos que se pueden comprar en la tienda.
 * @class
 */
export class Producto {
    /** @type {string}*/
    nombre;
    /** @type {string}*/
    imagen;
    /** @type {number}*/
    precio;
    /** @type {string}*/
    rareza;
    /** @type {string}*/
    tipo;
    /** @type {number}*/
    bonus;

    /**
     * Crea una instancia de Producto.
     * Si la rareza o el tipo no son validos, usa los valores 'comun' o 'consumible'.
     * @constructor
     * @param {string} nombre - Nombre del producto.
     * @param {string} imagen - La ruta de la imajen del objeto.
     * @param {number} precio - El coste en monedas.
     * @param {string} rareza - La rareza, comprueba si es valida.
     * @param {string} tipo - El tipo de objeto, comprueba si es valido.
     * @param {number} bonus - El bonus base de stat que da el objeto.
     */
    constructor(
        nombre,
        imagen,
        precio,
        rareza,
        tipo,
        bonus
    ) {
        this.nombre = nombre;
        this.imagen = imagen;
        this.precio = precio;
        if (rarezaProductos.includes(rareza.toLowerCase())) {
            this.rareza = rareza;
        } else {
            this.rareza = 'comun';
        }
        if (tipoProductos.includes(tipo.toLowerCase())) {
            this.tipo = tipo;
        } else {
            this.tipo = 'consumible'; // Esta mal escrito 'consumible'
        }
        this.bonus = bonus;
    }
    
    /**
     * Devuelve el precio del producto en un formato de texto con simbolo de euro.
     * Esto está mal porque el precio es en monedas del juego, no euros.
     * @returns {string} El precio del producto en un formato de texto.
     */
    formatearAtributos() {
        return `${(this.precio / 100).toFixed(2)}€`;
    }
    
    /**
     * Devuelve el valor del bonus del objeto aplicado segun su rareza.
     * @returns {number} El bonus total del objeto.
     */
    obtenerBonus(){
        switch(this.rareza){
            case 'comun':
                return this.bonus*1;
            case 'rara':
                return this.bonus*1.5;
            case 'legendaria':
                return this.bonus*2;
        }
    }

    /**
     * Crea una copia del producto con un precio rebajado.
     * @param {number} porcentaje - El porcentaje de descuento a aplicar.
     * @returns {Producto} Una copia (clon) del producto con el nuevo precio.
     */
    aplicarDescuento(porcentaje) {
        const nuevoPrecio = this.precio - (this.precio * (porcentaje / 100));
        const copia = new Producto(
            this.nombre,
            this.imagen,
            nuevoPrecio,
            this.rareza,
            this.tipo,
            this.bonus
        );
        return copia;
    }

    /**
     * Hace una copia exacta del producto.
     * @returns {Producto} Un nuevo objeto Producto identico al original.
     */
    clonar() {
        return new Producto(
            this.nombre,
            this.imagen,
            this.precio,
            this.rareza,
            this.tipo,
            this.bonus
        );
    }
}