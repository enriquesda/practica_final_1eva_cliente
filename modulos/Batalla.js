import { Jugador } from "./Jugador.js";
import { Enemigos } from "./Enemigos.js";
import { Jefe } from "./Jefe.js";

function combate(enemigo, jugador) {
    while (jugador.vidaTotal > 0 && enemigo.puntosVida > 0) {
        
        // El jugador ataca primero
        enemigo.puntosVida -= jugador.ataqueTotal;
        console.log(`${jugador.nombre} ataca a ${enemigo.nombre}. Vida restante: ${enemigo.puntosVida}`);
        
        if (enemigo.puntosVida <= 0) {
            console.log(`\n¡${jugador.nombre} ha derrotado a ${enemigo.nombre}!`);
            
            let experienciaGanada = enemigo.experiencia + 100;
            
            // 2. LA VERIFICACIÓN DE INSTANCEOF REQUIERE LA IMPORTACIÓN DE 'Jefe'
            if (enemigo instanceof Jefe) {
                experienciaGanada *= 2;
                console.log(`¡Es un JEFE! La experiencia se duplica.`);
            }
            
            console.log(`${jugador.nombre} gana ${experienciaGanada} puntos de experiencia.`);
            return experienciaGanada;
        }

        // El enemigo ataca (solo si sigue vivo)
        jugador.vidaTotal -= enemigo.nivelAtaque;
        console.log(`${enemigo.nombre} ataca a ${jugador.nombre}. Vida restante: ${jugador.vidaTotal}`);

        if (jugador.vidaTotal <= 0) {
            console.log(`\n${enemigo.nombre} ha derrotado a ${jugador.nombre}. Fin del juego.`);
            return 0;
        }
    }
}
export { combate };