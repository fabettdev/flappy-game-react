import React from 'react'
import eventsBus from "../../utils/eventBus";

function BackgroundCss(props) {

    function onClickPlayerMove() {
        eventsBus.dispatch('onClickPlayer');
    }

    return (
        <div className="App" style={{ position: 'relative', height: '100vh' }} onClick={onClickPlayerMove}>
            <div className='background-container'>
                <div className='background-css'></div>
                <div className='midground-css'></div>
                {props.children}
            </div>
        </div >
    )
}

export default BackgroundCss