import { Jugador } from "../recursos/Jugador.js";
import { Enemigos } from "../recursos/Enemigos.js";
import { Jefes} from "../recursos/Jefes.js";

function combate(jugador,enemigo ) {
    let logBatalla = []; 
    const registrarMensaje = (mensaje) => {
        logBatalla.push(mensaje); 
        console.log(mensaje); 
    };
    console.log("entramos en combate")
    console.log(jugador.vidaTotal)
    console.log(enemigo.puntosVida )
    while (jugador.vidaTotal > 0 && enemigo.puntosVida > 0) {
        console.log("entramos en combate")
        enemigo.puntosVida -= jugador.ataqueTotal;
        registrarMensaje(`${jugador.nombre} ataca a ${enemigo.nombre}. Vida restante: ${enemigo.puntosVida.toFixed(2)}`);
        
        if (enemigo.puntosVida <= 0) {
            registrarMensaje(`¡${jugador.nombre} ha derrotado a ${enemigo.nombre}!`);
            
            let experienciaGanada = enemigo.experiencia + 100;
            
            if (enemigo instanceof Jefes) {
                experienciaGanada *= 2;
                registrarMensaje(`¡Es un JEFE! La experiencia se duplica.`);
            }
            registrarMensaje(`${jugador.nombre} gana ${experienciaGanada} puntos de experiencia.`);
            return { experiencia: experienciaGanada, log: logBatalla };
        }

        jugador.vidaTotal -= enemigo.nivelAtaque;
        registrarMensaje(`${enemigo.nombre} ataca a ${jugador.nombre}. Vida restante: ${jugador.vidaTotal.toFixed(2)}`);

        if (jugador.vidaTotal <= 0) {
            registrarMensaje(`${enemigo.nombre} ha derrotado a ${jugador.nombre}. Fin del juego.`);
            
            // 4. Devuelve el objeto con el ARRAY de log
            return { experiencia: 0, log: logBatalla };
        }
    }
    return { experiencia: 0, log: logBatalla };
}
export { combate };