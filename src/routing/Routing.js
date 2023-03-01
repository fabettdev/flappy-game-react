import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Splash from '../screens/splash/Splash'
import Game from '../screens/game/Game'
import NotFound from '../screens/notfound/NotFound'

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