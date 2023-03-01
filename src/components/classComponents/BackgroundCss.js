import React from 'react'
import { Outlet } from 'react-router-dom'

function BackgroundCss(props) {
    return (
        <div className='background-container'>
            <div className='background-css'></div>
            <div className='midground-css'></div>
            {props.children}
        </div>
    )
}

export default BackgroundCss