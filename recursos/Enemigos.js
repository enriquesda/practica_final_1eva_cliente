import { nivelAtaqueEnemigos, vidaEnemigos, experienciaEnemigos } from "./Constants.js";
/**
 * Clase para crear a los enemigos contra los que lucha el Jugador.
 * @class
 */
export class Enemigos {
    /** @type {string}*/
    nombre;
    /** @type {string}*/
    avatar;
    /** @type {number}*/
    nivelAtaque;
    /** @type {number}*/
    puntosVida;
    /** @type {number}*/
    experiencia;

    /**
     * Crea una instancia de Enemigos.
     * @constructor
     * @param {string} nombre - El nombre que se le pone al enemigo.
     * @param {string} avatar - La ruta de la imajen.
     * @param {number} [nivelAtaque=nivelAtaqueEnemigos] - Su nivel de atake, usa la constante por defecto.
     * @param {number} [puntosVida=vidaEnemigos] - Los puntos de vida iniciales.
     * @param {number} [experiencia=experienciaEnemigos] - Los puntos de experiencia que da.
     */
    constructor(
        nombre,
        avatar,
        nivelAtaque = nivelAtaqueEnemigos,
        puntosVida = vidaEnemigos,
        experiencia = experienciaEnemigos
    ) {
        this.nombre = nombre;
        this.avatar = avatar;
        this.nivelAtaque = nivelAtaque;
        this.puntosVida = puntosVida;
        this.experiencia = experiencia;
    }


}