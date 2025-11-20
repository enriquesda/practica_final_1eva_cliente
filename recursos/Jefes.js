import { nivelAtaqueEnemigos, vidaEnemigos, experienciaEnemigos,multiplicadorDanioJefe } from "./constants.js";
import { Enemigos } from "./Enemigos.js";

export class Jefe extends Enemigos {
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
        this.calcularDanio();
    }

    calcularDanio() {
        this.nivelAtaque *= this.multiplicadorDanio;
    }
}
