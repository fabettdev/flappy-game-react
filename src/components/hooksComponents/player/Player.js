import React, { useState, useEffect, useRef } from "react";
import './player.css';
import eventsBus from "../../../utils/eventBus";
import { jumpEffect } from "../../../utils/audioUtils";

// import Spritesheet from 'react-responsive-spritesheet';

function Player(props) {
    let timeout = null;
    const playerRef = useRef(null);
    let playerPosition = null

    const [state, setState] = useState(
        {
            classIndex: 1,
            translatePlayerY: 50,
        }
    )

    useEffect(() => {
        let newIndex = null;
        state.classIndex === 7 ? newIndex = 1 : newIndex = state.classIndex + 1;
        timeout = setInterval(() => {

            setState(prevState => (
                {
                    ...state,
                    classIndex: newIndex,
                    translatePlayerY: props.hasStarted ? prevState.translatePlayerY + 5 : state.translatePlayerY,
                }
            ))
        }, 70)

        return () => clearInterval(timeout);
    }, [state.classIndex]);

    useEffect(() => {
        playerPosition = playerRef.current.getBoundingClientRect();
        eventsBus.dispatch('onSwim', playerPosition);

        eventsBus.on('onClickPlayer', playerUp);
        return () => {
            eventsBus.remove('onClickPlayer', playerUp);
        }
    }, [state]);

    function playerUp() {
        if (!props.hasStarted) props.startFunc();

        setState(prevState => (
            {
                ...state,
                translatePlayerY: prevState.translatePlayerY - 25,
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