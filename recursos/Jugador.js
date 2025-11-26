import { vidaInicial } from "./constants.js";
export class Jugador {
    inventario = [];
    ataque = 0;
    ataqueTotal = 0;
    defensa = 0;
    defensaFinal = 0;
    vidaTotal = 0;
    puntuacion = 0;

    constructor(nombre, avatar, puntos = 0, vida = vidaInicial) {
        this.nombre = nombre;
        this.avatar = avatar;
        this.puntos = puntos;
        this.vida = vida;
    }

    aniadirObjeto(objeto) {
        const auxObjeto = objeto.clonar();
        this.inventario.push(auxObjeto);
        this.actualizarEstadisticas();
    }

    obtenerVidaTotal() {
        this.vidaTotal = this.vida;
        this.inventario.forEach(producto => {
            if (producto.tipo == "consumible") this.vidaTotal += producto.obtenerBonus();
        });
    }

    obtenerAtaqueTotal() {
        this.ataqueTotal = this.ataque;
        this.inventario.forEach(producto => {
            if (producto.tipo == "arma") this.ataqueTotal += producto.obtenerBonus();
        });
    }

    obtenerDefensaTotal() {
        this.defensaFinal = this.defensa;
        this.inventario.forEach(producto => {
            if (producto.tipo == "armadura") this.defensaFinal += producto.obtenerBonus();
        });
    }

    actualizarEstadisticas() {
        this.obtenerVidaTotal();
        this.obtenerDefensaTotal();
        this.obtenerAtaqueTotal();
    }

    sumarPuntos(puntos) {
        this.puntos += puntos
    }
}
