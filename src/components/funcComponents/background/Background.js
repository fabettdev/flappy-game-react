import React, { useRef, useEffect } from 'react';
import './background.css';
import eventsBus from "../../../utils/eventBus";

function Background(props) {
    const background = useRef(null);
    const midground = useRef(null);

    useEffect(() => {
        if (props.stopAnimation) {
            background.current.style.animationPlayState = "paused";
            midground.current.style.animationPlayState = "paused";
        } else {
            background.current.style.animationPlayState = "running";
            midground.current.style.animationPlayState = "running";
        }
    }, [props.stopAnimation]);

    function onClickPlayerMove() {
        eventsBus.dispatch('onClickPlayer');
    }

    return (
        <div className="App" style={{ position: 'relative', height: '100vh' }} onMouseDown={onClickPlayerMove}>
            <div className='background-container'>
                <div ref={background} className='background-css'></div>
                <div ref={midground} className='midground-css'></div>
                {props.children}
            </div>
        </div >
    )
}

export default Background