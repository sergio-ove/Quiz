import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'


export const Questions = () => {

    const [indicePregunta, setIndicePregunta] = useState(0);
    const [respuestasSeleccionadas, setRespuestasSeleccionadas] = useState([]);
    const [contador, setContador] = useState(false)
    const [aciertos, setAciertos] = useState(0)
    const [respuestas, setRespuestas] = useState([]);
    const [preguntas, setPreguntas] = useState([]);
    const [pasarPregunta, setPasarPregunta] = useState(false);


    const navigate = useNavigate();

    useEffect(() => {
        const obtenerPreguntas = async () => {
            try {
                const response = await fetch('https://the-trivia-api.com/v2/questions');
                const data = await response.json();
                setPreguntas(data);

            } catch (error) {
                console.error('Error al obtener las preguntas:', error);
            }
        }
        obtenerPreguntas();
    }, [])

    const contenidoQuiz = preguntas

    console.log(contenidoQuiz);

    //Recogemos del fetch las respuestas correctas que usaremos máa adelante
    const respuestasCorrectas = contenidoQuiz.map((correctas) => (
        correctas.correctAnswer
    ))


    //Generamos la lógica para ir pasando de una pregunta a otra
    const siguientePregunta = () => {

        

        if (indicePregunta < contenidoQuiz.length - 1) {
            setIndicePregunta(indicePregunta + 1);
            setRespuestasSeleccionadas([]);
            setPasarPregunta(true);
        } else {
            setContador(true)
            comprobarRespuestas()
            navigate('/results');
        }
    };


    const seleccionarRespuesta = (respuesta) => {
        const nuevasRespuestas = [...respuestasSeleccionadas];
        nuevasRespuestas[indicePregunta] = respuesta;
        setRespuestasSeleccionadas(nuevasRespuestas);
        const todas = [...respuestas, respuesta]
        setRespuestas(todas);
        console.log([respuesta]);

    };


    const preguntaActual = contenidoQuiz[indicePregunta];

    //Comprobamos las respuestas que marca el usuario con el array de respuestas correctas para saber el sumatorio de las correctas.
    const comprobarRespuestas = () => {

        const coincidenTodas = respuestas.map((pregunta) =>

            respuestasCorrectas.includes(pregunta)
        );

        const cantidadTrue = coincidenTodas.filter((valor) => valor === true).length;

        console.log(`Cantidad de true: ${cantidadTrue}`);

        setAciertos(cantidadTrue)
        console.log(coincidenTodas);
        localStorage.setItem('resultados', cantidadTrue)
    };



    return (
        <div>

            <div className='divPreguntas'>

                <h2 className='h2Preguntas'>{preguntaActual && preguntaActual.question.text}</h2>


                {preguntaActual && preguntaActual.incorrectAnswers.map((respuesta, index) => (
                    <button key={index} onClick={() => seleccionarRespuesta(respuesta)}>
                        {respuesta}
                    </button>
                ))}

                {preguntaActual && <button onClick={() => seleccionarRespuesta(preguntaActual.correctAnswer)}>
                    {preguntaActual.correctAnswer}
                </button>}


            </div>


            <div className='divButComenzar'>

                <button className='buttonComenzar' onClick={siguientePregunta}>Siguiente pregunta</button>

            </div>


        </div>)

}