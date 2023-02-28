import React, { useState, useEffect, useRef } from "react";
import './player.css';
import eventsBus from "../../../utils/eventBus";
// import Spritesheet from 'react-responsive-spritesheet';

function Player(props) {
    const [state, setState] = useState(
        {
            classIndex: 1,
        }
    )

    const playerRef = useRef(null);

    useEffect(() => {
        eventsBus.dispatch('onSwim', playerRef.current.getBoundingClientRect())
        // console.log(playerRef.current.getBoundingClientRect())
        let newIndex = null;
        state.classIndex === 7 ? newIndex = 1 : newIndex = state.classIndex + 1;
        const timeout = setTimeout(() => {
            setState(
                {
                    classIndex: newIndex,
                }
            )
        }, 100)
        return () => clearTimeout(timeout);
    }, [state.classIndex]);

    return (
        <div ref={playerRef} className={`player swim${state.classIndex}`} style={props.playerStyle}></div>
    )
}

export default Player;