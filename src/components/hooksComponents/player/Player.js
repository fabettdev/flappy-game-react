import React, { useState, useEffect, useRef } from "react";
import './player.css';
import eventsBus from "../../../utils/eventBus";
import { jumpEffect } from "../../../utils/audioUtils";

// import Spritesheet from 'react-responsive-spritesheet';

function Player() {
    let timeout = null;
    const playerRef = useRef(null);

    const [state, setState] = useState(
        {
            classIndex: 1,
            translatePlayerY: 50,
        }
    )

    useEffect(() => {
        eventsBus.on('onClickPlayer', playerUp);
        eventsBus.dispatch('onSwim', playerRef.current.getBoundingClientRect())
        // console.log(playerRef.current.getBoundingClientRect())
        let newIndex = null;
        state.classIndex === 7 ? newIndex = 1 : newIndex = state.classIndex + 1;
        timeout = setInterval(() => {
            setState(prevState => (
                {
                    ...state,
                    classIndex: newIndex,
                    translatePlayerY: prevState.translatePlayerY + 5,
                }
            ))
        }, 70)
        return () => {
            eventsBus.remove('onClickPlayer', playerUp);
            clearInterval(timeout);
        }
    }, [state.classIndex]);

    function playerUp() {
        setState(prevState => (
            {
                ...state,
                translatePlayerY: prevState.translatePlayerY - 40,
            }
        ))
        jumpEffect()
    }

    return (
        <div ref={playerRef} className={`player swim${state.classIndex}`} style={{
            top: `${state.translatePlayerY}%`,
            transition: 'top 0.3s ease-out',
            transform: 'translateY(-50%)',
        }}></div>
    )
}

export default Player;