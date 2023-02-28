import React from 'react'

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