import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Splash from '../screens/Splash'
import Game from '../screens/Game'
import NotFound from '../screens/NotFound'
import Test from '../screens/Test'

function Routing(props) {
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