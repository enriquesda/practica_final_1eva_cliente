/**
 * @fileoverview Este archivo contiene la definición de los Jefes
 * finales que el jugador debe enfrentar. Se exporta un array de objetos
 * con las estadísticas base para la clase Jefe.
 * @exports {Array<DatosJefe>} El array de Jefes del juego.
 */

/**
 * Un objeto que define las características y estadísticas iniciales de un Jefe.
 * @typedef {Object} DatosJefe
 * @property {string} nombre - Nombre del enemigo, normalmente son nombres épicos.
 * @property {string} avatar - La ruta a la imagen del Jefe.
 * @property {number} nivelAtaque - El poder de ataque base del Jefe.
 * @property {number} puntosVida - La vida inicial que tiene el Jefe.
 * @property {number} experiencia - La experiencia que da al derrotarlo.
 * @property {number} multiplicadorDanio - Multiplicador extra para el ataque final del Jefe.
 */
 
export default[
  {
    "nombre": "Titán de Hielo",
    "avatar": "titan_hielo.png",
    "nivelAtaque": 50,
    "puntosVida": 65,
    "experiencia": 60,
    "multiplicadorDanio": 2.8
  },
  {
    "nombre": "Guardián de Acero",
    "avatar": "guardian.png",
    "nivelAtaque": 48,
    "puntosVida": 70,
    "experiencia": 55,
    "multiplicadorDanio": 2.1
  },
  {
    "nombre": "Cíclope Ancestral",
    "avatar": "ciclope.png",
    "nivelAtaque": 55,
    "puntosVida": 60,
    "experiencia": 70,
    "multiplicadorDanio": 2.4
  }
]