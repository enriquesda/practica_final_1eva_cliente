import { Producto } from "../recursos/Producto.js";
import datos from "../datos/productos.js"; 

/**
 * Array con todos los objetos de la tienda cargados como instancias de la clase Producto.
 * @type {Producto[]}
 */
const productos = datos.map(
  ({nombre, imagen, precio, rareza, tipo, bonus}) => 
    new Producto(nombre, imagen, precio, rareza, tipo, bonus)
);

/**
 * Devuelve una lista de productos que tienen un tipo de objeto en concreto.
 * @param {string} tipo - El tipo de objeto a buscar (ej: 'arma', 'armadura').
 * @returns {Producto[]} Una lista de Productos del tipo que se pidio.
 */
function filtrarPorTipo(tipo) {
  return productos.filter(p => p.tipo === tipo);
}

/**
 * Devuelve una lista de productos que tienen una rareza en concreto.
 * @param {string} rareza - La rareza de objeto a buscar (ej: 'rara', 'legendaria').
 * @returns {Producto[]} Una lista de Productos con esa rareza.
 */
function filtrarPorRareza(rareza) {
  return productos.filter(p => p.rareza === rareza);
}

/**
 * Devuelve una lista de los productos de un tipo con el descuento ya aplicado.
 * Esto no modifica el array original.
 * @param {string} tipo - El tipo de producto al que se aplica el descuento.
 * @param {number} porcentaje - El descuento en %.
 * @returns {Producto[]} Una nueva lista de Productos descontados.
 */
function aplicarDescuentoPorTipo(tipo, porcentaje) {
  return productos.filter(p => p.tipo === tipo).map(p => p.aplicarDescuento(porcentaje));
}

/**
 * Devuelve una lista de los productos de una rareza con el descuento ya aplicado.
 * @param {string} rareza - La rareza de producto al que se aplica el descuento.
 * @param {number} porcentaje - El descuento en %.
 * @returns {Producto[]} Una nueva lista de Productos descontados.
 */
function aplicarDescuentoPorRareza(rareza, porcentaje) {
  return productos.filter(p => p.rareza === rareza).map(p => p.aplicarDescuento(porcentaje));
}

/**
 * Objeto que exporta todas las funciones y el array de productos de la tienda.
 * @namespace
 */
export const Mercado = {
  productos,
  filtrarPorRareza,
  filtrarPorTipo,
  aplicarDescuentoPorRareza,
  aplicarDescuentoPorTipo,
};