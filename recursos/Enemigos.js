import { nivelAtaqueEnemigos,vidaEnemigos,experienciaEnemigos } from "./constants.js";
export class Enemigos{
    constructor(
        nombre,
        avatar,
        nivelAtaque = nivelAtaqueEnemigos,
        puntosVida=vidaEnemigos,
        experiencia=experienciaEnemigos
    ){
        this.nombre=nombre;
        this.avatar=avatar;
        this.nivelAtaque=nivelAtaque;
        this.puntosVida=puntosVida;
        this.experiencia=experiencia;
    }

    
}