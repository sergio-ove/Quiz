import React from 'react'
import { Routes, Route, BrowserRouter } from 'react-router-dom'
import { Questions } from '../Questions'


export const Rutas = () => {

    return (

        <BrowserRouter>
            <div className='routes'>
                <Routes>

                    <Route path="/" element={<Questions />} />


                </Routes>
            </div>
        </BrowserRouter>

    )
}
