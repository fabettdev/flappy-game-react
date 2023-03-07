import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Splash from '../screens/splash/Splash'
import Game from '../screens/game/Game'

function Routing() {
    return (
        <Routes>
            <Route path='/' element={<Splash />} />
            <Route path='/game' element={<Game />} />
            <Route path='*' element={<Splash />} />
        </Routes>
    )
}

export default Routing