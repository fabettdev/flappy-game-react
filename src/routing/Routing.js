import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Test from '../screens/Test'
import Splash from '../screens/splash/Splash'
import Game from '../screens/game/Game'
import NotFound from '../screens/notfound/NotFound'

function Routing() {
    return (
        <Routes>
            <Route path='/' element={<Splash />} />
            <Route path='/game' element={<Game />} />
            <Route path='*' element={<NotFound />} />
            <Route path='/test' element={<Test />} />
        </Routes>
    )
}

export default Routing