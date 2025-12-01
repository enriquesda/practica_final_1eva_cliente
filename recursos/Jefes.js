import { nivelAtaqueEnemigos, vidaEnemigos, experienciaEnemigos,multiplicadorDanioJefe } from "./constants.js";
import { Enemigos } from "./Enemigos.js";

/**
 * Clase para crear a los Jefes, son enemigos mas fuertes.
 * Hereda de la clase Enemigos.
 * @class
 * @augments Enemigos
 */
export class Jefes extends Enemigos {
    /** @type {number}*/
    multiplicadorDanio;

    /**
     * Crea una instancia de Jefes.
     * @constructor
     * @param {string} nombre - El nombre del Jefe.
     * @param {string} avatar - La ruta de la imajen.
     * @param {number} [nivelAtaque=nivelAtaqueEnemigos] - Nivel de ataque base (se modificara).
     * @param {number} [puntosVida=vidaEnemigos] - Puntos de vida iniciales.
     * @param {number} [experiencia=experienciaEnemigos] - Exp que da al ganar.
     * @param {number} [multiplicadorDanio=multiplicadorDanioJefe] - Multiplicador de daño extra.
     */
    constructor(
        nombre,
        avatar,
        nivelAtaque = nivelAtaqueEnemigos,
        puntosVida = vidaEnemigos,
        experiencia = experienciaEnemigos,
        multiplicadorDanio = multiplicadorDanioJefe
    ) {
        super(nombre, avatar, nivelAtaque, puntosVida, experiencia);
        this.multiplicadorDanio = multiplicadorDanio;
        this.calcularDanio(); // Llamamos a la funsion que aumenta el daño
    }

    /**
     * Multiplica el nivel de atake base del Jefe por el multiplicador.
     */
    calcularDanio() {
        this.nivelAtaque *= this.multiplicadorDanio;
    }
}