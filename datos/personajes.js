/**
 * @fileoverview Este archivo contiene la definición de los personajes base
 * que el jugador puede elegir al inicio del juego. Se exporta un array
 * de objetos con las estadísticas iniciales y el avatar de cada personaje.
 * @exports {Array<DatosPersonaje>} El array de personajes predefinidos.
 */

/**
 * Un objeto que define las características y estadísticas iniciales de un personaje.
 * @typedef {Object} DatosPersonaje
 * @property {string} id - Identificador único del personaje (ej: 'p1').
 * @property {string} nombreClase - Nombre visible del personaje (ej: 'exploradora').
 * @property {string} avatar - Ruta a la imagen del personaje (ej: 'imagenes/exploradora.png').
 * @property {Object} stats - Contiene las estadísticas base del personaje.
 * @property {number} stats.vida - Puntos de vida iniciales.
 * @property {number} stats.ataque - Nivel de ataque inicial.
 * @property {number} stats.defensa - Nivel de defensa inicial.
 */

export const personajesBase = [
    {
        "id": "p1",
        "nombreClase": "exploradora",
        "avatar": "imagenes/exploradora.png",
        "stats": {
            "vida": 120,
            "ataque": 12,
            "defensa": 8
        }
    },
    {
        "id": "p2",
        "nombreClase": "cientifico",
        "avatar": "imagenes/cientifico.png",
        "stats": {
            "vida": 90,
            "ataque": 25,
            "defensa": 2
        }
    },
    {
        "id": "p3",
        "nombreClase": "robot",
        "avatar": "imagenes/robot.png",
        "stats": {
            "vida": 100,
            "ataque": 15,
            "defensa": 5
        }
    }
];