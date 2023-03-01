import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Splash from '../screens/Splash'
import Game from '../screens/Game'
import NotFound from '../screens/NotFound'

function Routing(props) {
    return (
        <Routes>
            <Route path='/' element={<Splash />} />
            <Route path='/game' element={<Game />} />
            <Route path='*' element={<NotFound />} />
        </Routes>
    )
}

export default Routing