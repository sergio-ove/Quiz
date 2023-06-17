import React, { useState } from 'react'
import { Questions } from './Questions';
import { Home } from './Home';



export const StartGame = () => {

    const [juegoIniciado, setJuegoIniciado] = useState(false);

    const iniciarJuego = () => {
        setJuegoIniciado(true);
    };

    return (
        <div className='divPagPrincipal'>

            {juegoIniciado ? (
                <div>
                    <Questions />
                </div>
            ) : (

                <div>

                    <Home />

                    <div className='divBotonInicio'>


                        <div className='divButton'>

                            <button onClick={iniciarJuego}>START</button>

                        </div>

                    </div>

                </div>
            )}

        </div>
    );

}
