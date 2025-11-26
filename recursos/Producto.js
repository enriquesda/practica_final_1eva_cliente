import { rarezaProductos, tipoProductos } from "./constants.js";
export class Producto {

    constructor(
        nombre,
        imagen,
        precio,
        rareza,
        tipo,
        bonus
    ) {
        this.nombre = nombre;
        this.imagen = imagen;
        this.precio = precio;
        if (rarezaProductos.includes(rareza.toLowerCase())) {
            this.rareza = rareza;
        } else {
            this.rareza = 'comun';
        }
        if (tipoProductos.includes(tipo.toLowerCase())) {
            this.tipo = tipo;
        } else {
            this.tipo = 'consumible';
        }
        this.bonus = bonus;
    }
    formatearAtributos() {
        return `${(this.precio / 100).toFixed(2)}€`;
    }
    obtenerBonus(){
        switch(this.rareza){
            case 'comun':
                return this.bonus*1;
            case 'rara':
                return this.bonus*1.5;
            case 'legendaria':
                return this.bonus*2;
        }
    }

    aplicarDescuento(porcentaje) {
        const nuevoPrecio = this.precio - (this.precio * (porcentaje / 100));
        const copia = new Producto(
            this.nombre,
            this.imagen,
            nuevoPrecio,
            this.rareza,
            this.tipo,
            this.bonus
        );
        return copia;
    }

    clonar() {
        return new Producto(
            this.nombre,
            this.imagen,
            this.precio,
            this.rareza,
            this.tipo,
            this.bonus
        );
    }


}