/**
 * @fileoverview Este archivo contiene la definición de los productos
 * disponibles en el mercado del juego. Se exporta un array de objetos
 * con las propiedades base de cada producto.
 * @exports {Array<Object>} El array de productos del mercado.
 */

export default[
  /**
   * Un objeto que representa un producto del mercado.
   * @typedef {Object} DatosProducto
   * @property {string} nombre - Nombre del objeto que puede comprar el jugador.
   * @property {string} imagen - El nombre del archivo de la imagen del objeto (ej: "espada_hierro.png").
   * @property {number} precio - El precio en monedas del objeto.
   * @property {("comun"|"rara"|"legendaria")} rareza - La rareza del objeto, que afecta al bonus final.
   * @property {("arma"|"armadura"|"consumible")} tipo - La categoria del objeto (arma, armadura, o consumible).
   * @property {number} bonus - El valor base de la estadística que proporciona el objeto.
   */

  {
    "nombre": "Espada de Hierro",
    "imagen": "espada_hierro.png",
    "precio": 950,
    "rareza": "comun",
    "tipo": "arma",
    "bonus": 5
  },
  {
    "nombre": "Espada legendaria",
    "imagen": "espada_epica.png",
    "precio": 2500,
    "rareza": "legendaria",
    "tipo": "arma",
    "bonus": 15
  },
  {
    "nombre": "Escudo de Roble",
    "imagen": "escudo_roble.png",
    "precio": 800,
    "rareza": "comun",
    "tipo": "armadura",
    "bonus": 3
  },
  {
    "nombre": "armadura de Dragón",
    "imagen": "armadura_dragon.png",
    "precio": 4000,
    "rareza": "legendaria",
    "tipo": "armadura",
    "bonus": 25
  },
  {
    "nombre": "Poción de Vida",
    "imagen": "pocion_vida.png",
    "precio": 300,
    "rareza": "comun",
    "tipo": "consumible",
    "bonus": 10
  },
  {
    "nombre": "Poción de Fuerza",
    "imagen": "pocion_fuerza.png",
    "precio": 600,
    "rareza": "rara",
    "tipo": "consumible",
    "bonus": 20
  },
  {
    "nombre": "Casco del Valor",
    "imagen": "casco_valor.png",
    "precio": 1200,
    "rareza": "rara",
    "tipo": "armadura",
    "bonus": 8
  },
  {
    "nombre": "Arco del Viento",
    "imagen": "arco_viento.png",
    "precio": 1800,
    "rareza": "legendaria",
    "tipo": "arma",
    "bonus": 12
  },
  {
    "nombre": "Elixir de Resistencia",
    "imagen": "elixir_resistencia.png",
    "precio": 1000,
    "rareza": "rara",
    "tipo": "consumible",
    "bonus": 15
  },
  {
    "nombre": "Gamma-55",
    "imagen": "Gamma.png",
    "precio": 5000,
    "rareza": "legendaria",
    "tipo": "arma",
    "bonus": 30
  }
]