function distinguirJugador(puntuacion, umbral) {
    return puntuacion >= umbral ? "Veterano" : "Novato";
}

export {distinguirJugador};