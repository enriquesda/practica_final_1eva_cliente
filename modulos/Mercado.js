import { Producto } from "../recursos/Producto.js";
import datos from "../datos/productos.js"; 

const productos = datos.map(
  ({nombre, imagen, precio, rareza, tipo, bonus}) => 
    new Producto(nombre, imagen, precio, rareza, tipo, bonus)
);

function filtrarPorTipo(tipo) {
  return productos.filter(p => p.tipo === tipo);
}

function filtrarPorRareza(rareza) {
  return productos.filter(p => p.rareza === rareza);
}

function aplicarDescuentoPorTipo(tipo, porcentaje) {
  return productos.filter(p => p.tipo === tipo).map(p => p.aplicarDescuento(porcentaje));
}

function aplicarDescuentoPorRareza(rareza, porcentaje) {
  return productos.filter(p => p.rareza === rareza).map(p => p.aplicarDescuento(porcentaje));
}

function buscarProducto(nombre) {
  return productos.find(p => p.nombre.toLowerCase() === nombre.toLowerCase());
}



export const Mercado = {
  productos,
  filtrarPorRareza,
  filtrarPorTipo,
  aplicarDescuentoPorRareza,
  aplicarDescuentoPorTipo,
  buscarProducto
};