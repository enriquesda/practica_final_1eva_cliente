import { readFileSync } from "fs";
import { Producto } from "./producto.js";

const datos = JSON.parse(readFileSync("./productos.json", "utf8"));

const productos = datos.map(
  p => new Producto(p.nombre, p.imagen, p.precio, p.rareza, p.tipo, p.bonus)
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