import React from 'react'
import { useNavigate } from 'react-router-dom'


export const Results = () => {


  const navigate = useNavigate();

  const puntuacionLocal = JSON.parse(localStorage.getItem('aciertos'))

  const resultados = JSON.parse((localStorage.getItem('mostarResultados')))

  const acertadas =  JSON.parse((localStorage.getItem('correctas')))

  console.log(resultados);

  const volverAJugar = () => {
    navigate('/');
    localStorage.removeItem('aciertos')
    localStorage.removeItem('respuestas')
    localStorage.removeItem('correctas')
  }


  return (
    <div className='divResultados'>

      <p className='presultados1'>Has acertado:</p>

      <p className='presultados2'>{puntuacionLocal.length}/10 Preguntas</p>

      <div className='divButton'>

        <button className='butReinicio' onClick={volverAJugar}>Volver a jugar</button>

      </div>

        <div>

          <h2>Solución 10 preguntas</h2>
          {resultados && resultados.map((resultados) =>(
           <p>{resultados}</p>
          ))}


        </div>

        <div>
            <h2>Tus respuestas correctas</h2>
            {acertadas && acertadas.map((opciones) =>(
              <p>{opciones}</p>
            ))}



        </div>

    </div>
  )
}
