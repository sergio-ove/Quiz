import React from 'react'
import { Link } from 'react-router-dom'


export const Results = () => {

  const puntuacionLocal = localStorage.getItem('resultados')



  return (
    <div className='divResultados'>

      <p className='presultados1'>Has acertado:</p>

      <p className='presultados2'>{puntuacionLocal} Preguntas</p>

      <li><Link to='/'>Volver a jugar</Link></li>
      
      </div>
  )
}
