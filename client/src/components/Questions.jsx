import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom'

export const Questions = () => {

    const [indicePregunta, setIndicePregunta] = useState(0);
    const [mostrarResultado, setMostrarResultado] = useState(false);
    const [respuestasSeleccionadas, setRespuestasSeleccionadas] = useState([]);
    const [contador, setContador] = useState(false)
    const [aciertos, setAciertos] = useState(0)
    const [respuestas, setRespuestas] = useState([]);
    const [preguntas, setPreguntas] = useState([]);


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

    //Recogemos del fetch las respuestas correctas que usaremos máa adelante
    const respuestasCorrectas = contenidoQuiz.map((correctas) => (
        correctas.correctAnswer
    ))


    //Generamos la lógica para ir pasando de una pregunta a otra
    const siguientePregunta = () => {
        if (indicePregunta < contenidoQuiz.length - 1) {
            setIndicePregunta(indicePregunta + 1);
            setRespuestasSeleccionadas([]);
            setMostrarResultado(false);
        } else {
            setContador(true)
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


    const comprobarRespuestas = () => {
        const coincidenTodas = respuestas.map((pregunta) =>
            respuestasCorrectas.includes(pregunta)
        );

        const cantidadTrue = coincidenTodas.filter((valor) => valor === true).length;
        console.log(`Cantidad de true: ${cantidadTrue}`);

        setAciertos(cantidadTrue)
        console.log(coincidenTodas);
    };

    return (
        <div>
            <h2>{preguntaActual && preguntaActual.question.text}</h2>

            {preguntaActual && preguntaActual.incorrectAnswers.map((respuesta, index) => (
                <button key={index} onClick={() => seleccionarRespuesta(respuesta)}>
                    {respuesta}
                </button>
            ))}

            <button onClick={() => seleccionarRespuesta(preguntaActual.correctAnswer)}>
                {preguntaActual.correctAnswer}
            </button>

            {mostrarResultado && (
                <div>
                    <p>Tu respuesta: {respuestasSeleccionadas[indicePregunta]}</p>
                    <p>Respuesta correcta: {preguntaActual.correctAnswer}</p>
                </div>
            )}

            <button onClick={siguientePregunta}>Siguiente pregunta</button>

            <button onClick={comprobarRespuestas}>sumatorio</button>

            <p>{aciertos}</p>

            {contador && <button><Link to='/'>VOLVER A JUGAR</Link></button>
            }
        </div>)

}