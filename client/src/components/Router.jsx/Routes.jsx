import React from 'react'
import { Routes, Route, BrowserRouter } from 'react-router-dom'
import { Questions } from '../Questions'
import { StartGame } from '../StartGame'
import { Results } from '../Results'


export const Rutas = () => {

    return (

        <BrowserRouter>
            <div className='routes'>
                <Routes>

                    <Route path="/" element={<StartGame />} />
                    <Route path="/start" element={<Questions />} />
                    <Route path="/results" element={<Results />} />


                </Routes>
            </div>
        </BrowserRouter>

    )
}
