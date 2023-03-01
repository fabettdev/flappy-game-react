import React from 'react';
import './background.css';
import eventsBus from "../../../utils/eventBus";

function Background(props) {

    function onClickPlayerMove() {
        eventsBus.dispatch('onClickPlayer');
    }

    return (
        <div className="App" style={{ position: 'relative', height: '100vh' }} onMouseDown={onClickPlayerMove}>
            <div className='background-container'>
                <div className='background-css'></div>
                <div className='midground-css'></div>
                {props.children}
            </div>
        </div >
    )
}

export default Background