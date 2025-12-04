import { Jugador } from "../recursos/Jugador.js";
import { Enemigos } from "../recursos/Enemigos.js";
import { Jefes} from "../recursos/Jefes.js";

/**
 * Simula un turno de combate simple por turnos entre el jugador y un enemigo.
 * @param {Jugador} jugador - El objeto Jugador con sus stats actuales.
 * @param {Enemigos|Jefes} enemigo - El objeto Enemigo o Jefe contra el que se lucha.
 * @returns {{experiencia: number, log: string[]}} Un objeto con la experiencia ganada y el historial del combate.
 */
function combate(jugador,enemigo ) {
    /** @type {string[]} */
    let logBatalla = []; 
    let dineroGanado=5;
    
    /**
     * Añade un mensaje al historial y lo muestra por consola.
     * @param {string} mensaje
     */
    const registrarMensaje = (mensaje) => {
        logBatalla.push(mensaje); 
        console.log(mensaje); 
    };

    // El combate sigue mientras los dos sigan vivos
    while (jugador.vidaTotal > 0 && enemigo.puntosVida > 0) {
        console.log("entramos en combate")
        
        // 1. Turno del Jugador (el jugador siempre ataca primero)
        enemigo.puntosVida -= jugador.ataqueTotal;
        registrarMensaje(`${jugador.nombre} ataca a ${enemigo.nombre}. Vida restante: ${enemigo.puntosVida.toFixed(2)}`);
        
        if (enemigo.puntosVida <= 0) {
            registrarMensaje(`¡${jugador.nombre} ha derrotado a ${enemigo.nombre}!`);
            
            let experienciaGanada = enemigo.experiencia + 100;
            
            // Si el enemigo es una instancia de Jefe, damos más experiencia
            if (enemigo instanceof Jefes) {
                experienciaGanada *= 2;
                dineroGanado=10;
                registrarMensaje(`¡Es un JEFE! La experiencia se duplica.`);
            }
            registrarMensaje(`${jugador.nombre} gana ${experienciaGanada} puntos de experiencia.`);
            
            // Devuelve la experiencia y el log de victoria
            return { experiencia: experienciaGanada, log: logBatalla,dineroGanado:dineroGanado};
        }

        // 2. Turno del Enemigo (solo si sigue vivo)
        jugador.vidaTotal -= enemigo.nivelAtaque; 
        registrarMensaje(`${enemigo.nombre} ataca a ${jugador.nombre}. Vida restante: ${jugador.vidaTotal.toFixed(2)}`);

        if (jugador.vidaTotal <= 0) {
            registrarMensaje(`${enemigo.nombre} ha derrotado a ${jugador.nombre}. Fin del juego.`);
            
            // Devuelve 0 experiencia y el log de derrota
            return { experiencia: 0, log: logBatalla,dineroGanado:dineroGanado};
        }
    }
    
    // Por si el bucle termina por una condición inicial (no debería pasar)
    return { experiencia: 0, log: logBatalla ,dineroGanado:0};
}
export { combate };