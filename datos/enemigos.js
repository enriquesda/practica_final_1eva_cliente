/**
 * @fileoverview Este archivo contiene la definición de los enemigos básicos
 * que el jugador encuentra en el juego. Se exporta un array de objetos
 * con las estadísticas base para la clase Enemigo.
 * @exports {Array<DatosEnemigo>} El array con la lista de enemigos basicos.
 */

/**
 * Un objeto que define las características y estadísticas de un enemigo normal.
 * @typedef {Object} DatosEnemigo
 * @property {string} nombre - El nombre del enemigo (ej: 'Trasgo').
 * @property {string} avatar - La ruta a la imagen del enemigo.
 * @property {number} nivelAtaque - El daño que hace el enemigo en un turno.
 * @property {number} puntosVida - La vida total que tiene el enemigo.
 * @property {number} experiencia - La exp que da al ser derrotado.
 */

export default[
  {
    "nombre": "Trasgo",
    "avatar": "trasgo.png",
    "nivelAtaque": 10,
    "puntosVida": 30,
    "experiencia": 15
  },
  {
    "nombre": "Esqueleto Guerrero",
    "avatar": "esqueleto.png",
    "nivelAtaque": 12,
    "puntosVida": 40,
    "experiencia": 18
  },
  {
    "nombre": "Lobo de las Sombras",
    "avatar": "lobo.png",
    "nivelAtaque": 15,
    "puntosVida": 45,
    "experiencia": 20
  },
  {
    "nombre": "Dragón de Obsidiana",
    "avatar": "dragon.png",
    "nivelAtaque": 45,
    "puntosVida": 50,
    "experiencia": 50
  },
  {
    "nombre": "Señor de la Cripta",
    "avatar": "cripta.png",
    "nivelAtaque": 35,
    "puntosVida": 35,
    "experiencia": 30
  },
  {
    "nombre": "Bruja del Páramo",
    "avatar": "bruja.png",
    "nivelAtaque": 40,
    "puntosVida": 40,
    "experiencia": 45
  }
  
]