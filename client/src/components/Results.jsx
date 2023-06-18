import React from 'react'
import { useNavigate } from 'react-router-dom'


export const Results = () => {


  const navigate = useNavigate();

  const puntuacionLocal = JSON.parse(localStorage.getItem('aciertos'))

  const volverAJugar = () => {
    navigate('/');
    localStorage.removeItem('aciertos')
    localStorage.removeItem('respuestas')

  }


  return (
    <div className='divResultados'>

      <p className='presultados1'>Has acertado:</p>

      <p className='presultados2'>{puntuacionLocal.length}/10 Preguntas</p>

      <div className='divButton'>

        <button className='butReinicio' onClick={volverAJugar}>Volver a jugar</button>

      </div>

    </div>
  )
}
