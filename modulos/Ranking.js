/**
 * Determina el rango del jugador basándose en su puntuacion final.
 * Es para saber si es bueno o malo.
 * @param {number} puntuacion - Los puntos totales que ha ganado el jugador.
 * @param {number} umbral - El valor mínimo que necesita para ser un Veterano.
 * @returns {string} El rango, que puede ser "Veterano" o "Novato".
 */
function distinguirJugador(puntuacion, umbral) {
    return puntuacion >= umbral ? "Veterano" : "Novato";
}

export {distinguirJugador};