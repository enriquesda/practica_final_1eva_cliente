export class ProductoExpecial extends Producto {
    constructor(
        nombre,
        imagen,
        precio,
        rareza,
        tipo,
        bonus,
        
    ) {
        super(nombre, avatar, nivelAtaque, puntosVida, experiencia);
        this.multiplicadorDanio = multiplicadorDanio;
    }

    calcularDanio(baseDanio) {
        return baseDanio * this.multiplicadorDanio;
    }
}
