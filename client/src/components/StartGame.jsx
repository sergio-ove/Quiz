import React, { useState } from 'react'


export const StartGame = () => {

    const [juegoIniciado, setJuegoIniciado] = useState(false);

    const iniciarJuego = () => {
        setJuegoIniciado(true);
        // Aquí puedes agregar la lógica para iniciar tu juego
    };

    return (
        <div>
            {juegoIniciado ? (
                // Renderiza tu juego aquí una vez que se haya iniciado
                <div>
                    <h1>Juego iniciado</h1>
                    {/* Agrega el contenido y la lógica de tu juego aquí */}
                </div>
            ) : (
                // Renderiza el botón de inicio de juego
                <button onClick={iniciarJuego}>Iniciar Juego</button>
            )}
        </div>
    );

}
