import React, { useState, useEffect } from 'react';
import { json, useNavigate } from 'react-router-dom'


export const Questions = () => {

    const [indicePregunta, setIndicePregunta] = useState(0);
    const [respuestasSeleccionadas, setRespuestasSeleccionadas] = useState([]);
    const [contador, setContador] = useState(false)
    const [preguntas, setPreguntas] = useState([]);
    const [pasarPregunta, setPasarPregunta] = useState(false);
    const [aciertos, setAciertos] = useState(0);


    const navigate = useNavigate();

    useEffect(() => {

        const obtenerPreguntas = async () => {
            try {
                const response = await fetch('https://the-trivia-api.com/v2/questions');
                const data = await response.json();
                setPreguntas(data);

            } catch (error) {
                console.log('Error al obtener las preguntas:', error);
            }
        }
        obtenerPreguntas();

    }, [])



    const contenidoQuiz = preguntas

    console.log(contenidoQuiz);


    //Creamos una funcion en la cual le pasamos 4 argumentos(el array a mapear y las 3 propiedades que queremos contemplar en nuestro nuevo objeto)
    const miObjeto = (array, prop1, prop2, prop3) => {
        return array.map(obj => ({ respuestasIncorrectas: obj[prop1], respuestasCorrectas: obj[prop2], pregunta: obj[prop3] }));
    }

    //Creamos una funcion para mapear nuestro array de objetos y juntar dos propiedades en una sola para que nos sea más fácil a la hora de mostrar las preguntas.
    const miObjetoModificado = (array) => {
        return array.map(obj => ({
            ...obj,
            respuestas: [...obj.respuestasIncorrectas, obj.respuestasCorrectas],
        }));
    }

    //Creamos una funcion en la cual le pasamos como argumento el array.Lo mapeamos y le decimos que cree una nueva porpiedad en la cual desordenamos las respuestas.
    const objetoConRespuestasAleatorias = (array) => {
        return array.map(obj => ({
            ...obj,
            respuestasDesordenadas: obj.respuestas.sort(() => Math.random() - 0.5)
        }))
    }


    const resultado = miObjeto(contenidoQuiz, 'incorrectAnswers', 'correctAnswer', 'question');

    const objeto = miObjetoModificado(resultado)

    const objetoFinal = objetoConRespuestasAleatorias(objeto)

    //Obtenemos todas las respuestas correctas y las guardamos en una variable para que nos sea más cómodo compararlo luego con las respuestas del usuario.
    const arrayCorrectas = objeto.map((respuestas) => (
        respuestas.respuestasCorrectas
    ))

    console.log(resultado);

    //Obtenemos pregunta y respuesta correcta para mostarlo en la pantalla final
    const preguntaYacierto = resultado.map((opciones) => (
        [opciones.pregunta.text] + " - " + [opciones.respuestasCorrectas]
    ))

    localStorage.setItem('mostarResultados', JSON.stringify(preguntaYacierto))

    console.log(preguntaYacierto);


    //Generamos la lógica para ir pasando de una pregunta a otra
    const siguientePregunta = () => {

        if (indicePregunta < objetoFinal.length - 1) {
            setIndicePregunta(indicePregunta + 1);
            setRespuestasSeleccionadas([]);
            setPasarPregunta(true);
        } else {
            setContador(true)
            comprobar()
            navigate('/results');
        }
    };


    const seleccionarRespuesta = (respuesta) => {

        const nuevasRespuestas = [...respuestasSeleccionadas];

        const respuestasLocal = localStorage.getItem('respuestas');

        // Verificamos si ya hay respuestas almacenadas
        if (respuestasLocal) {

            const respuestasArray = JSON.parse(respuestasLocal);
            respuestasArray.push(respuesta);
            localStorage.setItem('respuestas', JSON.stringify(respuestasArray));

        } else {

            const respuestasParaLocal = [respuesta];
            localStorage.setItem('respuestas', JSON.stringify(respuestasParaLocal));
        }

    };

    const preguntaActual = objetoFinal[indicePregunta];

    console.log(respuestasSeleccionadas);


    //Comprobamos las respuestas que marca el usuario con el array de respuestas correctas para saber el sumatorio de las correctas y las guardamos en el localStorage
    const comprobar = () => {

        const array = []

        const arrayLocalAciertos = []

        const arrayLocal = JSON.parse(localStorage.getItem('respuestas'))

        //Comprobamos las guardadas en el local con las correctas y las guardamos en el local a parte para usarlas en la pantalla de resultados.
        for (let i = 0; i < arrayCorrectas.length; i++) {
            for (let j = 0; j < arrayLocal.length; j++) {
                console.log(arrayLocal[i]);
                if (arrayCorrectas[i] == arrayLocal[j]) {
                    arrayLocalAciertos.push(arrayLocal[i])
                    localStorage.setItem('correctas', JSON.stringify(arrayLocalAciertos))
                }
            }
        }

        const coincicidencias = arrayLocal.map((respuesta) =>
            arrayCorrectas.includes(respuesta)
        )

        console.log(coincicidencias);

        for (let i = 0; i < coincicidencias.length; i++) {
            if (coincicidencias[i] == true) {
                array.push(coincicidencias[i])
            }
        }

        const datosLocal = localStorage.setItem('aciertos', JSON.stringify(array))
    }




    return (
        <div>

            <div className='divPreguntas'>

                <h2 className='h2Preguntas'>{preguntaActual && preguntaActual.pregunta.text}</h2>

                {preguntaActual && preguntaActual.respuestasDesordenadas.map((respuesta) => (

                    <div key={respuesta.respuestasCorrectas}>

                        <button onClick={() => seleccionarRespuesta(respuesta)}>
                            {respuesta}
                        </button>

                    </div>
                ))}

            </div>

            <div className='divButComenzar'>

                <button className='buttonComenzar' onClick={siguientePregunta}>Siguiente pregunta</button>

            </div>

        </div>)

}